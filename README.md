# adblockplus.org website

This repository contains [VSCode development container](https://code.visualstudio.com/docs/remote/containers) config to help you get started.

If you prefer not to use VSCode or Docker then you can see `.devcontainer/Dockerfile` and `scripts/devcontainer-postCreate.sh` for config and build instructions.

There are two ways to "run" this website:

1. The "quick" way: via eyeo/cms development test server
    - `npm run quick`
1. The "slow" way: via apache2
    - `npm run slow`

.htaccess features (e.g. redirect, geoip) only work the "slow" way.

Try `127.0.0.1` if `localhost` doesn't work (effects the quick way on macOS).

## Managing locales

`scripts/locales.mjs` is a useful script for managing locales.

See `node scripts/locales.mjs --help` for details.

### Examples

Remove (`-r`) string (`-s`) "msie-cta" from file (`-f`) "download".

```
$ node scripts/locales.mjs -r -s msie-cta -f download

Remove 'msie-cta' from: [
  'locales/de/download.json',
  'locales/es/download.json',
  'locales/fr/download.json',
  'locales/it/download.json',
  'locales/nl/download.json',
  'locales/pt_BR/download.json',
  'locales/ru/download.json',
  'locales/zh_CN/download.json'
]
Confirm y/n?
```