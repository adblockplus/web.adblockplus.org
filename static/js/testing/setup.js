/* global eyeo */
(function(){

  var SEEN_COOKIE_PROMPT_COOKIE = "eyeo-seen-cookie-prompt";
  var TRACKING_OPT_OUT_COOKIE = "eyeo-ga-opt-out";
  var SPLIT_TESTING_OPT_OUT_COOKIE = "eyeo-ab-opt-out";
  var DISMISS_COOKIE_PROMPT_COOKIE = "eyeo-ga-consent";
  var GOOGLE_TAG_MANAGER_UID = "GTM-TFZZB3Q";
  var GOOGLE_ANALYTICS_UID = "UA-18643396-6";
  var GOOGLE_OPTIMIZE_UID = "GTM-NW8L5JT";

  var variantApplied = "f";

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

  var seenCookiePrompt = hasCookie(SEEN_COOKIE_PROMPT_COOKIE);

  var showCookiePrompt = !eyeo.excludeCookiePrompt 
    && !hasCookie(DISMISS_COOKIE_PROMPT_COOKIE);

  var enableTracking = !hasCookie(TRACKING_OPT_OUT_COOKIE);

  if (eyeo.excludeCookiePrompt && !seenCookiePrompt)
    enableTracking = false;

  var enableSplitTesting = eyeo.enableSplitTesting 
    && enableTracking 
    && !hasCookie(SPLIT_TESTING_OPT_OUT_COOKIE);

  var additionalUserTestingVariants = 0;

  if (eyeo.testAnalytics && eyeo.testOptimize)
    additionalUserTestingVariants = 2;
  else if(eyeo.testAnalytics || eyeo.testOptimize)
    additionalUserTestingVariants = 1;

  // randomly chosen to evenly distribute analytics and optimize testing
  // not the actual variant applied by optimize
  var randomlyChosenUserTestingVariant = 0;

  if (eyeo.splitTestingVariants)
  {
    randomlyChosenUserTestingVariant = Math.floor(
      Math.random() * Math.floor(
        eyeo.splitTestingVariants + additionalUserTestingVariants
      )
    );
  }

  // disable analytics for variant 0
  if (
    enableTracking
    && eyeo.testAnalytics
    && randomlyChosenUserTestingVariant < 1
  ) {
    variantApplied = "c";
    enableTracking = false;
    enableSplitTesting = false;
    console.warn("testing analytics");
  }

  // disable optimize for variant 0
  // disable optimize for variant 1 if testing both analytics and optimize
  if (
    enableSplitTesting
    && eyeo.testOptimize
    && randomlyChosenUserTestingVariant < additionalUserTestingVariants
  ) {
    variantApplied = "d";
    enableSplitTesting = false;
    console.warn("testing optimize");
  }

  if (enableTracking)
  {
    var analyticsData = {
      "anonymize_ip": true,
      "transport_type": "beacon"
    };

    if (enableSplitTesting)
      analyticsData.optimize_id = GOOGLE_OPTIMIZE_UID;

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
      gtag('config', GOOGLE_ANALYTICS_UID, analyticsData);
    }());

    // Tag Manager snippet
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',GOOGLE_TAG_MANAGER_UID);

    if (showCookiePrompt)
    {
      var cookiePromptScript = document.createElement("script");
      cookiePromptScript.async = true;
      cookiePromptScript.src = origin + "/js/cookie-prompt.js";
      document.head.appendChild(cookiePromptScript);
    }
  }

  if (!enableSplitTesting)
  {
    if (typeof eyeo.triggerOptimizeComplete == "function")
      eyeo.triggerOptimizeComplete(variantApplied);
    document.documentElement.classList.remove('async-hide');
  }

}());
