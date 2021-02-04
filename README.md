# adblockplus.org web content #

The web content of the adblockplus.org domain is generated automatically from
the files in this repository. For more information and usage instructions
see [CMS documentation](https://github.com/adblockplus/cms/blob/master/README.md#content-structure).

## Tracking

abp.o uses Google Analytics, Tag manager, and Optimize to track and test users.

- `includes/anti-flicker` applies [Google Optimize's anti-flicker snippet](https://developers.google.com/optimize) when `user_testing` is truthy
- `includes/config` sets global variables used in tracking scripts
- `includes/analytics` loads tracking scripts

### Google Analytics

abp.o loads separate tracking scripts in EU and non-EU countries.

The EU country tracking script prevents tracking.

The non-EU tracking script enables conditional tracking.

#### non-EU tracking conditions

We use cookies and a cookie settings UI to configure conditional tracking outside the EU.

##### Cookies

- `eyeo-seen-cookie-prompt` is used to determine if the user has seen the cookie settings UI
- `eyeo-ga-opt-out` is used to determine if the user has opted out of tracking via the cookie settings UI
- `eyeo-ab-opt-out` is used to determine if the user has opted out of user testing via the cookie settings UI

##### Google Optimize conditions

We configure Google Analytics to load Google Optimize in a page if the user hasn't opted out of user testing and the page has enabled user testing (via `user_testing` global or page property).

##### Google Analytics and Tag Manager conditions

The following conditions also apply to Google Optimize because Google Optimize depends on Google Analytics.

Google analytics is not loaded if the user opts out of testing via the cookie settings UI or if the user is visiting a page with the cookie settings UI disabled and they have not seen the cookie settings UI before.

The later condition prevents tracking users that haven't had the opportunity to opt out of tracking on our website. 

### Google Tag Manager

Google Tag Manager can be used to track specific user behaviour e.g. clicking a download button.

Google Tag Manager is loaded under the same conditions as Google Analytics.

### Google Optimize

Google Optimize is used to perform user testing.

User testing is disabled by default and manually enabled temporarily in code by setting the `user_testing` property truthy globally or per page.

#### Anti-flicker

Google Optimize's Anti-flicker snippet is applied to pages built with user testing enabled.

The Anti-flicker snippet causes content to render invisibly until:

- Google Optimize applies a user testing variant
- A set amount of time, configured in the snippet, has passed
- Our tracking script overrides the anti-flicker effect

Our tracking scripts override the anti-flicker effect in the following circumstances:

- The user has opted out of user testing
- The user has opted out of testing
- The user is visiting a page with the cookie settings UI disabled and they have not seen the cookie settings UI before (they haven't had the opportunity to opt out of tracking on our website yet)
- The user is in the EU

Our EU tracking script always overrides the anti-flicker effect.

## Optimizing CSS and JavaScript

1. Run `npm install` from the root folder
1. Add CSS/JS files to process in `static/tools/build.js`
1. Run `npm run build` to generate optimized files
1. Adapt CSS/JS includes in templates

## Testing via Apache 2

1. Copy or link the virtual host file in this repository (`adblockplus.org.conf`) to Apache's sites available and enable it
1. Add `adblockplus.org` to your local hosts file
1. Build the website and place it's output in the virtual host's document root
1. Load the index page (`http://adblockplus.org/en/index:80`) in the browser and confirm that it's coming from your local server (`127.0.0.1:80`) in the Network panel of your developer tools
