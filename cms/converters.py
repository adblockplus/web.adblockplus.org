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


import os
import html.parser
import re
import urllib.parse
from posixpath import relpath

import jinja2
import markdown
import markupsafe

from cms import utils

# Monkey-patch Markdown's is_block_level function to ensure that no paragraphs
# are inserted into the <head> tag
orig_is_block_level = markdown.Markdown.is_block_level


def is_block_level(self, tag):
    if tag == 'head':
        return True
    return orig_is_block_level(self, tag)


markdown.Markdown.is_block_level = is_block_level

html_escapes = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;',
}


class AttributeParser(html.parser.HTMLParser):
    _string = None
    _inside_fixed = False
    _fixed_strings = None
    _attrs = None

    def __init__(self, whitelist):
        super().__init__(convert_charrefs=True)
        self._whitelist = whitelist

    def parse(self, text, pagename):
        self.reset()
        self._string = []
        self._fixed_strings = []
        self._inside_fixed = False
        self._attrs = {}
        self._pagename = pagename

        # Force-escape ampersands, otherwise the parser will autocomplete bogus
        # entities.
        text = re.sub(r'&(?!\S+;)', '&amp;', text)

        try:
            self.feed(text)
            return (''.join(self._string),
                    self._attrs, [''.join(s) for s in self._fixed_strings])
        finally:
            self._string = None
            self._attrs = None
            self._pagename = None
            self._inside_fixed = False
            self._fixed_strings = None

    def handle_starttag(self, tag, attrs):
        if self._inside_fixed:
            raise Exception("Unexpected HTML tag '{}' inside a fixed string"
                            ' on page {}'.format(tag, self._pagename))
        elif tag == 'fix':
            self._inside_fixed = True
            self._fixed_strings.append([])
        elif tag in self._whitelist:
            self._attrs.setdefault(tag, []).append(attrs)
            self._string.append('<{}>'.format(tag))
        else:
            raise Exception("Unexpected HTML tag '{}' inside a fixed string"
                            ' on page {}'.format(tag, self._pagename))

    def handle_endtag(self, tag):
        if tag == 'fix':
            self._string.append('{{{}}}'.format(len(self._fixed_strings)))
            self._inside_fixed = False
        else:
            self._string.append('</{}>'.format(tag))

    def _append_text(self, s):
        if self._inside_fixed:
            self._fixed_strings[-1].append(s)
        else:
            self._string.append(s)

    def handle_data(self, data):
        # Note: lack of escaping here is intentional. The result is a locale
        # string, HTML escaping is applied when this string is inserted into
        # the document.
        self._append_text(data)

    # Unreachable while convert_charrefs is True (charrefs are converted inline,
    # and CDATA mode needs a tag handle_starttag rejects) — but kept correct so a
    # whitelist or flag change doesn't silently drop character references.
    def handle_entityref(self, name):
        self._append_text(html.unescape('&{};'.format(name)))

    def handle_charref(self, name):
        self._append_text(html.unescape('&#{};'.format(name)))


class Converter:
    whitelist = {'a', 'em', 'sup', 'strong', 'code', 'span', 'small', 'abbr', 'img'}
    missing_translations = 0
    total_translations = 0

    def __init__(self, data, filename, params):
        self._data = data
        self._filename = filename
        self._params = params
        self._attribute_parser = AttributeParser(self.whitelist)
        self._seen_defaults = {}

    @utils.memoize
    def _get_locale_data(self, page, locale=None):
        if locale is None:
            locale = self._params['locale']
        return self._params['source'].read_locale(locale, page)

    def localize_string(self, page, name, default, comment,
                        escapes, default_required=True):
        """Return translation for a string.

        Parameters
        ----------
        page : str
            Name of the page (to pick the translation file).
        name : str
            Name of the translation string (a.k.a. translation string id).
        default : str
            Default value to use if the translation is not found. This
            typically comes from the page source.
        comment : str
            Comment for the translation string in the page source. This is
            passed to `self._params['localized_string_callback']` but otherwise
            ignored.
        escapes : dict
            Characters that should be escaped and their escaped values
            appropriate for the output format.
        default_required : bool
            If this is true (default) and `default` is empty or None, and we
            haven't seen the same string name before on the page, and the
            default is not provided by the default locale translation file,
            an exception will be thrown.

        Returns
        -------
        localized_string : str
            Localized string or default value.

        Raises
        ------
        Exception
            If the default is required but cannot be obtained.

        """
        def escape(s):
            return ''.join(escapes.get(c, c) for c in s)

        def re_escape(s):
            return re.escape(escape(s))

        locale = self._params['locale']
        localedata = self._get_locale_data(page, locale)
        defaultlocale = self._params['defaultlocale']
        default_localedata = self._get_locale_data(page, defaultlocale)

        if default:
            # The default is provided in the page: remember it, in case the
            # same string name is used again in this page.
            self._seen_defaults[(page, name)] = (default, comment)
        elif (page, name) in self._seen_defaults:
            # No default provided but we have seen this string name earlier in
            # the page: reuse previous default.
            default, comment = self._seen_defaults[(page, name)]
        else:
            # No default and no memory: try to get string value from default
            # locale translation file (see
            # https://issues.adblockplus.org/ticket/6928 for more info).
            default = default_localedata.get(name, None)

        if not default and default_required:
            raise Exception('Default text not provided for string {} on page '
                            '{}'.format(name, page))

        if default is None:
            # Reached via get_string(), which passes default_required=False: the
            # string id is in neither locale. Test for None, not falsiness — an
            # empty message value is legitimate and must keep working. `page` is
            # the locale section here, so name the rendering page separately.
            raise Exception('No text found for string "{}" in section "{}" '
                            '(locale {} or default {}), referenced by page '
                            '"{}"'.format(name, page, locale, defaultlocale,
                                          self._params['page']))

        full_default = default
        # Extract tag attributes from default string
        default, saved_attributes, fixed_strings = (
            self._attribute_parser.parse(default, self._params['page']))

        # Get translation
        if locale == defaultlocale:
            result = default
        elif name in localedata:
            result = localedata[name].strip()
            # If the string is present in default locale, but not in the
            # current one, we will get the value from default locale here.
            # If it happens to contain attributes on any tags, those need
            # to be stripped, otherwise the attribute substitution below won't
            # work. Luckily, we already have the default translation string
            # with attributes stripped -- it's the value of `default`.
            if result == full_default.strip():
                result = default
        else:
            result = default
            self.missing_translations += 1
        self.total_translations += 1

        # Perform callback with the string if required, e.g. for the
        # translations script
        callback = self._params['localized_string_callback']
        if callback:
            callback(page, locale, name, result, comment, fixed_strings)

        # Insert fixed strings
        for i, fixed_string in enumerate(fixed_strings, 1):
            result = result.replace('{{{}}}'.format(i), fixed_string)

        # Insert attributes
        result = escape(result)

        def stringify_attribute(name, value):
            return '{}="{}"'.format(
                escape(name),
                escape(self.insert_localized_strings(value, {})),
            )

        for tag in self.whitelist:
            allowed_contents = '(?:[^<>]|{})'.format('|'.join(
                '<(?:{}[^<>]*?|/{})>'.format(t, t)
                for t in map(re.escape, self.whitelist - {tag})
            ))
            saved = saved_attributes.get(tag, [])
            for attrs in saved:
                attrs = [stringify_attribute(*attr) for attr in attrs]
                result = re.sub(
                    r'{}({}*?){}'.format(re_escape('<{}>'.format(tag)),
                                         allowed_contents,
                                         re_escape('</{}>'.format(tag))),
                    lambda match: r'<{}{}>{}</{}>'.format(
                        tag,
                        ' ' + ' '.join(attrs) if attrs else '',
                        match.group(1),
                        tag,
                    ),
                    result, 1, flags=re.S,
                )
            result = re.sub(
                r'{}({}*?){}'.format(re_escape('<{}>'.format(tag)),
                                     allowed_contents,
                                     re_escape('</{}>'.format(tag))),
                r'<{}>\1</{}>'.format(tag, tag),
                result, flags=re.S,
            )
        return result

    def insert_localized_strings(self, text, escapes, to_html=lambda s: s):
        def lookup_string(match):
            name, comment, default = match.groups()
            if default:
                default = to_html(default).strip()
            return self.localize_string(self._params['page'], name, default,
                                        comment, escapes)

        return re.sub(
            r'{{\s*'
            r'([\w\-]+)'  # String ID
            r'(?:(?:\[(.*?)\])?'  # Optional comment
            r'\s+'
            r'((?:(?!{{).|'  # Translatable text
            r'{{(?:(?!}}).)*}}'  # Nested translation
            r')*?)'
            r')?'
            r'}}',
            lookup_string,
            text,
            flags=re.S,
        )

    def process_links(self, text):
        def make_relative(base_url, target):
            if not target.startswith('/'):
                # Links to an external resource
                return target
            return relpath(target, base_url.rsplit('/', 1)[0])

        def process_link(match):
            pre, attr, url, post = match.groups()
            url = markupsafe.Markup(url).unescape()

            locale, new_url = self._params['source'].resolve_link(
                url, self._params['locale'], self._params['page'],
            )

            if new_url is not None:
                url = new_url
                if attr == 'href':
                    post += ' hreflang="{}"'\
                        .format(markupsafe.Markup.escape(locale))

            if self._params['relative']:
                current_page = '/{}/{}'.format(self._params['locale'],
                                               self._params['page'])
                url = make_relative(current_page, url)

            return ''.join((pre, markupsafe.Markup.escape(url), post))

        text = re.sub(r'(<[\w]+\s[^<>]*\b(href|src)=\")([^<>\"]+)(\")',
                      process_link, text)
        return text

    include_start_regex = '<'
    include_end_regex = '>'

    def resolve_includes(self, text):
        def resolve_include(match):
            name = match.group(1)
            for format_, converter_class in converters.items():
                if self._params['source'].has_include(name, format_):
                    data, filename = (
                        self._params['source'].read_include(name, format_))

                    # XXX: allowing includes to modify params of the whole page
                    # seems like a bad idea but we have to support this because
                    # it's used by www.adblockplus.org.
                    metadata, rest = utils.extract_page_metadata(data)
                    self._params.update(metadata)

                    converter = converter_class(rest, filename, self._params)
                    result = converter()
                    self.missing_translations += converter.missing_translations
                    self.total_translations += converter.total_translations
                    return result
            raise Exception('Failed to resolve include {}'
                            ' on page {}'.format(name, self._params['page']))

        return re.sub(
            r'{}\?\s*include\s+([^\s<>"]+)\s*\?{}'.format(
                self.include_start_regex,
                self.include_end_regex,
            ),
            resolve_include,
            text,
        )

    def __call__(self):
        result = self.get_html(self._data, self._filename)
        return self.resolve_includes(result)


class RawConverter(Converter):
    def get_html(self, source, filename):
        result = self.insert_localized_strings(source, html_escapes)
        result = self.process_links(result)
        return result


class MarkdownConverter(Converter):
    include_start_regex = r'(?:{}|{})'.format(
        Converter.include_start_regex,
        re.escape(markupsafe.escape(Converter.include_start_regex)),
    )
    include_end_regex = r'(?:{}|{})'.format(
        Converter.include_end_regex,
        re.escape(markupsafe.escape(Converter.include_end_regex)),
    )

    def get_html(self, source, filename):
        def remove_unnecessary_entities(match):
            char = chr(int(match.group(1)))
            if char in html_escapes:
                return match.group(0)
            return char

        escapes = {}
        md = markdown.Markdown(output='html5', extensions=[
            'markdown.extensions.extra',
        ])
        for char in md.ESCAPED_CHARS:
            escapes[char] = '&#{};'.format(str(ord(char)))
        for key, value in html_escapes.items():
            escapes[key] = value

        md.preprocessors['html_block'].markdown_in_raw = True

        def to_html(s):
            return re.sub(r'</?p>', '', md.convert(s))

        result = self.insert_localized_strings(source, escapes, to_html)
        result = md.convert(result)
        result = re.sub(r'&#(\d+);', remove_unnecessary_entities, result)
        result = self.process_links(result)
        return result


class SourceTemplateLoader(jinja2.BaseLoader):
    def __init__(self, source):
        self.source = source

    def get_source(self, environment, template):
        try:
            result = self.source.read_file(template + '.tmpl')
        except Exception:
            raise jinja2.TemplateNotFound(template)
        return result + (None,)


class TemplateConverter(Converter):
    def __init__(self, *args, **kwargs):
        Converter.__init__(self, *args, **kwargs)

        filters = {
            'translate': self.translate,
            'linkify': self.linkify,
            'toclist': self.toclist,
        }

        globals = {
            'get_string': self.get_string,
            'has_string': self.has_string,
            'get_page_content': self.get_page_content,
            'get_pages_metadata': self.get_pages_metadata,
            'get_canonical_url': self.get_canonical_url,
            'get_page_url': self.get_page_url,
            'page_has_locale': self.page_has_locale,
        }

        for dirname, dictionary in [('filters', filters),
                                    ('globals', globals)]:
            for filename in self._params['source'].list_files(dirname):
                root, ext = os.path.splitext(filename)
                if ext.lower() != '.py':
                    continue

                path = os.path.join(dirname, filename)
                namespace = self._params['source'].exec_file(path)

                name = os.path.basename(root)
                try:
                    dictionary[name] = namespace[name]
                except KeyError:
                    raise Exception('Expected symbol {} not found'
                                    ' in {}'.format(name, path))

        self._env = jinja2.Environment(
            loader=SourceTemplateLoader(self._params['source']),
            autoescape=True)
        self._env.filters.update(filters)
        self._env.globals.update(globals)

    def get_html(self, source, filename):
        env = self._env
        code = env.compile(source, None, filename)
        template = jinja2.Template.from_code(env, code, env.globals)

        try:
            module = template.make_module(self._params)
        except Exception:
            env.handle_exception()

        for key, value in module.__dict__.items():
            if not key.startswith('_'):
                self._params[key] = value

        result = str(module)
        result = self.process_links(result)
        return result

    def translate(self, default, name, comment=None):
        return markupsafe.Markup(self.localize_string(
            self._params['page'], name, default, comment, html_escapes,
        ))

    def get_string(self, name, page=None):
        if page is None:
            page = self._params['page']

        return markupsafe.Markup(self.localize_string(
            page, name, None, '', html_escapes, default_required=False,
        ))

    def has_string(self, name, page=None):
        if page is None:
            page = self._params['page']

        localedata = self._get_locale_data(page)
        return name in localedata

    def get_page_content(self, page, locale=None):
        if locale is None:
            locale = self._params['locale']
        return utils.get_page_params(self._params['source'], locale, page)

    def linkify(self, page, locale=None, **attrs):
        if locale is None:
            locale = self._params['locale']

        locale, url = self._params['source'].resolve_link(page, locale,
                                                          self._params['page'])
        return markupsafe.Markup('<a{}>'.format(''.join(
            ' {}="{}"'.format(name, markupsafe.escape(value)) for name, value in [
                ('href', url),
                ('hreflang', locale.replace("_", "-")),
            ] + list(attrs.items())
        )))

    def get_pages_metadata(self, filters=None):
        if filters is not None and not isinstance(filters, dict):
            raise TypeError('Filters are not a dictionary')

        return_data = []
        for page_name, _format in self._params['source'].list_pages():
            data, filename = self._params['source'].read_page(page_name,
                                                              _format)
            page_data = utils.extract_page_metadata(data)[0]
            page_data.setdefault('page', page_name)
            if self.filter_metadata(filters, page_data) is True:
                return_data.append(page_data)
        return return_data

    def filter_metadata(self, filters, metadata):
        if filters is None:
            return True
        for filter_name, filter_value in list(filters.items()):
            if filter_name not in metadata:
                return False
            if isinstance(metadata[filter_name], list):
                if isinstance(filter_value, str):
                    filter_value = [filter_value]
                for option in filter_value:
                    if str(option) not in metadata[filter_name]:
                        return False
            elif filter_value != metadata[filter_name]:
                return False
        return True

    def get_canonical_url(self, page):
        """Return canonical URL for the page (without locale code)"""
        try:
            base_url = self._params['site_url']
        except KeyError:
            raise Exception('You must configure `siteurl` to use'
                            '`get_canonical_url()`')

        locale, page_url = self._params['source'].resolve_link(
            page, self._params['locale'], self._params['page'],
        )
        # Remove the locale component that `resolve_link` adds at the
        # beginning.
        page_url = page_url[len(locale) + 1:]
        return urllib.parse.urljoin(base_url, page_url)

    def toclist(self, content):
        toc_re = r'<h(\d)\s[^<>]*\bid="([^<>"]+)"[^<>]*>(.*?)</h\1>'
        flat = []
        for match in re.finditer(toc_re, content, re.S):
            flat.append({
                'level': int(match.group(1)),
                'anchor': markupsafe.Markup(match.group(2)).unescape(),
                'title': markupsafe.Markup(match.group(3)).unescape(),
                'subitems': [],
            })

        structured = []
        stack = [{'level': 0, 'subitems': structured}]
        for item in flat:
            while stack[-1]['level'] >= item['level']:
                stack.pop()
            stack[-1]['subitems'].append(item)
            stack.append(item)
        return structured

    def page_has_locale(self, page, locale):
        return self._params['source'].has_locale(locale, page)

    def get_page_url(self, page, locale=None, redirect=False):
        if not locale:
            locale = self._params['locale']
        if self.page_has_locale(page, locale) or redirect:
            return self._params['source'].resolve_link(page, locale,
                                                       self._params['page'])[1]
        raise Exception('{} does not exist in {}'.format(page, locale))


converters = {
    'html': RawConverter,
    'md': MarkdownConverter,
    'tmpl': TemplateConverter,
}
