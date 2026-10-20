

import os
import pytest
import shutil

ROOTPATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@pytest.fixture(scope='session')
def temp_site(tmpdir_factory):
    out_dir = tmpdir_factory.mktemp('temp_out')
    site_dir = out_dir.join('test_site').strpath

    shutil.copytree(os.path.join(ROOTPATH, 'tests', 'test_site'), site_dir)
    yield site_dir


@pytest.fixture
def writable_site(tmpdir):
    """A per-test copy of the test site, safe to corrupt.

    `temp_site` is session-scoped, so tests that mutate the site need this
    instead — otherwise the damage leaks into other tests as order-dependent
    failures.
    """
    site_dir = tmpdir.join('site').strpath

    shutil.copytree(os.path.join(ROOTPATH, 'tests', 'test_site'), site_dir)

    yield site_dir


@pytest.fixture(scope='session')
def temp_site_with_conflicts(tmpdir_factory):
    out_dir = tmpdir_factory.mktemp('temp_out_conflicts')
    site_dir = out_dir.join('test_site').strpath

    shutil.copytree(os.path.join(ROOTPATH, 'tests', 'test_site'), site_dir)
    translate_file = os.path.join(site_dir, 'locales', 'en', 'translate')
    with open(translate_file, 'w') as f:
        f.write('Page with conflicts')

    yield site_dir
