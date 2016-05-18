(function()
{
  var visibleTab;
  var container;

  window.toggleMore = function()
  {
    if (container.className == "hidden")
      container.className = visibleTab || getDefaultTab();
    else
      container.className = "hidden";
  }

  window.showTab = function(button)
  {
    var id = button.id.substr(5);
    container.className = id;
    visibleTab = id;
  }

  function getDefaultTab()
  {
    var content = document.getElementById("content");
    var ua = content.className.match(/ua\-([^\s]+)/);
    visibleTab = ua && ua[1] || "firefox";
    return visibleTab;
  }

  function init()
  {
    container = document.getElementById("more-container");
    checkEdgeSupport();
  }

  function checkEdgeSupport()
  {
    if (!window.navigator.userAgent)
      return;

    var content = document.getElementById("content");
    var match = window.navigator.userAgent.match(/Edge\/(\d+.\d+)/);
    if (match && parseFloat(match[1]) >= 14.14342 &&
        content.classList.contains("edge"))
      content.classList.add("edge-supported");
  }

  init();
})();
