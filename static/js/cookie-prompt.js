/* global eyeo */
(function(root, doc, body)
{
  var SEEN_COOKIE_PROMPT_COOKIE = "eyeo-seen-cookie-prompt";
  var TRACKING_OPT_OUT_COOKIE = "eyeo-ga-opt-out";
  var SPLIT_TESTING_OPT_OUT_COOKIE = "eyeo-ab-opt-out";
  var DISMISS_COOKIE_PROMPT_COOKIE = "eyeo-ga-consent";
  var GOOGLE_ANALYTICS_UID = "UA-18643396-6";

  var domain = window.location.hostname
    // get top level domain
    .split(".").slice(-2).join(".")
    // strip port
    .split(":")[0];

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
      doc.cookie = key + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=" + domain + "; path=/";
    else
      doc.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=" + domain + "; path=/";
  }

  var hasSeenCookiePrompt = hasCookie(SEEN_COOKIE_PROMPT_COOKIE);
  var trackingOptOut = hasCookie(TRACKING_OPT_OUT_COOKIE);
  var testingOptOut = hasCookie(SPLIT_TESTING_OPT_OUT_COOKIE);
  var trackingConsent = hasCookie(DISMISS_COOKIE_PROMPT_COOKIE);

  function initializeCookiePrompt()
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
      if (window.innerWidth >= 576)
        this.parentElement.classList.toggle("show-cookies-settings");
      else
        body.classList.toggle("show-cookies-settings");
    }

    function onCookieSettingsBlur(event)
    {
      var isInDropup = false;

      for (var i = 0; i < settingsDropups.length; i++)
        if (settingsDropups[i].contains(event.target))
          isInDropup = true;

      if (event.target.classList.contains('cookies-save') ||
        (root.innerWidth >= 576 &&
        root.innerHeight >= 575 &&
        // Is the click outside the cookie settings dropup?
        isInDropup == false)
      ) {
        [].slice.call(settingsDropups).forEach(function(node) {
          node.classList.remove("show-cookies-settings");
        });
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
      setCookie(TRACKING_OPT_OUT_COOKIE, trackingOptOut);
      setCookie(SPLIT_TESTING_OPT_OUT_COOKIE, testingOptOut);
      // consent cookie is saved separately by triggering any notice closing event

      // This immediately disables or undisables tracking
      root["ga-disable-" + GOOGLE_ANALYTICS_UID] = !trackingOptOut;

      // Delete all non-essential cookies when tracking is disabled
      if (trackingOptOut)
      {
        var cookies = doc.cookie.split(";");

        for (var i = 0; i < cookies.length; i++)
        {
          var cookie = cookies[i].split("=")[0].trim();

          if (cookie !== TRACKING_OPT_OUT_COOKIE &&
            cookie !== SPLIT_TESTING_OPT_OUT_COOKIE &&
            cookie !== DISMISS_COOKIE_PROMPT_COOKIE)
            setCookie(cookie, false);
        }
      }
    }

    function saveCookieConsent()
    {
      setCookie(DISMISS_COOKIE_PROMPT_COOKIE, true);
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


    if (!eyeo.excludeCookiePrompt && !trackingConsent)
      toggleCookieNotice();

    if (trackingOptOut)
    {
      flipTrackingSwitches(false);
      flipTestingSwitches(false);
    }

    if (testingOptOut)
      flipTestingSwitches(false);

    // Record first visit to page with cookie prompt (if applicable)
    if (!eyeo.excludeCookiePrompt && !hasSeenCookiePrompt)
      document.cookie = "eyeo-seen-cookie-prompt=1; expires=Fri, 31 Dec 9999 23:59:59 GMT; samesite=lax; domain=" + domain + "; path=/";
  }

  if (document.readyState == "complete" ||
      document.readyState == "loaded" ||
      document.readyState == "interactive")
    initializeCookiePrompt();
  else
    doc.addEventListener("DOMContentLoaded", initializeCookiePrompt, false);

}(window, document, document.body));
