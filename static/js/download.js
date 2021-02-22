"use strict";

(function() {
  var desktopBrowsers = {
    "chrome": "https://eyeo.to/adblockplus/chrome_install/",
    "chromium": "https://eyeo.to/adblockplus/chrome_install/",
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
