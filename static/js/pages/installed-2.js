(function(){
  var $overlay = document.getElementById("delay-overlay");
  var $progress = document.getElementById("delay-progress");
  var $main = document.getElementsByTagName("main")[0];
  var progress = 6;
  var totalProgress = 100;

  function onProgressComplete()
  {
    $main.hidden = false;
    $overlay.classList.add("fade-out");
    setTimeout(function() {
      $overlay.hidden = true;
      if (window.dataLayer)
        dataLayer.push({'event': 'optimize.activate'});
    }, 300);
  }

  function updateProgress()
  {
    $progress.value = progress;
    progress = progress * 1.2;
    if (progress < totalProgress)
      setTimeout(updateProgress, 60);
    else
      onProgressComplete();
  }

  updateProgress();
}());