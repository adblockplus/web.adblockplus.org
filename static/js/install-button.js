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
    "yandexbrowser": "https://eyeo.to/adblockplus/yandex_install/"
  };

  var mobileBrowsers = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/"
  };

  var mobilePlatforms = {
    "android": "https://eyeo.to/adblockbrowser/android/",
    "ios": "https://eyeo.to/adblockbrowser/ios/"
  };

  var browser, mobilePlatform;

  function getDetectedBrowserLabel(keys)
  {
    for (var key in keys)
    {
      if (bowser[key])
        return key;
    }

    return false;
  }

  function setupInstallButton()
  {
    var bodyClassList = document.body.classList,
        installButton = document.getElementById("install-button"),
        installSuffix = installButton.getAttribute("data-install-suffix"),
        installerHref, installTextTemplate, gaData;

    mobilePlatform = getDetectedBrowserLabel(mobilePlatforms);

    if (mobilePlatform)
      browser = getDetectedBrowserLabel(mobileBrowsers);
    else
      if (navigator.userAgent.indexOf("Edg/") != -1)
        browser = "msedge_chromium"
      else
        browser = getDetectedBrowserLabel(desktopBrowsers);

    if (mobilePlatform)
      if (browser)
        installerHref = mobileBrowsers[browser];
      else
        installerHref = mobilePlatforms[mobilePlatform];
    else if (browser)
      installerHref = desktopBrowsers[browser];

    if (mobilePlatform || browser)
      installerHref += installSuffix;

    if (mobilePlatform) bodyClassList.add(mobilePlatform);
    if (browser) bodyClassList.add(browser);

    // Prevent overwriting localized href when browser is not detected
    if (installerHref)
      installButton.href = installerHref;

    installTextTemplate = document.getElementById(
      browser == "msedge_chromium" ?
        "download-label-msedge" :
        "download-label-" + (browser || mobilePlatform)
    );

    var installTextContainer = false;

    try {
      installTextContainer = installButton.querySelector(".install-text");
    } catch (error) {
      // silence is golden
    }

    if (installTextTemplate)
      if (installTextContainer)
        installTextContainer.textContent = installTextTemplate.textContent;
      else
        installButton.textContent = installTextTemplate.textContent;

    if (browser || mobilePlatform)
    {
      try {
        gaData = JSON.parse(installButton.getAttribute("data-ga"));
      } catch (error) {
        gaData = {
          "event_category": "Parse Error",
          "event_action": "Link click"
        };
      }

      gaData["event_action"] = "Download";

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
  }

  if (typeof bowser != "undefined") setupInstallButton();

}());
