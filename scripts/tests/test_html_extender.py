"""Tests for services/firebase/utils/html_extender.py."""

import importlib.util
import os
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT = REPO_ROOT / "services" / "firebase" / "utils" / "html_extender.py"

HTML = "<!DOCTYPE html>\n<html></html>\n"


def _load_module():
    spec = importlib.util.spec_from_file_location("html_extender", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


html_extender = _load_module()


@pytest.fixture
def restore_cwd():
    # main() does os.chdir(), so restore the working dir after each test.
    cwd = os.getcwd()
    yield
    os.chdir(cwd)


def _build_tree(root):
    (root / "sub").mkdir()
    (root / "page").write_text(HTML, encoding="utf-8")          # html, no ext
    (root / "sub" / "nested").write_text(HTML, encoding="utf-8")  # html, nested
    (root / "style.css").write_text("body{}", encoding="utf-8")  # not html
    (root / "notes").write_text("plain\n", encoding="utf-8")     # not html, no ext
    (root / "already.html").write_text(HTML, encoding="utf-8")   # html, has ext


def test_renames_only_extensionless_html(tmp_path, restore_cwd):
    _build_tree(tmp_path)
    html_extender.main(str(tmp_path))

    # extensionless HTML gets renamed (including nested dirs)
    assert (tmp_path / "page.html").is_file()
    assert not (tmp_path / "page").exists()
    assert (tmp_path / "sub" / "nested.html").is_file()

    # everything else is left alone
    assert (tmp_path / "style.css").is_file()
    assert (tmp_path / "notes").is_file()
    assert (tmp_path / "already.html").is_file()


def test_reports_real_count(tmp_path, restore_cwd, capsys):
    # regression guard: the counter used to always print 0
    _build_tree(tmp_path)
    html_extender.main(str(tmp_path))
    assert "2 total" in capsys.readouterr().out


def test_count_zero_when_nothing_to_rename(tmp_path, restore_cwd, capsys):
    (tmp_path / "style.css").write_text("body{}", encoding="utf-8")
    (tmp_path / "page.html").write_text(HTML, encoding="utf-8")
    html_extender.main(str(tmp_path))
    assert "0 total" in capsys.readouterr().out


def test_ignores_extensionless_binary_files(tmp_path, restore_cwd):
    # e.g. a macOS .DS_Store: extensionless and not UTF-8. Must not crash or
    # be renamed (regression guard for the UnicodeDecodeError).
    (tmp_path / ".DS_Store").write_bytes(b"\x00\x01\xff\xfe binary")
    (tmp_path / "page").write_text(HTML, encoding="utf-8")

    html_extender.main(str(tmp_path))

    assert (tmp_path / "page.html").is_file()      # real HTML still renamed
    assert (tmp_path / ".DS_Store").is_file()      # binary left untouched
    assert not (tmp_path / ".DS_Store.html").exists()
