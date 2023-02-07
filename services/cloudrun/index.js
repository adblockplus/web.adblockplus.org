const express = require('express');
const app = express();

// geoip based rules in static/js/payment/config/.htaccess
let euRules, geoipRules;

// EU countries in static/js/testing/.htaccess
let euCountries;

// hotjar countries in static/js/testing/.htaccess
let hotjarCountries;



// Helper functions

/**
 * Return the query string portion of a request
 * @param {req} req expressjs req object
 * @returns {String} Query string
 */
function getQueryString(req) {
  return Object.keys(req.query).length > 0
    ? req.url.substring(req.url.indexOf('?'))
    : '';
}



// Request handlers

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

  const queryString = getQueryString(req);

  res.redirect(302, `/js/payment/config/${paymentConfig}${queryString}`);
});

app.get('/optimizely-function', (req, res) => {
  euCountries = euCountries || [
    'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE','ES', 'FI', 'FR', 'GB', 'GR',
    'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL',
    'PT', 'RO', 'SE', 'SI'
  ];

  const countryCode = req.headers['x-country-code'];

  const queryString = getQueryString(req);

  const target = euCountries.includes(countryCode)
    ? 'noop.js'
    : 'firebase/optimizely.js';
  
  res.redirect(302, `/js/testing/${target}${queryString}`);
});

app.get('/hotjar-function', (req, res) => {
  hotjarCountries = hotjarCountries || ['US', 'CA', 'AU', 'NZ'];

  const countryCode = req.headers['x-country-code'];

  const acceptLanguages = req.headers['accept-language'].split(',');

  const queryString = getQueryString(req);

  let target;

  if (hotjarCountries.includes(countryCode) && acceptLanguages.includes('en')) {
    target = 'firebase/hotjar.js';
  } else {
    target = 'noop.js';
  }
  
  res.redirect(302, `/js/testing/${target}${queryString}`);
});



// Listener config

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('web-abp-org-cloudrun-service listening on port', port);
});

