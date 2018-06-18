"use strict";

(function()
{
  var supportedPlatforms = {

    // Desktop browsers
    "chrome": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "opera": "https://addons.opera.com/extensions/details/opera-adblock/?display=en-US",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
    "msie": "https://update.adblockplus.org/latest/adblockplusie.exe",
    "msedge": "https://www.microsoft.com/store/p/adblock-plus/9nblggh4r9nz",
    "firefox": "https://update.adblockplus.org/latest/adblockplusfirefox.xpi",
    "safari": "https://update.adblockplus.org/latest/adblockplussafari.safariextz",
    "maxthon": "",

    // Mobile platforms
    "ios": "https://eyeo.to/adblockbrowser/ios/abp-website",
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
