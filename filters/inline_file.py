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

import base64
import urllib
from mimetypes import MimeTypes

from jinja2 import contextfilter


mime = MimeTypes()


@contextfilter
def inline_file(context, path, mime_type=None):
    if mime_type is None:
        mime_type = mime.guess_type(path)[0]
        if mime_type is None:
            raise ValueError("Unknown mime type for file '%s', please specify." % path)

    source = context["source"]
    for locale in (context["locale"], "en"):
        if source.has_localizable_file(locale, path):
            file_contents = source.read_localizable_file(locale, path)
            break
    else:
        file_contents = source.read_static(path)

    return "data:%s;base64,%s" % (
        mime_type,
        urllib.quote(base64.b64encode(file_contents))
    )
