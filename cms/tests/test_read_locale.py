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

import pytest

from cms.sources import FileSource


def write_probe_locale(site_dir, content):
    path = os.path.join(site_dir, 'locales', 'en', 'probe.json')
    with open(path, 'w') as f:
        f.write(content)

    return path


@pytest.mark.parametrize('content', [
    '{"greeting": {"nomessage": "hello"}}',  # object lacking a "message" key
    '{"greeting": "hello"}',                 # flat string instead of an object
])
def test_read_locale_entry_not_a_message_object(writable_site, content):
    """Both malformed entry shapes must name the file, locale and string."""
    write_probe_locale(writable_site, content)

    with pytest.raises(ValueError) as exc:
        FileSource(writable_site).read_locale('en', 'probe')

    message = str(exc.value)
    assert 'must be an object with a "message" key' in message
    # Without these the error isn't actionable — the point of the branch.
    assert '"greeting"' in message
    assert '"en"' in message
    assert 'probe.json' in message


@pytest.mark.parametrize('content', [
    '{not json at all',  # unparseable
    '["greeting"]',      # parseable, but not an object
])
def test_read_locale_invalid_json(writable_site, content):
    write_probe_locale(writable_site, content)

    with pytest.raises(ValueError) as exc:
        FileSource(writable_site).read_locale('en', 'probe')

    assert 'is not a valid JSON object' in str(exc.value)


def test_read_locale_valid(writable_site):
    write_probe_locale(writable_site, '{"greeting": {"message": "hello"}}')

    result = FileSource(writable_site).read_locale('en', 'probe')

    assert result == {'greeting': 'hello'}
