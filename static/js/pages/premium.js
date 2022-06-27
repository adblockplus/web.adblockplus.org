(function(){
  window.addEventListener('load', function() {
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
  })
})();

(function(){
  window.addEventListener('load', function() {
    var heightSelectors = {};
    [].slice.call(document.querySelectorAll('[data-match-height-offset]')).forEach(function(target){
      var offset = document.querySelector(target.dataset.matchHeightOffset).getBoundingClientRect().top;
      var style = getComputedStyle(target);
      target.style.height = (offset + 2) + 'px';
    });
  })
})();

(function(){
  document.addEventListener('DOMContentLoaded', function() {
    [].slice.call(document.querySelectorAll('.premium-faq h3 > a')).forEach(function(target) {
      target.addEventListener('click', function(event) {
        event.target.parentElement.parentElement.classList.toggle('active');
      });
    })
  });
}())