"use strict";

(function() {

    function getComputedStyle(el) {
        var style = window.getComputedStyle(el);
        return (style);
    }

    function isBlockShown(el) {
        return getComputedStyle(el).display === 'block';
    }

    function setBottomPadding(element, value) {
        element.style.paddingBottom = value;
    }

    // Show "Change cookie settings" links and info text to EEA users
    if (eyeo && eyeo.cookieEnabled) // created in "js/testing/setup.js"
        document.documentElement.classList.add("has-cookies");

    // Prevent Cookies bar (desktop/mobile) from hiding footer contents
    function initPreventFooterOverlap() {
        var pageFooter = document.getElementById("footer");
        var pageFooterBp = getComputedStyle(pageFooter).paddingBottom;
        var cookieBar = document.querySelector(".cookiebar");
        var cookiePrompt = document.querySelector(".cookieprompt");
        var cookieBarCloseButton = document.querySelector(".cookies-close");
        var cookiePromptCloseButton = [].slice.call(document
                                          .querySelectorAll(".cookies-submit"));

        setInterval(function() {
            if (isBlockShown(cookiePrompt))
                setBottomPadding(pageFooter, cookiePrompt.offsetHeight + "px");

            if (isBlockShown(cookieBar))
                setBottomPadding(pageFooter, cookieBar.offsetHeight + "px");
        }, 250)

        // close cookies prompt and reset padding
        cookiePromptCloseButton.forEach(function(btn) {
            btn.addEventListener('click', function() {
                setBottomPadding(pageFooter, pageFooterBp);
            });
        })

        cookieBarCloseButton.addEventListener('click', function() {
            setBottomPadding(pageFooter, pageFooterBp);
        });
    }

    function initLanguageSelection() {
        var locale = document.getElementById("navbar-locale-selected");

        // skip if page does not have language selection (EG: blog)
        if (!locale) return;

        var localeOpen = false;

        locale.addEventListener("click", function() {
            document.getElementById("navbar-locale-menu")
                .classList.toggle("visible");
            localeOpen = !localeOpen;
        }, false);

        var localeParent = document.getElementById("navbar-locale-menubar");

        window.addEventListener("click", function(event) {
            if (localeOpen && !localeParent.contains(event.target)) {
              document.getElementById("navbar-locale-menu")
                  .classList.remove("visible");
              localeOpen = false;
            }
        }, true);
    }

    function navigationClick(event) {
        document.getElementById("navbar-menu")
            .classList.toggle("visible");
    }

    function initMenu() {
        document.getElementById("navbar-menu-toggle")
            .addEventListener("click", navigationClick, false);

        var targetBlankLinks = [].slice.call(
            document.querySelectorAll('#navbar-menu [target="_blank"]'));

        // close navbarMenu when target _blank links are clicked
        for (var i = 0; i < targetBlankLinks.length; i++) {
            targetBlankLinks[i].addEventListener("click", function() {
                document.getElementById("navbar-menu")
                     .classList.remove("visible");
            }
            , false)
        }
    }

    function initNavbarToggle() {
        var navbar = document.getElementById("navbar");
        var navbarLocale = document.getElementById("navbar-locale-menu");
        var navbarHeight = navbar.offsetHeight;
        var scrollHandled = false;
        var lastScrollTop = 0;
        var desktopBreakpoint = 991;
        var newScrollAction = false;

        // IE9 does not support offsetHeight when element is fixed
        if (!navbarHeight)
            return;

        window.addEventListener("scroll", function() {
            scrollHandled = false;
        });

        document.addEventListener("click", function(target) {
            newScrollAction = false;
        });

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
            var hash = document.location.hash;

            setTimeout(function() {
                if (hash !== "" && currentScroll > navbarHeight) {
                    navbar.style.top = "-" + navbarHeight + "px";
                    newScrollAction = true;
                }
            }, 20)

            if (newScrollAction)
                hash = "";

            if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
                navbar.style.top = "-" + navbarHeight + "px";
            } else {
                navbar.style.top = 0;
            }

            lastScrollTop = currentScroll;
            return true;
        }
    }

    // logic for floating TOC a.k.a. table of contents
    function initTOCScroll() {
        var floatingTOC = document.getElementById("toc-float");

        // check if element exists due to using different templates
        if (!floatingTOC) return;

        var pageContainer = document.querySelector(".toc-page-container");

        function updateActiveTOCLink() {
            var headingLinks = document.querySelectorAll("#toc-float a");

            for (var i = 0; i < headingLinks.length; i++) {
                headingLinks[i].classList.remove("active");
            }

            var contentHeadings = document.querySelectorAll(".toc-page-container > h2, .toc-page-container > h3");

            // convert NodeList to an Array so we can sort
            contentHeadings = Array.prototype.slice.call(contentHeadings);

            contentHeadings.sort(function(a,b) {
                // sort by distance to 0 (page top)
                return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top);
            });

            var headingLink = document.querySelector("#toc-float [href='#"+ contentHeadings[0].id +"']");

            headingLink.classList.add("active");

            //console.log(floatingTOC.getBoundingClientRect().top, headingLink.getBoundingClientRect().bottom);
        }

        // call the function before scroll event to ensure the active headline is always highlighted
        updateActiveTOCLink();

        function updateFloatingTOCPosition() {
            var containerBounds = pageContainer.getBoundingClientRect();
            var topPosition = containerBounds.top > 70;
            var bottomPosition = !topPosition && window.innerHeight - containerBounds.bottom > 20;

            floatingTOC.style.marginTop = "";

            if (topPosition || bottomPosition) {
                floatingTOC.classList.remove("fixed");
                floatingTOC.style.maxHeight = "";
                floatingTOC.style.top = "";

                if (bottomPosition) {
                    floatingTOC.style.marginTop = containerBounds.height - floatingTOC.getBoundingClientRect().height + "px";
                }
            } else {
                floatingTOC.style.top = 70 + "px";
                floatingTOC.classList.add("fixed");

                // added floatingTOC.getBoundingClientRect().top to account for floatingTOC CSS margin
                floatingTOC.style.maxHeight = window.innerHeight - floatingTOC.getBoundingClientRect().top - 20 + "px";
            }
        }
        // ensure TOC is correctly position on reload
        updateFloatingTOCPosition();

        document.addEventListener('scroll', function(e) {
            updateActiveTOCLink();
            updateFloatingTOCPosition();
        });
        window.addEventListener('resize', updateFloatingTOCPosition);
    }

    initLanguageSelection();
    initMenu();
    initNavbarToggle();
    initPreventFooterOverlap();
    initTOCScroll();
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
   *       src="../../img/video-thumbnail.png" />
   *     <img
   *       class="video-play"
   *       alt="Open video in separate window""
   *       src="../../img/video-link.png" />
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
      .setAttribute("src", siteurl + "../../img/video-play.png");

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

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios|Maxthon/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios|Maxthon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

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
