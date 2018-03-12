import re
import os
import sys
import json
import urllib
import errno
import logging
import time
from xml.dom import minidom

from jinja2 import contextfunction

BROWSERS = {}
BASE_URL = 'https://product-details.mozilla.org/1.0'
FIREFOX_URL = BASE_URL + '/firefox_versions.json'
CHROME_URL = 'https://omahaproxy.appspot.com/all.json?os=win'

cache = {}


def get_json_versions(product_url):
    response = urllib.urlopen(product_url)
    try:
        doc = json.load(response)
    except json.ValueError:
        print 'URL: %s not returning json object'.format(product_url)
    finally:
        response.close()

    for key, value in doc.iteritems():
        if value:
            match = re.search(r'^(\d+)(?:\.\d+)?', value)
            if match:
                doc[key] = match.group(0)
    return doc


def get_firefox_versions():
    versions = get_json_versions(FIREFOX_URL)
    return {
            'current': versions['LATEST_FIREFOX_VERSION'],
            'unreleased': [
                versions['LATEST_FIREFOX_DEVEL_VERSION'],
                versions['FIREFOX_NIGHTLY'],
            ]
    }

BROWSERS['firefox'] = lambda: get_firefox_versions()


def get_chrome_versions():
    response = urllib.urlopen(CHROME_URL)
    try:
        data = json.load(response)
    finally:
        response.close()

    versions = {
        x['channel']: x['version'].split('.')[0]
        for x in data[0]['versions']
    }

    return {
        'current': versions['stable'],
        'unreleased': [versions['beta'], versions['dev']],
    }

BROWSERS['chrome'] = get_chrome_versions


def get_opera_version(channel):
    response = urllib.urlopen('https://autoupdate.geo.opera.com/netinstaller/' + channel)
    try:
        spec = json.load(response)
    finally:
        response.close()

    return re.search(r'\d+', spec['installer_filename']).group(0)


def get_opera_versions():
    return {
        'current': get_opera_version('Stable'),
        'unreleased': [
            get_opera_version('Beta'),
            get_opera_version('Developer')
        ]
    }

BROWSERS['opera'] = get_opera_versions


def key_by_version(version):
    return map(int, version.split('.'))


def get_yandex_version_raw(suffix, params):
    response = urllib.urlopen('https://api.browser.yandex.ru/update-info/browser/yandex%s/win-yandex.xml%s' % (suffix, params))
    try:
        doc = minidom.parse(response)
    finally:
        response.close()

    item = doc.getElementsByTagName('item')[0]
    description = item.getElementsByTagName('description')[0]
    return re.search(r'\d+\.\d+', description.firstChild.nodeValue).group(0)


def get_yandex_version(suffix=''):
    return max(
        get_yandex_version_raw(suffix, ''),
        get_yandex_version_raw(suffix, '?manual=yes'),
        key=key_by_version
    )


def get_yandex_versions():
    return {
        'current': get_yandex_version(),
        'unreleased': [get_yandex_version('-beta')]
    }

BROWSERS['yandex'] = get_yandex_versions


def open_cache_file(filename):
    flags = os.O_RDWR | os.O_CREAT
    try:
        fd = os.open(filename, flags)
    except OSError as e:
        if e.errno != errno.ENOENT:
            raise
        os.makedirs(os.path.dirname(filename))
        fd = os.open(filename, flags)
    return os.fdopen(fd, 'w+')


@contextfunction
def get_browser_versions(context, browser):
    versions = cache.get(browser)
    if versions:
        return versions

    func = BROWSERS[browser]
    exc_info = None
    try:
        versions = func()
    except Exception:
        exc_info = sys.exc_info()

    filename = os.path.join(context['source'].get_cache_dir(), 'browsers.json')
    with open_cache_file(filename) as file:
        try:
            persistent_cache = json.load(file)
        except ValueError:
            if file.tell() > 0:
                raise
            persistent_cache = {}

        cached_versions = persistent_cache.get(browser)
        now = time.mktime(time.gmtime())
        if exc_info:
            if not cached_versions:
                raise exc_info[0], exc_info[1], exc_info[2]

            versions = cached_versions
            if now > versions['fail_silently_until']:
                versions['fail_silently_until'] = now + 60 * 60 * 24
                logging.warning('Failed to get %s versions, falling back to '
                                'cached versions', browser, exc_info=exc_info)
        else:
            # Determine previous version: If we recorded the version before and it
            # changed since then, the old current version becomes the new previous
            # version. If the version didn't change, use the cached previous version.
            current = versions['current']
            previous = None
            if cached_versions:
                cached_current = cached_versions['current']
                if cached_current != current:
                    previous = cached_current
                else:
                    previous = cached_versions['previous']
            versions['previous'] = previous

            # Remove duplicates from unreleased versions. Occasionally,
            # different channels are on the same version, but we want
            # to list each version only once.
            versions['unreleased'] = sorted(
                set(versions['unreleased']) - set(re.sub(r'(\.0*)+$', '', ver) for ver in (current, previous) if ver),
                key=key_by_version
            )

            versions['fail_silently_until'] = now + 60 * 60 * 2
            persistent_cache[browser] = versions

        file.seek(0)
        json.dump(persistent_cache, file)
        file.truncate()

    if not versions['previous']:
        logging.warning("Couldn't determine previous browser version, "
                        'please set %s.previous in %s', browser, filename)

    cache[browser] = versions
    return versions
