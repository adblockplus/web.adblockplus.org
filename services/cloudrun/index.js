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

app.get('/update-function/:language?', (req, res) => {
  const countryCode = req.headers['x-country-code'];
  const language = req.params.language || 'en';
  const query = getQueryString(req);
  if (["US","GB","CA","FR","DE","NL","IT","ES","BE","SE","CH","MX","IL",
  "DK","IE","AT","NO","CZ","GR","FI","CL","PT","HU","SK","RO","ZA","SA",
  "SI","EE","UA","IS","LV","BG","HR","PR","LT","LU","UY","CR","CY","DO",
  "MT","RE","PA","KE","BM","GT","JM","PY","SV","TT","GE","GP","VG","CW",
  "NC","BB","MD","MC","CI","MU","SN","MG","MQ","GF","AW","NA","LC","GA",
  "AZ","FO","TZ","GD","TG","BW","YT","BF","TJ","CM","GY","MZ","GG","VC",
  ].includes(countryCode)) {
    res.redirect(302, path.join("/", language, "update") + query);
  } else {
    res.redirect(302, path.join("/", language, "educational") + query)
  }
});

app.get('/installed-function/:language?', (req, res) => {
  const language = req.params.language || '';
  const page = 'installed-fallback';
  const query = getQueryString(req);
  res.redirect(302, path.join('/', language, page) + query);
});

app.get('/contribution-function/:language?', (req, res) => {
  const language = req.params.language || '';
  const page = 'contribution-fallback';
  const query = getQueryString(req);
  res.redirect(302, path.join('/', language, page) + query);
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

