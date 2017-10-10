"use strict";

(function()
{
  function escapeRegExp(string)
  {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function hasClass(element, className)
  {
    return !!element.className.match("\\b" + escapeRegExp(className) + "\\b");
  }

  function addClass(element, className)
  {
    if (hasClass(element, className))
      return;

    if (element.className.length)
      element.className += " ";
    element.className += className;
  }

  function removeClass(element, className)
  {
    var regExp = new RegExp("\\s*\\b" + escapeRegExp(className) + "\\b\\s*");
    element.className = element.className.replace(regExp, "");
  }

  function toggleClass(element, className)
  {
    if (hasClass(element, className))
      removeClass(element, className);
    else
      addClass(element, className);
  }

  function stopPropagation(event)
  {
    if (typeof window.event !== "undefined"
        && typeof window.event.cancelBubble !== "undefined")
      window.event.cancelBubble = true;
    else
      event.stopPropagation();
  }

  function initLanguageSelection()
  {
    var locale = document.getElementById("navbar-locale-selected");

    // skip if page does not have language selection (EG: blog)
    if (!locale)
      return;

    locale.onclick = function()
    {
      toggleClass(document.getElementById("navbar-locale-menu"), "visible");
    };
  }

  function navigationClick(event)
  {
    toggleClass(document.getElementById("navbar-menu"), "visible");
  }

  function initMenu()
  {
    document.getElementById("navbar-menu-toggle").onclick = navigationClick;
  }

  initLanguageSelection();
  initMenu();
})();
