/* global eyeo */
(function() {
  var user = {};

  var variant = {};

  var host = window.location.hostname;

  // Set `domain` to whole hostname if Firebase preview page
  var domain = host.startsWith('dev--adblockplus-org--') && host.endsWith('.web.app')
    ? host
    : host.split(".").slice(-2).join(".").split(":")[0];

  var origin = window.location.origin
    // location.origin is not supported by IE
    || window.location.protocol + '//'
       + window.location.hostname
       + (window.location.port ? ':' + window.location.port: '');

  function hasCookie(key) {
    return document.cookie.indexOf(key) != -1;
  }

  user.analytics = !hasCookie('eyeo-ga-opt-out');

  variant.analytics = user.analytics;

  var analyticsData = {
    anonymize_ip: true,
    transport_type: 'beacon'
  };

  // Record first visit to page with cookie prompt
  if (!adblock.settings.suppressCookiePrompt && !hasCookie('eyeo-seen-cookie-prompt'))
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

    if (!adblock.settings.suppressCookiePrompt) {
      var cookiePromptScript = document.createElement('script');

      cookiePromptScript.async = true;
      cookiePromptScript.src = origin + '/js/cookie-prompt.js';

      document.head.appendChild(cookiePromptScript);
      adblock.settings.allowCookies = true;
    }
  }
}());
