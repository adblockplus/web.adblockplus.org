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

    function initNavbarToggle() {
        var navbar = document.getElementById("navbar");
        var navbarLocale = document.getElementById("navbar-locale-menu");
        var navbarHeight = navbar.offsetHeight;
        var scrollHandled = false;
        var lastScrollTop = 0;
        var desktopBreakpoint = 991;

        // IE9 does not support offsetHeight when element is fixed
        if (!navbarHeight)
            return;

        window.addEventListener("scroll", (function() {
            scrollHandled = false;
        }));

        setInterval(function() {
            if(window.innerWidth > desktopBreakpoint) {
                if (!scrollHandled && !navbarLocale.classList.contains("visible")) {
                    scrollHandled = handleScroll();
                }
            }
            else {
                navbar.style.top = 0;
            }
        }, 250);

        function handleScroll() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
                navbar.style.top = "-" + navbarHeight + "px";
            } else {
                navbar.style.top = 0;
            }
            lastScrollTop = currentScroll;
            return true;
        }
    }

    initLanguageSelection();
    initMenu();
    initNavbarToggle();
})();
