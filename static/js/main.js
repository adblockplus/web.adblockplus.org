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
        var navBar = document.getElementById("navbar");
        var navbarHeight = navBar.offsetHeight;
        var scrollHandled = false;
        var lastScrollTop = 0;

        window.addEventListener("scroll", (function() {
            scrollHandled = true;
        }));

        setInterval(function() {
            if(window.innerWidth>991) {
                if (scrollHandled) {
                    scrollHandled = handleScroll();
                }
            }
        }, 250);

        function handleScroll() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
                navBar.style.top = "-" + navbarHeight + "px";
            } else {
                navBar.style.top = 0;
            }
            lastScrollTop = currentScroll;
            return false;
        }
    }

    initLanguageSelection();
    initMenu();
    navbarToggle();
})();
