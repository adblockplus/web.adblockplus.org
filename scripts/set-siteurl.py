#!/usr/bin/env python3
"""Set the `[general] siteurl` value in settings.ini, in place.

The CMS uses `siteurl` as the canonical base URL when generating pages
(absolute links, `<link rel="canonical">` tags, sitemap entries, etc.). Each
deploy target needs a different base URL, so CI rewrites this one value before
each build: the review preview URL, the staging domain, or the production
domain.

This is a drop-in replacement for the `crudini --set settings.ini general
siteurl <url>` calls the pipeline used to run, so the build image no longer
needs the `crudini` package.

Usage: python scripts/set-siteurl.py <url> [settings.ini]
"""

import configparser
import sys


def set_siteurl(url, path='settings.ini'):
    """Rewrite settings.ini at `path` with `[general] siteurl` set to `url`.

    The whole file is parsed and written back. Two non-default configparser
    settings keep that round-trip lossless for this file:
      - optionxform = str: don't lower-case keys, so locale keys in
        [langnames] such as `es_MX` and `zh_CN` keep their case.
      - encoding='utf-8': preserve the non-ASCII language names in [langnames].

    Raises configparser.NoSectionError if there is no [general] section.
    """
    config = configparser.ConfigParser()
    config.optionxform = str
    config.read(path, encoding='utf-8')
    config.set('general', 'siteurl', url)
    with open(path, 'w', encoding='utf-8') as f:
        config.write(f)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit('usage: set-siteurl.py <url> [settings.ini]')
    set_siteurl(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'settings.ini')
