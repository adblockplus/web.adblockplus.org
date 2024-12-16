const express = require('express');
const app = express();
const path = require('path');

const legacyRedirects = require('./handlers/legacy_redirects');
const { getQueryString } = require('./utils/utils.js');

// geoip based rules in static/js/payment/config/.htaccess
let euRules, geoipRules;

let euRules2, geoipRules2;

// pre-approved countries in static/js/testing/.htaccess
let preapprovedCountries;



// Request handlers

app.use('/redirect', legacyRedirects);

app.get('/payment-config-function', (req, res) => {
  euRules = euRules || [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'GR', 'HU', 'IE',
    'IT', 'LV', 'LT', 'LG', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ].reduce((acc, country) => ({...acc, [country]: 'eu.js'}), {});

  geoipRules = geoipRules || {
    'GB': 'gb.js', 'US': 'us.js', 'DE': 'de.js', 'CH': 'ch.js', 'AU': 'au.js',
    'CA': 'ca.js', 'NZ': 'nz.js', 'RU': 'ru.js', 'JP': 'jp.js', 'FR': 'fr.js',
    ...euRules
  };

  const countryCode = req.headers['x-country-code'];

  const paymentConfig = geoipRules[countryCode] || 'us.js';

  const queryString = getQueryString(req);

  res.redirect(302, `/js/payment/config/${paymentConfig}${queryString}`);
});

app.get("/robots-function", (req, res) => {

  const regularRobotsTxt = `User-agent: *
Disallow: /textpattern/
Disallow: /forum/adm/
Disallow: /forum/download/
Disallow: /forum/images/
Disallow: /forum/includes/
Disallow: /forum/language/
Disallow: /forum/styles/
Disallow: /forum/common.php
Disallow: /forum/config.php
Disallow: /forum/cron.php
Disallow: /forum/faq.php
Disallow: /forum/mcp.php
Disallow: /forum/memberlist.php
Disallow: /forum/posting.php
Disallow: /forum/report.php
Disallow: /forum/search.php
Disallow: /forum/ucp.php
Disallow: /forum/viewonline.php
Disallow: /openid
Disallow: /babelzilla.php
Disallow: /getSubscription
Disallow: /403.html
Disallow: /_include/

User-agent: 008
Disallow: /

User-agent: Linguee
Disallow: /

User-agent: mxbot
Disallow: /

User-agent: ip-web-crawler.com
Disallow: /

User-agent: Screaming Frog SEO Spider
Allow: /`;

  const alternateRobotsTxt = `User-agent: *
Disallow: /`;

  if (req.headers["x-forwarded-host"] != "adblockplus.org") {
    res.status(200).send(alternateRobotsTxt);
  } else {
    res.status(200).send(regularRobotsTxt);
  }

});

app.get('/currency', (req, res) => {
  euRules2 = euRules2 || [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'GR', 'HU',
    'IE', 'IT', 'LV', 'LT', 'LG', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI',
    'ES', 'SE', 'DE'
  ].reduce((acc, country) => ({...acc, [country]: 'eur.js'}), {});

  geoipRules2 = geoipRules2 || {
    'AU': 'aud.js', 'CA': 'cad.js', 'CH': 'chf.js', 'GB': 'gbp.js',
    'JP': 'jpy.js', 'NZ': 'nzd.js', 'RU': 'rub.js',
    ...euRules2
  };

  const countryCode = req.headers['x-country-code'];

  const paymentConfig = geoipRules2[countryCode] || 'usd.js';

  const queryString = getQueryString(req);

  res.redirect(302, `/currencies/${paymentConfig}${queryString}`);
});

// IMPORTANT: Fallback locale rerouting, must be final routing function
// Refd #943 - URLs containing non-exact matching locale paths return a 404
app.get(/^\/([\w-]{2,6})(\/.*)?$/, (req, res) => {
  // Strip locale down to lang only if not in lang-only format eg. `xy_XY`
  // If locale is lang-only eg. `xy`, resource cannot be found at `locale`, so remove `locale`
  const localePath = !(/^[a-z]{2}$/.test(req.params[0]))
    ? `/${req.params[0].slice(0,2).toLowerCase()}`
    : ''
  
  const target = req.params[1] || '/';

  const queryString = getQueryString(req);

  res.redirect(301, `${localePath}${target}${queryString}`);
});


// Listener config

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('web-abp-org-cloudrun-service listening on port', port);
});

