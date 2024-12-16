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

## Templates

The **navbar**, **header**, **toc**, **footer** components mentioned below are optionally disabled via `no${component}` page attributes.

- **minimal**: contains navbar, footer, and no body container. Meant for landing pages.
- **modern**: contains navbar, spaced body container, and footer. Meant for modern content pages.
- **default**: contains navbar, spaced body container, header, toc, and footer. Meant for legacy content pages.
- **fixed-toc**: contains navbar, fixed left toc, content right, header, and footer. Meant for documentation pages.