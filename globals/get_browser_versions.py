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

CHROME_UPDATE_XML = '''\
<?xml version="1.0" encoding="UTF-8"?>
<request protocol="3.0" ismachine="0">
  <os platform="win" version="99" arch="x64"/>
  <app appid="{4DC8B4CA-1BDA-483E-B5FA-D3C12E15B62D}">
    <updatecheck/>
  </app>
  <app appid="{4DC8B4CA-1BDA-483E-B5FA-D3C12E15B62D}" ap="x64-beta-multi-chrome">
    <updatecheck/>
  </app>
  <app appid="{4DC8B4CA-1BDA-483E-B5FA-D3C12E15B62D}" ap="x64-dev-multi-chrome">
    <updatecheck/>
  </app>
</request>'''

cache = {}


def get_mozilla_version(product, origin_version, channel,
                        minor=False, subdomain='aus4', origin_build='-',
                        attribute='appVersion', platform='WINNT_x86-msvc'):
    response = urllib.urlopen('https://%s.mozilla.org/update/3/%s/%s/%s/%s/en-US/%s/-/default/default/update.xml?force=1' % (
        subdomain,
        product,
        origin_version,
        origin_build,
        platform,
        channel
    ))
    try:
        doc = minidom.parse(response)
    finally:
        response.close()

    updates = doc.getElementsByTagName('update')
    if not updates:
        raise Exception('No updates for %s in %s channel' % (product, channel))
    full_version = updates[0].getAttribute(attribute)

    match = re.search(r'^(\d+)(?:\.\d+)?', full_version)
    if minor:
        return match.group(0)
    return match.group(1)


def get_mozilla_versions(product, origin_version, release_minor=False):
    return {
        'current': get_mozilla_version(product, origin_version, 'release', release_minor),
        'unreleased': [
            get_mozilla_version(product, origin_version, 'beta'),
            get_mozilla_version(product, origin_version, 'aurora'),
            get_mozilla_version(product, origin_version, 'nightly'),
        ]
    }

BROWSERS['firefox'] = lambda: get_mozilla_versions('Firefox', '37.0')
BROWSERS['thunderbird'] = lambda: get_mozilla_versions('Thunderbird', '31.0', True)


def get_seamonkey_version(origin_version, origin_build, channel, **kw):
    return get_mozilla_version('SeaMonkey', origin_version, channel, True,
                               'aus2-community', origin_build, 'version', **kw)


def get_seamonkey_versions():
    versions = {
        'current': get_seamonkey_version('2.32', '20150112201917', 'release'),
        'unreleased': [get_seamonkey_version('2.32', '20150101215737', 'beta')]
    }

    # Aurora and Nightly builds for Windows are permantently broken.
    # Occasionally, builds for other platforms are broken as well.
    # https://bugzilla.mozilla.org/show_bug.cgi?id=1086553
    for channel in ('aurora', 'nightly'):
        try:
            version = get_seamonkey_version('2.32', '-', channel, platform='Linux_x86-gcc3')
        except Exception:
            continue
        versions['unreleased'].append(version)

    return versions

BROWSERS['seamonkey'] = get_seamonkey_versions


def get_chrome_version(manifest):
    return manifest.getAttribute('version').split('.')[0]


def get_chrome_versions():
    response = urllib.urlopen('https://tools.google.com/service/update2', CHROME_UPDATE_XML)
    try:
        doc = minidom.parse(response)
    finally:
        response.close()

    manifests = doc.getElementsByTagName('manifest')
    return {
        'current': get_chrome_version(manifests[0]),
        'unreleased': map(get_chrome_version, manifests[1:])
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
