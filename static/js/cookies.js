document.addEventListener("DOMContentLoaded", function()
{
  var doc = window.document,
      body = doc.body,

      closeButtons = doc.querySelectorAll(".cookies-close, .cookies-submit"),
      settingsButtons = doc.getElementsByClassName("cookies-settings"),
      settingsDropup = doc.getElementById("cookies-dropup"),
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
    console.log("silence is golden");
  }

  function handleSettingsDropupBlur(event)
  {
    if (
      body.classList.contains("show-cookies-settings") &&
      body.clientWidth >= 576 &&
      !event.target.classList.contains("cookies-settings") &&
      !settingsDropup.contains(event.target)
    ) {
      toggleSettings();
    }
  }

  function addListeners(event, targets, callback)
  {
    for (var i = 0; i < targets.length; i++)
    {
      targets[i].addEventListener(event, callback, false);
    }
  }

  doc.addEventListener("click", handleSettingsDropupBlur, false);

  addListeners("click", closeButtons, toggleNotice);

  addListeners("click", settingsButtons, toggleSettings);

  addListeners("change", trackingCookiesButtons, toggleTrackingCookies);

  toggleNotice();
}, false);
