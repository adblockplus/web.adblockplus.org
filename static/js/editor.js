
// Setup Accordions
(function(){

  const accordionHeadings = document.querySelectorAll(".accordion__heading a");

  let accordionCount = 0;
  
  accordionHeadings.forEach(accordionHeading => {
    accordionCount++;
    const accordionBody = accordionHeading.parentElement.parentElement.nextElementSibling;
    const accordionBodyId = `accordion-${accordionCount}`;
    accordionBody.setAttribute("id", accordionBodyId);
    accordionHeading.setAttribute("aria-expanded", "false");
    accordionHeading.setAttribute("aria-controls", accordionBodyId);
    accordionHeading.addEventListener("click", event => {
      event.preventDefault();
      const expanded = accordionHeading.getAttribute("aria-expanded") == "true";
      accordionHeading.setAttribute("aria-expanded", !expanded);
      if (expanded) {
        accordionBody.style.maxHeight = null;
      } else {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
      }
    });
  });

})();

// Setup download buttons
(function(){

  const userAgent = navigator.userAgent;

  const browser =
    /opera|opr\/|opios/i.test(userAgent) ? 'opera'
    : /SamsungBrowser/i.test(userAgent) ? 'samsungBrowser'
    : /yabrowser/i.test(userAgent) ? 'yandexbrowser'
    : /edg\//i.test(userAgent) ? 'msedge'
    : /firefox|iceweasel|fxios/i.test(userAgent) ? 'firefox'
    : /chrome|crios|crmo|chromium/i.test(userAgent) ? 'chrome'
    : /safari|applewebkit/i.test(userAgent) ? 'safari'
    : 'other';

  const isIOS = ['iPad','iPhone'].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  const isAndroid = /(android)/i.test(navigator.userAgent);

  const mobilePlatform = isIOS ? "ios" : isAndroid ? "android" : "";

  const desktopDownloads = {
    "chrome": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "firefox": "https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/",
    "msedge": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "opera": "https://addons.opera.com/en/extensions/details/adblock-plus/",
    "safari": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1432731683",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb"
  };

  const mobileBrowserDownloads = {
    "safari": "https://apps.apple.com/us/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868",
    "samsungBrowser": "https://play.google.com/store/apps/details?id=org.adblockplus.adblockplussbrowser"
  };

  const mobilePlatformDownloads = {
    "android": "https://play.google.com/store/apps/details?id=org.adblockplus.browser",
    "ios": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1028871868"
  };

  const buttons = document.querySelectorAll(".download-button");

  let buttonHREF, buttonClass, buttonText;

  if (isIOS || isAndroid) {
    if (browser == "safari" || browser == "samsungBrowser") {
      buttonHREF = mobileBrowserDownloads[browser];
      buttonClass = `abp-${mobilePlatform}-${browser}`;
    } else {
      buttonHREF = mobilePlatformDownloads[isIOS ? "ios" : "android"];
      buttonClass = `abp-${mobilePlatform}`;
    }
  } else {
    if (!browser) browser = "chrome";
    buttonHREF = desktopDownloads[browser];
    buttonClass = `abp-${browser}`;
  }

  const htmlClasses = document.documentElement.classList;
  if (browser) htmlClasses.add(browser);
  if (mobilePlatform) htmlClasses.add(mobilePlatform);

  buttonText = document.getElementById(`download-label-${browser || mobilePlatform}`);
  buttonText = buttonText ? buttonText.textContent : "";

  buttons.forEach(button => {
    if (buttonHREF) button.href = buttonHREF;
    if (buttonClass) button.classList.add(buttonClass);
    if (buttonText) button.textContent = buttonText;
  });

  document.querySelectorAll(".download-terms a").forEach(link => {
    link.href = "https://adblockplus.org/terms";
  });

})();