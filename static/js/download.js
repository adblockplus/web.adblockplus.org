
"use strict";

(function() {
    var desktopBrowsers = [
      "chrome",
      "chromium",
      "firefox",
      "msedge",
      "msedge_chromium",
      "msie",
      "opera",
      "safari",
      "yandexbrowser"
    ];

    var mobileBrowsers = [
        "safari",
        "samsungBrowser"
    ];

    var mobilePlatforms = [
        "android",
        "ios"
    ];

    function getKey(keys) {
        for (var key = 0; key < keys.length; key++) {
            if (bowser[keys[key]])
                return keys[key];
        }

        return false;
    }

    function setDetectedClass(el, data) {
        if (!getKey(data) == false)
            el.classList.add(getKey(data));
    }

    // layout switch
    function setBodyClasses() {
        setDetectedClass(document.body, mobilePlatforms);

        setDetectedClass(document.body, mobileBrowsers);

        setDetectedClass(document.body, desktopBrowsers);
    }

    // tabs
    function initTabs() {
        var tabsMenuLinks = [].slice.call(
            document.querySelectorAll(".tabs-menu li a"));
        var tabsContents = [].slice.call(
            document.querySelectorAll(".tab-content"));

        var desktopTabs = document.querySelector(".download-desktop");
        var platformTabs = document.querySelector(".download-mobile");

        function removeCurrentClass(selector) {
            document.querySelector(selector).classList
                .remove("current-tab");
        }

        function tabsCore(
            element,
            index,
            currentLink,
            currentTab
        ) {
            element.addEventListener("click", function(event) {
                event.preventDefault();
                if (element.getAttribute("href") ==
                    "#" + tabsContents[index].getAttribute("id")) {
                        removeCurrentClass(currentLink);
                        removeCurrentClass(currentTab);
                        tabsMenuLinks[index].parentNode.classList
                            .add("current-tab");
                        tabsContents[index].classList
                            .add("current-tab");
                    }
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
            if (!getKey(data) == false) {
                [].slice.call(
                    document.querySelectorAll(currentSelector))
                    .forEach(function(item) {
                        item.classList.remove("current-tab");
                    });

                if (document.querySelector(linkSelector))
                    document.querySelector(linkSelector).parentNode.classList
                        .add("current-tab");

                if (document.querySelector(tabSelector))
                    document.querySelector(tabSelector).classList
                        .add("current-tab");
            }
        }

        setTabFocus(  // download desktop
            desktopBrowsers,
            ".download-desktop .current-tab",
            ".abp-" + getKey(desktopBrowsers),
            "#" + getKey(desktopBrowsers) + "_tab"
        );

        setTabFocus(  // download mobile
            mobileBrowsers,
            ".download-mobile .current-tab",
            ".abp-" + getKey(mobilePlatforms) + "-" +
                getKey(mobileBrowsers),
            "#" + getKey(mobilePlatforms) + "_" +
                getKey(mobileBrowsers) + "_tab"
        );

    }

    // rating stars
    function initRatingStars() {
        function calcStarsPercentage(n) {
            return Math.round(n * 100 / 5);
        }

        var ratings = [];

        [].slice.call(document.querySelectorAll(".rating span"))
            .forEach(function(item) {
                ratings.push(item.innerHTML);
        });

        [].slice.call(document.querySelectorAll(".rating .stars .rating-bar"))
            .forEach(function(item, index) {
                item.setAttribute(
                    "width", calcStarsPercentage(ratings[index]) + "%");
        });
    }

    setBodyClasses();
    initTabs();
    initRatingStars();

}());
