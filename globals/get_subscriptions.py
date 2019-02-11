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
import re
import sys
try:
    from urllib import urlopen
    import urlparse
    from ConfigParser import SafeConfigParser
    from os.path import walk as walk_dir
except ImportError:
    from configparser import ConfigParser as SafeConfigParser
    from urllib.request import urlopen
    import urllib.parse as urlparse
    from os import walk as walk_dir

try:
    from sitescripts.subscriptions import subscriptionParser
    subscriptions = None
except ImportError:
    logging.warning("Unable to import sitescripts, proceeding with empty "
                    "subscriptions list.")
    subscriptions = []

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

_STREAMS = {
    'local': open,
    'web': urlopen,
}

_REMOTE_REGEX = re.compile(
    r'^(?:http|ftp)s?://' # http:// or https://
    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|'
    r'[A-Z0-9-]{2,}\.?)|' #domain...
    r'localhost|' #localhost...
    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or iP
    r'(?::\d+)?' # optional port
    r'(?:/?|[/?]\S+)$',
    re.IGNORECASE
)


def _get_location(locations):
    """Read a location.

    The function will look in the following two places, from highest to lowest
    priority:

        1. In the environment variables.
        2. In the website configuration file (i.e. `settings.ini`).
        3. The default value

    Parameters
    ----------
    locations: dict
        Containing the information about where to look for the location.
        It has to have a pre-defined structure, with the following keys:
            - `env`: str
                The name of the environment variable that is expected to hold
                the location we're looking for.
            - `config`: list of str
                Where the first element is the section in the config file,
                while the second is the option for the location.
            - `default`: str
                The default value for the location.

    Returns
    -------
    str
        With the appropriate location.

    """
    config_parser = SafeConfigParser(
        {locations['config'][-1]: locations['default']},
    )
    with open('settings.ini') as settings_stream:
        if sys.version.startswith('2.'):
            config_parser.readfp(_UTF8_READER(settings_stream))
        else:
            # In future versions, the `readfp()` would become deprecated
            # and replaced by `read_file()`.
            config_parser.read_file(_UTF8_READER(settings_stream))

    return os.environ.get(
        locations['env'],
        config_parser.get(*locations['config']),
    )


def _get_and_configure_settings(location, location_type):
    """Read the settings file and configure them accordingly.

    Parameters
    ----------
    location: str
        The url/ local path for the `subscriptionlist` repository.
    location_type: str
        The type of the location. It has to be one of `web` or `local`

    """
    settings_parser = SafeConfigParser()
    stream = _STREAMS[location_type](location)
    try:
        if sys.version.startswith('2.'):
            settings_parser.readfp(_UTF8_READER(stream))
        else:
            # In future versions, the `readfp()` would become deprecated
            # and replaced by `read_file()`.
            settings_parser.read_file(_UTF8_READER(stream))
    except Exception:
        raise
    finally:
        stream.close()
    subscriptionParser.get_settings = lambda: settings_parser


def get_from_web(source_url):
    """Get the subscriptions from a remote repository.

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
    source = urlopen(tar_download_url)
    try:
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
    except Exception:
        raise
    finally:
        source.close()

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

    for file in walk_dir(source_path):
        if not os.path.isfile(file):
            continue
        if os.path.splitext(file)[1] != '.subscription':
            continue
        with open(file) as stream:
            file_data = subscriptionParser.parse_file(
                file, _UTF8_READER(stream)
            )

        if file_data.unavailable:
            continue

        result[file] = file_data

    return result


_GET_SUBSCRIPTIONS = {
    'web': get_from_web,
    'local': get_from_local,
}


def get_subscriptions():
    global subscriptions
    if subscriptions is not None:
        return subscriptions

    orig_get_settings = subscriptionParser.get_settings

    try:
        source = _get_location(_SOURCE_LOCATIONS)
        settings = _get_location(_SETTINGS_LOCATIONS)
        source_type = 'local' if re.match(_REMOTE_REGEX, source) is None \
            else 'web'
        setting_type = 'local' if re.match(_REMOTE_REGEX, settings) is None \
            else 'web'
        _get_and_configure_settings(settings, setting_type)
        subscriptions_dict = _GET_SUBSCRIPTIONS[source_type](source)
    finally:
        subscriptionParser.get_settings = orig_get_settings

    subscriptionParser.calculate_supplemented(subscriptions_dict)
    return subscriptions_dict.values()
