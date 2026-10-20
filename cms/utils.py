# This file is part of the Adblock Plus web scripts,
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

import functools
import re
import json

__all__ = [
    'get_page_params',
    'process_page',
    'split_head_body',
    'extract_page_metadata',
]


def memoize(func):
    """Cache results of functions calls.

    Parameters
    ----------
    func : function
        Function to be cached.

    Returns
    -------
    wrapped : function
        Function that returns the same results as `func`, but only calls `func`
        once for each value of arguments.

    """
    memoized = {}

    @functools.wraps(func)
    def wrapper(*args):
        try:
            return memoized[args]
        except KeyError:
            return memoized.setdefault(args, func(*args))

    wrapper.cache_clear = memoized.clear
    return wrapper


def split_head_body(html):
    """Split HTML page into head and remaining content.

    This is used to pass head and body of the page to the template as two
    separate variables.

    Parameters
    ----------
    html: str
        Source HTML to split.

    Returns
    -------
    (str, str)
        Everything inside of <head> tags found in the page,
        the rest of the page text with <head> tags removed.

    """
    head = []

    def add_to_head(match):
        head.append(match.group(1))
        return ''

    body = re.sub(r'<head>(.*?)</head>', add_to_head, html, flags=re.S)
    return ''.join(head), body


def extract_page_metadata(source):
    """Extract metadata variables from source text of the page.

    Parameters
    ----------
    source: str
        Source text of the page.

    Returns
    -------
    (dict, str)
        Metadata of the page, remaining source text without metadata.

    """
    m = re.search(r'^\s*<!--\s*(.*?)-->', source, re.S)
    text = m.group(1) if m else source

    decoder = json.JSONDecoder()
    try:
        metadata, length = decoder.raw_decode(text)
    except ValueError:
        metadata = None

    if not isinstance(metadata, dict):
        metadata = {}
        length = 0
        for line in text.splitlines(True):
            if not re.search(r'^\s*[\w\-]+\s*=', line):
                break
            name, value = line.split('=', 1)
            value = value.strip()
            if value.startswith('[') and value.endswith(']'):
                value = [element.strip() for element in value[1:-1].split(',')]
            metadata[name.strip()] = value
            length += len(line)

    if length > 0:
        # Need to preserve line numbers for jinja2 tracebacks
        cutoff = m.end() if m else length
        source = '\n' * source.count('\n', 0, cutoff) + source[cutoff:]

    return metadata, source


def get_page_params(source, locale, page, format=None, site_url_override=None,
                    localized_string_callback=None, relative=None):
    from cms.converters import converters

    # Guess page format if omitted, but default to Markdown for friendlier exceptions
    if format is None:
        for format in converters.keys():
            if source.has_page(page, format):
                break
        else:
            format = 'md'

    params = {
        'source': source,
        'template': 'default',
        'locale': locale,
        'page': page,
        'config': source.read_config(),
        'localized_string_callback': localized_string_callback,
        'relative': relative,
    }

    params['localedata'] = source.read_locale(params['locale'], page)
    defaultlocale = params['config'].get('general', 'defaultlocale')
    params['defaultlocale'] = defaultlocale
    params['default_localedata'] = source.read_locale(defaultlocale, page)

    if params['config'].has_option('general', 'siteurl'):
        if site_url_override:
            params['site_url'] = site_url_override
        else:
            params['site_url'] = params['config'].get('general', 'siteurl')

    data, filename = source.read_page(page, format)
    metadata, body = extract_page_metadata(data)
    params['pagedata'] = body, filename
    params.update(metadata)

    params['templatedata'] = source.read_template(params['template'])

    locales = [loc for loc in source.list_locales() if source.has_locale(loc, page)]
    if defaultlocale not in locales:
        locales.append(defaultlocale)
    locales.sort()
    params['available_locales'] = locales

    try:
        converter_class = converters[format]
    except KeyError:
        raise Exception('Page %s uses unknown format %s' % (page, format))

    converter = converter_class(body, filename, params)
    converted = converter()
    params['head'], params['body'] = split_head_body(converted)

    if converter.total_translations > 0:
        params['translation_ratio'] = (
            1 - float(converter.missing_translations) / converter.total_translations
        )
    else:
        params['translation_ratio'] = 1

    return params


def process_page(source, locale, page, format=None, site_url_override=None,
                 localized_string_callback=None, relative=False):
    from cms.converters import TemplateConverter

    params = get_page_params(source, locale, page, format, site_url_override,
                             localized_string_callback)
    params['relative'] = relative
    return TemplateConverter(*params['templatedata'], params=params)()
