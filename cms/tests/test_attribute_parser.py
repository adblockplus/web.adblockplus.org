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

import pytest

from cms.converters import AttributeParser, Converter

# Use the production whitelist rather than a copy, so these tests track it.
WHITELIST = Converter.whitelist

CHARREF_TEXT = 'a &amp; b &#39;c&#39;'
CHARREF_EXPECTED = "a & b 'c'"


class DispatchingParser(AttributeParser):
    """Parser that actually dispatches the entityref/charref handlers.

    The shipped parser sets `convert_charrefs=True`, which makes those handlers
    unreachable (see `test_charrefs_converted_inline_by_default`). This subclass
    is the only way to exercise them.
    """

    def __init__(self, whitelist):
        super().__init__(whitelist)
        self.convert_charrefs = False


class TripwireParser(AttributeParser):
    """Records whether the entityref/charref handlers are ever dispatched."""

    def __init__(self, whitelist):
        super().__init__(whitelist)
        self.dispatched = []

    def handle_entityref(self, name):
        self.dispatched.append(('entityref', name))

    def handle_charref(self, name):
        self.dispatched.append(('charref', name))


def test_charref_handlers_resolve_references():
    """Both handlers must resolve references, not raise.

    `HTMLParser.unescape()` was removed in Python 3.9, so the original
    `self.unescape(...)` raised AttributeError whenever these were reached.
    """
    result, _, _ = DispatchingParser(WHITELIST).parse(CHARREF_TEXT, 'probe')

    assert result == CHARREF_EXPECTED


def test_charrefs_converted_inline_by_default():
    """Pins the reachability claim the handlers' comment depends on.

    If this fails the handlers have become live, and their behaviour — not just
    their correctness — starts to matter.
    """
    parser = TripwireParser(WHITELIST)

    result, _, _ = parser.parse(CHARREF_TEXT, 'probe')

    assert result == CHARREF_EXPECTED
    assert parser.dispatched == []


@pytest.mark.parametrize('tag', [
    'script', 'style', 'xmp', 'iframe', 'noembed', 'noframes', 'textarea',
    'title', 'plaintext',
])
def test_cdata_tags_rejected(tag):
    """CDATA/RCDATA tags are what would make the handlers reachable.

    handle_starttag runs before set_cdata_mode, so rejecting these is what keeps
    the parser out of CDATA mode entirely.
    """
    with pytest.raises(Exception) as exp:
        AttributeParser(WHITELIST).parse('<{0}>&amp;</{0}>'.format(tag), 'probe')

    assert "Unexpected HTML tag '{}'".format(tag) in str(exp.value)
