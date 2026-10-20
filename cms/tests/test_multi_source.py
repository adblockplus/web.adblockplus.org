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

from cms.sources import Source, MultiSource


class FakeSource(Source):
    """Fake source object used for testing."""

    def __init__(self, name, files, cache_dir='cache', version=None):
        self.log = []
        self._name = name
        self._files = files
        self._cache_dir = cache_dir
        if version is not None:
            self.version = version

    def __enter__(self):
        self.log.append('enter')
        return self

    def __exit__(self, exc_type, exc_value, tb):
        self.log.append('exit: {} {}'.format(exc_type, exc_value))
        return False

    def close(self):
        self.log.append('close')

    def has_file(self, filename):
        return filename in self._files

    def read_file(self, filename, binary=False):
        data = self._files[filename]
        if binary:
            data = data.encode('utf-8')
        return data, '{}:{}'.format(self._name, filename)

    def list_files(self, subdir):
        if subdir and not subdir.endswith('/'):
            subdir += '/'
        return [fn for fn in self._files if fn.startswith(subdir)]

    def get_cache_dir(self):
        return self._cache_dir


@pytest.fixture
def base_sources():
    return [
        FakeSource('foo', {'a': 'b', 'c': 'd', 'a/b/c': 'c'}, version='42'),
        FakeSource('bar', {'b': 'b', 'c': 'c', 'a/d': 'd'}, cache_dir='oops'),
    ]


@pytest.fixture
def multi_source(base_sources):
    return MultiSource(base_sources)


def test_lifecycle(multi_source, base_sources):
    with multi_source as ms:
        ms.close()
    for bs in base_sources:
        assert bs.log == ['enter', 'close', 'exit: None None']


def test_lifecycle_error(multi_source, base_sources):
    with pytest.raises(Exception):
        with multi_source:
            raise Exception('42')
    for bs in base_sources:
        assert bs.log[-1] == "exit: <class 'Exception'> 42"


def test_has_file(multi_source):
    assert multi_source.has_file('a')
    assert multi_source.has_file('b')
    assert not multi_source.has_file('d')


def test_read_file(multi_source):
    assert multi_source.read_file('a') == ('b', 'foo:a')
    assert multi_source.read_file('b') == ('b', 'bar:b')
    assert multi_source.read_file('c') == ('d', 'foo:c')


def test_read_binary(multi_source):
    assert isinstance(multi_source.read_file('a', True)[0], type(b'b'))


def test_list_files(multi_source):
    assert sorted(multi_source.list_files('')) == ['a', 'a/b/c', 'a/d', 'b',
                                                   'c']
    assert sorted(multi_source.list_files('a')) == ['a/b/c', 'a/d']
    assert sorted(multi_source.list_files('a/')) == ['a/b/c', 'a/d']


def test_version(base_sources):
    assert MultiSource(base_sources).version == '42'
    with pytest.raises(AttributeError):
        MultiSource(list(reversed(base_sources))).version


def test_cache_dir(multi_source):
    assert multi_source.get_cache_dir() == 'cache'
