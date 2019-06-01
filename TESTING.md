# Testing adblockplus.org

## Contents

1. Browser support
1. Determining what to test

## Browser support

See [browserlistrc](./browserlistrc)<sup>[1]</sup>.

[1]: Note "Legacy support for home, download, and internet explorer pages" at the bottom.

## Determining what to test

A tester should be able to determine which pages and/or parts of pages to test from a merge request.

- All changes to `./pages` affect `https://domain/defaultlocale/PAGES`
- All changes to `./locales` affect `https://domain/LOCALE/FILENAME`
  - If there is not a page of the same name as a locale file then that locale file may be shared between pages by `get_string(STRING_ID, PAGE_NAME)`
- All changes to `./includes` affect pages that `<? include FILENAME ?>`
- All changes to `./templates` affect pages that use them via `template` frontmatter property, except for changes to `templates/default.tmpl`, which affect all pages
- All other changes may affect multiple pages unpredictably
  - Ask the change athor and the module owner to specify which pages and/or parts of pages could be affected

Ask the change author and module owner when in doubt.
