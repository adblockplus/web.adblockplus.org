/*! (c) Andrea Giammarchi - ISC */
var self=this||{};try{!function(t,e){if(new t("q=%2B").get("q")!==e||new t({q:e}).get("q")!==e||new t([["q",e]]).get("q")!==e||"q=%0A"!==new t("q=\n").toString()||"q=+%26"!==new t({q:" &"}).toString()||"q=%25zx"!==new t({q:"%zx"}).toString())throw t;self.URLSearchParams=t}(URLSearchParams,"+")}catch(t){!function(t,a,o){"use strict";var u=t.create,h=t.defineProperty,e=/[!'\(\)~]|%20|%00/g,n=/%(?![0-9a-fA-F]{2})/g,r=/\+/g,i={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"},s={append:function(t,e){p(this._ungap,t,e)},delete:function(t){delete this._ungap[t]},get:function(t){return this.has(t)?this._ungap[t][0]:null},getAll:function(t){return this.has(t)?this._ungap[t].slice(0):[]},has:function(t){return t in this._ungap},set:function(t,e){this._ungap[t]=[a(e)]},forEach:function(e,n){var r=this;for(var i in r._ungap)r._ungap[i].forEach(t,i);function t(t){e.call(n,t,a(i),r)}},toJSON:function(){return{}},toString:function(){var t=[];for(var e in this._ungap)for(var n=v(e),r=0,i=this._ungap[e];r<i.length;r++)t.push(n+"="+v(i[r]));return t.join("&")}};for(var c in s)h(f.prototype,c,{configurable:!0,writable:!0,value:s[c]});function f(t){var e=u(null);switch(h(this,"_ungap",{value:e}),!0){case!t:break;case"string"==typeof t:"?"===t.charAt(0)&&(t=t.slice(1));for(var n=t.split("&"),r=0,i=n.length;r<i;r++){var a=(s=n[r]).indexOf("=");-1<a?p(e,g(s.slice(0,a)),g(s.slice(a+1))):s.length&&p(e,g(s),"")}break;case o(t):for(var s,r=0,i=t.length;r<i;r++){p(e,(s=t[r])[0],s[1])}break;case"forEach"in t:t.forEach(l,e);break;default:for(var c in t)p(e,c,t[c])}}function l(t,e){p(this,e,t)}function p(t,e,n){var r=o(n)?n.join(","):n;e in t?t[e].push(r):t[e]=[r]}function g(t){return decodeURIComponent(t.replace(n,"%25").replace(r," "))}function v(t){return encodeURIComponent(t).replace(e,d)}function d(t){return i[t]}self.URLSearchParams=f}(Object,String,Array.isArray)}!function(d){var r=!1;try{r=!!Symbol.iterator}catch(t){}function t(t,e){var n=[];return t.forEach(e,n),r?n[Symbol.iterator]():{next:function(){var t=n.shift();return{done:void 0===t,value:t}}}}"forEach"in d||(d.forEach=function(n,r){var i=this,t=Object.create(null);this.toString().replace(/=[\s\S]*?(?:&|$)/g,"=").split("=").forEach(function(e){!e.length||e in t||(t[e]=i.getAll(e)).forEach(function(t){n.call(r,t,e,i)})})}),"keys"in d||(d.keys=function(){return t(this,function(t,e){this.push(e)})}),"values"in d||(d.values=function(){return t(this,function(t,e){this.push(t)})}),"entries"in d||(d.entries=function(){return t(this,function(t,e){this.push([e,t])})}),!r||Symbol.iterator in d||(d[Symbol.iterator]=d.entries),"sort"in d||(d.sort=function(){for(var t,e,n,r=this.entries(),i=r.next(),a=i.done,s=[],c=Object.create(null);!a;)e=(n=i.value)[0],s.push(e),e in c||(c[e]=[]),c[e].push(n[1]),a=(i=r.next()).done;for(s.sort(),t=0;t<s.length;t++)this.delete(s[t]);for(t=0;t<s.length;t++)e=s[t],this.append(e,c[e].shift())}),function(f){function l(t){var e=t.append;t.append=d.append,URLSearchParams.call(t,t._usp.search.slice(1)),t.append=e}function p(t,e){if(!(t instanceof e))throw new TypeError("'searchParams' accessed on an object that does not implement interface "+e.name)}function t(e){var n,r,i,t=e.prototype,a=v(t,"searchParams"),s=v(t,"href"),c=v(t,"search");function o(t,e){d.append.call(this,t,e),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}function u(t){d.delete.call(this,t),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}function h(t,e){d.set.call(this,t,e),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}!a&&c&&c.set&&(i=c,r=function(t,e){return t.append=o,t.delete=u,t.set=h,g(t,"_usp",{configurable:!0,writable:!0,value:e})},n=function(t,e){return g(t,"_searchParams",{configurable:!0,writable:!0,value:r(e,t)}),e},f.defineProperties(t,{href:{get:function(){return s.get.call(this)},set:function(t){var e=this._searchParams;s.set.call(this,t),e&&l(e)}},search:{get:function(){return c.get.call(this)},set:function(t){var e=this._searchParams;c.set.call(this,t),e&&l(e)}},searchParams:{get:function(){return p(this,e),this._searchParams||n(this,new URLSearchParams(this.search.slice(1)))},set:function(t){p(this,e),n(this,t)}}}))}var g=f.defineProperty,v=f.getOwnPropertyDescriptor;try{t(HTMLAnchorElement),/^function|object$/.test(typeof URL)&&URL.prototype&&t(URL)}catch(t){}}(Object)}(self.URLSearchParams.prototype,Object);
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).uuidv4=e()}(this,(function(){"use strict";var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),e=new Uint8Array(16);function o(){if(!t)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}var n=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function r(t){return"string"==typeof t&&n.test(t)}for(var i=[],u=0;u<256;++u)i.push((u+256).toString(16).substr(1));return function(t,e,n){var u=(t=t||{}).random||(t.rng||o)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,e){n=n||0;for(var f=0;f<16;++f)e[n+f]=u[f];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=(i[t[e+0]]+i[t[e+1]]+i[t[e+2]]+i[t[e+3]]+"-"+i[t[e+4]]+i[t[e+5]]+"-"+i[t[e+6]]+i[t[e+7]]+"-"+i[t[e+8]]+i[t[e+9]]+"-"+i[t[e+10]]+i[t[e+11]]+i[t[e+12]]+i[t[e+13]]+i[t[e+14]]+i[t[e+15]]).toLowerCase();if(!r(o))throw TypeError("Stringified UUID is invalid");return o}(u)}}));
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

/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash include="each,template,isNumber,isArray,toNumber,isFinite,toArray,extend" exports="global"`
 */
;(function(){function t(t,r,n){switch(n.length){case 0:return t.call(r);case 1:return t.call(r,n[0]);case 2:return t.call(r,n[0],n[1]);case 3:return t.call(r,n[0],n[1],n[2])}return t.apply(r,n)}function r(t,r){for(var n=-1,e=null==t?0:t.length;++n<e&&r(t[n],n,t)!==false;);return t}function n(t,r){for(var n=-1,e=null==t?0:t.length,u=0,o=[];++n<e;){var i=t[n];r(i,n,t)&&(o[u++]=i)}return o}function e(t,r){for(var n=-1,e=null==t?0:t.length,u=Array(e);++n<e;)u[n]=r(t[n],n,t);return u}function u(t,r){for(var n=-1,e=r.length,u=t.length;++n<e;)t[u+n]=r[n];
return t}function o(t,r){for(var n=-1,e=null==t?0:t.length;++n<e;)if(r(t[n],n,t))return true;return false}function i(t){return t.split("")}function c(t){return function(r){return null==r?Vr:r[t]}}function a(t){return function(r){return null==t?Vr:t[r]}}function f(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}function s(t){return function(r){return t(r)}}function l(t,r){return e(r,function(r){return t[r]})}function p(t,r){return t.has(r)}function h(t){return"\\"+Le[t]}function _(t,r){return null==t?Vr:t[r];
}function v(t){return Ee.test(t)}function y(t){for(var r,n=[];!(r=t.next()).done;)n.push(r.value);return n}function b(t){var r=-1,n=Array(t.size);return t.forEach(function(t,e){n[++r]=[e,t]}),n}function g(t,r){return function(n){return t(r(n))}}function d(t){var r=-1,n=Array(t.size);return t.forEach(function(t){n[++r]=t}),n}function j(t){return v(t)?w(t):i(t)}function w(t){return t.match(Se)||[]}function m(){}function O(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1]);
}}function A(){this.__data__=Au?Au(null):{},this.size=0}function x(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}function z(t){var r=this.__data__;if(Au){var n=r[t];return n===Jr?Vr:n}return Xe.call(r,t)?r[t]:Vr}function S(t){var r=this.__data__;return Au?r[t]!==Vr:Xe.call(r,t)}function E(t,r){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Au&&r===Vr?Jr:r,this}function $(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}
}function k(){this.__data__=[],this.size=0}function I(t){var r=this.__data__,n=Y(r,t);return!(n<0)&&(n==r.length-1?r.pop():fu.call(r,n,1),--this.size,true)}function L(t){var r=this.__data__,n=Y(r,t);return n<0?Vr:r[n][1]}function F(t){return Y(this.__data__,t)>-1}function R(t,r){var n=this.__data__,e=Y(n,t);return e<0?(++this.size,n.push([t,r])):n[e][1]=r,this}function P(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}function U(){this.size=0,this.__data__={
hash:new O,map:new(ju||$),string:new O}}function M(t){var r=qt(this,t).delete(t);return this.size-=r?1:0,r}function N(t){return qt(this,t).get(t)}function T(t){return qt(this,t).has(t)}function B(t,r){var n=qt(this,t),e=n.size;return n.set(t,r),this.size+=n.size==e?0:1,this}function C(t){var r=-1,n=null==t?0:t.length;for(this.__data__=new P;++r<n;)this.add(t[r])}function D(t){return this.__data__.set(t,Jr),this}function W(t){return this.__data__.has(t)}function V(t){this.size=(this.__data__=new $(t)).size;
}function q(){this.__data__=new $,this.size=0}function G(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}function H(t){return this.__data__.get(t)}function J(t){return this.__data__.has(t)}function K(t,r){var n=this.__data__;if(n instanceof $){var e=n.__data__;if(!ju||e.length<Gr-1)return e.push([t,r]),this.size=++n.size,this;n=this.__data__=new P(e)}return n.set(t,r),this.size=n.size,this}function Q(t,r){var n=Wu(t),e=!n&&Du(t),u=!n&&!e&&Vu(t),o=!n&&!e&&!u&&Hu(t),i=n||e||u||o,c=i?f(t.length,String):[],a=c.length;
for(var s in t)!r&&!Xe.call(t,s)||i&&("length"==s||u&&("offset"==s||"parent"==s)||o&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||Zt(s,a))||c.push(s);return c}function X(t,r,n){var e=t[r];Xe.call(t,r)&&yr(e,n)&&(n!==Vr||r in t)||rt(t,r,n)}function Y(t,r){for(var n=t.length;n--;)if(yr(t[n][0],r))return n;return-1}function Z(t,r){return t&&Lt(r,Fr(r),t)}function tt(t,r){return t&&Lt(r,Rr(r),t)}function rt(t,r,n){"__proto__"==r&&pu?pu(t,r,{configurable:true,enumerable:true,value:n,writable:true}):t[r]=n;
}function nt(t,n,e,u,o,i){var c,a=n&Qr,f=n&Xr,s=n&Yr;if(e&&(c=o?e(t,u,o,i):e(t)),c!==Vr)return c;if(!mr(t))return t;var l=Wu(t);if(l){if(c=Qt(t),!a)return It(t,c)}else{var p=Tu(t),h=p==_n||p==vn;if(Vu(t))return xt(t,a);if(p==dn||p==cn||h&&!o){if(c=f||h?{}:Xt(t),!a)return f?Rt(t,tt(c,t)):Ft(t,Z(c,t))}else{if(!ke[p])return o?t:{};c=Yt(t,p,a)}}i||(i=new V);var _=i.get(t);if(_)return _;if(i.set(t,c),Gu(t))return t.forEach(function(r){c.add(nt(r,n,e,r,t,i))}),c;if(qu(t))return t.forEach(function(r,u){
c.set(u,nt(r,n,e,u,t,i))}),c;var v=s?f?Wt:Dt:f?Rr:Fr,y=l?Vr:v(t);return r(y||t,function(r,u){y&&(u=r,r=t[u]),X(c,u,nt(r,n,e,u,t,i))}),c}function et(t,r){return t&&Pu(t,r,Fr)}function ut(t,r){r=At(r,t);for(var n=0,e=r.length;null!=t&&n<e;)t=t[pr(r[n++])];return n&&n==e?t:Vr}function ot(t,r,n){var e=r(t);return Wu(t)?e:u(e,n(t))}function it(t){return null==t?t===Vr?zn:gn:lu&&lu in Object(t)?Jt(t):fr(t)}function ct(t,r){return null!=t&&r in Object(t)}function at(t){return Or(t)&&it(t)==cn}function ft(t,r,n,e,u){
return t===r||(null==t||null==r||!Or(t)&&!Or(r)?t!==t&&r!==r:st(t,r,n,e,ft,u))}function st(t,r,n,e,u,o){var i=Wu(t),c=Wu(r),a=i?an:Tu(t),f=c?an:Tu(r);a=a==cn?dn:a,f=f==cn?dn:f;var s=a==dn,l=f==dn,p=a==f;if(p&&Vu(t)){if(!Vu(r))return false;i=true,s=false}if(p&&!s)return o||(o=new V),i||Hu(t)?Tt(t,r,n,e,u,o):Bt(t,r,a,n,e,u,o);if(!(n&Zr)){var h=s&&Xe.call(t,"__wrapped__"),_=l&&Xe.call(r,"__wrapped__");if(h||_){var v=h?t.value():t,y=_?r.value():r;return o||(o=new V),u(v,y,n,e,o)}}return!!p&&(o||(o=new V),Ct(t,r,n,e,u,o));
}function lt(t){return Or(t)&&Tu(t)==yn}function pt(t,r,n,e){var u=n.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var c=n[u];if(i&&c[2]?c[1]!==t[c[0]]:!(c[0]in t))return false}for(;++u<o;){c=n[u];var a=c[0],f=t[a],s=c[1];if(i&&c[2]){if(f===Vr&&!(a in t))return false}else{var l=new V;if(e)var p=e(f,s,a,t,r,l);if(!(p===Vr?ft(s,f,Zr|tn,e,l):p))return false}}return true}function ht(t){return!(!mr(t)||er(t))&&(jr(t)?ru:ee).test(hr(t))}function _t(t){return Or(t)&&Tu(t)==On}function vt(t){return Or(t)&&wr(t.length)&&!!$e[it(t)];
}function yt(t){return typeof t=="function"?t:null==t?Tr:typeof t=="object"?Wu(t)?jt(t[0],t[1]):dt(t):Cr(t)}function bt(t){if(!ur(t))return yu(t);var r=[];for(var n in Object(t))Xe.call(t,n)&&"constructor"!=n&&r.push(n);return r}function gt(t){if(!mr(t))return ar(t);var r=ur(t),n=[];for(var e in t)("constructor"!=e||!r&&Xe.call(t,e))&&n.push(e);return n}function dt(t){var r=Gt(t);return 1==r.length&&r[0][2]?ir(r[0][0],r[0][1]):function(n){return n===t||pt(n,t,r)}}function jt(t,r){return rr(t)&&or(r)?ir(pr(t),r):function(n){
var e=Ir(n,t);return e===Vr&&e===r?Lr(n,t):ft(r,e,Zr|tn)}}function wt(t){return function(r){return ut(r,t)}}function mt(t,r){return Bu(sr(t,r,Tr),t+"")}function Ot(t){if(typeof t=="string")return t;if(Wu(t))return e(t,Ot)+"";if(Sr(t))return Lu?Lu.call(t):"";var r=t+"";return"0"==r&&1/t==-en?"-0":r}function At(t,r){return Wu(t)?t:rr(t,r)?[t]:Cu(kr(t))}function xt(t,r){if(r)return t.slice();var n=t.length,e=ou?ou(n):new t.constructor(n);return t.copy(e),e}function zt(t){var r=new t.constructor(t.byteLength);
return new uu(r).set(new uu(t)),r}function St(t,r){return new t.constructor(r?zt(t.buffer):t.buffer,t.byteOffset,t.byteLength)}function Et(t){var r=new t.constructor(t.source,te.exec(t));return r.lastIndex=t.lastIndex,r}function $t(t){return Iu?Object(Iu.call(t)):{}}function kt(t,r){return new t.constructor(r?zt(t.buffer):t.buffer,t.byteOffset,t.length)}function It(t,r){var n=-1,e=t.length;for(r||(r=Array(e));++n<e;)r[n]=t[n];return r}function Lt(t,r,n,e){var u=!n;n||(n={});for(var o=-1,i=r.length;++o<i;){
var c=r[o],a=e?e(n[c],t[c],c,n,t):Vr;a===Vr&&(a=t[c]),u?rt(n,c,a):X(n,c,a)}return n}function Ft(t,r){return Lt(t,Mu(t),r)}function Rt(t,r){return Lt(t,Nu(t),r)}function Pt(t){return mt(function(r,n){var e=-1,u=n.length,o=u>1?n[u-1]:Vr,i=u>2?n[2]:Vr;for(o=t.length>3&&typeof o=="function"?(u--,o):Vr,i&&tr(n[0],n[1],i)&&(o=u<3?Vr:o,u=1),r=Object(r);++e<u;){var c=n[e];c&&t(r,c,e,o)}return r})}function Ut(t,r){return function(n,e){if(null==n)return n;if(!br(n))return t(n,e);for(var u=n.length,o=r?u:-1,i=Object(n);(r?o--:++o<u)&&e(i[o],o,i)!==false;);
return n}}function Mt(t){return function(r,n,e){for(var u=-1,o=Object(r),i=e(r),c=i.length;c--;){var a=i[t?c:++u];if(n(o[a],a,o)===false)break}return r}}function Nt(t,r,n,e){return t===Vr||yr(t,Je[n])&&!Xe.call(e,n)?r:t}function Tt(t,r,n,e,u,i){var c=n&Zr,a=t.length,f=r.length;if(a!=f&&!(c&&f>a))return false;var s=i.get(t);if(s&&i.get(r))return s==r;var l=-1,h=true,_=n&tn?new C:Vr;for(i.set(t,r),i.set(r,t);++l<a;){var v=t[l],y=r[l];if(e)var b=c?e(y,v,l,r,t,i):e(v,y,l,t,r,i);if(b!==Vr){if(b)continue;h=false;break;
}if(_){if(!o(r,function(t,r){if(!p(_,r)&&(v===t||u(v,t,n,e,i)))return _.push(r)})){h=false;break}}else if(v!==y&&!u(v,y,n,e,i)){h=false;break}}return i.delete(t),i.delete(r),h}function Bt(t,r,n,e,u,o,i){switch(n){case $n:if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return false;t=t.buffer,r=r.buffer;case En:return!(t.byteLength!=r.byteLength||!o(new uu(t),new uu(r)));case sn:case ln:case bn:return yr(+t,+r);case hn:return t.name==r.name&&t.message==r.message;case mn:case An:return t==r+"";case yn:
var c=b;case On:var a=e&Zr;if(c||(c=d),t.size!=r.size&&!a)return false;var f=i.get(t);if(f)return f==r;e|=tn,i.set(t,r);var s=Tt(c(t),c(r),e,u,o,i);return i.delete(t),s;case xn:if(Iu)return Iu.call(t)==Iu.call(r)}return false}function Ct(t,r,n,e,u,o){var i=n&Zr,c=Dt(t),a=c.length;if(a!=Dt(r).length&&!i)return false;for(var f=a;f--;){var s=c[f];if(!(i?s in r:Xe.call(r,s)))return false}var l=o.get(t);if(l&&o.get(r))return l==r;var p=true;o.set(t,r),o.set(r,t);for(var h=i;++f<a;){s=c[f];var _=t[s],v=r[s];if(e)var y=i?e(v,_,s,r,t,o):e(_,v,s,t,r,o);
if(!(y===Vr?_===v||u(_,v,n,e,o):y)){p=false;break}h||(h="constructor"==s)}if(p&&!h){var b=t.constructor,g=r.constructor;b!=g&&"constructor"in t&&"constructor"in r&&!(typeof b=="function"&&b instanceof b&&typeof g=="function"&&g instanceof g)&&(p=false)}return o.delete(t),o.delete(r),p}function Dt(t){return ot(t,Fr,Mu)}function Wt(t){return ot(t,Rr,Nu)}function Vt(){var t=m.iteratee||Br;return t=t===Br?yt:t,arguments.length?t(arguments[0],arguments[1]):t}function qt(t,r){var n=t.__data__;return nr(r)?n[typeof r=="string"?"string":"hash"]:n.map;
}function Gt(t){for(var r=Fr(t),n=r.length;n--;){var e=r[n],u=t[e];r[n]=[e,u,or(u)]}return r}function Ht(t,r){var n=_(t,r);return ht(n)?n:Vr}function Jt(t){var r=Xe.call(t,lu),n=t[lu];try{t[lu]=Vr;var e=true}catch(t){}var u=Ze.call(t);return e&&(r?t[lu]=n:delete t[lu]),u}function Kt(t,r,n){r=At(r,t);for(var e=-1,u=r.length,o=false;++e<u;){var i=pr(r[e]);if(!(o=null!=t&&n(t,i)))break;t=t[i]}return o||++e!=u?o:(u=null==t?0:t.length,!!u&&wr(u)&&Zt(i,u)&&(Wu(t)||Du(t)))}function Qt(t){var r=t.length,n=new t.constructor(r);
return r&&"string"==typeof t[0]&&Xe.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function Xt(t){return typeof t.constructor!="function"||ur(t)?{}:Fu(iu(t))}function Yt(t,r,n){var e=t.constructor;switch(r){case En:return zt(t);case sn:case ln:return new e(+t);case $n:return St(t,n);case kn:case In:case Ln:case Fn:case Rn:case Pn:case Un:case Mn:case Nn:return kt(t,n);case yn:return new e;case bn:case An:return new e(t);case mn:return Et(t);case On:return new e;case xn:return $t(t)}}function Zt(t,r){
var n=typeof t;return r=null==r?un:r,!!r&&("number"==n||"symbol"!=n&&oe.test(t))&&t>-1&&t%1==0&&t<r}function tr(t,r,n){if(!mr(n))return false;var e=typeof r;return!!("number"==e?br(n)&&Zt(r,n.length):"string"==e&&r in n)&&yr(n[r],t)}function rr(t,r){if(Wu(t))return false;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!Sr(t))||(Jn.test(t)||!Hn.test(t)||null!=r&&t in Object(r))}function nr(t){var r=typeof t;return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t;
}function er(t){return!!Ye&&Ye in t}function ur(t){var r=t&&t.constructor;return t===(typeof r=="function"&&r.prototype||Je)}function or(t){return t===t&&!mr(t)}function ir(t,r){return function(n){return null!=n&&(n[t]===r&&(r!==Vr||t in Object(n)))}}function cr(t){var r=vr(t,function(t){return n.size===Kr&&n.clear(),t}),n=r.cache;return r}function ar(t){var r=[];if(null!=t)for(var n in Object(t))r.push(n);return r}function fr(t){return Ze.call(t)}function sr(r,n,e){return n=bu(n===Vr?r.length-1:n,0),
function(){for(var u=arguments,o=-1,i=bu(u.length-n,0),c=Array(i);++o<i;)c[o]=u[n+o];o=-1;for(var a=Array(n+1);++o<n;)a[o]=u[o];return a[n]=e(c),t(r,this,a)}}function lr(t){var r=0,n=0;return function(){var e=gu(),u=nn-(e-n);if(n=e,u>0){if(++r>=rn)return arguments[0]}else r=0;return t.apply(Vr,arguments)}}function pr(t){if(typeof t=="string"||Sr(t))return t;var r=t+"";return"0"==r&&1/t==-en?"-0":r}function hr(t){if(null!=t){try{return Qe.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function _r(t,n){
return(Wu(t)?r:Ru)(t,Vt(n,3))}function vr(t,r){if(typeof t!="function"||null!=r&&typeof r!="function")throw new TypeError(Hr);var n=function(){var e=arguments,u=r?r.apply(this,e):e[0],o=n.cache;if(o.has(u))return o.get(u);var i=t.apply(this,e);return n.cache=o.set(u,i)||o,i};return n.cache=new(vr.Cache||P),n}function yr(t,r){return t===r||t!==t&&r!==r}function br(t){return null!=t&&wr(t.length)&&!jr(t)}function gr(t){if(!Or(t))return false;var r=it(t);return r==hn||r==pn||typeof t.message=="string"&&typeof t.name=="string"&&!xr(t);
}function dr(t){return typeof t=="number"&&vu(t)}function jr(t){if(!mr(t))return false;var r=it(t);return r==_n||r==vn||r==fn||r==wn}function wr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=un}function mr(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}function Or(t){return null!=t&&typeof t=="object"}function Ar(t){return typeof t=="number"||Or(t)&&it(t)==bn}function xr(t){if(!Or(t)||it(t)!=dn)return false;var r=iu(t);if(null===r)return true;var n=Xe.call(r,"constructor")&&r.constructor;return typeof n=="function"&&n instanceof n&&Qe.call(n)==tu;
}function zr(t){return typeof t=="string"||!Wu(t)&&Or(t)&&it(t)==An}function Sr(t){return typeof t=="symbol"||Or(t)&&it(t)==xn}function Er(t){if(!t)return[];if(br(t))return zr(t)?j(t):It(t);if(su&&t[su])return y(t[su]());var r=Tu(t);return(r==yn?b:r==On?d:Pr)(t)}function $r(t){if(typeof t=="number")return t;if(Sr(t))return on;if(mr(t)){var r=typeof t.valueOf=="function"?t.valueOf():t;t=mr(r)?r+"":r}if(typeof t!="string")return 0===t?t:+t;t=t.replace(Xn,"");var n=ne.test(t);return n||ue.test(t)?Fe(t.slice(2),n?2:8):re.test(t)?on:+t;
}function kr(t){return null==t?"":Ot(t)}function Ir(t,r,n){var e=null==t?Vr:ut(t,r);return e===Vr?n:e}function Lr(t,r){return null!=t&&Kt(t,r,ct)}function Fr(t){return br(t)?Q(t):bt(t)}function Rr(t){return br(t)?Q(t,true):gt(t)}function Pr(t){return null==t?[]:l(t,Fr(t))}function Ur(t){return t=kr(t),t&&Wn.test(t)?t.replace(Dn,qe):t}function Mr(t,r,n){var e=m.templateSettings;n&&tr(t,r,n)&&(r=Vr),t=kr(t),r=Ku({},r,e,Nt);var u,o,i=Ku({},r.imports,e.imports,Nt),c=Fr(i),a=l(i,c),f=0,s=r.interpolate||ie,p="__p+='",_="sourceURL"in r?"//# sourceURL="+r.sourceURL+"\n":"";
t.replace(RegExp((r.escape||ie).source+"|"+s.source+"|"+(s===Gn?Zn:ie).source+"|"+(r.evaluate||ie).source+"|$","g"),function(r,n,e,i,c,a){return e||(e=i),p+=t.slice(f,a).replace(ce,h),n&&(u=true,p+="'+__e("+n+")+'"),c&&(o=true,p+="';"+c+";\n__p+='"),e&&(p+="'+((__t=("+e+"))==null?'':__t)+'"),f=a+r.length,r}),p+="';";var v=r.variable;v||(p="with(obj){"+p+"}"),p=(o?p.replace(Tn,""):p).replace(Bn,"$1").replace(Cn,"$1;"),p="function("+(v||"obj")+"){"+(v?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+p+"return __p}";
var y=Qu(function(){return Function(c,_+"return "+p).apply(Vr,a)});if(y.source=p,gr(y))throw y;return y}function Nr(t){return function(){return t}}function Tr(t){return t}function Br(t){return yt(typeof t=="function"?t:nt(t,Qr))}function Cr(t){return rr(t)?c(pr(t)):wt(t)}function Dr(){return[]}function Wr(){return false}var Vr,qr="4.17.5",Gr=200,Hr="Expected a function",Jr="__lodash_hash_undefined__",Kr=500,Qr=1,Xr=2,Yr=4,Zr=1,tn=2,rn=800,nn=16,en=1/0,un=9007199254740991,on=NaN,cn="[object Arguments]",an="[object Array]",fn="[object AsyncFunction]",sn="[object Boolean]",ln="[object Date]",pn="[object DOMException]",hn="[object Error]",_n="[object Function]",vn="[object GeneratorFunction]",yn="[object Map]",bn="[object Number]",gn="[object Null]",dn="[object Object]",jn="[object Promise]",wn="[object Proxy]",mn="[object RegExp]",On="[object Set]",An="[object String]",xn="[object Symbol]",zn="[object Undefined]",Sn="[object WeakMap]",En="[object ArrayBuffer]",$n="[object DataView]",kn="[object Float32Array]",In="[object Float64Array]",Ln="[object Int8Array]",Fn="[object Int16Array]",Rn="[object Int32Array]",Pn="[object Uint8Array]",Un="[object Uint8ClampedArray]",Mn="[object Uint16Array]",Nn="[object Uint32Array]",Tn=/\b__p\+='';/g,Bn=/\b(__p\+=)''\+/g,Cn=/(__e\(.*?\)|\b__t\))\+'';/g,Dn=/[&<>"']/g,Wn=RegExp(Dn.source),Vn=/<%-([\s\S]+?)%>/g,qn=/<%([\s\S]+?)%>/g,Gn=/<%=([\s\S]+?)%>/g,Hn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Jn=/^\w*$/,Kn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Qn=/[\\^$.*+?()[\]{}|]/g,Xn=/^\s+|\s+$/g,Yn=/\\(\\)?/g,Zn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,te=/\w*$/,re=/^[-+]0x[0-9a-f]+$/i,ne=/^0b[01]+$/i,ee=/^\[object .+?Constructor\]$/,ue=/^0o[0-7]+$/i,oe=/^(?:0|[1-9]\d*)$/,ie=/($^)/,ce=/['\n\r\u2028\u2029\\]/g,ae="\\ud800-\\udfff",fe="\\u0300-\\u036f",se="\\ufe20-\\ufe2f",le="\\u20d0-\\u20ff",pe=fe+se+le,he="\\ufe0e\\ufe0f",_e="["+ae+"]",ve="["+pe+"]",ye="\\ud83c[\\udffb-\\udfff]",be="(?:"+ve+"|"+ye+")",ge="[^"+ae+"]",de="(?:\\ud83c[\\udde6-\\uddff]){2}",je="[\\ud800-\\udbff][\\udc00-\\udfff]",we="\\u200d",me=be+"?",Oe="["+he+"]?",Ae="(?:"+we+"(?:"+[ge,de,je].join("|")+")"+Oe+me+")*",xe=Oe+me+Ae,ze="(?:"+[ge+ve+"?",ve,de,je,_e].join("|")+")",Se=RegExp(ye+"(?="+ye+")|"+ze+xe,"g"),Ee=RegExp("["+we+ae+pe+he+"]"),$e={};
$e[kn]=$e[In]=$e[Ln]=$e[Fn]=$e[Rn]=$e[Pn]=$e[Un]=$e[Mn]=$e[Nn]=true,$e[cn]=$e[an]=$e[En]=$e[sn]=$e[$n]=$e[ln]=$e[hn]=$e[_n]=$e[yn]=$e[bn]=$e[dn]=$e[mn]=$e[On]=$e[An]=$e[Sn]=false;var ke={};ke[cn]=ke[an]=ke[En]=ke[$n]=ke[sn]=ke[ln]=ke[kn]=ke[In]=ke[Ln]=ke[Fn]=ke[Rn]=ke[yn]=ke[bn]=ke[dn]=ke[mn]=ke[On]=ke[An]=ke[xn]=ke[Pn]=ke[Un]=ke[Mn]=ke[Nn]=true,ke[hn]=ke[_n]=ke[Sn]=false;var Ie={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Le={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"
},Fe=parseInt,Re=typeof global=="object"&&global&&global.Object===Object&&global,Pe=typeof self=="object"&&self&&self.Object===Object&&self,Ue=Re||Pe||Function("return this")(),Me=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ne=Me&&typeof module=="object"&&module&&!module.nodeType&&module,Te=Ne&&Ne.exports===Me,Be=Te&&Re.process,Ce=function(){try{return Be&&Be.binding&&Be.binding("util")}catch(t){}}(),De=Ce&&Ce.isMap,We=Ce&&Ce.isSet,Ve=Ce&&Ce.isTypedArray,qe=a(Ie),Ge=Array.prototype,He=Function.prototype,Je=Object.prototype,Ke=Ue["__core-js_shared__"],Qe=He.toString,Xe=Je.hasOwnProperty,Ye=function(){
var t=/[^.]+$/.exec(Ke&&Ke.keys&&Ke.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Ze=Je.toString,tu=Qe.call(Object),ru=RegExp("^"+Qe.call(Xe).replace(Qn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nu=Te?Ue.Buffer:Vr,eu=Ue.Symbol,uu=Ue.Uint8Array,ou=nu?nu.allocUnsafe:Vr,iu=g(Object.getPrototypeOf,Object),cu=Object.create,au=Je.propertyIsEnumerable,fu=Ge.splice,su=eu?eu.iterator:Vr,lu=eu?eu.toStringTag:Vr,pu=function(){try{var t=Ht(Object,"defineProperty");
return t({},"",{}),t}catch(t){}}(),hu=Object.getOwnPropertySymbols,_u=nu?nu.isBuffer:Vr,vu=Ue.isFinite,yu=g(Object.keys,Object),bu=Math.max,gu=Date.now,du=Ht(Ue,"DataView"),ju=Ht(Ue,"Map"),wu=Ht(Ue,"Promise"),mu=Ht(Ue,"Set"),Ou=Ht(Ue,"WeakMap"),Au=Ht(Object,"create"),xu=hr(du),zu=hr(ju),Su=hr(wu),Eu=hr(mu),$u=hr(Ou),ku=eu?eu.prototype:Vr,Iu=ku?ku.valueOf:Vr,Lu=ku?ku.toString:Vr,Fu=function(){function t(){}return function(r){if(!mr(r))return{};if(cu)return cu(r);t.prototype=r;var n=new t;return t.prototype=Vr,
n}}();m.templateSettings={escape:Vn,evaluate:qn,interpolate:Gn,variable:"",imports:{_:m}},O.prototype.clear=A,O.prototype.delete=x,O.prototype.get=z,O.prototype.has=S,O.prototype.set=E,$.prototype.clear=k,$.prototype.delete=I,$.prototype.get=L,$.prototype.has=F,$.prototype.set=R,P.prototype.clear=U,P.prototype.delete=M,P.prototype.get=N,P.prototype.has=T,P.prototype.set=B,C.prototype.add=C.prototype.push=D,C.prototype.has=W,V.prototype.clear=q,V.prototype.delete=G,V.prototype.get=H,V.prototype.has=J,
V.prototype.set=K;var Ru=Ut(et),Pu=Mt(),Uu=pu?function(t,r){return pu(t,"toString",{configurable:true,enumerable:false,value:Nr(r),writable:true})}:Tr,Mu=hu?function(t){return null==t?[]:(t=Object(t),n(hu(t),function(r){return au.call(t,r)}))}:Dr,Nu=hu?function(t){for(var r=[];t;)u(r,Mu(t)),t=iu(t);return r}:Dr,Tu=it;(du&&Tu(new du(new ArrayBuffer(1)))!=$n||ju&&Tu(new ju)!=yn||wu&&Tu(wu.resolve())!=jn||mu&&Tu(new mu)!=On||Ou&&Tu(new Ou)!=Sn)&&(Tu=function(t){var r=it(t),n=r==dn?t.constructor:Vr,e=n?hr(n):"";
if(e)switch(e){case xu:return $n;case zu:return yn;case Su:return jn;case Eu:return On;case $u:return Sn}return r});var Bu=lr(Uu),Cu=cr(function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(Kn,function(t,n,e,u){r.push(e?u.replace(Yn,"$1"):n||t)}),r});vr.Cache=P;var Du=at(function(){return arguments}())?at:function(t){return Or(t)&&Xe.call(t,"callee")&&!au.call(t,"callee")},Wu=Array.isArray,Vu=_u||Wr,qu=De?s(De):lt,Gu=We?s(We):_t,Hu=Ve?s(Ve):vt,Ju=Pt(function(t,r){Lt(r,Rr(r),t)}),Ku=Pt(function(t,r,n,e){
Lt(r,Rr(r),t,e)}),Qu=mt(function(r,n){try{return t(r,Vr,n)}catch(t){return gr(t)?t:Error(t)}});m.assignIn=Ju,m.assignInWith=Ku,m.constant=Nr,m.iteratee=Br,m.keys=Fr,m.keysIn=Rr,m.memoize=vr,m.property=Cr,m.toArray=Er,m.values=Pr,m.extend=Ju,m.extendWith=Ku,m.attempt=Qu,m.eq=yr,m.escape=Ur,m.forEach=_r,m.get=Ir,m.hasIn=Lr,m.identity=Tr,m.isArguments=Du,m.isArray=Wu,m.isArrayLike=br,m.isBuffer=Vu,m.isError=gr,m.isFinite=dr,m.isFunction=jr,m.isLength=wr,m.isMap=qu,m.isNumber=Ar,m.isObject=mr,m.isObjectLike=Or,
m.isPlainObject=xr,m.isSet=Gu,m.isString=zr,m.isSymbol=Sr,m.isTypedArray=Hu,m.stubArray=Dr,m.stubFalse=Wr,m.template=Mr,m.toNumber=$r,m.toString=kr,m.each=_r,m.VERSION=qr,Ue._=m}).call(this);
/*global PaymentForm, updatePaymentConfig, _*/
(function(root, doc, _) {
/**
 * Construct payment form
 * @constructor
 * @requires _.template
 * @requires _.each
 * @param {Object[]} currencies - Ordered collection of currencies indexed by name
 * @param {String} currencies[].sign - Sign before currency amount
 * @param {Object} currencies[].donation - One time payment options for currency
 * @param {Number[]} currencies[].donation.amounts - Amounts offered for one time payment
 * @param {Number} currencies[].donation.placeholder - Custom amount placeholder for one time payment
 * @param {Object=} currencies[].subscription - (optional) monthly payment options for currency
 * @param {Number[]} currencies[].subscription.amounts - Amounts offered for monthly payment
 * @param {Number} currencies[].subscription.placeholder - Custom amount placeholder for monthly payment
 * @param {Object=} currencies[].yearlySubscription - (optional) yearly payment options for currency
 * @param {Number[]} currencies[].yearlySubscription.amounts - Amounts offered for yearly payment
 * @param {Number} currencies[].yearlySubscription.placeholder - Custom amount placeholder for yearly
 */
function PaymentForm(currencies)
{
  var defaultCurrency, hasMultiCurrency;

  for (var currencyName in currencies)
  {
    if (!defaultCurrency)
    {
      defaultCurrency = currencyName;
    }
    else
    {
      hasMultiCurrency = true;
      break;
    }
  }

  if (hasMultiCurrency)
  {
    doc.body.classList.add("has-multi-currency");
  }
  else
  {
    doc.body.classList.add("has-single-currency");
    doc.querySelector(".donation-heading .currency").textContent = defaultCurrency.toUpperCase();
  }

  var paymentCurrency = doc.getElementById("payment-currencies");

  var theCurrencyOptions = _.template(
    doc.getElementById("payment-currency-options").innerHTML
  );

  paymentCurrency.innerHTML = theCurrencyOptions({
    currencies: currencies
  });

  var donationAmounts = doc.getElementById("donation-amounts");

  var subscriptionAmounts = doc.getElementById("subscription-amounts");
  
  var yearlySubscriptionAmounts =
  doc.getElementById("yearly-subscription-amounts");

  var thePresetAmounts = _.template(
    doc.getElementById("preset-payment-amounts").innerHTML
  );

  var theCustomAmount = _.template(
    doc.getElementById("custom-payment-amount").innerHTML
  );

  function updateAmounts()
  {
    var currency = currencies[paymentCurrency.value];

    var donationOptions = {
      type: "donation",
      sign: currency.sign,
      amounts: currency.donation.amounts,
      placeholder: currency.donation.placeholder
    };

    donationAmounts.innerHTML = ""
      + thePresetAmounts(donationOptions)
      + theCustomAmount(donationOptions);

    if (currency.subscription)
    {
      doc.body.classList.add("has-subscriptions");
      doc.body.classList.add("has-yearly");

      var subscriptionOptions = {
        type: "monthly-subscription",
        sign: currency.sign,
        amounts: currency.subscription.amounts,
        placeholder: currency.subscription.placeholder
      };

      subscriptionAmounts.innerHTML = ""
        + thePresetAmounts(subscriptionOptions)
        + theCustomAmount(subscriptionOptions);
      
      if (currency.yearly) {
        var yearlySubscriptionOptions = {
          type: "yearly-subscription",
          sign: currency.sign,
          amounts: currency.yearly.amounts,
          placeholder: currency.yearly.placeholder
        };

        yearlySubscriptionAmounts.innerHTML = ""
          + thePresetAmounts(yearlySubscriptionOptions)
          + theCustomAmount(yearlySubscriptionOptions);

      } else {
        doc.body.classList.remove("has-yearly");
      } 
    }
    else
    {
      doc.body.classList.remove("has-subscriptions");
      subscriptionAmounts.innerHTML = "";
    }
  }

  updateAmounts();

  paymentCurrency.addEventListener("change", function(e) {
    updateAmounts();
    validateCustomAmount(e);
  });

  // uncheck donation amount when subscription amount is selected and vise versa
  function onFieldsetChange (otherFieldset, event)
  {
    var otherFieldsetSelected = otherFieldset.querySelector("input:checked");

    if (otherFieldsetSelected)
    {
      otherFieldsetSelected.checked = false;
      validateCustomAmount(event);
    }
  }

  donationAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, subscriptionAmounts));

  donationAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, yearlySubscriptionAmounts));

  subscriptionAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, donationAmounts)
  );

  subscriptionAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, yearlySubscriptionAmounts)
  );

  yearlySubscriptionAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, donationAmounts)
  );

  yearlySubscriptionAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, subscriptionAmounts)
  );

  // Select custom amount radio when textbox is focused
  function onCustomFieldSelect(event)
  {
    if (event.target.type == "text")
    {
      event.target.parentElement.querySelector('input[type="radio"]').click();
      validateCustomAmount(event);
    }
  }

  donationAmounts.addEventListener("focus", onCustomFieldSelect, true);

  subscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);
  
  yearlySubscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);

  function clearCustomAmountErrors()
  {
    doc.body.classList.remove("minimum-donation-error");
    doc.body.classList.remove("minimum-subscription-error");
    doc.body.classList.remove("minimum-yearly-error");

    enableForm(true);
  }

  function enableForm(enabled)
  {
    _.each(
      _.toArray(doc.querySelectorAll("#payment-providers button")),
      function(button)
      {
        button.disabled = !enabled;
      }
    );
  }

  function isValidAmount(amount, type, currency)
  {
    amount = parseFloat(amount);

    type = (type == 'yearly-subscription') ? 'yearly' : type;

    type = (type == 'monthly-subscription') ? 'subscription' : type;

    return _.isFinite(amount) && amount >= currency[type].minimum;
  }

  function otherTypes(type) {
    return ["donation", "subscription", "yearly"].filter(function(item) {
      return item != type;
    });
  }

  function validateCustomAmount(event)
  {
    var checkedRadio = doc.querySelector(".payment-amount input:checked");

    if (checkedRadio.value != "custom")
    {
      return clearCustomAmountErrors();
    }

    var amount = checkedRadio.parentElement.querySelector(
      'input[type="text"]'
    ).value;

    if (amount.trim() == "")
    {
      return clearCustomAmountErrors();
    }

    amount = parseFloat(amount);

    var currency = currencies[paymentCurrency.value];
    var selectedType = event.currentTarget.id.split("-")[0];
    var typeError = "minimum-" + selectedType + "-error";
    var minimumAmount = currency[selectedType].minimum;

    if (isValidAmount(amount, selectedType, currency))
    {
      clearCustomAmountErrors();
      return;
    }

    otherTypes(selectedType).forEach(function(otherType) {
      doc.body.classList.remove("minimum-" + otherType + "-error");
    });
    
    doc.body.classList.add(typeError);
    
    enableForm(false);

    doc.querySelector(
      ".minimum-" + selectedType + "-warning .minimum-amount"
    ).textContent = currency.sign + minimumAmount;
  }
  
  function actionType(text) {
    var type;

    if (/donation/.test(text)) {
      type = 'donation';

    } else if (/monthly/.test(text)) {
      type = 'monthly-subscription';

    } else if (/yearly/.test(text)) {
      type = 'yearly-subscription';
    }

    return type;
  }

  donationAmounts.addEventListener("change", validateCustomAmount, true);
  subscriptionAmounts.addEventListener("change", validateCustomAmount, true);
  yearlySubscriptionAmounts.addEventListener("change", validateCustomAmount, true);
  
  donationAmounts.addEventListener("input", validateCustomAmount, true);
  subscriptionAmounts.addEventListener("input", validateCustomAmount, true);
  yearlySubscriptionAmounts.addEventListener("input", validateCustomAmount, true);

  /**
   * Export form data to JSON compatible object
   * @function
   */
  this.toJSON = function()
  {
    var currency = currencies[paymentCurrency.value];

    var checked = doc.querySelector(".payment-amount input[type=radio]:checked");

    var type = actionType(checked.name);

    var amount = checked.value;

    if (amount == "custom")
    {
      checked = checked.parentElement.querySelector('input[type="text"]');
      amount = isValidAmount(
        checked.value,
        type,
        currencies[paymentCurrency.value]
      ) ? checked.value : checked.placeholder;
    }

    return {
      lang: doc.documentElement.lang,
      type: type,
      currency: paymentCurrency.value,
      amount: parseFloat(amount),
    };
  };

  var providerHandlers = {};

  /**
   * Add a payment provider submission handler
   * @function
   */
  this.addProviderListener = function(provider, handler)
  {
    if (!providerHandlers[provider])
      providerHandlers[provider] = [];

    providerHandlers[provider].push(handler);
  };

  var paymentProviders = doc.getElementById("payment-providers");

  function onPaymentProviderSubmit(event)
  {
    event.preventDefault();

    var buttonName = event.target.name || event.target.parentNode.name;

    var disabled = event.target.disabled || event.target.parentNode.disabled;

    if (!buttonName || disabled) return;

    var provider = buttonName.replace("-provider", "");

    var handlers = providerHandlers[provider];

    if (!handlers) return;

    _.each(handlers, function(handler) {return handler();});
  }

  paymentProviders.addEventListener("click", onPaymentProviderSubmit);
}

root.PaymentForm = PaymentForm;

}(window, document, _));

/* global _*/
(function(root, doc, _){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

/**
 * PayPal payment provider
 * @global
 * @requires _.each
 * @requires _.extend
 * @see https://developer.paypal.com/docs/integration/web/
 */
root.paypalProvider = {

  /**
   * Submit one-time or recurring payment
   * @function
   * @param {Object} payment - Payment options submitted to PayPal
   * @param {String} payment.item - Human readable translated item name
   * @param {Number} payment.amount - Amount to be paid for item
   * @param {String} payment.currency - 3 letter currency code supported by PayPal
   * @param {String} [payment.type=] - "subscirption" if recurring
   * @param {String} [payment.image=https://adblockplus.org/img/adblock-plus-paypal.png] - 90px tall logo image
   * @param {String} [payment.lang=doc.documentElement.lang] - 2 letter language code supported by PayPal
   * @param {String} [payment.successURL=https://adblockplus.org/payment-complete] - URL to direct to after checkout success
   * @param {String} [payment.cancelURL=location.hrf] - URL to direct to after checkout cancelled
   * @see https://developer.paypal.com/docs/archive/nvp-soap-api/currency-codes/#paypal
   * @see https://developer.paypal.com/docs/api/reference/locale-codes/
   */
  submit: function (payment)
  {
    // Locales supported by our website that have different PayPal codes
    var LOCALES = {
      "en": "US",
      "zh_cn": "C2",
      "pt_br": "BR",
      "tr": "TM",
      "el_gr": "GR",
      "jp": "JP",
      "kr": "KO",
      "ar": "DZ"
    };

    // Get unique PayPal locale code or fall back to lang in PayPal format
    function getLocale(lang)
    {
      return LOCALES[lang] || lang.toUpperCase();
    }

    var submission = {
      charset: "utf-8",
      business: "till@adblockplus.org",
      item_name: payment.item,
      custom: payment.custom,
      image_url: payment.image || siteURL + "../../img/adblock-plus-paypal.png",
      return: payment.successURL || siteURL + "/payment-complete",
      cancel_return: payment.cancelURL || root.location.href,
      no_note: 1,
      currency_code: payment.currency,
      lc: getLocale(payment.lang || doc.documentElement.lang)
    };

    var subscriptionType = {
      'subscription': 'M',
      'monthly-subscription': 'M',
      'yearly-subscription': 'Y'
    };

    if (Object.keys(subscriptionType)
      .includes(payment.type))
    {
      _.extend(submission, {
        cmd: "_xclick-subscriptions",
        a3: payment.amount, // Subscription price
        p3: 1, // Subscription duration (N*p3)
        t3: subscriptionType[payment.type], // Regular subscription units of duration. (D/W/M/Y)
        src: 1 // Subscription payments recur 1 or not 0
      });
    }
    else
    {
      _.extend(submission, {
        cmd: "_xclick",
        amount: payment.amount
      });
    }

    var form = doc.createElement("form");
    form.target = "_blank";
    form.method = "post";
    form.action = "https://www.paypal.com/cgi-bin/webscr";

    var field;
    _.each(submission, function(value, key)
    {
      field = doc.createElement("input");
      field.type = "hidden";
      field.name = key;
      field.value = value;
      form.appendChild(field);
    });

    var documentHead = doc.getElementsByTagName("head")[0];
    documentHead.appendChild(form);
    form.submit();
    documentHead.removeChild(form);
  }
};

})(window, document, _);

function initStripeProvider(publishableKey, formProcessor, text) {
  'use strict';

  var donation = 'donation';
  var subscription = 'subscription';

  var siteURL = document.documentElement
    .getAttribute('data-siteurl') || 'https://adblockplus.org';

  var successURL = siteURL + '/payment-complete';

  var style = {
    base: {
      color: '#32325d',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  var stripe;

  var modal = document.createElement('div');

  modal.className = 'modal';

  document.body.insertBefore(modal, document.body.firstChild);

  document.addEventListener('keyup', function(keyupEvent) {
    if (keyupEvent.defaultPrevented) return;

    var key = keyupEvent.key || keyupEvent.keyCode;

    if (key == 'Escape' || key == 'Esc' || key == 27) hideModal();
  });

  function queryString(obj) {
    return new URLSearchParams(obj);
  }

  function hideModal() {
    modal.classList.remove('show-modal');
  }

  var paymentData;

  function paymentModalPopup(data) {
    var box, button, cardStripeElement, donationRequest, email, error,
      priceText, token;

    var donationTimeout = 4000;

    var localeOrderMap = {
      hu: orderHU,
      ko: orderKO,
      tr: orderTR
    };

    paymentData = data;

    if (data.successURL) {
      successURL = data.successURL;

      delete data.successURL;
    }

    stripe = Stripe(publishableKey, {
      locale: (document.documentElement.lang || 'en')
    });

    function createModalForm() {
      modal.innerHTML = '' +
        '<div class="modal-content">' +
          '<div class="top-banner">' +
            '<div class="sales-info">' +
              '<div class="top">' +
                '<div id="co-name" class="company"></div>' +
                '<button class="close">' +
                  '<img width="17" height="17" src="../../img/close.png"></button>' +
              '</div>' +
              '<div id="product-name" ' +
                'class="product details">Adblock Plus</div>' +
            '</div>' +
            '<div class="subtitle details">' +
              text.securelyProcessed + '</div>' +
          '</div>' +
          '<hr style="margin: 0;">' +
          '<div class="payment-details">' +
            '<form class="payment-form" id="payment-form">' +
              '<div class="form-row">' +
                '<div class="forms">' +
                  '<div>' +
                    '<label for="email" class="email-label">' +
                      '<span class="form-label spacer"></span>' +
                      '<div class="StripeElement">' +
                        '<input type="email" id="email" class="email" ' +
                          'size="26" spellcheck="false" ' +
                          'placeholder="' + text.emailAddress + '" ' +
                          'autocomplete="email" autocorrect="no" ' +
                          'autocapitalize="no">' +
                      '</div>' +
                    '</label>' +
                    '</div>' +
                    '<div>' +
                    '<label for="card-element">' +
                      '<span class="form-label spacer"></span>' +
                      '<div class="StripeElement" id="card-element"></div>' +
                    '</label>' +
                    '<div id="card-errors" ' +
                      'class="error-message" role="alert"></div>' +
                  '</div>' +
                  '<div>' +
                    '<button id="pay-button" ' +
                      'class="pay-button"></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</form>' +
          '</div>' +
        '</div><img width="123" height="30" class="pbs" ' +
          'src="../../img/powered-by-stripe.png"></button>';

      box = document.querySelector('.modal-content');
      button = document.getElementById('pay-button');
      email = document.getElementById('email');
      error = document.getElementById('card-errors');

      createElements();

      payButtonText();

      if (email) email.focus();

      modal.querySelector('.close')
        .addEventListener('click', hideModal);
    }

    function isSubscription(type) {
      return [subscription, 'monthly-subscription', 'yearly-subscription']
        .includes(type || data.type);
    }

    function durtionText() {
      return /^yearly/.test(data.type)
        ? text.year
        : text.month;
    }

    function defaultTextOrder() {
      return isSubscription()
        ? text.subscribe + ' ' + priceText + ' / ' + durtionText()
        : text.donate + ' ' + priceText;
    }

    function orderHU() {
      return isSubscription()
        ? priceText + ' ' + text.subscribe + ' ' + durtionText()
        : text.donate + ' ' + priceText;
    }

    function orderKO() {
      return isSubscription()
        ? text.subscribe + ' ' + priceText + ' / ' + durtionText()
        : priceText + ' ' + text.donate;
    }

    function orderTR() {
      return isSubscription()
        ? durtionText() + ' ' + priceText + ' ' + text.subscribe
        : priceText + ' ' + text.donate;
    }

    function localeTextOrder(locale) {
      return localeOrderMap[locale]
        ? localeOrderMap[locale]()
        : defaultTextOrder();
    }

    function payButtonText() {
      priceText = (data.currencySign == '€')
        ? data.amount + data.currencySign
        : data.currencySign + data.amount;

      button.textContent = localeTextOrder(document.documentElement.lang);
    }

    function errorText(message) {
      error.textContent = message || '';
    }

    function enableButton() {
      button.disabled = false;
    }

    function createDonation(onSuccess) {
      if (donationRequest) {
        donationRequest.abort();
      }

      donationRequest = new XMLHttpRequest();

      donationRequest.open('POST', formProcessor, true);

      donationRequest.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');

      donationRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          token = this.responseText;

          if (onSuccess) onSuccess();
        }
      };

      donationRequest.send(queryString(paymentData));
    }

    function confirmDonation() {
      if (token) {
        stripe.confirmCardPayment(token, {
          payment_method: {
            card: cardStripeElement,
            billing_details: {
              email: email.value
            }
          },
          receipt_email: email.value
        }).then(onDonationComplete);

      } else {
        createDonation(confirmDonation);

        setTimeout(function() {
          if (!token) {
            donationRequest.abort();

            onDonationComplete({ error: { message: text.sorry } });
          }
        }, donationTimeout);
      }
    }

    function onDonationComplete(result) {
      if (result.error) {

        if (result.error.message) errorText(result.error.message);

        enableButton();

      } else if (result.paymentIntent &&
        (result.paymentIntent.status == 'succeeded')) {
          stripePaymentConfirmed();
      }
    }

    function createSubscription() {
      stripe.createPaymentMethod({
        type: 'card',
        card: cardStripeElement,
        billing_details: {
         email: email.value,
        },
      }).then(function(response) {
        if (response && response.paymentMethod && response.paymentMethod.id) {
          var request = new XMLHttpRequest();

          data.method = response.paymentMethod.id;
          data.email = email.value;

          request.open('POST', formProcessor, true);

          request.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded');

          request.onreadystatechange = function() {
            if (this.readyState == 4) {

               if (this.status == 200) {
                 stripePaymentConfirmed();

               } else if (this.status == 402) {
                 errorText(text.declined);

                 enableButton();

               } else {
                 errorText(text.sorry);
               }
            }
          }

          request.send(queryString(data));
        }
      });
    }

    function processForm(submitEvent) {
      submitEvent.preventDefault();

      if (error.textContent) {
        box.classList.add('shake');

        setTimeout(function removeShake() {
          box.classList.remove('shake');
        }, 1000);
      }

      if (button.disabled) return;

      button.disabled = true;

      if (data.type == donation) {
        confirmDonation();

      } else if (isSubscription(data.type)) {
        createSubscription();
      }
    }

    function cardBrand(brand) {
      if (['visa', 'mastercard', 'amex'].indexOf(brand) == -1)
        errorText(text.notSupported);
    }

    function createElements() {
      cardStripeElement = stripe.elements()
        .create('card', {
          style: style
        });

      cardStripeElement.mount('#card-element');

      cardStripeElement.addEventListener('change', function(changeEvent) {
        errorText((changeEvent.error && changeEvent.error.message)
          ? changeEvent.error.message
          : enableButton());

        cardBrand(changeEvent.brand);
      });

      document.getElementById('payment-form')
        .addEventListener('submit', processForm);
    }

    function stripePaymentConfirmed() {
      var params = queryString({
        pp: 'stripe',
        sid: data.custom
      });

      window.location.href = successURL + '?' + params.toString();
    }

    createModalForm();

    modal.classList.add('show-modal');

    if (data.type == donation) createDonation();
  }

  return {
    submit: paymentModalPopup
  };
}

/* global eyeo */
(function() {

var docEl = document.documentElement;

var URLParams = new URLSearchParams(location.search);

var URLSubDirs = location.pathname.split('/');

var paymentConfig = {
  USD: {
    sign: '$',
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    subscription: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    }
  },
  EUR: {
    sign: '€',
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    subscription: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    }
  }
};

function setupPaymentForm() {
  if (window.paymentConfig)
    paymentConfig = window.paymentConfig;

  var form = new PaymentForm(paymentConfig);

  function getPayment() {
    var fromController = {
      /* eyeo.vid will be set to 0-N where 0 is the original variant and N is
         a challenger variant whenever an optimize variant is applied */
      custom: typeof eyeo.vid != "undefined" ? eyeo.vid + eyeo.sid.slice(1) : eyeo.sid,
      successURL: (docEl.getAttribute('data-siteurl') ||
        'https://adblockplus.org') + '/payment-complete'
    };

    return _.extend(form.toJSON(), fromController);
  }

  function onPayPalProvider() {
    var payment = getPayment();

    var cancelParams = new URLSearchParams({
      pp: 'paypal',
      sid: payment.custom
    });

    payment.cancelURL = [
      location.origin,
      location.pathname,
      '?',
      cancelParams.toString()
    ].join('');

    payment.item = paymentTranslations.item;

    paypalProvider.submit(payment);
  }

  eyeo.disablePayPal || form.addProviderListener('paypal', onPayPalProvider);

  function onStripeSubmit() {
    var payment = getPayment();

    payment.currencySign = paymentConfig[payment.currency.toUpperCase()].sign;

    stripeProvider.submit(payment);
  }

  var stripeLoaded = false;

  function onStripeProvider() {
    if (!stripeLoaded) {
      var script = document.createElement('script');
      var button = document.querySelector('.stripe-button');
      var buttonContent = button.innerHTML;

      button.disabled = true;
      button.innerHTML = '<div class="loader">Loading...</div>';

      script.onload = function() {
        stripeLoaded = true;

        onStripeSubmit();

        button.disabled = false;
        button.innerHTML = buttonContent;
      };

      script.src = 'https://js.stripe.com/v3/';

      document.head.appendChild(script);

    } else {
      onStripeSubmit();
    }
  }

  eyeo.disableStripe || form.addProviderListener('stripe', onStripeProvider);
}

eyeo.vid = typeof eyeo.vid == "undefined" ? "x" : eyeo.vid;

var campaignID = window.campaignID || "0";

/* Prefex "x" applies by default when optimize does not apply a variant.
   Since we share SID on load below without waiting for optimize to apply a
   variant SIDs will not match 1to1 with payment.custom when experiments
   are running. Instead, we must match SID.slice(1) to coorilate payments. */
eyeo.sid = URLParams.get("sid") || [eyeo.vid, campaignID, uuidv4()].join("-");

var fromABP = {
  an: URLParams.get('an'),
  av: URLParams.get('av'),
  ap: URLParams.get('ap'),
  apv: URLParams.get('apv'),
  p: URLParams.get('p'),
  pv: URLParams.get('pv')
};

var loadReport = {
  bn: bowser.name,
  bv: bowser.version,
  bp: URLSubDirs[URLSubDirs.length - 1],
  bl: docEl.lang,
  cid: campaignID,
  sid: eyeo.sid
};

if (typeof performance == "object" && typeof performance.now == "function")
  loadReport.pn = (performance.now() + '').split('.')[0];

if (fromABP.an)
  loadReport = _.extend(loadReport, fromABP);

var script = document.createElement('script');

var params = new URLSearchParams(loadReport);

function onLoadReportSuccess() {
  (document.readyState == 'loading')
    ? document.addEventListener('DOMContentLoaded', setupPaymentForm)
    : setupPaymentForm();
}

script.onload = onLoadReportSuccess;
script.onerror = onLoadReportSuccess;
script.src = '../../js/payment/config/load.js?' + params.toString();

document.head.appendChild(script);

}());

'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var donationHeading = document.querySelector('.donation-heading');

window.addEventListener('resize', function() {
  if (window.innerWidth > 991)
    if (!page.classList.contains('hide-form'))
      page.classList.add('show-form');
  else
    page.classList.remove('show-form');
});

document.documentElement.classList.remove('no-js');

// sticky footer
document.querySelector('main.container').setAttribute('id', 'content');

/*!
 * This file is part of website-defaults
 * Copyright (C) 2016-present eyeo GmbH
 *
 * website-defaults is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * website-defaults is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with website-defaults.  If not, see <http://www.gnu.org/licenses/>.
 */
var ADDRESS_MASKING_DELAY = 250;

function unmaskAddress(target)
{
  var attributes = JSON.parse(target.getAttribute("data-mask"));

  for (var attr in attributes)
    target[attr] = atob(attributes[attr]);

  target.removeAttribute("data-mask");
}

document.addEventListener("DOMContentLoaded", function()
{
  var unmaskAfterTimeout = setTimeout.bind(
    this,
    unmaskAddress,
    ADDRESS_MASKING_DELAY
  );

  var linksToBeMasked = [].slice.call(
    document.querySelectorAll("[data-mask]")
  );

  linksToBeMasked.forEach(unmaskAddress);
});
