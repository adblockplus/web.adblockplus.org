# adblockplus.org website

This repository contains [VSCode development container](https://code.visualstudio.com/docs/remote/containers) config to help you get started.

If you prefer not to use VSCode or Docker then you can see `.devcontainer/Dockerfile` and `.devcontainer/postcreate.sh` for config and build instructions.

There are two ways to "run" this website:

1. The "fast" way: via eyeo/cms development test server
    - `npm run fast`
1. The "slow" way: via apache2
    - `npm run slow`

.htaccess features (e.g. redirect, geoip) only work the "slow" way.

Try `127.0.0.1` if `localhost` doesn't work (effects the fast way on macOS).