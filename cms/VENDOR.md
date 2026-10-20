# Vendored CMS — provenance

The static-site generator in `cms/` is a **trimmed, locally patched copy** of the eyeo CMS. It is not
a pristine import: treat the divergence list below as the authoritative record of what differs and
why.

## Fork point

| | |
|---|---|
| Upstream | https://gitlab.com/eyeo/websites/cms |
| Revision | `096286d6d861102beab883998509437428a3c081` |
| Subject | `feat: Added img to converter inline tag allowlist` |
| Upstream date | 2024-08-09 |
| Vendored | 2026-06-16 |

`096286d` was the default-branch HEAD when the tree was copied, and **is still upstream HEAD** as of
2026-07-31 — upstream has had no commits in ~2 years. The previous integration cloned the default
branch unpinned (`git clone https://gitlab.com/eyeo/websites/cms.git` in the old
`.devcontainer/Dockerfile`), so no revision was ever recorded; the value above was recovered by
diffing this tree against every upstream commit.

Because upstream is dormant, the point of this file is **not** "so we can pull future upstream fixes".
It is that we now own this code outright, and a reader needs to tell a deliberate trim from an
accidental edit.

### Auditing this file

Run from the repo root to list every `cms/` Python file as identical / patched / new. Anything
reported as patched must have an entry under [Local patches](#local-patches); anything new must be
listed as an addition. This is how the divergence list below was built, and how to keep it honest:

```sh
git clone https://gitlab.com/eyeo/websites/cms /tmp/upstream-cms
find cms -name '*.py' -not -path '*__pycache__*' | sort | while read -r f; do
  # upstream keeps its tests at tests/, this repo nests them under cms/tests/
  up="${f/cms\/tests\//tests/}"
  if git -C /tmp/upstream-cms cat-file -e "096286d:$up" 2>/dev/null; then
    n=$(git -C /tmp/upstream-cms show "096286d:$up" | diff - "$f" | grep -c '^[<>]')
    [ "$n" = 0 ] && echo "identical  $f" || echo "patched    $f ($n lines)"
  else
    echo "new        $f"
  fi
done
```

As of 2026-07-31: 7 identical, 10 patched, 2 new — all 12 recorded below.

## Layout changes

Upstream is a standalone repo (package at `cms/`, tests at `tests/`). Here the package keeps its path
but the tests moved under it, so `cms/` is self-contained: upstream `tests/` → `cms/tests/`, with
`cms/tests/__init__.py` and an adjusted `conftest.py`. Upstream's `docs/`, `README.md`, `runserver.spec`
and `tox.ini` were not carried over.

Upstream's root-level `runserver.py` shim was carried over initially, then **removed** — the sole entry
point is now `python -m cms.bin.test_server`, used by both `scripts/start.sh` (behind `npm start`) and
the test helper. Note this file sits outside the audit script's `cms/**` scope, so a root-level
divergence like this will not appear in its output.

## Removed in the trim

The whole translation-sync surface, unused here — translations are hand-authored, not pipeline-managed:

- `cms/bin/translate.py`, `cms/bin/xtm_translations.py`
- `cms/translations/` — `__init__.py`, `xtm/{__init__,cli,constants,projects_handler,utils,xtm_api}.py`
- tests: `crowdin_mock_api.py`, `test_translations.py`, `test_xtm_api.py`, `test_xtm_translate.py`,
  `test_xtm_translations_utils.py`, `xtm_conftest.py`, `xtm_mock_api.py`
- residue in surviving test files: the `tests.xtm_conftest` plugin registration and XTM intercept
  constants in `conftest.py`, and the `XtmMockArgs` helper plus Crowdin imports in `utils.py`
- `FileSource.write_to_config` in `cms/sources.py`, whose only callers were the XTM project handler
  and its tests

Consequence: CVEs scoped to the Crowdin/XTM code paths are **not applicable** to this site. The build
entry point (`cms.bin.generate_static_pages`) imports no network modules.

## Dependency changes

Upstream `requirements.txt` vs. this repo:

| Package | Upstream | Here | Reason |
|---|---|---|---|
| `jinja2` | 3.1.2 | 3.1.6 | security; build output verified byte-identical |
| `markdown` | 3.4.1 | 3.8.1 | security; build output verified byte-identical |
| `werkzeug` | 2.2.2 | 3.1.6 | security; dev-server-only, verified via test suite |
| `markupsafe` | 2.1.1 | 2.1.1 | unchanged |
| `requests` | runtime | dev-only | runtime use was the Crowdin sync, now removed |
| `urllib3` | runtime | dev-only | as above (transitive via `requests`) |

## Local patches

Divergences from `096286d`, each deliberate.

**Python 3.12 compatibility**

- `cms/sources.py` — `SafeConfigParser` → `ConfigParser`, `readfp()` → `read_file()`. Both were
  *removed* in 3.12, so upstream HEAD does not run on the version this repo targets, despite its
  penultimate commit being "Migrate to Python 3". Applied at vendoring time.
- `cms/converters.py` — `self.unescape()` → `html.unescape()` in `handle_entityref`/`handle_charref`.
  `HTMLParser.unescape()` was removed in 3.9.

**Security**

- `cms/sources.py` — containment check in `FileSource.get_path` so request paths cannot escape the site
  root; `has_file` returns False rather than raising. Fixes an arbitrary-file read in the dev server.
- `cms/bin/test_server.py` — `use_evalex=False`, dropping werkzeug's `/console` code-execution shell
  while keeping traceback pages.

**Error messages** (both were unactionable internal exceptions)

- `cms/sources.py` — `read_locale` raises a descriptive error naming the page, locale, file and string
  for malformed entries. Replaces a `ke.message` guard that was Python-2-only *and* unreachable.
- `cms/converters.py` — `localize_string` raises when a `get_string()` id resolves to `None`, naming the
  string, section, locales searched and rendering page. Previously a bare `TypeError` from the parser.

**Dependency reduction** (behaviour-neutral; drops `mock`, `py` and `pytest-console-scripts`)

- `cms/tests/test_page_outputs.py` — `import mock` → `from unittest import mock`. The `mock` package is
  the Python 2 backport of `unittest.mock`.
- `cms/tests/test_additional_paths.py` — `py.path.local(temp_site)` → `pathlib.Path`, with `.join()`/
  `.read()` becoming `/` and `.read_text()`. `tmpdir_factory` objects still use pytest's own vendored
  `LocalPath`, so only the explicit `py.path` call needed replacing.
- `cms/tests/test_generation_exceptional_cases.py` — dropped the unused `script_runner` parameter from
  `test_generate_fifo_instead_of_file`; it was the sole reason `pytest-console-scripts` was installed.

**Lint conformance** (`ruff`, config in `ruff.toml`; behaviour-neutral)

- `cms/utils.py` — `l` → `loc` in the locale comprehension in `process_page` (E741, ambiguous name).
- `cms/tests/test_additional_paths.py` — `import urllib.request, urllib.error, urllib.parse` split onto
  three lines (E401).
- `cms/tests/test_site/` and `cms/tests/expected_output/` — trailing whitespace trimmed and final
  newlines added, per `.editorconfig`. Each page and its expected output were changed together, since
  the tests compare them after stripping only the file ends. Not `.py`, so the audit script skips them.

**Other**

- `cms/sources.py` — `# nosemgrep` plus an explanatory comment on the `exec()` in the filter/global
  loader (intentional plugin loading from the repo's own tree, not injection).
- `cms/tests/utils.py` — the dev server under test binds an ephemeral port rather than the default 5000,
  which macOS AirPlay Receiver occupies. It is also spawned as
  `[sys.executable, '-m', 'cms.bin.test_server', ...]` with `cwd` pinned to the repo root, replacing
  `['python', 'runserver.py', ...]`: `sys.executable` guarantees the subprocess uses the test run's
  interpreter, and the explicit `cwd` lets `pytest` run from any directory.

**Added tests** (no upstream equivalent): `cms/tests/test_read_locale.py`,
`cms/tests/test_attribute_parser.py`, plus cases in `test_dynamic_server.py` and
`test_generation_exceptional_cases.py`. Every fix above landed in code upstream had no coverage for.

## Still present upstream

The py2 `unescape` leftover, the traversal, the enabled eval console and both unactionable error paths
all exist in `096286d`. If upstream is ever revived, these are the patches worth contributing back.
