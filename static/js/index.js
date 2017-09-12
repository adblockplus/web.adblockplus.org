(function()
{
  var visibleTab;
  var container = document.getElementById("more-container");

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
})();
