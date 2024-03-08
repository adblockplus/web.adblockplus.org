/**
 * Handler for requests to '/redirect'
 */

const express = require('express');
const router = express.Router();

const { getQueryString } = require('../utils/utils.js');

let forumLanguages;
let defaultForumLanguage = 64;


// Handle '/redirect' path
router.get('/', (req, res) => {
  const language = req.query.lang || 'en';
  const link = req.query.link;
  const locale = req.query.locale
  const query = getQueryString(req);

  const adblock_browser_android_download = 'https://downloads.adblockplus.org/adblockbrowser-1.1.0-arm.apk';

  // Google Play is not available in China, so we redirect them to the builds for download, see http://hub.eyeo.com/issues/20183
  let adblock_browser_android_store = (locale && (locale.startsWith("zh_") || locale.startsWith("zh-")))  ?
      adblock_browser_android_download : 'https://play.google.com/store/apps/details?id=org.adblockplus.browser';

  // String literal matches
  let redirects = {
    'adblock_browser_android_store': adblock_browser_android_store,
    'adblock_browser_android_download': adblock_browser_android_download,
    'filterdoc': 'https://help.adblockplus.org/hc/en-us/articles/360062733293',
    'imprint': `https://adblockplus.org/${language}/imprint`,
    'adblock_plus_report_issue': `https://forums.lanik.us/viewforum.php?f=${getForumLanguage(language)}`,
    'manifestv3_explanation': 'https://blog.adblockplus.org/blog/how-adblock-plus-is-getting-ready-for-manifest-v3',
    'uninstalled': `/${language}/uninstalled${query}`,
    'gettingStarted': `/${language}/getting_started`,
    'faq': `/${language}/faq`,
    'subscriptions': `/${language}/subscriptions`,
    'reporter_privacy': `/${language}/privacy#issue-reporter`,
    'privacy': `/${language}/privacy`,
    'contribute': `/${language}/contribute`,
    'donate': `/${language}/contribution`,
    'acceptable_ads': `/${language}/acceptable-ads`,
    'acceptable_ads_criteria': `/${language}/acceptable-ads#criteria`,
    'contributors': `/${language}/contributors`,
    'whitelist': `/${language}/faq_basics#disable`,
    'allowlist': `/${language}/faq_basics#disable`,
    'acceptable_ads_opt_out': `/${language}/acceptable-ads#optout`,
    'donate_settings_page': `/${language}/contribution?utm_source=abp&utm_medium=settings_page&utm_campaign=donate`,
    'learn_more_premium_pass': 'https://flattr.com/',
    'adblock_ios': 'https://apps.apple.com/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868',
  };
  let destination = redirects[link];

  // Regex match if no literal match
  regexMatch: if (!destination) {
    if (/adblock_browser_promotion_\d/.test(link)) {
      destination = 'https://adblockplus.org/adblock-browser';
      break regexMatch;
    }
  }

  // If there is no match in the above legacy redirects, bridge request to new redirect service
  return res.redirect(destination || `${req.protocol}://eyeo.to/adblockplus/${link}/legacy`);
});

function getForumLanguage(language) {
  defaultForumLanguage = defaultForumLanguage || 64;
  forumLanguages = forumLanguages || {
    'id': 94, 'nl': 100, 'de': 90, 'it': 96, 'es': 103,
    'lt': 101, 'lv': 99, 'ar': 98, 'fr': 91, 'ru': 102,
  };

  return forumLanguages[language.toLowerCase()] || 64;
}

module.exports = router;