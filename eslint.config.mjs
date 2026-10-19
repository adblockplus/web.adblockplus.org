import compat from 'eslint-plugin-compat';
import esX from 'eslint-plugin-es-x';
import html from 'eslint-plugin-html';
import globals from 'globals';

// Checks that browser-facing JavaScript only uses syntax and APIs available in
// the minimum browser versions listed under "browserslist" in package.json.
//
// - compat: web platform APIs (DOM, fetch, etc.), checked against browserslist
// - es-x: JavaScript features. Firefox 115, the lowest target, lacks ES2024
//   and the ES2023 Intl range methods (added in 116), so those are banned.
//   Bump the presets when the minimum Firefox version goes up.
const esRestriction = esX.configs['flat/restrict-to-es2023'];
const esIntlRestriction = esX.configs['flat/restrict-to-es2022-intl-api'];

// Aggressive mode can't tell these from same-named array, NodeList and jQuery
// methods (e.g. .forEach, .map, .resize), so they're switched off. The other
// iterator helpers (.take, .drop, .toArray) stay on: they'd break on Firefox
// 115. jQuery also has .toArray(); use its .get() instead, which does the same
const esAmbiguousRules = Object.fromEntries([
  'es-x/no-iterator-prototype-every',
  'es-x/no-iterator-prototype-filter',
  'es-x/no-iterator-prototype-find',
  'es-x/no-iterator-prototype-flatmap',
  'es-x/no-iterator-prototype-foreach',
  'es-x/no-iterator-prototype-map',
  'es-x/no-iterator-prototype-reduce',
  'es-x/no-iterator-prototype-some',
  'es-x/no-resizable-and-growable-arraybuffers',
].map(rule => [rule, 'off']));

export default [
  {
    ignores: [
      'services/firebase/public/**',
      // Third-party libraries
      'static/js/vendor/**',
      'static/poland/js/bowser.js',
      'static/adblock-plus-premium/wp-emoji-release.min.js',
      // Generated from scripts/generate-settings.mjs; ALL_ALL is linted as a sample
      'static/ALL_!(ALL)/**',
      // Inline script is mostly Jinja expressions, which can't be parsed as JS
      'includes/scripts/generated-settings.tmpl',
    ],
  },
  {
    // Browser-facing code only, matching the folders in package.json's "lint" script
    files: [
      'static/**/*.js',
      '{static,includes,pages,templates}/**/*.{html,tmpl,md}',
    ],
    plugins: { compat, 'es-x': esX, html },
    settings: {
      'html/html-extensions': ['.html', '.tmpl', '.md'],
      // Also flag prototype methods (e.g. .toSorted()) without type information
      'es-x': { aggressive: true },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'compat/compat': 'error',
      ...esRestriction.rules,
      ...esIntlRestriction.rules,
      ...esAmbiguousRules,
    },
  },
  {
    // Inline scripts are classic scripts unless marked type="module"
    files: ['**/*.html', '**/*.tmpl', '**/*.md'],
    languageOptions: {
      sourceType: 'script',
    },
  },
  {
    // Files whose inline scripts are type="module"
    files: ['includes/outdated-extension-notice.tmpl'],
    languageOptions: {
      sourceType: 'module',
    },
  },
];
