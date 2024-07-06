"use strict";

(function() {
  var desktopBrowsers = {
    "chrome": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "chromium": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb",
    "firefox": "https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/",
    "msedge": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "msedge_chromium": "https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh",
    "opera": "https://addons.opera.com/en/extensions/details/adblock-plus/",
    "safari": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1432731683",
    "yandexbrowser": "https://chrome.google.com/webstore/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb"
  };

  var mobileBrowsers = {
    "safari": "https://apps.apple.com/us/app/adblock-plus-abp-remove-ads-browse-faster-without-tracking/id1028871868",
    "samsungBrowser": "https://play.google.com/store/apps/details?id=org.adblockplus.adblockplussbrowser"
  };

  var mobilePlatforms = {
    "android": "https://play.google.com/store/apps/details?id=org.adblockplus.browser",
    "ios": "https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1028871868"
  };

  function getKey(keys) {
    for (var key in keys) {
      if (navigator.userAgent.indexOf("Edg/") != -1)
        return "msedge";
      else
        if (bowser[key])
          return key;
    }

    return false;
  }

  function setDetectedClass(el, data) {
    if (getKey(data))
      el.classList.add(getKey(data));
  }

  // tabs
  function initTabs() {
    var tabsMenuLinks = [].slice
      .call(document.querySelectorAll(".tabs-menu li a"));
    var tabsContents = [].slice
      .call(document.querySelectorAll(".tab-content"));
    var desktopTabs = document.querySelector(".download-desktop");
    var platformTabs = document.querySelector(".download-mobile");

    function tabsCore(
      element,
      index,
      currentLink,
      currentTab
    ) {
      element.addEventListener("click", function(event) {
        event.preventDefault();

        tabsMenuLinks.forEach(function(item) {
          document.querySelector(currentLink)
            .classList.remove("current-tab");

          document.querySelector(currentTab)
            .classList.remove("current-tab");

          item.setAttribute("aria-selected", "false");

          if (element.getAttribute("href") ==
          "#" + tabsContents[index].getAttribute("id")) {

            tabsContents[index].classList.add("current-tab");

            tabsMenuLinks[index].parentNode.classList.add("current-tab");

            tabsMenuLinks[index].setAttribute("aria-selected", "true");

          }
        });

      });
    }

    // focus the tab on click
    tabsMenuLinks.forEach(function(item, i) {
      if (desktopTabs.contains(item))
        tabsCore(
          item,
          i,
          ".download-desktop .tabs-menu .current-tab",
          ".download-desktop .tab-content.current-tab"
        );

      if (platformTabs.contains(item))
        tabsCore(
          item,
          i,
          ".download-mobile .tabs-menu .current-tab",
          ".download-mobile .tab-content.current-tab"
        );
    });

    // focus the tab on platform/browser detection
    function setTabFocus(
      data,
      currentSelector,
      linkSelector,
      tabSelector
    ) {
      if (getKey(data)) {
        if (document.querySelector(linkSelector)) {
          [].slice.call(document.querySelectorAll(currentSelector))
            .forEach(function(item) {
              item.classList.remove("current-tab");

          });

          [].slice.call(document.querySelectorAll(".tabs li a"))
            .forEach(function(item) {
              item.setAttribute("aria-selected", "false");

          });

          document.querySelector(linkSelector).parentNode.classList
            .add("current-tab");

          document.querySelector(linkSelector)
            .setAttribute("aria-selected", "true");

        }

        if (document.querySelector(tabSelector))
          document.querySelector(tabSelector).classList
            .add("current-tab");

      }
    }

    if (window.innerWidth >= 992)
      setTabFocus( // download desktop
        desktopBrowsers,
        ".download-desktop .current-tab",
        ".abp-" + getKey(desktopBrowsers),
        "#" + getKey(desktopBrowsers) + "_panel"
      );

    if (getKey(mobilePlatforms) == "ios")
      setTabFocus( // all iOS cases
        desktopBrowsers,
        ".download-mobile .current-tab",
        ".abp-ios-safari",
        "#ios_safari_panel"
      );

    else
      setTabFocus( // download mobile
        mobileBrowsers,
        ".download-mobile .current-tab",
        ".abp-" + getKey(mobilePlatforms) + "-" + getKey(mobileBrowsers),
        "#" + getKey(mobilePlatforms) + "_" + getKey(mobileBrowsers) + "_panel"
      );

  }

  // rating stars
  function initRatingStars() {
    function calcStarsPercentage(n) {
      // range is -3 and +3 from each star and the half
      switch (true) {
        case n <= 0.2:
          return 0; // no stars
          break;
        case n <= 0.7:
          return 6.6; // half
          break;
        case n <= 1.2:
          return 13; // one
          break;
        case n <= 1.7:
          return 25.5; // one and a half
          break;
        case n <= 2.2:
          return 32.5; // two
          break;
        case n <= 2.7:
          return 44; // two and a half
          break;
        case n <= 3.2:
          return 51; // three
          break;
        case n <= 3.7:
          return 43; // three and a half
          break;
        case n <= 4.2:
          return 70; // four
          break;
        case n <= 4.7:
          return 81.5; // four and a half
          break;
        default:
          return 88; // five
      }
    }

    var ratings = [];

    [].slice.call(document.querySelectorAll(".rating span"))
      .forEach(function(item) {
        ratings.push(item.innerHTML);
      });

    [].slice.call(document.querySelectorAll(".rating .stars .rating-bar"))
      .forEach(function(item, index) {
        item.setAttribute("width", calcStarsPercentage(ratings[index]) + "%");
        item.setAttribute("x", "6%");
      });
  }

  // layout switch
  setDetectedClass(document.body, mobilePlatforms);

  setDetectedClass(document.body, mobileBrowsers);

  setDetectedClass(document.body, desktopBrowsers);

  initTabs();

  initRatingStars();

})();
