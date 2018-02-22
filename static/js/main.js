"use strict";

(function() {
    function initLanguageSelection() {
        var locale = document.getElementById("navbar-locale-selected");

        // skip if page does not have language selection (EG: blog)
        if (!locale) return;

        locale.addEventListener("click", function() {
            document.getElementById("navbar-locale-menu")
                .classList.toggle("visible");
        }, false);
    }

    function navigationClick(event) {
        document.getElementById("navbar-menu")
            .classList.toggle("visible");
    }

    // Hide navbar on scroll down, show on scroll up
    var navBar = document.getElementById("navbar");
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = navBar.clientHeight;

    window.addEventListener("scroll", (function() {
        didScroll = true;
    }));

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = window.scrollY;
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
            // Scroll Down
        if (st > lastScrollTop && st > navbarHeight) {
            navBar.classList.add("hide-navbar");
        } else {
            // Scroll Up
            if (st + window.innerHeight < document.body.clientHeight) {
                navBar.classList.remove("hide-navbar");
            }
        }
        lastScrollTop = st;
    }

    function initMenu() {
        document.getElementById("navbar-menu-toggle")
            .addEventListener("click", navigationClick, false);
    }

    initLanguageSelection();
    initMenu();
})();
