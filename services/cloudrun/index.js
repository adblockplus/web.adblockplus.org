const express = require('express');
const app = express();

// geoip based rules in static/js/payment/config/.htaccess
let euRules, geoipRules;

app.get('/payment-config-function', (req, res) => {
  euRules = euRules || [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'GR', 'HU', 'IE',
    'IT', 'LV', 'LT', 'LG', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ].reduce((acc, country) => ({...acc, [country]: 'eu.js'}), {});

  geoipRules = geoipRules || {
    'GB': 'gb.js', 'US': 'us.js', 'DE': 'de.js', 'CH': 'ch.js', 'AU': 'au.js',
    'CA': 'ca.js', 'NZ': 'nz.js', 'RU': 'ru.js', 'JP': 'jp.js',
    ...euRules
  };

  const countryCode = req.headers['x-country-code'];

  // FIXME: returning `us.js` as default instead of `load.js` to prevent circular redirect
  // TODO: Confirm this doesn't break anything
  // const paymentConfig = geoipRules[countryCode] || 'load.js';
  const paymentConfig = geoipRules[countryCode] || 'us.js';

  const queryString = Object.keys(req.query).length > 0
    ? req.url.substring(req.url.indexOf('?'))
    : '';

  res.redirect(302, `/js/payment/config/${paymentConfig}${queryString}`);
});

// Demo function to show req headers
app.get('/headers', (req, res) => {
  console.log('web-abp-org-cloudrun-service received a headers request.');

  res.send(`<!doctype html>
    <head>
      <title>Request Headers</title>
    </head>
    <body>
      <pre>${JSON.stringify(req.headers, null, 2)}</pre>
    </body>
  </html>`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('web-abp-org-cloudrun-service listening on port', port);
});
