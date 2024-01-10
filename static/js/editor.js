
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
    "chrome": "https://eyeo.to/adblockplus/chrome_install/",
    "firefox": "https://eyeo.to/adblockplus/firefox_install/",
    "msedge": "https://eyeo.to/adblockplus/edge_chromium_install/",
    "opera": "https://eyeo.to/adblockplus/opera_install/",
    "safari": "https://eyeo.to/adblockplus/safari_install/",
    "yandexbrowser": "https://eyeo.to/adblockplus/yandex_install/"
  };

  const mobileBrowserDownloads = {
    "safari": "https://eyeo.to/adblockplus/ios_safari_install/",
    "samsungBrowser": "https://eyeo.to/adblockplus/android_samsung_install/"
  };

  const mobilePlatformDownloads = {
    "android": "https://eyeo.to/adblockbrowser/android/",
    "ios": "https://eyeo.to/adblockbrowser/ios/"
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