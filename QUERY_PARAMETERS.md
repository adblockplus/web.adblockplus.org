# Query Parameters Reference

This document lists all known URL query parameters that appear in Firebase Hosting logs (`httpRequest.requestUrl` column) and are used across adblockplus.org.

## Purpose

When parsing Firebase Hosting logs, the `httpRequest.requestUrl` field contains the full URL with query parameters. This reference documents all possible query parameter keys and values you may encounter when parsing these logs.

## Sitewide Parameters

### Location & Localization
- **`country`** - 2-letter country code override (e.g., `US`, `DE`, `FR`)
- **`lang`** - Language code override (e.g., `en`, `de`, `fr`, `es_MX`)
- **`geo`** - Geographic location override
- **`DE_EXCEPTION`** - Prevents automatic German language redirect in Germany

### Payment & Premium
- **`defaultCurrency`** - 3-letter currency code (e.g., `USD`, `EUR`, `GBP`, `CAD`, `AUD`, `NZD`, `CHF`, `PLN`, `JPY`, `RUB`)
- **`restrictPremium`** - Disable buying premium functionality
- **`restrictPrivacy`** - Disable some 3rd party services (auto-enabled for EU countries)

### Tracking & Analytics
- **`sid`** - Session ID for log correlation (logged as part of logging events)
- **`s`** - Traffic source for marketing attribution (logged in events as source)

### Development & Testing
- **`dev`** - Development mode flag
- **`design`** - Design mode flag
- **`testmode`** - Use sandbox payment environment

### Experiments
- **`variant`** - Experiment variant to apply (numeric, e.g., `0`, `1`, `2`)
- **`var`** - Alternative form of variant parameter (numeric)

## Premium Checkout Flow Parameters

All parameters prefixed with `premium-checkout__`:

### Flow Control
- **`premium-checkout__flow`** - Flow name (e.g., `purchase`, `restore-purchase`, `activation-handoff`)
- **`premium-checkout__handoff`** - Indicates activation handoff from another page
- **`premium-checkout__page`** - Specific page identifier

### Product & Pricing
- **`premium-checkout__product`** - Product identifier (e.g., `premium`)
- **`premium-checkout__currency`** - Transaction currency
- **`premium-checkout__frequency`** - Payment frequency (`monthly` or `yearly`)
- **`premium-checkout__amount`** - Payment amount in cents

### User Identification
- **`premium-checkout__premiumId`** - Premium user ID
- **`premium-checkout__locale`** - User locale

### Timing & Testing
- **`premium-checkout__timestamp`** - Transaction timestamp
- **`premium-checkout__request-timeout`** - Request timeout in milliseconds (default: 15000)
- **`premium-checkout__activation-delay`** - Activation delay in milliseconds (default: 6000)
- **`premium-checkout__fake-activation`** - Skip actual activation for testing
- **`premium-checkout__fake-error`** - Show error state for testing
- **`premium-checkout__install`** - Installation flow indicator

## Subscription Management Parameters

- **`has-subscription`** - Mock subscription states for testing (`yes`, `no`, `error`, `timeout`, `finding`, `found`)
- **`reenroll`** - Show alternative CTA for re-enrollment

## Anti-Adblock Pass Parameters

These parameters are logged when present:

- **`anti_adblock_pass__checkout`** - Anti-adblock pass checkout indicator (logged as `1` when present)
- **`anti_adblock_pass__already_donated`** - Already donated indicator (logged as `1` when present)

## User Accounts & Trial Parameters

- **`email`** - Email address for restore purchase flow or trial signup
- **`consent`** - Marketing consent flag (boolean)
- **`flow`** - User accounts flow identifier (e.g., `trial`)
- **`e`** - Experiment tracking (format: `{experiment}-{variant}`)

## Restore Purchase Parameters

- **`restore-purchase`** - Indicates restore purchase flow
- **`already-contributed`** - Alternative restore purchase indicator

## Browser & OS Testing Parameters

- **`bro`** - Force browser detection (single letter: `E`=Chrome, `S`=Safari, `F`=Firefox, `O`=Opera, `M`=Edge, `CM`=Chromium Edge, `T`=IE, `G`=Samsung)
- **`ov`** - Force OS version override

## Common Query Parameter Patterns in Logs

### URL Navigation Patterns

When users navigate the site, you'll see these parameters in the URL:

```
/installed?variant=2&s=abp-w&country=US
/premium?defaultCurrency=EUR&restrictPrivacy=1
/de/premium?DE_EXCEPTION=1
/premium?premium-checkout__handoff=1&premium-checkout__flow=activation-handoff&premium-checkout__currency=USD
```

### Redirect URLs (User Accounts Flow)

User accounts redirects include experiment and consent tracking:

```
https://myaccount.adblockplus.org/?email=user@example.com&consent=true&flow=trial&s=abp-w&e=123-2
https://myaccount.adblockplus.org/?flow=trial&s=abp-w&e=123-1
```

### Analytics Event URLs

The `adblock.log()` function doesn't add parameters to URLs directly - it sends events to the backend. However, the experiment variant-2.js file constructs URLs with these parameters for redirection.

## Parameters Sent to External Services

### User Accounts Portal Redirects
When redirecting to user accounts, these parameters are included:
- `email` - User's email address
- `consent` - Marketing consent (true/false)
- `flow` - Flow identifier (e.g., "trial")
- `s` - Source (e.g., "abp-w")
- `e` - Experiment tracking (format: "{experimentNumber}-{variantIndex}")

## Query Parameter Value Reference

### `variant` / `var` Values
- `0` - Control/default variant
- `1` - Variant 1
- `2` - Variant 2
- (can be higher for experiments with more variants)

### `s` (Source) Common Values
Derived from URL path in `getPlainSource()`:
- `I` - /installed
- `MI` - /mobile/installed
- `Y` - /pay
- `M` - /mobile/pay
- `T` - /mobile/test
- `G` - Homepage (/)
- `Q` - /survey
- `B` - /update
- `GC` - /chrome
- `GE` - /edge
- `GF` - /firefox
- `GS` - /safari
- `GI` - /iOS
- `GA` - /android
- `GT` - /thanks
- `ME` - /premium/enrollment
- `MEDC` - /premium/enrollment/distraction-control
- `HME` - /premium
- `Z` - /premium/installed
- `X` - /premium/payment
- `U` - Unknown/other pages

### `country` Values
Any 2-letter ISO country code (e.g., `US`, `GB`, `DE`, `FR`, `CA`, `AU`, etc.)

### `defaultCurrency` Values
- `USD`, `EUR`, `GBP`, `CAD`, `AUD`, `NZD`, `CHF`, `PLN`, `JPY`, `RUB`

### `premium-checkout__frequency` Values
- `monthly`
- `yearly`

### `premium-checkout__flow` Values
- `purchase` - New purchase flow
- `restore-purchase` - Existing customer restoration
- `activation-handoff` - Activation from another page
- `trial` - Trial signup flow

### `bro` (Browser Override) Values
- `E` - Chrome
- `S` - Safari
- `F` - Firefox
- `O` - Opera
- `M` - Edge (legacy)
- `CM` - Chromium Edge
- `T` - Internet Explorer
- `G` - Samsung Browser

## Notes for Log Parsing

1. **URL-encoded values**: All parameter values in `httpRequest.requestUrl` will be URL-encoded (e.g., `email=user%40example.com`)
2. **Boolean flags**: Many parameters are presence-only (no value needed). If the key exists, it's true: `?design`, `?dev`, `?testmode`
3. **Parameters with underscores**: Premium checkout uses double underscores (`premium-checkout__`), anti-adblock pass uses double underscores (`anti_adblock_pass__`)
4. **Case sensitivity**: All parameter names are case-sensitive
5. **Multiple values**: Some URLs may have the same parameter multiple times (though not common in this codebase)
6. **Empty values**: Parameters like `?variant=` with no value should be treated as invalid/missing
7. **Numeric parameters**: `variant`, `var`, `exp` are always numeric strings when present
8. **Email parameters**: The `email` parameter will appear in restore-purchase and trial flows
