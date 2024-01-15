/**
 * Handler for requests to '/redirect'
 */

const express = require('express');
const router = express.Router();

let adblock_browser_android_download, adblock_browser_android_store, forums, links;


router.get('/', (req, res) => {
  let lang = req.query.lang || 'en';
  let link = req.query.link;

  adblock_browser_android_download = adblock_browser_android_download || 'https://downloads.adblockplus.org/adblockbrowser-1.1.0-arm.apk';
  adblock_browser_android_store = adblock_browser_android_store || 'https://play.google.com/store/apps/details?id=org.adblockplus.browser';
  defaultURL = 'https://adblockplus.org'

  links = links || {
    'adblock_browser_android_store': adblock_browser_android_store,
    'adblock_browser_promotion_': 'https://adblockplus.org/adblock-browser',  // FIXME requires alternative solution as regex format `adblock_browser_promotion_\d`
    'adblock_browser_android_download': adblock_browser_android_download,
    'filterdoc': 'https://help.adblockplus.org/hc/en-us/articles/360062733293',
    'imprint': `https://adblockplus.org/${lang}/imprint`,
    'adblock_plus_report_issue': `https://forums.lanik.us/viewforum.php?f=${getForum(lang)}`,
    '(?:^|&)link=share-(?:&|$)': `${lang}/share?a=minimal`,  //FIXME
    'uninstalled': `${lang}/uninstalled`, //FIXME Add query params
    'gettingStarted': `${lang}/getting_started`,
    'faq': `${lang}/faq`,
    'subscription': `${lang}/subscriptions`,
    'reporter_privacy': `${lang}/privacy#issue-reporter`,
    'privacy': `${lang}/privacy`,
    'contribute': `${lang}/contribute`,
    'donate': `${lang}/contribution`,
    'acceptable_ads': `${lang}/acceptable-ads`,
    'acceptable_ads_criteria': `${lang}/acceptable-ads#criteria`,
    'contributors': `${lang}/contributors`,
    'whitelist': `${lang}/faq_basics#disable`,
    'allowlist': `${lang}/faq_basics#disable`,
    'acceptable_ads_opt_out': `${lang}/acceptable-ads#optout`,
    'donate_settings_page': `${lang}/contribution?utm_source=abp&utm_medium=settings_page&utm_campaign=donate`,
    '(?:^|&)link=share(?:&|$)': `https://share.adblockplus.org/${lang}/?`,  //FIXME
    'learn_more_premium_pass': 'https://flattr.com/',
    'adblock_ios': 'https://apps.apple.com/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868',
  };

  if (links[link]) {
    res.redirect(links[link]);
  }

  // If there is no match in the above legacy redirects, bridge request to new redirect service
  res.redirect(`${req.protocol}://eyeo.to/adblockplus/${link}/legacy`);
});

function getForum(lang) {
  forums = forums || {
    'id': 94, 'nl': 100, 'de': 90, 'it': 96, 'es': 103,
    'lt': 101, 'lv': 99, 'ar': 98, 'fr': 91, 'ru': 102,
  };
  return forums[lang] || 64;
}

module.exports = router;