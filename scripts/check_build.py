#!/usr/bin/env python3
"""Smoke-check a generated CMS build (e.g. services/firebase/public).

Run after `generate_static_pages` (and `html_extender.py`) to catch a build
that *succeeds* but is structurally broken: a missing locale, a missing key
page, a near-empty site, or unrendered Jinja markers left in the HTML. Hard
template-render errors already fail the build with a non-zero exit; this guards
the subtler "green but wrong" cases.

Usage: python scripts/check_build.py <public_dir> [settings.ini]
Prints each problem and exits non-zero if any check fails.
"""

import configparser
import os
import sys

# Pages that must always exist in the default (fully translated) locale.
# Tune this list if pages are renamed or removed.
KEY_PAGES = ["index", "premium", "update", "installed", "acceptable-ads"]

# A floor for the default locale's page count — catches a build that emitted
# almost nothing. Normally ~74, one per file in pages/. This counts page files
# only (see PAGE_SUFFIXES), not the ~80 images and scripts alongside them, so
# don't compare it against a raw file count of the locale directory.
MIN_DEFAULT_LOCALE_PAGES = 50

# Generated pages have no extension before html_extender and ".html" after it;
# only these are scanned for template-marker leakage (skips images, etc.).
PAGE_SUFFIXES = ("", ".html")


def _load_settings(path):
    config = configparser.ConfigParser()
    config.optionxform = str  # preserve locale key case (es_MX, zh_CN, ...)
    config.read(path, encoding="utf-8")
    return config


def _page_exists(public_dir, locale, name):
    base = os.path.join(public_dir, locale, name)
    return os.path.exists(base) or os.path.exists(base + ".html")


def _iter_page_files(locale_dir):
    for dirpath, _dirnames, filenames in os.walk(locale_dir):
        for filename in filenames:
            if os.path.splitext(filename)[1] in PAGE_SUFFIXES:
                yield os.path.join(dirpath, filename)


def check_build(public_dir, settings_path="settings.ini",
                min_pages=MIN_DEFAULT_LOCALE_PAGES):
    """Return a list of human-readable problems (empty list = all good)."""
    config = _load_settings(settings_path)
    locales = config.options("langnames")
    default_locale = config.get("general", "defaultlocale")
    problems = []

    # 1. Every expected locale directory is present.
    for locale in locales:
        if not os.path.isdir(os.path.join(public_dir, locale)):
            problems.append(f"missing locale directory: {locale}")

    # 2. Key pages exist in the default (complete) locale.
    for name in KEY_PAGES:
        if not _page_exists(public_dir, default_locale, name):
            problems.append(f"missing key page: {default_locale}/{name}")

    # 3. The default locale has a sane number of pages.
    default_dir = os.path.join(public_dir, default_locale)
    page_count = sum(1 for _ in _iter_page_files(default_dir))
    if page_count < min_pages:
        problems.append(
            f"default locale {default_locale} has only {page_count} pages "
            f"(expected >= {min_pages})"
        )

    # 4. No unrendered Jinja block markers ({% ... %}) leaked into pages.
    for locale in locales:
        locale_dir = os.path.join(public_dir, locale)
        if not os.path.isdir(locale_dir):
            continue
        for path in _iter_page_files(locale_dir):
            with open(path, encoding="utf-8", errors="ignore") as f:
                if "{%" in f.read():
                    rel = os.path.relpath(path, public_dir)
                    problems.append(f"unrendered template marker '{{%' in {rel}")

    return problems


def main(argv):
    if len(argv) < 2:
        sys.exit("usage: check_build.py <public_dir> [settings.ini]")
    public_dir = argv[1]
    settings_path = argv[2] if len(argv) > 2 else "settings.ini"
    problems = check_build(public_dir, settings_path)
    if problems:
        print(f"Build smoke check FAILED ({len(problems)} problem(s)):")
        for problem in problems:
            print(f"  - {problem}")
        sys.exit(1)
    print("Build smoke check passed.")


if __name__ == "__main__":
    main(sys.argv)
