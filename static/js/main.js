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

    function initMenu() {
        document.getElementById("navbar-menu-toggle")
            .addEventListener("click", navigationClick, false);
    }

    function navbarToggle() {
        window.addEventListener("scroll", function() {
            var st = window.pageYOffset;
            var navBar = document.getElementById("navbar");
            var lastScrollTop = 0;
            var navbarHeight = navBar.offsetHeight;
            if (st > lastScrollTop && st > navbarHeight) {
                navBar.classList.add("hide-navbar");
            } else {
                navBar.classList.remove("hide-navbar");
            }
            lastScrollTop = st;
        });
    }

    initLanguageSelection();
    initMenu();
    navbarToggle();
})();
