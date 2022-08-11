
import base64
import urllib.request, urllib.parse, urllib.error
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
        urllib.parse.quote(base64.b64encode(file_contents))
    )
