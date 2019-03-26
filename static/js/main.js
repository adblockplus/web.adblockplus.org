"use strict";

(function() {
    function initLanguageSelection(navbarTypeClass) {
        var locale = document.querySelector(navbarTypeClass + " .navbar-locale-selected");

        // skip if page does not have language selection (EG: blog)
        if (!locale) return;

        locale.addEventListener("click", function() {
            document.querySelector(navbarTypeClass)
                .classList.toggle("locale-open");
        }, false);
    }

    function navigationClick(event) {
        document.body.classList.toggle("navbar-open");
        mobileOverlay();
    }

    function initMenu() {
        document.querySelector(".navbar-menu-toggle")
            .addEventListener("click", navigationClick, false);
    }

    function closeMobileNavOnClickOut() {
      // if it is open, click everywhere to close the Mobile Navbar
      if(!document.body.classList.contains("navbar-open")) {
        document.body.addEventListener("click", function() {
          document.body.classList.remove("navbar-open");
          mobileOverlay();
        }, false);
      }
      // prevent closing Mobile Navbar for certain elements (Navbar or Navbar Mobile menu toggles) click
      var except = document.querySelectorAll(".navbar-menu-toggle, .navbar-mobile");
      except.forEach(function(item){
        item.addEventListener("click", function(event) {
          event.stopPropagation();
        }, false);
      })
    }

    // add mobile overlay
    function mobileOverlay() {
      if(document.body.classList.contains("navbar-open")) {
        var overlay = "<div class='overlay'></div>";
        var content = document.getElementById("content");
        content.innerHTML += overlay;
      } else {
        document.querySelector(".overlay").remove();
      }
    }

    function initNavbarToggle() {
        var navbar = document.querySelector(".navbar");
        var navbarLocale = document.querySelector(".navbar-locale-selected");
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
                if (
                  !scrollHandled &&
                  ( // locale menu is not visible
                    !navbarLocale || // our blog doesn't have a locale menu
                    !navbarLocale.classList.contains("visible")
                  )
                ) {
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

    closeMobileNavOnClickOut();

    initLanguageSelection(".navbar");
    initLanguageSelection(".navbar-mobile");
    initMenu();
    initNavbarToggle();
})();

(function()
{

  var siteurl = document.documentElement.getAttribute("data-siteurl");

  /**
   * Creats a GDPR compatible video
   * @constructor
   * @param {Element} parent - video parent / container
   * @example
   * <div id="example-video" class="video-parent">
   *   <a
   *     class="video-link"
   *     target="_blank"
   *     href="http://example.com/iframe/video/src">
   *     <img
   *       class="video-thumbnail"
   *       alt="Short description of video"
   *       src="/img/video-thumbnail.png" />
   *     <img
   *       class="video-play"
   *       alt="Open video in separate window""
   *       src="/img/video-link.png" />
   *   </a>
   *   <p class="video-disclaimer">Disclaimer text</p>
   * </div>
   */
  function Video(parent)
  {
    /**
     * Video parent / container element
     * @member {Element}
     */
    this.parent = parent;

    /**
     * The last time that the play button was clicked
     * @member {number}
     */
    this.lastClicked = 0;

    var videoLink = parent.querySelector(".video-link");

    /**
     * The iframe video src url
     * @member {string}
     */
    this.src = videoLink.getAttribute("href");

    //remove disclaimer if disclaimer is shown by default
    this.parent.classList.add("hide-disclaimer");

    //change external link icon into play button icon
    parent
      .querySelector(".video-play")
      .setAttribute("src", siteurl + "/img/video-play.png");

    //show disclaimer or replace thumbnail with video on click
    videoLink.addEventListener("click", this._onPlayClick.bind(this));
  }

  Video.prototype = {

    _onPlayClick: function(event)
    {
      event.preventDefault();

      if (this.parent.classList.contains("hide-disclaimer"))
        this.toggleDisclaimer();
      //prevent bypassing the disclaimer via double click
      else if (new Date().getTime() - this.lastClicked > 600)
        this.insertVideo();
    },

    toggleDisclaimer: function()
    {
      this.parent.classList.toggle("hide-disclaimer");
      this.lastClicked = new Date().getTime();
    },

    /** Replace video thumbnail with video iframe */
    insertVideo: function()
    {
      this.parent.classList.add("hide-disclaimer");
      this.parent.classList.add("has-iframe");

      //replace static thumbnail with iframe video
      this.parent.innerHTML =
        "<iframe " +
          "class='video-iframe' " +
          "frameborder=0 " +
          "allowfullscreen " +
          "src='" + encodeURI(this.src) + "'>" +
        "</iframe>";
    }
  };

  window.videos = [].slice.call(document.querySelectorAll(".video-parent"))
    .map(function(parent) {return new Video(parent);});
}());
