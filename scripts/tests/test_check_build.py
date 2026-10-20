"""Tests for scripts/check_build.py (the post-build smoke check)."""

import importlib.util
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT = REPO_ROOT / "scripts" / "check_build.py"


def _load_module():
    spec = importlib.util.spec_from_file_location("check_build", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


check_build_mod = _load_module()
check_build = check_build_mod.check_build
KEY_PAGES = check_build_mod.KEY_PAGES


def _make_settings(tmp_path, locales=("en", "de", "fr"), default="en"):
    path = tmp_path / "settings.ini"
    langnames = "\n".join(f"{loc} = {loc.upper()}" for loc in locales)
    path.write_text(
        f"[general]\ndefaultlocale = {default}\n\n[langnames]\n{langnames}\n",
        encoding="utf-8",
    )
    return path


def _make_build(tmp_path, locales=("en", "de", "fr"), default="en",
                page_body="<!DOCTYPE html>\n<html></html>\n", n_filler=5):
    """Build a minimal valid public/ tree and return its path."""
    public = tmp_path / "public"
    for loc in locales:
        (public / loc).mkdir(parents=True)
    # default locale gets the key pages + filler so it clears the page floor
    for name in KEY_PAGES:
        (public / default / name).write_text(page_body, encoding="utf-8")
    for i in range(n_filler):
        (public / default / f"filler{i}").write_text(page_body, encoding="utf-8")
    return public


# check_build's default min_pages is 50; tests pass a small value so fixtures
# don't need dozens of files (the floor itself is covered explicitly below).
SMALL_MIN = 3


def test_passes_on_valid_build(tmp_path):
    public = _make_build(tmp_path)
    settings = _make_settings(tmp_path)
    assert check_build(str(public), str(settings), min_pages=SMALL_MIN) == []


def test_flags_missing_locale_directory(tmp_path):
    public = _make_build(tmp_path, locales=("en", "de"))  # no fr/
    settings = _make_settings(tmp_path, locales=("en", "de", "fr"))
    problems = check_build(str(public), str(settings), min_pages=SMALL_MIN)
    assert any("fr" in p and "locale" in p for p in problems)


def test_flags_missing_key_page(tmp_path):
    public = _make_build(tmp_path)
    (public / "en" / "premium").unlink()
    settings = _make_settings(tmp_path)
    problems = check_build(str(public), str(settings), min_pages=SMALL_MIN)
    assert any("en/premium" in p for p in problems)


def test_accepts_html_extended_pages(tmp_path):
    # after html_extender, key pages are <name>.html — still found
    public = _make_build(tmp_path)
    (public / "en" / "index").rename(public / "en" / "index.html")
    settings = _make_settings(tmp_path)
    assert check_build(str(public), str(settings), min_pages=SMALL_MIN) == []


def test_flags_too_few_pages(tmp_path):
    public = _make_build(tmp_path, n_filler=0)  # only the 5 key pages
    settings = _make_settings(tmp_path)
    problems = check_build(str(public), str(settings), min_pages=50)
    assert any("only" in p and "pages" in p for p in problems)


def test_flags_unrendered_template_marker(tmp_path):
    public = _make_build(tmp_path)
    (public / "de" / "broken").write_text(
        "<!DOCTYPE html>\n{% if foo %}leaked{% endif %}\n", encoding="utf-8",
    )
    settings = _make_settings(tmp_path)
    problems = check_build(str(public), str(settings), min_pages=SMALL_MIN)
    assert any("de/broken" in p for p in problems)
