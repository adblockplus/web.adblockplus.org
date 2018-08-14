(function()
{
  var desktopBrowsers = {
    "chrome": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "opera": "https://eyeo.to/adblockplus/opera_install/",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "msie": "https://eyeo.to/adblockplus/ie_install/",
    "msedge": "https://eyeo.to/adblockplus/edge_install/",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/",
    "safari": "https://eyeo.to/adblockplus/safari_install/"
  };

  var mobileBrowsers = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/"
  };

  var mobilePlatforms = {
    "ios": "https://eyeo.to/adblockbrowser/ios/",
    "android": "https://eyeo.to/adblockbrowser/android/"
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

  function setupHeroDownloadButton()
  {
    var bodyClassList = document.body.classList;

    // ABP comes with Maxthon out of the box.
    if (bowser.maxthon)
      return bodyClassList.add("maxthon");

    mobilePlatform = getBowserKey(mobilePlatforms);

    browser = !!mobilePlatform ?
      getBowserKey(mobileBrowsers):
      getBowserKey(desktopBrowsers);

    var heroDownloadButton = document.getElementById("hero-download-button");

    var installerHref = "download";

    if (!!mobilePlatform)
      if (!!browser)
        installerHref = mobileBrowsers[browser];
      else
        installerHref = mobilePlatforms[mobilePlatform];
    else if (!!browser)
        installerHref = desktopBrowsers[browser];

    if (!!mobilePlatform) bodyClassList.add(mobilePlatform);

    if (!!browser) bodyClassList.add(browser);

    heroDownloadButton.href = installerHref;

    // The default label changes when a browser or platform is detected
    if (browser || mobilePlatform)
    {
      var heroDownloadButtonTemplate = document.getElementById(
        "download-label-" + (browser || mobilePlatform)
      );

      heroDownloadButton.textContent = heroDownloadButtonTemplate.textContent;
    }

    heroDownloadButton.addEventListener("click", function(event)
    {
      if (typeof chrome == "undefined") return;

      event.preventDefault();

      try
      {
        chrome.webstore.install();
      }
      catch(error)
      {
        window.location = this.href;
      }
    });
  }

  if (typeof bowser != "undefined") setupHeroDownloadButton();

}());
