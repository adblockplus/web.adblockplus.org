/**
 * Handler for requests to '/redirect'
 */

const express = require('express');
const router = express.Router();

const { getQueryString } = require('../utils/utils.js');

let forums;


router.get('/', (req, res) => {
  let lang = req.query.lang || 'en';
  let link = req.query.link;
  let locale = req.query.locale
  let queryString = getQueryString(req);

  let adblock_browser_android_download = 'https://downloads.adblockplus.org/adblockbrowser-1.1.0-arm.apk';

  // Google Play is not available in China, so we redirect them to the builds for download, see http://hub.eyeo.com/issues/20183
  let adblock_browser_android_store = locale && /zh(-|_)\w\w/.test(locale) ?
      adblock_browser_android_download : 'https://play.google.com/store/apps/details?id=org.adblockplus.browser';

  let stringLiteralMatches = {
    'adblock_browser_android_store': adblock_browser_android_store,
    'adblock_browser_android_download': adblock_browser_android_download,
    'filterdoc': 'https://help.adblockplus.org/hc/en-us/articles/360062733293',
    'imprint': `https://adblockplus.org/${lang}/imprint`,
    'adblock_plus_report_issue': `https://forums.lanik.us/viewforum.php?f=${getForum(lang)}`,
    'uninstalled': `/${lang}/uninstalled${queryString}`,
    'gettingStarted': `/${lang}/getting_started`,
    'faq': `/${lang}/faq`,
    'subscription': `/${lang}/subscriptions`,
    'reporter_privacy': `/${lang}/privacy#issue-reporter`,
    'privacy': `/${lang}/privacy`,
    'contribute': `/${lang}/contribute`,
    'donate': `/${lang}/contribution`,
    'acceptable_ads': `/${lang}/acceptable-ads`,
    'acceptable_ads_criteria': `/${lang}/acceptable-ads#criteria`,
    'contributors': `/${lang}/contributors`,
    'whitelist': `/${lang}/faq_basics#disable`,
    'allowlist': `/${lang}/faq_basics#disable`,
    'acceptable_ads_opt_out': `/${lang}/acceptable-ads#optout`,
    'donate_settings_page': `/${lang}/contribution?utm_source=abp&utm_medium=settings_page&utm_campaign=donate`,
    'learn_more_premium_pass': 'https://flattr.com/',
    'adblock_ios': 'https://apps.apple.com/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868',
  };
  let destination = stringLiteralMatches[link];

  // Regex match if no literal match
  regexMatch: if (!destination) {
    if (/adblock_browser_promotion_\d/.test(link)) {
      destination = 'https://adblockplus.org/adblock-browser';
      break regexMatch;
    }
  }
  
  if (destination) {
    return res.redirect(destination);
  }

  // If there is no match in the above legacy redirects, bridge request to new redirect service
  return res.redirect(`${req.protocol}://eyeo.to/adblockplus/${link}/legacy`);
});

const getForum = (lang) => {
  forums = forums || {
    'id': 94, 'nl': 100, 'de': 90, 'it': 96, 'es': 103,
    'lt': 101, 'lv': 99, 'ar': 98, 'fr': 91, 'ru': 102,
  };

  return forums[lang] || 64;
}

module.exports = router;