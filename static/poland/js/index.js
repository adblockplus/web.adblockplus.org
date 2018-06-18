"use strict";

(function()
{
  var supportedPlatforms = {

    // Desktop browsers
    "chrome": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "opera": "https://eyeo.to/adblockplus/opera_install/polish-lp",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "msie": "https://eyeo.to/adblockplus/ie_install/polish-lp",
    "msedge": "https://eyeo.to/adblockplus/edge_install/polish-lp",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/polish-lp",
    "safari": "https://eyeo.to/adblockplus/safari_install/polish-lp",
    "maxthon": "",

    // Mobile platforms
    "ios": "https://eyeo.to/adblockplus/ios_install/polish-lp",
    "android": "https://eyeo.to/adblockbrowser/android/abp-website"
  };

  function setupHeroDownloadButton()
  {
    var detectedPlatform = Object.keys(supportedPlatforms)
      .find(bowser.hasOwnProperty.bind(bowser));

    if (!detectedPlatform) return;

    document.body.classList.add(detectedPlatform);

    if (detectedPlatform == "maxthon") return;

    var heroDownloadButton = document.getElementById("hero-download-button");
    heroDownloadButton.href = supportedPlatforms[detectedPlatform];
    heroDownloadButton.textContent = document
      .getElementById("download-label-" + detectedPlatform)
      .textContent;
    
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
        window.location = "/" + this.hreflang + "/download";
      }
    });
  }

  if (typeof bowser != "undefined") setupHeroDownloadButton();

}());
