"""Tests for scripts/set-siteurl.py (the crudini replacement used in CI)."""

import configparser
import importlib.util
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT = REPO_ROOT / 'scripts' / 'set-siteurl.py'


def _load_set_siteurl():
    # The script's filename contains a hyphen, so it can't be imported by name;
    # load it from its path instead.
    spec = importlib.util.spec_from_file_location('set_siteurl', SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.set_siteurl


set_siteurl = _load_set_siteurl()


def _write_settings(tmp_path, text):
    path = tmp_path / 'settings.ini'
    path.write_text(text, encoding='utf-8')
    return path


def _read(path):
    config = configparser.ConfigParser()
    config.optionxform = str
    config.read(path, encoding='utf-8')
    return config


def test_replaces_existing_siteurl(tmp_path):
    path = _write_settings(
        tmp_path,
        '[general]\nsiteurl = https://adblockplus.org\ndefaultlocale = en\n',
    )

    set_siteurl('https://staging.adblockplus.dev/', str(path))

    config = _read(path)
    assert config.get('general', 'siteurl') == 'https://staging.adblockplus.dev/'
    # unrelated keys are left untouched
    assert config.get('general', 'defaultlocale') == 'en'


def test_adds_siteurl_when_absent(tmp_path):
    path = _write_settings(tmp_path, '[general]\ndefaultlocale = en\n')

    set_siteurl('https://adblockplus.org', str(path))

    assert _read(path).get('general', 'siteurl') == 'https://adblockplus.org'


def test_preserves_unicode_and_locale_key_case(tmp_path):
    # optionxform = str + utf-8 must keep both the case of keys like es_MX/zh_CN
    # and their non-ASCII values intact (regression guard for the langnames section).
    path = _write_settings(
        tmp_path,
        '[general]\nsiteurl = https://old.example\n\n'
        '[langnames]\nar = العربية\nes_MX = Español (México)\nzh_CN = 中文(简体)\n',
    )

    set_siteurl('https://new.example', str(path))

    text = path.read_text(encoding='utf-8')
    assert 'ar = العربية' in text
    assert 'es_MX = Español (México)' in text   # not lower-cased to es_mx
    assert 'zh_CN = 中文(简体)' in text


def test_leaves_other_sections_intact(tmp_path):
    path = _write_settings(
        tmp_path,
        '[general]\nsiteurl = https://old.example\n\n'
        '[rtl]\nar = \nhe = \n',
    )

    set_siteurl('https://new.example', str(path))

    config = _read(path)
    assert config.has_section('rtl')
    assert sorted(config.options('rtl')) == ['ar', 'he']


def test_raises_without_general_section(tmp_path):
    path = _write_settings(tmp_path, '[other]\nkey = value\n')

    with pytest.raises(configparser.NoSectionError):
        set_siteurl('https://new.example', str(path))
