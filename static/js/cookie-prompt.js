(function(root, doc, body)
{
  var eyeo = root.eyeo || {};
  var HAS_SEEN_COOKIE_PROMPT = "eyeo-seen-cookie-prompt";
  var TRACKING_OPT_OUT = "eyeo-ga-opt-out";
  var TRACKING_CONSENT = "eyeo-ga-consent";
  var TRACKING_UID = "UA-18643396-6";

  var host = window.location.hostname;

  // Set `domain` to whole hostname if Firebase preview page
  var domain = host.startsWith('dev--adblockplus-org--') && host.endsWith('.web.app')
    ? host
    : host.split(".").slice(-2).join(".").split(":")[0];

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

  var hasSeenCookiePrompt = hasCookie(HAS_SEEN_COOKIE_PROMPT);
  var trackingOptOut = hasCookie(TRACKING_OPT_OUT);
  var trackingConsent = hasCookie(TRACKING_CONSENT);

  function initializeCookiePrompt()
  {
    var closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit, .cookies-save");
    var saveButtons = doc.querySelectorAll(".cookies-save");
    var settingsButtons = doc.querySelectorAll(".cookies-settings");
    var settingsDropups = doc.querySelectorAll(".cookies-dropup");
    var trackingCookiesButtons = doc.querySelectorAll(".tracking-cookies");

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
    }

    function saveCookieSettings()
    {
      setCookie(TRACKING_OPT_OUT, trackingOptOut);
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

    doc.addEventListener("click", onCookieSettingsBlur, true);

    addListeners("click", closeButtons, saveCookieConsent);

    addListeners("click", closeButtons, closeCookieNotice);

    addListeners("click", settingsButtons, toggleCookieSettings);

    addListeners("change", trackingCookiesButtons, toggleTrackingPreference);

    addListeners("click", saveButtons, saveCookieSettings);


    if (!adblock.settings.suppressCookiePrompt && !trackingConsent)
      toggleCookieNotice();

    if (trackingOptOut)
    {
      flipTrackingSwitches(false);
    }

  }

  if (document.readyState == "complete" ||
      document.readyState == "loaded" ||
      document.readyState == "interactive")
    initializeCookiePrompt();
  else
    doc.addEventListener("DOMContentLoaded", initializeCookiePrompt, false);

}(window, document, document.body));
