const express = require('express');
const app = express();
const legacyRedirects = require('./handlers/legacy_redirects');
const { getQueryString } = require('./utils/utils.js');

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

app.use('/redirect', legacyRedirects);

const allowRobotsTxt = `User-agent: *
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

const disallowRobotsTxt = `User-agent: *
Disallow: /`;

app.get("/robots.txt", (req, res) => {
  if (req.headers["x-forwarded-host"] != "adblockplus.org") {
    res.status(200).send(disallowRobotsTxt);
  } else {
    res.status(200).send(allowRobotsTxt);
  }
});

app.get("/settings", (req, res) => {
  const location = req.headers['x-country-code'];
  const settings = {
    location,
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end(JSON.stringify(settings));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('web-abp-org-cloudrun-service listening on port', port);
});