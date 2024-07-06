"use strict";

(function()
{
  var desktopBrowsers = {
    "chrome": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "opera": "https://addons.opera.com/en/extensions/details/adblock-plus/",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "msedge": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "firefox": "https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/",
    "safari": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1432731683"
  };

  var mobileBrowsers = {
    "safari": "https://apps.apple.com/us/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868",
    "samsungBrowser": "https://play.google.com/store/apps/details?id=org.adblockplus.adblockplussbrowser"
  };

  var mobilePlatforms = {
    "android": "https://play.google.com/store/apps/details?id=org.adblockplus.browser"
  };

  function getBowserKey(keys)
  {
    return Object.keys(keys).find(bowser.hasOwnProperty.bind(bowser));
  }

  function setupHeroDownloadButton()
  {
    var bodyClassList = document.body.classList;

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

    if (browser || mobilePlatform)
    {
      var heroDownloadButtonTemplate = document.getElementById(
        "download-label-" + (browser || mobilePlatform)
      ) || (
        document.getElementById("download-label-chrome")
      );

      heroDownloadButton.textContent = heroDownloadButtonTemplate.textContent;

      var gaData;

      try {
        gaData = JSON.parse(heroDownloadButton.getAttribute("data-ga"));
      } catch (error) {
        gaData = {
          "event_category": "Parse Error",
          "event_action": "Link click"
        };
      }

      if (mobilePlatform)
        gaData["event_label"] = "Downloaded_" + (
          mobilePlatform == "ios" ? (
            browser == "safari" &&
              "safari_ios"
          ) : (
            browser == "samsungBrowser" ?
              "android_samsung"
              : "abb_android"
          )
        );
      else
        gaData["event_label"] = "Downloaded_" + browser;

      heroDownloadButton.setAttribute("data-ga", JSON.stringify(gaData));
    }
  }

  if (typeof bowser != "undefined") setupHeroDownloadButton();

}());
