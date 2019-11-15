
import urllib

# This can be removed once we can rely on having at least Jinja2 2.7.


def urlencode(value):
    return urllib.quote(value)
