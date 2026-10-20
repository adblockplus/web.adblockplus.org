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

import json
import os

import pytest

from cms.bin.generate_static_pages import generate_pages

PROBE_PAGE = 'title=Probe\n\n{{{{ get_string("{}", "global") }}}}\n'


@pytest.fixture
def target_dir_with_file(tmpdir):
    target_dir = tmpdir.mkdir('out_file').strpath
    os.mkdir(os.path.join(target_dir, 'en'))

    with open(os.path.join(target_dir, 'en', 'foo'), 'w') as f:
        f.write('test\n')

    yield target_dir


@pytest.fixture
def target_dir_with_dir(tmpdir):
    target_dir = tmpdir.mkdir('out_dir').strpath
    os.makedirs(os.path.join(target_dir, 'en', 'translate'))

    yield target_dir


@pytest.fixture
def target_dir_with_fifo(tmpdir):
    target_dir = tmpdir.mkdir('out_dir').strpath
    os.mkdir(os.path.join(target_dir, 'en'))
    os.mkfifo(os.path.join(target_dir, 'en', 'translate'))

    yield target_dir


def write_probe_page(site_dir, string_name):
    with open(os.path.join(site_dir, 'pages', 'probe.tmpl'), 'w') as f:
        f.write(PROBE_PAGE.format(string_name))


@pytest.fixture
def site_with_unknown_string(writable_site):
    """Probe page asking for a string id that exists in no locale file."""
    write_probe_page(writable_site, 'no-such-key')

    yield writable_site


@pytest.fixture
def site_with_empty_string(writable_site):
    """Probe page asking for a string whose message value is empty."""
    locale_file = os.path.join(writable_site, 'locales', 'en', 'global.json')
    with open(locale_file) as f:
        localedata = json.load(f)

    localedata['empty-key'] = {'message': ''}
    with open(locale_file, 'w') as f:
        json.dump(localedata, f)

    write_probe_page(writable_site, 'empty-key')

    yield writable_site


def test_generate_unknown_string(site_with_unknown_string, tmpdir):
    """A string id absent from every locale must name itself and its page."""
    with pytest.raises(Exception) as exp:
        generate_pages(site_with_unknown_string, tmpdir.mkdir('out').strpath)

    # Asserting on content, not just the type: the pre-fix failure was also an
    # Exception (TypeError), just an unactionable one.
    assert 'no-such-key' in str(exp.value)
    assert 'probe' in str(exp.value)


def test_generate_empty_string_value(site_with_empty_string, tmpdir):
    """An empty message value is legitimate and must not read as missing."""
    target_dir = tmpdir.mkdir('out').strpath

    generate_pages(site_with_empty_string, target_dir)

    assert os.path.isfile(os.path.join(target_dir, 'en', 'probe'))


def test_generate_dir_instead_of_file(temp_site, target_dir_with_file):
    """Case where a file from previous version becomes a directory."""
    generate_pages(str(temp_site), str(target_dir_with_file))

    assert os.path.isdir(os.path.join(target_dir_with_file, 'en', 'foo'))


def test_generate_file_instead_of_dir(temp_site, target_dir_with_dir):
    """Case where a directory from previous version becomes a file."""
    generate_pages(str(temp_site), str(target_dir_with_dir))

    assert os.path.isfile(os.path.join(target_dir_with_dir, 'en', 'translate'))


def test_generate_fifo_instead_of_file(temp_site, target_dir_with_fifo):
    """Case with an unsupported item encountered (FIFO)."""
    with pytest.raises(Exception) as exp:
        generate_pages(str(temp_site), str(target_dir_with_fifo))

    assert 'It is neither a file, nor a directory!' in str(exp.value)
