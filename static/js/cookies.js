(function(root, doc, body)
{
  // Config ////////////////////////////////////////////////////////////////////

  var eyeo = window.eyeo || {};

  // Ponyfill //////////////////////////////////////////////////////////////////

  function addListeners(event, targets, callback)
  {
    for (var i = 0; i < targets.length; i++)
    {
      targets[i].addEventListener(event, callback, false);
    }
  }

  // Cookie management /////////////////////////////////////////////////////////

  var TRACKING_OPT_OUT = 'eyeo-ga-opt-out';
  var TRACKING_CONSENT = 'eyeo-ga-consent';

  function hasTrackingCookie(key)
  {
    return doc.cookie.indexOf(key) !== -1;
  }

  function setTrackingCookie(key, value)
  {
    if (value)
      doc.cookie = key + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    else
      doc.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  var trackingOptOut = hasTrackingCookie(TRACKING_OPT_OUT);
  var trackingConsent = hasTrackingCookie(TRACKING_CONSENT);

  // Setup Google Analytics ////////////////////////////////////////////////////

  var dataLayer = root.dataLayer = root.dataLayer || [];

  var gtag = root.gtag = function()
  {
    dataLayer.push(arguments);
  };

  gtag("js", new Date());
  gtag("config", "UA-18643396-6", { anonymize_ip: true, transport_type: 'beacon' });

  function loadGoogleAnalytics()
  {
    var script = doc.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=UA-18643396-6");
    doc.head.appendChild(script);
  }

  // Initialize Tracking ///////////////////////////////////////////////////////

  if (
    // page has opt in tracking and consent is given
    (eyeo.optInOnlyTracking && trackingConsent) ||
    // page has opt out tracking and user has not opted out
    (!eyeo.optInOnlyTracking && !trackingOptOut)
  ) {
    loadGoogleAnalytics();
  }

  // Setup Cookie Notification /////////////////////////////////////////////////

  document.addEventListener("DOMContentLoaded", function()
  {
    var closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit, .cookies-save"),
        saveButtons = doc.querySelectorAll(".cookies-save"),
        settingsButtons = doc.querySelectorAll(".cookies-settings"),
        settingsDropups = [].slice.call(doc.querySelectorAll(".cookies-dropup")),
        trackingCookiesButtons = doc.getElementsByClassName("tracking-cookies");

    function toggleCookieNotice()
    {
      doc.body.classList.toggle("show-cookies-notice");
      doc.body.classList.remove("show-cookies-settings");
    }

    function closeCookieNotice()
    {
      doc.body.classList.remove("show-cookies-notice");
      doc.body.classList.remove("show-cookies-settings");
    }

    function toggleCookieSettings()
    {
      doc.body.classList.toggle("show-cookies-settings");
    }

    function onCookieSettingsBlur(event)
    {
      if (
        // Is the cookie settings dropup open?
        doc.body.classList.contains("show-cookies-settings") &&
        root.innerWidth >= 576 &&
        root.innerHeight >= 575 &&

        // Is the click outside the cookie settings dropup component?
        !settingsDropups.some(function(settingsDropup)
        {
          return settingsDropup.contains(event.target);
        })
      ) {
        toggleCookieSettings();
      }
    }

    function toggleTrackingPreference()
    {
      trackingOptOut = !trackingOptOut;
    }

    function saveCookieSettings()
    {
      setTrackingCookie(TRACKING_OPT_OUT, trackingOptOut);
      root["ga-disable-UA-18643396-6"] = !trackingOptOut;

      // Deleting all "not essential" cookies in this document
      if (trackingOptOut)
      {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++)
        {
          var cookie = cookies[i].split("=")[0].trim();

          if (cookie !== TRACKING_OPT_OUT &&
            cookie !== TRACKING_CONSENT)
            setTrackingCookie(cookie, false);
        }
      }
    }

    function saveCookieConsent()
    {
      setTrackingCookie(TRACKING_CONSENT, true);
    }

    doc.addEventListener("click", onCookieSettingsBlur, true);

    addListeners("click", closeButtons, closeCookieNotice);

    addListeners("click", closeButtons, saveCookieConsent);

    addListeners("click", settingsButtons, toggleCookieSettings);

    addListeners("change", trackingCookiesButtons, toggleTrackingPreference);

    addListeners("click", saveButtons, saveCookieSettings);


    if (!eyeo.optInOnlyTracking && !trackingConsent)
      toggleCookieNotice();

    if (trackingOptOut)
    {
      var trackingOptOutSwitches = document.querySelectorAll("input.tracking-cookies");

      for (var i = 0; i < trackingOptOutSwitches.length; i++)
        trackingOptOutSwitches[i].checked = false;
    }

  }, false);
}(window, document));
