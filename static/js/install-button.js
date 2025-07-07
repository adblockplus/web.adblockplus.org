(function()
{
  var desktopBrowsers = {
    "chrome": "https://chromewebstore.google.com/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "chromium": "https://chromewebstore.google.com/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "firefox": "https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/",
    "msedge": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "msedge_chromium": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "opera": "https://addons.opera.com/en/extensions/details/adblock-plus/",
    "safari": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1432731683",
    "yandexbrowser": "https://chromewebstore.google.com/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb"
  };

  var mobileBrowsers = {
    "safari": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1028871868",
    "samsungBrowser": "https://play.google.com/store/apps/details?id=org.adblockplus.adblockplussbrowser"
  };

  var mobilePlatforms = {
    "android": "https://play.google.com/store/apps/details?id=org.adblockplus.browser",
    "ios": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1028871868"
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
        installClassList = installButton.classList,
        installSuffix = installButton.getAttribute("data-install-suffix"),
        installerHref, installTextTemplate, gaData;

    mobilePlatform = getDetectedBrowserLabel(mobilePlatforms);

    if (mobilePlatform)
      browser = getDetectedBrowserLabel(mobileBrowsers);
    else
      if (navigator.userAgent.indexOf("Edg/") != -1)
        browser = "msedge_chromium";
      else
        browser = getDetectedBrowserLabel(desktopBrowsers);

    if (mobilePlatform)
      if (browser)
        installerHref = mobileBrowsers[browser];
      else
        installerHref = mobilePlatforms[mobilePlatform];
    else if (browser)
      installerHref = desktopBrowsers[browser];

    if (mobilePlatform) bodyClassList.add(mobilePlatform);

    if (browser) bodyClassList.add(browser);

    if (mobilePlatform || browser)
    {
      installerHref += installSuffix;
      installClassList.remove("go-to-download");
    }

    if (mobilePlatform && browser)
    {
      installClassList.add(
        "abp-" + mobilePlatform + "-" + browser
      );
    }
    else if (mobilePlatform)
    {
      installClassList.add(
        "abb-" + mobilePlatform
      );
    }
    else if (browser)
    {
      installClassList.add("abp-" + browser);
    }

    // Prevent overwriting localized href when browser is not detected
    if (installerHref)
      installButton.href = installerHref;

    installTextTemplate = document.getElementById(
      browser == "msedge_chromium" ?
        "download-label-msedge" :
        "download-label-" + (browser || mobilePlatform)
    );

    if (installTextTemplate)
      installButton.textContent = installTextTemplate.textContent;
  }

  if (typeof bowser != "undefined") setupInstallButton();

}());
