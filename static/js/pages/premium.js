(function(){
  var heightSelectors = {};
  [].slice.call(document.querySelectorAll('[data-matchHeight]')).forEach(function(target){
    if (!heightSelectors[target.dataset.matchheight]) heightSelectors[target.dataset.matchheight] = 1;
  });
  Object.keys(heightSelectors).forEach(function(heightSelector){
    var targets = [].slice.call(document.querySelectorAll(heightSelector));
    var targetHeight = targets.reduce(function(past, present) {
      return present.clientHeight > past
        ? present.clientHeight
        : past;
    }, 0);
    targets.forEach(function(target){
      target.style.height = targetHeight + 'px';
    });
  });
})();