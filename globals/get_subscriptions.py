# This file is part of the Adblock Plus website,
# Copyright (C) 2006-present eyeo GmbH
#
# Adblock Plus is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as
# published by the Free Software Foundation.
#
# Adblock Plus is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.

from __future__ import unicode_literals

import codecs
import os
import tarfile
import logging
import sys
import contextlib
try:
    from urllib import urlopen
    import urlparse
    from ConfigParser import SafeConfigParser
    import ConfigParser as configparser
except ImportError:
    from configparser import ConfigParser as SafeConfigParser
    from urllib.request import urlopen
    import urllib.parse as urlparse
    import configparser

try:
    from sitescripts.subscriptions import subscriptionParser
    subscriptions = None
except ImportError:
    logging.warning("Unable to import sitescripts, proceeding with empty "
                    "subscriptions list.")
    subscriptions = []

from jinja2 import contextfunction

_UTF8_READER = codecs.getreader('utf8')

_SOURCE_LOCATIONS = {
    'env': 'CMS_SUBSCRIPTIONS_REPO',
    'config': ['general', 'subscriptions_repo'],
    'default': 'https://hg.adblockplus.org/subscriptionlist/',
}

_SETTINGS_LOCATIONS = {
    'env': 'CMS_SUBSCRIPTIONS_SETTINGS',
    'config': ['general', 'subscriptions_settings'],
    'default': 'https://hg.adblockplus.org/subscriptionlist/rawfile/default'
               '/settings',
}


def _get_multi_opener(local_opener, web_opener):
    def opener(url):
        if url.strip().startswith('http://') or url.strip().startswith(
                'https://'):
            return web_opener(url)
        return local_opener(url)
    return opener


def _get_location(cnf, env, config, default):
    """Read a location.

    The function will look in the following two places, from highest to lowest
    priority:

        1. In the environment variables.
        2. In the website configuration file (i.e. `settings.ini`).
        3. The default value

    Parameters
    ----------
        env: str
            The name of the environment variable that is expected to hold
            the location we're looking for.
        config: list of str
            Where the first element is the section in the config file,
            while the second is the option for the location.
        `default`: str
            The default value for the location.

    Returns
    -------
    str
        With the appropriate location.

    """
    """
    config_parser = SafeConfigParser({config[-1]: default})

    with open('settings.ini') as settings_stream:
        if sys.version.startswith('2.'):
            config_parser.readfp(_UTF8_READER(settings_stream))
        else:
            # In future versions, the `readfp()` would become deprecated
            # and replaced by `read_file()`.
            config_parser.read_file(_UTF8_READER(settings_stream))
    """

    try:
        return os.environ.get(env, cnf.get(*config))
    except (configparser.NoOptionError, configparser.NoSectionError):
        return os.environ.get(env, default)


def _get_and_configure_settings(location):
    """Read the settings and configure subscription parser.

    Parameters
    ----------
    location: str
        The url/ local path for the `subscriptionlist` repository.

    """
    settings_parser = SafeConfigParser()
    with _MULTI_OPENER(location) as stream:
        if sys.version.startswith('2.'):
            settings_parser.readfp(_UTF8_READER(stream))
        else:
            # In future versions, the `readfp()` would become deprecated
            # and replaced by `read_file()`.
            settings_parser.read_file(_UTF8_READER(stream))

    subscriptionParser.get_settings = lambda: settings_parser


def get_from_web(source_url):
    """Get the archived subscriptions from a remote repository as a .tgz.

    Parameters
    ----------
    source_url: str
        Url for the remote repository.

    Returns
    -------
    dict (str -> sitescripts.subscriptions.Subscription)
        Mapping subscription names to the corresponding data.

    """
    result = {}
    tar_download_url = urlparse.urljoin(source_url, 'archive/default.tar.gz')
    with contextlib.closing(urlopen(tar_download_url)) as source:
        with tarfile.open(fileobj=source, mode='r|gz') as archive_content:
            for file_info in archive_content:
                if os.path.splitext(file_info.name)[1] != '.subscription':
                    # Ignore the file
                    continue
                file_data = subscriptionParser.parse_file(
                    file_info.name,
                    _UTF8_READER(archive_content.extractfile(file_info)),
                )

                if file_data.unavailable:
                    continue

                result[file_data.name] = file_data

    return result


def get_from_local(source_path):
    """Get the subscriptions from a local repository.

    Parameters
    ----------
    source_path: str
        Path to the local subscriptions repository.

    Returns
    -------
    dict (str -> sitescripts.subscriptions.Subscription)
        Mapping subscription names to the corresponding data.

    """
    result = {}

    for filename in os.listdir(source_path):
        file_path = os.path.join(source_path, filename)
        if not os.path.isfile(file_path):
            continue
        if os.path.splitext(filename)[-1] != '.subscription':
            continue
        with open(file_path) as stream:
            file_data = subscriptionParser.parse_file(
                file_path, _UTF8_READER(stream),
            )

        if file_data.unavailable:
            continue

        result[file_data.name] = file_data
    return result


_GET_SUBSCRIPTIONS = _get_multi_opener(get_from_local, get_from_web)
_MULTI_OPENER = _get_multi_opener(
    open, lambda url: contextlib.closing(urlopen(url)),
)


@contextfunction
def get_subscriptions(context):
    global subscriptions
    if subscriptions is not None:
        return subscriptions

    orig_get_settings = subscriptionParser.get_settings

    try:
        source = _get_location(context['config'], **_SOURCE_LOCATIONS)
        settings = _get_location(context['config'], **_SETTINGS_LOCATIONS)
        _get_and_configure_settings(settings)
        subscriptions_dict = _GET_SUBSCRIPTIONS(source)
    finally:
        subscriptionParser.get_settings = orig_get_settings

    subscriptionParser.calculate_supplemented(subscriptions_dict)
    return subscriptions_dict.values()
