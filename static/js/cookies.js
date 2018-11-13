(function(root, doc, body)
{
  // Ponyfill //////////////////////////////////////////////////////////////////

  function addListeners(event, targets, callback)
  {
    for (var i = 0; i < targets.length; i++)
    {
      targets[i].addEventListener(event, callback, false);
    }
  }

  // Cookie management /////////////////////////////////////////////////////////

  var OPT_OUT = true;
  var TRACKING_PREFERENCE = 'eyeo-ga-opt-out';
  var TRACKING_CONSENT = 'eyeo-ga-consent';

  function hasTrackingCookie(key)
  {
    return doc.cookie.indexOf(key) !== -1;
  }

  function toggleTrackingCookie(key)
  {
    if (hasTrackingCookie(key))
      doc.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    else
      doc.cookie = key + "=1; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }

  // Setup Google Analytics ////////////////////////////////////////////////////

  var dataLayer = root.dataLayer = root.dataLayer || [];

  function gtag()
  {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", "UA-18643396-6", { anonymize_ip: true });

  function loadGoogleAnalytics()
  {
    var script = doc.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=UA-18643396-6");
    doc.body.appendChild(script);
  }

  // Initialize Tracking ///////////////////////////////////////////////////////

  // Only opt out preferences are stored. Opt in is default.
  if (hasTrackingCookie(TRACKING_PREFERENCE) !== OPT_OUT)
    loadGoogleAnalytics();

  // Setup Cookie Notification /////////////////////////////////////////////////

  document.addEventListener("DOMContentLoaded", function()
  {
    var closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit, .cookies-save"),
        settingsButtons = doc.getElementsByClassName("cookies-settings"),
        settingsDropup = doc.getElementById("cookies-dropup-container"),
        trackingCookiesButtons = doc.getElementsByClassName("tracking-cookies");

    function toggleCookieNotice()
    {
      body.classList.toggle("show-cookies-notice");
      body.classList.remove("show-cookies-settings");
    }

    function toggleCookieSettings()
    {
      body.classList.toggle("show-cookies-settings");
    }

    function onCookieSettingsBlur(event)
    {
      if (
        // Is the cookie settings dropup open?
        body.classList.contains("show-cookies-settings") &&
        body.clientWidth >= 576 &&

        // Is the click outside the cookie settings dropup component?
        !settingsDropup.contains(event.target)
      ) {
        toggleCookieSettings();
      }
    }

    doc.addEventListener("click", onCookieSettingsBlur, true);

    addListeners("click", closeButtons, toggleCookieNotice);

    addListeners("click", closeButtons, toggleTrackingCookie.bind(this, TRACKING_CONSENT));

    addListeners("click", settingsButtons, toggleCookieSettings);

    addListeners("change", trackingCookiesButtons, toggleTrackingCookie.bind(this, TRACKING_PREFERENCE));

    if (hasTrackingCookie(TRACKING_CONSENT) !== true)
      toggleCookieNotice();

  }, false);
}(window, document, document.body));
