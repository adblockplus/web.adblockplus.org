TEST_DATA_ABPO = [(
      '/en',
      '/en/',
), (
      '/android',
      '/',
), (
      '/chrome',
      '/',
), (
      '/edge',
      '/',
), (
      '/firefox',
      '/',
), (
      '/internet-explorer',
      '/',
), (
      '/opera',
      '/',
), (
      '/safari',
      '/',
), (
      '/yandex-browser',
      '/',
), (
      '/es_MX/about',
      '/es/about',
), (
      '/it/about',
      '/about',
), (
      '/foo/android',
      '/',
), (
      '/foo/chrome',
      '/',
), (
      '/foo/edge',
      '/',
), (
      '/foo/firefox',
      '/',
), (
      '/foo/internet-explorer',
      '/',
), (
      '/foo/opera',
      '/',
), (
      '/foo/safari',
      '/',
), (
      '/foo/yandex-browser',
      '/',
), (
      '/en/changelog-1.3.1',
      '/en//changelog-1.3',
), (
      '/de/ad-blocker-safari/',
      '/de/',
), (
      '/fr/ad-blocker-safari/',
      '/fr/',
), (
      '/en/android-about/',
      '/',
), (
      '/redirect?link=adblock_browser_promotion_2',
      '/adblock-browser',
), (
      '/redirect?link=imprint',
      '/en/imprint',
), (
      '/redirect?link=share-',
      '/en/share?a=minimal',
), (
      '/redirect?link=uninstalled',
      '/en/uninstalled',
), (
      '/redirect?link=gettingStarted',
      '/en/getting_started',
), (
      '/redirect?link=faq',
      '/en/faq',
), (
      '/redirect?link=subscriptions',
      '/en/subscriptions',
), (
      '/redirect?link=reporter_privacy',
      '/en/privacy#issue-reporter',
), (
      '/redirect?link=privacy',
      '/en/privacy',
), (
      '/redirect?link=contribute',
      '/en/contribute',
), (
      '/redirect?link=donate',
      '/en/periodic-contribution',
), (
      '/redirect?link=acceptable_ads',
      '/en/acceptable-ads',
), (
      '/redirect?link=acceptable_ads_criteria',
      '/en/acceptable-ads#criteria',
), (
      '/redirect?link=contributors',
      '/en/contributors',
), (
      '/redirect?link=whitelist',
      '/en/faq_basics#disable',
), (
      '/redirect?link=allowlist',
      '/en/faq_basics#disable',
), (
      '/redirect?link=acceptable_ads_opt_out',
      '/en/acceptable-ads#optout',
), (
      '/redirect?link=donate_settings_page',
      '/en/periodic-contribution?utm_source=abp&utm_medium=settings_page&utm_campaign=donate',
), (
      '/blog',
      '/blog/',
), (
      '/releases',
      '/releases/',
), (
      '/development-builds',
      '/development-builds/',
), (
      '/atom',
      '/atom',
), (
      '/rss',
      '/rss',
), (
      '/category',
      '/category',
), (
      '/section',
      '/section',
), (
      '/author',
      '/author',
), (
      '/file_download',
      '/file_download',
), (
      '/images',
      '/images/',
), (
      '/textpattern',
      '/textpattern/',
), (
      '/forum',
      '/forum/',
), (
      '/subscriptions.xml',
      '/subscriptions.xml',
), (
      '/subscriptions2.xml',
      '/subscriptions2.xml',
), (
      '/subscriptionStatus',
      '/subscriptionStatus',
), (
      '/docs',
      '/docs/',
), (
      '/jsdoc',
      '/jsdoc/',
), (
      '/403.html',
      '/403.html',
)]


TEST_DATA_DIFFERENT_DOMAIN = [(
      '/downloads/',
      'https://downloads.adblockplus.org/',
), (
      '/update.rdf',
      'https://update.adblockplus.org/gecko/update.rdf',
), (
      '/updates.plist',
      'data:,',
), (
      '/androidupdate.json',
      'https://update.adblockplus.org/adblockplusandroid/update.json',
), (
      '/androidupdates.xml',
      'https://update.adblockplus.org/adblockplusandroid/updates.xml',
), (
      '/ieupdate.json',
      'https://update.adblockplus.org/adblockplusie/update.json',
), (
      '/en/adblock-browser',
      'https://adblockbrowser.org/',
), (
      '/devbuilds/',
      'https://adblockplus.org/development-builds/',
), (
      '/filters',
      'https://help.adblockplus.org/hc/articles/360062733293',
), (
      '/fr/filters',
      'https://help.adblockplus.org/hc/articles/360062733293',
), (
      '/redirect?locale=zh_CN&link=adblock_browser_android_store',
      'data:,',
), (
      '/redirect?link=adblock_browser_android_store',
      'https://play.google.com/store/apps/details?id=org.adblockplus.browser',
), (
      '/redirect?link=adblock_browser_android_download',
      'data:,',
), (
      '/redirect?link=filterdoc',
      'https://help.adblockplus.org/hc/en-us/articles/360062733293',
), (
      '/redirect?link=adblock_plus_report_issue',
      'https://forums.lanik.us/viewforum.php?f=64',
), (
      '/redirect?link=adblock_plus_report_issue&lang=id',
      'https://forums.lanik.us/viewforum.php?f=94',
), (
      '/redirect?link=adblock_plus_report_issue&lang=nl',
      'https://forums.lanik.us/viewforum.php?f=100',
), (
      '/redirect?link=adblock_plus_report_issue&lang=de',
      'https://forums.lanik.us/viewforum.php?f=90',
), (
      '/redirect?link=adblock_plus_report_issue&lang=it',
      'https://forums.lanik.us/viewforum.php?f=96',
), (
      '/redirect?link=adblock_plus_report_issue&lang=es',
      'https://forums.lanik.us/viewforum.php?f=103',
), (
      '/redirect?link=adblock_plus_report_issue&lang=lt',
      'https://forums.lanik.us/viewforum.php?f=101',
), (
      '/redirect?link=adblock_plus_report_issue&lang=lv',
      'https://forums.lanik.us/viewforum.php?f=99',
), (
      '/redirect?link=adblock_plus_report_issue&lang=ar',
      'https://forums.lanik.us/viewforum.php?f=98',
), (
      '/redirect?link=adblock_plus_report_issue&lang=fr',
      'https://forums.lanik.us/viewforum.php?f=91',
), (
      '/redirect?link=adblock_plus_report_issue&lang=ru',
      'https://forums.lanik.us/viewforum.php?f=102',
), (
      '/redirect?link=share',
      'https://share.adblockplus.org/en/?',
), (
      '/devbuilds',
      'https://adblockplus.org/development-builds/',
)]



