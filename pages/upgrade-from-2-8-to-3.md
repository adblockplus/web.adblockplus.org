title=Upgrading Adblock Plus from version 2.8.2 (or below) for Firefox
description=If you are a Firefox user and update directly from Adblock Plus 2.8.2 (or below) to 3.0.0, you will lose all of your Adblock Plus settings (i.e. custom filters, enabled or disabled preferences, etc.).

{{ background-1 Beginning with Firefox 57, Mozilla changed the way that settings are stored in extensions (check out this [blog article](https://adblockplus.org/blog/the-plan-towards-offering-adblock-plus-for-firefox-as-a-web-extension) for more information). Because of this, Adblock Plus had to migrate its settings from one format to another between versions 2.8.2 and 3.0.0. }}

{{ background-2 If you update directly from Adblock Plus 2.8.2 (or below) to 3.0.0 (or above), you will lose all of your Adblock Plus settings (i.e. custom filters, enabled or disabled preferences, etc.). }}

{{ background-3 To avoid losing all of your Adblock Plus settings, follow the steps below. }}

{{ background-note **Note**: If you have already upgraded from Adblock Plus 2.8.2 (or below) to 3.0.0 and lost your settings, please note that we are still looking into this issue. At this time, we have not found a solution to restore lost settings. }}

{{ background-warning **Important**: If you are using Adblock Plus 2.9.1, keep in mind that some features available in 2.9.1 are not yet available in 3.0.0. }}

## {{ howto-upgrade-heading[heading] How to upgrade successfully from Adblock Plus 2.8.2 (or below)... }}

1. {{ howto-upgrade-1[list item] Without uninstalling your current version of Adblock Plus, manually upgrade to Adblock Plus version 2.9.1 from the [Mozilla Add-ons page](https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/versions/?page=1#version-2.9.1). }}
2. {{ howto-upgrade-2[list item] After the upgrade is complete, wait at least 60 seconds. }}
3. {{ howto-upgrade-3[list item] Upgrade to the latest version of Adblock Plus (3.x.x). }}

## {{ compatibility-heading[heading] Compatibility }}

{{ compatibility-lead There are two common Firefox releases: }}

- {{ compatibility-1[list item] Firefox Quantum (currently 58.0.2) }}
- {{ compatibility-2[list item] Firefox ESR (currently 52.6.0) }}

{{ compatibility-footnote-1 Adblock Plus 3.0.0 is compatible with Firefox 51.x and above (Firefox ESR and Firefox Quantum). }}

{{ compatibility-footnote-2 Adblock Plus 2.9.1 is compatible with Firefox 51.0.x to 56.x (Firefox ESR only). }}
