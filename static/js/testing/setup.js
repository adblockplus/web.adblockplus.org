/* global eyeo */
(function(){

  var user = eyeo.user = eyeo.user || {};

  var variant = eyeo.variant = eyeo.variant || {};

  var domain = window.location.hostname
    // get top level domain
    .split(".").slice(-2).join(".")
    // strip port
    .split(":")[0];

  var origin = window.location.origin
    // location.origin is not supported by IE
    || window.location.protocol + "//" 
       + window.location.hostname 
       + (window.location.port ? ':' + window.location.port: '');

  function hasCookie(key)
  {
    return document.cookie.indexOf(key) !== -1;
  }

  user.consent = hasCookie("eyeo-seen-cookie-prompt");
  user.analytics = !hasCookie("eyeo-ga-opt-out");
  user.optimize = !hasCookie("eyeo-ab-opt-out");

  variant.analytics = user.analytics;

  variant.optimize = variant.analytics && user.optimize && eyeo.userTesting;

  var analyticsData = {
    "anonymize_ip": true,
    "transport_type": "beacon"
  };

  if (variant.optimize)
    analyticsData.optimize_id = "GTM-NW8L5JT";

  // Record first visit to page with cookie prompt
  if (!eyeo.preventCookiePrompt && !user.consent)
    document.cookie = "eyeo-seen-cookie-prompt=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; samesite=lax; domain=" + domain + "; path=/";

  if (
    // Track users who not have opted out of tracking
    variant.analytics

    // Track users who have seen cookie prompt on pages without cookie prompt
    && !(eyeo.preventCookiePrompt && !user.consent)
  ) {

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
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TFZZB3Q');

    if (!eyeo.preventCookiePrompt)
    {
      var cookiePromptScript = document.createElement("script");
      cookiePromptScript.async = true;
      cookiePromptScript.src = origin + "/js/cookie-prompt.js";
      document.head.appendChild(cookiePromptScript);
    }
  }

  if (
    !variant.analytics
    || !variant.optimize
    || (eyeo.preventCookiePrompt && !user.consent)
  ) {
    document.documentElement.classList.remove('async-hide');
  }

}());
