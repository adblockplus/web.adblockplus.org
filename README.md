# adblockplus.org

CAUTION: A replacement for this website is in active development.

You can run this website locally using https://gitlab.com/eyeo/websites/cms.

## Supported query parameters

A "flag" type below counts as "true" regardless of the query param value.

### Sitewide

- `country` string - 2 letter country code
- `defaultCurrency` string - 3 letter currency code
- `restrictPremium` boolean - used to disable buying premium
- `restrictPrivacy` boolean - used to disable some 3rd party services
- `sid` string - 32 char unique id used to associate access logs with one another
- `s` string - traffic source name for marketing purposes
- `dev` flag - used for development purposes
- `design` flag - used for development purpsoses

#### DE_EXCEPTION

Unless a language is provided in the URL (e.g. via selecting language in the navbar dropdown) `DE_EXCEPTION` is used as part of an exception that forces German language in Germany despite browser preferences.

### Payment pages

- `testmode` flag - changes the payment environment from "live" to "sandbox".

### Update page

- `bc` number - show alternate CTA with block count

### Premium page

- `premium-checkout__handoff` flag - used to communicate premium checkout handoff from one page to another
- `premium-checkout__flow` string - used to name a flow that a premium checkout handoff is completing
- `premium-checkout__page` string - used to name a page that a premium checkout handoff is coming from
- `premium-checkout__product` string - product name being purchased by premium checkout
- `premium-checkout__premiumId` string - unique id for premium subscription (sometimes called userid)
- `premium-checkout__currency` string - 3 letter currency code of premium checkout
- `premium-checkout__frequency` string - premium checkout subscription frequency once|monthly|yearly
- `premium-checkout__amount` number - premium checkout amount in cents
- `premium-checkout__country` string - 2 letter country code from premium checkout
- `premium-checkout__locale` string - 2-5 letter language code from premium checkout
- `premium-checkout__timestamp` number - datetime stamp from premium checkout
- `reenroll` flag - used to show an alternative premium CTA for reenrolling.

### Installed page

#### Installed data collection 

`ap` of `firefox` and `av` of greater or equal to `3.21.1` are used to show a message about data collection to Firefox users on the installed page.

#### Install and activate redirection

When premium is purchased before ABP is installed then `premium-checkout__install` is used to trigger storing values in the browser to cause the post-install page to redirect to the premium activation page.