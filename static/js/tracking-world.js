/**
 * Caution: This file exists for backwards compatibility during infrastructure change. It's successor is/will be /js/tracking/eea.js
 */
(function(){

  var eyeo = window.eyeo = window.eyeo || {};

  var siteDomain = (function(subdomains)
  {
    if (subdomains.length >= 2)
      return subdomains[subdomains.length - 2]
        + "."
        + subdomains[subdomains.length - 1];
    else
      return subdomains[0];
  })(window.location.host.split("."));

  function hasCookie(key)
  {
    return document.cookie.indexOf(key) !== -1;
  }

  var hasSeenCookiePrompt = hasCookie("eyeo-seen-cookie-prompt");
  var trackingOptOut = hasCookie("eyeo-ga-opt-out");
  var testingOptOut = hasCookie("eyeo-ab-opt-out");

  var analyticsData = {
    "anonymize_ip": true,
    "transport_type": "beacon"
  };

  if (!testingOptOut)
    analyticsData.optimize_id = "GTM-NW8L5JT";

  // Record first visit to page with cookie prompt
  if (!eyeo.preventCookiePrompt && !hasSeenCookiePrompt)
    document.cookie = "eyeo-seen-cookie-prompt=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=" + siteDomain + "; path=/";

  if
  (
    // Do not track users who haven't seen cookie prompt on pages without cookie prompt
    !(eyeo.preventCookiePrompt && !hasSeenCookiePrompt)

    // Do not track users who have opted out of tracking
    && !trackingOptOut
  )
  {
    // Anti-flicker snippet
    (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
      h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
      (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    })(window,document.documentElement,'async-hide','dataLayer',4000,{'GTM-NW8L5JT':true});

    // Analytics snippet (Modifications explained in comments below)
    (function(){
      // Adding script by JavaScript instead of HTML
      var scriptElement = document.createElement("script");
      scriptElement.async = true;
      scriptElement.src = "https://www.googletagmanager.com/gtag/js?id=UA-18643396-6";
      document.head.appendChild(scriptElement);
      window.dataLayer = window.dataLayer || [];
      // Explicitly attached gtag to window because script is not run in global scope
      var gtag = window.gtag = function(){dataLayer.push(arguments);}
      gtag('js', new Date());
      // Passing analyticsData constructed above
      gtag('config', 'UA-18643396-6', analyticsData);
    }());

    // Tag Manager snippet
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TFZZB3Q');

    if (!eyeo.preventCookiePrompt)
    {
      var cookiePromptScript = document.createElement("script");
      cookiePromptScript.async = true;
      cookiePromptScript.src = document.documentElement.getAttribute("data-siteurl") + "/js/cookie-prompt.js";
      document.head.appendChild(cookiePromptScript);
      eyeo.cookieEnabled = true;
    }

  }
}());
