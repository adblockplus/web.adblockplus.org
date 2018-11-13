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

  function hasCookie(key)
  {
    return doc.cookie.indexOf(key) !== -1;
  }

  function toggleCookie(key)
  {
    if (hasCookie(key))
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

  var trackingConsent = hasCookie(TRACKING_CONSENT);
  var trackingPreference = hasCookie(TRACKING_PREFERENCE);

  if (trackingPreference !== OPT_OUT)
    loadGoogleAnalytics();

  // Setup Cookie Notification /////////////////////////////////////////////////

  document.addEventListener("DOMContentLoaded", function()
  {
    var closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit, .cookies-save"),
        settingsButtons = doc.getElementsByClassName("cookies-settings"),
        settingsDropup = doc.getElementById("cookies-dropup-container"),
        trackingCookiesButtons = doc.getElementsByClassName("tracking-cookies");

    function toggleNotice()
    {
      body.classList.toggle("show-cookies-notice");
      body.classList.remove("show-cookies-settings");
    }

    function toggleSettings()
    {
      body.classList.toggle("show-cookies-settings");
    }

    function toggleTrackingCookies(event)
    {
      trackingPreference = !trackingPreference;
      toggleCookie(TRACKING_PREFERENCE);
    }

    function handleSettingsDropupBlur(event)
    {
      if (
        // Is the cookie settings dropup open?
        body.classList.contains("show-cookies-settings") &&
        body.clientWidth >= 576 &&

        // Is the click outside the cookie settings dropup component?
        !settingsDropup.contains(event.target)
      ) {
        toggleSettings();
      }
    }

    doc.addEventListener("click", handleSettingsDropupBlur, true);

    addListeners("click", closeButtons, toggleNotice);

    addListeners("click", closeButtons, toggleCookie.bind(this, TRACKING_CONSENT));

    addListeners("click", settingsButtons, toggleSettings);

    addListeners("change", trackingCookiesButtons, toggleTrackingCookies);

    if (trackingConsent !== true)
      toggleNotice();

  }, false);
}(window, document, document.body));
