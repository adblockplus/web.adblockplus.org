(function()
{
  var desktopBrowsers = {
    "chrome": "https://eyeo.to/adblockplus/chrome_install/",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/",
    "msedge": "https://eyeo.to/adblockplus/edge_install/",
    "msedge_chromium": "https://eyeo.to/adblockplus/edge_chromium_install/",
    "msie": "https://eyeo.to/adblockplus/ie_install/",
    "opera": "https://eyeo.to/adblockplus/opera_install/",
    "safari": "https://eyeo.to/adblockplus/safari_install/",
    "yandexbrowser": "https://eyeo.to/adblockplus/yandex_install"
  };

  var reinstallDesktopBrowsers = {
    "chrome": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb?utm_source=website&utm_medium=landing&utm_campaign=uninstalled_page",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/uninstalled_page/",
    "msedge": "https://eyeo.to/adblockplus/edge_install/uninstalled_page/",
    "msedge_chromium": "https://eyeo.to/adblockplus/edge_chromium_install/uninstalled_page/",
    "msie": "https://eyeo.to/adblockplus/ie_install/uninstalled_page/",
    "opera": "https://eyeo.to/adblockplus/opera_install/uninstalled_page/",
    "safari": "https://eyeo.to/adblockplus/safari_install/uninstalled_page/",
    "yandexbrowser": "https://eyeo.to/adblockplus/yandex_install/uninstalled_page/"
  }

  var mobileBrowsers = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/"
  };

  var reinstallMobileBrowsers = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/uninstalled_page/",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/uninstalled_page/"
  };

  var mobilePlatforms = {
    "android": "https://eyeo.to/adblockbrowser/android/",
    "ios": "https://eyeo.to/adblockbrowser/ios/"
  };

  var reinstallMobilePlatforms = {
    "android": "https://eyeo.to/adblockbrowser/android/uninstalled_page/",
    "ios": "https://eyeo.to/adblockbrowser/ios/uninstalled_page/"
  };


  var browser, mobilePlatform;

  function getBowserKey(keys)
  {
    for (var key in keys)
    {
      if (bowser[key])
        return key;
    }
  }

  function setupInstallHref(
    mobilePlatform,
    mobileBrowsers,
    desktopBrowsers,
  ){
    browser = !!mobilePlatform ?
      getBowserKey(mobileBrowsers):
      getBowserKey(desktopBrowsers);
    if (!!mobilePlatform)
      if (!!browser)
        return installerHref = mobileBrowsers[browser];
      else
        return installerHref = mobilePlatforms[mobilePlatform];
    else if (!!browser)
      return installerHref = desktopBrowsers[browser];
  }

  function setupInstallButton()
  {
    var bodyClassList = document.body.classList,
        installButton = document.getElementById("install-button"),
        pageId = installButton.getAttribute("data-pageid"),
        homepage = pageId == "homepage",
        installerHref = "download";

    // ABP comes with Maxthon out of the box.
    if (bowser.maxthon)
      return bodyClassList.add("maxthon");

    mobilePlatform = getBowserKey(mobilePlatforms);

    if (!!homepage)
      installerHref = setupInstallHref(
        mobilePlatform,
        mobileBrowsers,
        desktopBrowsers,
      );
    else
      installerHref = setupInstallHref(
        mobilePlatform,
        reinstallMobileBrowsers,
        reinstallDesktopBrowsers
      );

    if (!!mobilePlatform) bodyClassList.add(mobilePlatform);

    if (!!browser) bodyClassList.add(browser);

    installButton.href = installerHref;

    // The default label changes when a browser or platform is detected
    if (browser || mobilePlatform)
    {
      if (!!homepage) {
        var installButtonTemplate = document.getElementById(
          "download-label-" + (browser || mobilePlatform)
        );

        installButton.textContent = installButtonTemplate.textContent;
      }

      var gaData;

      try {
        gaData = JSON.parse(installButton.getAttribute("data-ga"));
      } catch (error) {
        gaData = {
          "event_category": "Parse Error",
          "event_action": "Link click"
        };
      }

      if (mobilePlatform)
        gaData["event_label"] = "Downloaded_" + (
          mobilePlatform == "ios" ? (
            browser == "safari" ?
              "safari_ios"
              : "abb_ios"
          ) : (
            browser == "samsungBrowser" ?
              "android_samsung"
              : "abb_android"
          )
        );
      else
        gaData["event_label"] = "Downloaded_" + browser;

      installButton.setAttribute("data-ga", JSON.stringify(gaData));
    }
    else // browser not detected
    {
      installButton.setAttribute("data-ga", JSON.stringify({
        "event_category": "Download_button",
        "event_action": "Go_to_download",
        "event_label": "Fallback_button"
      }));
    }
  }

  if (typeof bowser != "undefined") setupInstallButton();

}());
