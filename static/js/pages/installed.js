/* global eyeo */
(function(){
  var $overlay = document.getElementById("delay-overlay");
  var $progress = document.getElementById("delay-progress");
  var $main = document.getElementsByTagName("main")[0];
  var progress = 6;
  var totalProgress = 100;

  function report(data)
  {
    var e = document.createElement("img");
    e.src = "/img/test.gif?" + new URLSearchParams(data).toString();
    document.body.appendChild(e);
  }

  function onProgressComplete()
  {
    $main.hidden = false;
    $overlay.classList.add("fade-out");
    setTimeout(function() {
      $overlay.hidden = true;
      if (window.dataLayer)
        dataLayer.push({'event': 'optimize.activate'});
      if (typeof eyeo.vid != "undefined")
        report({variant: eyeo.vid, session: eyeo.sid});
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

  if (window.location.href.indexOf('skip') != -1)
    onProgressComplete();
  else
    updateProgress();
}());
