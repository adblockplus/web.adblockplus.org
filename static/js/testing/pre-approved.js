/* global eyeo */
(function() {
  var user = eyeo.user = eyeo.user || {};

  var variant = eyeo.variant = eyeo.variant || {};

  var variantApplied = 'f';

  var domain = window.location.hostname
    // get top level domain
    .split('.').slice(-2).join('.')
    // strip port
    .split(':')[0];

  var origin = window.location.origin
    // location.origin is not supported by IE
    || window.location.protocol + '//'
       + window.location.hostname
       + (window.location.port ? ':' + window.location.port: '');

  function hasCookie(key) {
    return document.cookie.indexOf(key) != -1;
  }

  user.analytics = !hasCookie('eyeo-ga-opt-out');
  user.optimize = !hasCookie('eyeo-ab-opt-out');

  var additionalUserTestingVariants = 0;

  if (eyeo.testAnalytics && eyeo.testOptimize)
    additionalUserTestingVariants = 2;

  else if (eyeo.testAnalytics || eyeo.testOptimize)
    additionalUserTestingVariants = 1;

  // randomly chosen to evenly distribute analytics and optimize testing
  // not the actual variant applied by optimize
  var randomlyChosenUserTestingVariant = 0;

  if (eyeo.userTestingVariants) {
    randomlyChosenUserTestingVariant = Math.floor(Math.random() *
      Math.floor(eyeo.userTestingVariants + additionalUserTestingVariants));
  }

  variant.analytics = user.analytics;

  // disable analytics for variant 0
  if (
    variant.analytics
    && eyeo.testAnalytics
    && randomlyChosenUserTestingVariant < 1
  ) {
    variantApplied = 'c';
    variant.analytics = false;

    console.warn('testing analytics');
  }

  variant.optimize = variant.analytics && user.optimize && eyeo.userTesting;

  // disable optimize for variant 0
  // disable optimize for variant 1 if testing both analytics and optimize
  if (
    variant.optimize
    && eyeo.testOptimize
    && randomlyChosenUserTestingVariant < additionalUserTestingVariants
  ) {
    variantApplied = 'd';
    variant.optimize = false;

    console.warn('testing optimize');
  }

  var analyticsData = {
    anonymize_ip: true,
    transport_type: 'beacon'
  };

  if (variant.optimize)
    analyticsData.optimize_id = 'GTM-NW8L5JT';

  // Record first visit to page with cookie prompt
  if (!eyeo.preventCookiePrompt && !hasCookie('eyeo-seen-cookie-prompt'))
    document.cookie = 'eyeo-seen-cookie-prompt=1; ' +
      'expires=Fri, 31 Dec 9999 23:59:59 GMT; ' +
      'samesite=lax; domain=' + domain + '; path=/';

  // Track users who not have opted out of tracking
  if (variant.analytics) {

    // Analytics snippet (Modifications explained in comments below)
    (function() {
      // Adding script by JavaScript instead of HTML
      var scriptElement = document.createElement('script');

      scriptElement.async = true;
      scriptElement.src =
        'https://www.googletagmanager.com/gtag/js?id=UA-18643396-6';

      document.head.appendChild(scriptElement);

      window.dataLayer = window.dataLayer || [];
      // Explicitly attached gtag to window as script is not run in global scope
      var gtag = window.gtag = function() { dataLayer.push(arguments) };

      gtag('js', new Date());
      // Passing analyticsData constructed above
      gtag('config', 'UA-18643396-6', analyticsData);
    }());

    // Tag Manager snippet
    (function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'
        ?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TFZZB3Q');

    if (!eyeo.preventCookiePrompt) {
      var cookiePromptScript = document.createElement('script');

      cookiePromptScript.async = true;
      cookiePromptScript.src = origin + '/js/cookie-prompt.js';

      document.head.appendChild(cookiePromptScript);
    }
  }

  if (!variant.analytics || !variant.optimize) {

    if (typeof eyeo.triggerOptimizeComplete == 'function')
      eyeo.triggerOptimizeComplete(variantApplied);

    document.documentElement.classList.remove('async-hide');
  }

}());
