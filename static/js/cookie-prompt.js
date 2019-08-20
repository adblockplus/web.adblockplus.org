(function(root, doc, body)
{
  var eyeo = root.eyeo || {};
  var HAS_SEEN_COOKIE_PROMPT = "eyeo-seen-cookie-prompt";
  var TRACKING_OPT_OUT = "eyeo-ga-opt-out";
  var TESTING_OPT_OUT = "eyeo-ab-opt-out";
  var TRACKING_CONSENT = "eyeo-ga-consent";
  var TRACKING_UID = "UA-18643396-6";

  function addListeners(event, targets, callback)
  {
    for (var i = 0; i < targets.length; i++)
    {
      targets[i].addEventListener(event, callback, false);
    }
  }

  function hasCookie(key)
  {
    return doc.cookie.indexOf(key) !== -1;
  }

  function setCookie(key, value)
  {
    if (value)
      doc.cookie = key + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    else
      doc.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }

  var hasSeenCookiePrompt = hasCookie(HAS_SEEN_COOKIE_PROMPT);
  var trackingOptOut = hasCookie(TRACKING_OPT_OUT);
  var testingOptOut = hasCookie(TESTING_OPT_OUT);
  var trackingConsent = hasCookie(TRACKING_CONSENT);

  doc.addEventListener("DOMContentLoaded", function()
  {
    var closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit, .cookies-save");
    var saveButtons = doc.querySelectorAll(".cookies-save");
    var settingsButtons = doc.querySelectorAll(".cookies-settings");
    var settingsDropups = doc.querySelectorAll(".cookies-dropup");
    var trackingCookiesButtons = doc.querySelectorAll(".tracking-cookies");
    var testingCookiesButtons = doc.querySelectorAll(".testing-cookies");

    function toggleCookieNotice()
    {
      body.classList.toggle("show-cookies-notice");
      body.classList.remove("show-cookies-settings");
    }

    function closeCookieNotice()
    {
      body.classList.remove("show-cookies-notice");
      body.classList.remove("show-cookies-settings");
    }

    function toggleCookieSettings()
    {
      this.parentElement.classList.toggle("show-cookies-settings");
    }

    function onCookieSettingsBlur(event)
    {
      var isInDropup = false;

      for (var i = 0; i < settingsDropups.length; i++)
        if (settingsDropups[i].contains(event.target))
          isInDropup = true;

      if (
        // Is the cookie settings dropup open?
        body.classList.contains("show-cookies-settings") &&
        root.innerWidth >= 576 &&
        root.innerHeight >= 575 &&
        // Is the click outside the cookie settings dropup?
        isInDropup == false
      ) {
          toggleCookieSettings();
      }
    }

    function toggleTrackingPreference()
    {
      trackingOptOut = !trackingOptOut;
      flipTrackingSwitches(!trackingOptOut);
      if (trackingOptOut)
        flipTestingSwitches(false);
      else if (!testingOptOut)
        flipTestingSwitches(true);
    }

    function toggleTestingPreference()
    {
      testingOptOut = !testingOptOut;
      flipTestingSwitches(!testingOptOut);
    }

    function saveCookieSettings()
    {
      setCookie(TRACKING_OPT_OUT, trackingOptOut);
      setCookie(TESTING_OPT_OUT, testingOptOut);
      // consent cookie is saved separately by triggering any notice closing event

      // This immediately disables or undisables tracking
      root["ga-disable-" + TRACKING_UID] = !trackingOptOut;

      // Delete all non-essential cookies when tracking is disabled
      if (trackingOptOut)
      {
        var cookies = doc.cookie.split(";");

        for (var i = 0; i < cookies.length; i++)
        {
          var cookie = cookies[i].split("=")[0].trim();

          if (cookie !== TRACKING_OPT_OUT &&
            cookie !== TESTING_OPT_OUT &&
            cookie !== TRACKING_CONSENT)
            setCookie(cookie, false);
        }
      }
    }

    function saveCookieConsent()
    {
      setCookie(TRACKING_CONSENT, true);
    }

    function flipTrackingSwitches(checked)
    {
      var trackingOptOutSwitches = doc.querySelectorAll("input.tracking-cookies");

      for (var i = 0; i < trackingOptOutSwitches.length; i++)
        trackingOptOutSwitches[i].checked = checked;
    }

    function flipTestingSwitches(checked)
    {
      var testingOptOutSwitches = doc.querySelectorAll("input.testing-cookies");

      for (var i = 0; i < testingOptOutSwitches.length; i++)
        testingOptOutSwitches[i].checked = checked;
    }

    doc.addEventListener("click", onCookieSettingsBlur, true);

    addListeners("click", closeButtons, saveCookieConsent);

    addListeners("click", closeButtons, closeCookieNotice);

    addListeners("click", settingsButtons, toggleCookieSettings);

    addListeners("change", trackingCookiesButtons, toggleTrackingPreference);

    addListeners("change", testingCookiesButtons, toggleTestingPreference);

    addListeners("click", saveButtons, saveCookieSettings);


    if (!eyeo.preventCookiePrompt && !trackingConsent)
      toggleCookieNotice();

    if (trackingOptOut)
    {
      flipTrackingSwitches(false);
      flipTestingSwitches(false);
    }

    if (testingOptOut)
      flipTestingSwitches(false);

  }, false);
}(window, document, document.body));
