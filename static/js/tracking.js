/**
 * 1. Pass GA data from links on click before transport
 *    e.g. <a href="example" data-ga='{'eventLabel': "GOAL_NAME"}'>Example</a>
 * 2. Pass URL parameters between internal pages
 */
document.addEventListener("click", function(event)
{
  // abort if tracking is disabled
  if (!gtag) return;

  // abort if not link
  if (event.target.tagName.toLowerCase() !== "a") return;

  // 1. Pass GA data from links on click before transport //////////////////////

  var gaData = event.target.getAttribute("data-ga");

  // if is tracking link
  if (gaData)
  {
    try { // try to parse data-ga
      gaData = JSON.parse(gaData);
    } catch (error) { // report error in page on error
      if (console && console.error)
        console.error(event.target, error);
      gaData = {
        "event_category": "Parse Error",
        "event_action": "Link click",
        "event_label": window.location.href
      };
    }

    // ensure report sends before following link in modern browsers
    gaData.transport = "beacon";

    // false after tracking is manually disabled before page refresh
    if (window["ga-disable-UA-18643396-6"] !== false)
      gtag("event", gaData.event_action, gaData);
  }

  // 2. Pass URL parameters between internal pages /////////////////////////////

  var siteURL = document.documentElement.getAttribute('data-siteurl');

  // if is internal link
  if (
    // current url has parameters
    window.location.href.indexOf("?") !== -1 &&
    // link is not external
    event.target.origin === siteURL &&
    // link is not deep
    event.target.href.indexOf("#") === -1
  ) {
    // pass along url parameters
    event.target.href = event.target.href += "?" + (window.location.href.split("?")[1] || "");
  }

});
