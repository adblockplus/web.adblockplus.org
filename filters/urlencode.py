


# This can be removed once we can rely on having at least Jinja2 2.7.


def urlencode(value):
    import urllib.request, urllib.parse, urllib.error
    return urllib.parse.quote(value)
