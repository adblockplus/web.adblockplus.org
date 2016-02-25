# This file is part of the Adblock Plus website,
# Copyright (C) 2006-2016 Eyeo GmbH
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

import codecs
import os
import tarfile
import urllib
import logging
from ConfigParser import SafeConfigParser

def get_subscriptions(_):
  try:
    from sitescripts.subscriptions import subscriptionParser
  except ImportError:
    logging.warning("Unable to import sitescripts, proceeding with empty "
                    "subscriptions list.")
    return []

  result = {}
  utf8_reader = codecs.getreader('utf8')
  source = urllib.urlopen("https://hg.adblockplus.org/subscriptionlist/archive/default.tar.gz")
  orig_get_settings = subscriptionParser.get_settings
  try:
    # Hack: monkey-patch subscriptionParser.get_settings()
    settings = SafeConfigParser()
    settings_handle = urllib.urlopen("https://hg.adblockplus.org/subscriptionlist/rawfile/default/settings")
    try:
      settings.readfp(utf8_reader(settings_handle))
    finally:
      settings_handle.close()
    subscriptionParser.get_settings = lambda: settings

    with tarfile.open(fileobj=source, mode="r|gz") as archive:
      for fileinfo in archive:
        if os.path.splitext(fileinfo.name)[1] != ".subscription":
          continue

        filedata = subscriptionParser.parse_file(fileinfo.name, utf8_reader(archive.extractfile(fileinfo)))
        if filedata.unavailable:
          continue

        result[filedata.name] = filedata
  finally:
    source.close()
    subscriptionParser.get_settings = orig_get_settings

  subscriptionParser.calculate_supplemented(result)
  return result.values()
