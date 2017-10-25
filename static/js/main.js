"use strict";

(function()
{
  function initLanguageSelection()
  {
    var locale = document.getElementById("navbar-locale-selected");

    // skip if page does not have language selection (EG: blog)
    if (!locale) return;

    locale.addEventListener("click", function()
    {
      document.getElementById("navbar-locale-menu")
        .classList.toggle("visible");
    }, false);
  }

  function navigationClick(event)
  {
    document.getElementById("navbar-menu")
      .classList.toggle("visible");
  }

  function initMenu()
  {
    document.getElementById("navbar-menu-toggle")
      .addEventListener("click", navigationClick, false);
  }

  initLanguageSelection();
  initMenu();
})();
