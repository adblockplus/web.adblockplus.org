"use strict";

(function()
{
  var desktopBrowsers = {
    "chrome": "https://eyeo.to/adblockplus/chrome_install/polish-lp",
    "opera": "https://eyeo.to/adblockplus/opera_install/polish-lp",
    "yandexbrowser": "https://eyeo.to/adblockplus/yandex_install/polish-lp",
    "msie": "https://eyeo.to/adblockplus/ie_install/polish-lp",
    "msedge": "https://eyeo.to/adblockplus/edge_install/polish-lp",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/polish-lp",
    "safari": "https://eyeo.to/adblockplus/safari_install/polish-lp"
  };

  var mobileBrowsers = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/polish-lp",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/polish-lp"
  };

  var mobilePlatforms = {
    "ios": "https://eyeo.to/adblockbrowser/ios/polish-lp",
    "android": "https://eyeo.to/adblockbrowser/android/polish-lp"
  };

  function getBowserKey(keys)
  {
    return Object.keys(keys).find(bowser.hasOwnProperty.bind(bowser));
  }

  function setupHeroDownloadButton()
  {
    var bodyClassList = document.body.classList;

    // ABP comes with Maxthon out of the box.
    if (bowser.maxthon)
      return bodyClassList.add("maxthon");

    var mobilePlatform = getBowserKey(mobilePlatforms);

    var browser = !!mobilePlatform ?
      getBowserKey(mobileBrowsers):
      getBowserKey(desktopBrowsers);

    var heroDownloadButton = document.getElementById("hero-download-button");

    var installerHref;

    if (!!mobilePlatform)
      if (!!browser)
        installerHref = mobileBrowsers[browser];
      else
        installerHref = mobilePlatforms[mobilePlatform];
    else
      installerHref = desktopBrowsers[browser];

    // Default to chrome until the download page is published
    if (!installerHref)
      installerHref = desktopBrowsers.chrome;

    if (!!mobilePlatform) bodyClassList.add(mobilePlatform);

    if (!!browser) bodyClassList.add(browser);

    heroDownloadButton.href = installerHref;

    var heroDownloadButtonTemplate = document.getElementById(
      "download-label-" + (browser || mobilePlatform)
    ) || (
      document.getElementById("download-label-chrome")
    );

    heroDownloadButton.textContent = heroDownloadButtonTemplate.textContent;
  }

  if (typeof bowser != "undefined") setupHeroDownloadButton();

}());
