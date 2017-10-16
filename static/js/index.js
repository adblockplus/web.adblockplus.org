(function()
{
  document.documentElement.className = "js";

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

  // Change overlay icon on #video to play icon
  document
    .getElementById("video-play")
    .setAttribute("src", "/img/video-play.png");

  // Save time user clicked to show video disclaimer
  var timeClickedVideo;

  function changeImageToVideo(event)
  {
    event.preventDefault();
    
    var videoContainer = document.getElementById("video-container");

    if (videoContainer.className == "show-disclaimer")
    {
      // Enfore 600ms delay
      var currentTime = new Date().getTime();
      if (currentTime - timeClickedVideo < 600) return;

      var image = this;
      
      var video = document.createElement("iframe");
      video.id = "video";
      video.setAttribute("frameborder", "0");
      video.setAttribute("height", "285");
      video.setAttribute("width", "520");
      video.setAttribute("itemprop", "video");
      video.setAttribute("allowfullscreen", "allowfullscreen");
      video.setAttribute("src", image.getAttribute("href"));
      
      image.parentNode.replaceChild(video, image);

      videoContainer.className = "";
    }
    else
    {
      videoContainer.className = "show-disclaimer";
      timeClickedVideo = new Date().getTime();
    }
  }

  document
    .getElementById("video")
    .addEventListener("click", changeImageToVideo);

})();
