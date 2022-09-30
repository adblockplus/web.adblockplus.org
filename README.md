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

### Removing strings from page locale files

See `node scripts/remove-locale-strings.mjs --help`

#### Example

```
$ node scripts/remove-locale-strings.mjs -p getting_started -s s26,s27,s28,s29,s30,s31
hits {
  'locales/de/getting_started.json': 6,
  'locales/es/getting_started.json': 6,
  'locales/fr/getting_started.json': 6,
  'locales/nl/getting_started.json': 6,
  'locales/ru/getting_started.json': 6,
  'locales/zh_CN/getting_started.json': 6
}
Proceed y/n? y
```