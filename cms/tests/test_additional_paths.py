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

import sys
import urllib.request
import urllib.error
import urllib.parse

import pathlib
import pytest
import runpy

from cms.sources import create_source
from .utils import get_dir_contents, run_test_server


PATHS_FRAGMENT_TEMPLATE = """
[paths]
additional-paths = {}
"""

# Expected strings in CMS output:
EXPECTATIONS = [
    # Pages from the main site have priority.
    ('en/filter', 'MAIN_SITE'),
    # Lists of pages from main website and additional paths are merged.
    ('en/map', 'sitemap'),
    ('en/sitemap', 'map'),
    # Pages that have same name but different extensions on main website and
    # additional paths are handled correctly (no conflict and main website
    # should have priority, see https://issues.adblockplus.org/ticket/5862)
    ('en/global', 'MAIN_SITE'),
    ('en/translate', 'MAIN_SITE'),
]


@pytest.fixture(scope='session')
def ap_site(temp_site, tmpdir_factory):
    """A website source that has another website in additional-paths."""
    base_root = pathlib.Path(temp_site)
    base_pages = base_root / 'pages'

    ap_root = tmpdir_factory.mktemp('ap_site')
    ap_root.join('settings.ini').write(
        (base_root / 'settings.ini').read_text()
        + PATHS_FRAGMENT_TEMPLATE.format(base_root),
    )

    pages = ap_root.mkdir('pages')
    for file_name in ['filter.tmpl', 'global.md', 'translate.tmpl']:
        pages.join(file_name).write('MAIN_SITE')
    pages.join('map.tmpl').write((base_pages / 'sitemap.tmpl').read_text())
    return ap_root


@pytest.fixture(scope='session')
def ap_static_output(tmpdir_factory, ap_site):
    """Generate website from two source directories, return output path."""
    out_path = tmpdir_factory.mktemp('ap_out')
    saved_argv = sys.argv
    sys.argv = ['', ap_site.strpath, out_path.strpath]
    runpy.run_module('cms.bin.generate_static_pages', run_name='__main__')
    yield get_dir_contents(out_path.strpath)
    sys.argv = saved_argv


@pytest.fixture(scope='module')
def dynamic_server(ap_site):
    """Run CMS test server and returns its URL."""
    with run_test_server(ap_site.strpath) as ts:
        yield ts


@pytest.mark.parametrize('page_name,expectation', EXPECTATIONS)
def test_ap_static(ap_static_output, page_name, expectation):
    assert expectation in ap_static_output[page_name]


@pytest.mark.parametrize('page_name,expectation', EXPECTATIONS)
def test_dynamic(dynamic_server, page_name, expectation):
    response = urllib.request.urlopen(dynamic_server + page_name)
    assert expectation.encode('utf-8') in response.read()


def test_create_source(tmpdir):
    """Create a hierarchy of multi-sources testing different config options."""
    one = tmpdir.mkdir('one')
    two = tmpdir.mkdir('two')
    three = tmpdir.mkdir('three')
    four = two.mkdir('four')

    one_ap = '\n    {}\n    {}'.format(two.strpath, '../three')
    one.join('settings.ini').write(PATHS_FRAGMENT_TEMPLATE.format(one_ap))
    one.join('one').write('')

    two.join('settings.ini').write(PATHS_FRAGMENT_TEMPLATE.format('four'))
    two.join('two').write('')

    three.join('three').write('')

    four.join('four').write('')
    four.join('settings.ini').write('[paths]')

    source = create_source(one.strpath)

    for name in ['one', 'two', 'three', 'four']:
        assert source.has_file(name)
