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

  const paymentConfig = geoipRules[countryCode] || 'us.js';

  const queryString = Object.keys(req.query).length > 0
    ? req.url.substring(req.url.indexOf('?'))
    : '';

  res.redirect(302, `/js/payment/config/${paymentConfig}${queryString}`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('web-abp-org-cloudrun-service listening on port', port);
});
