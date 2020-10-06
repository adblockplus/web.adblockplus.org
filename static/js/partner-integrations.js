'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var stickyBar = document.querySelector('.sticky-bar');
var hero = document.querySelector('.hero');
var page = document.scrollingElement || document.documentElement; // IE
var sectionLinks = [].slice.call(stickyBar.querySelectorAll('a[href]'));
var sectionLinksMap = {};
var sectionMap = {};

function highightSelection(id) {
  sectionLinks.forEach(function(link) {
    link.classList.remove('selected');
  });

  id && sectionLinksMap[id].classList.add('selected');
}

function navbarShown(changeList) {
  [].slice.call(changeList).forEach(function(change) {
    parseInt(change.target.style.top)
      ? stickyBar.classList.remove('nav-shown')
      : stickyBar.classList.add('nav-shown');
  });
}

(new MutationObserver(navbarShown))
  .observe(document.getElementById('navbar'), { attributes: true });

window.addEventListener('scroll', function() {
  (hero.getBoundingClientRect().bottom > 156)
    ? stickyBar.classList.remove('fixed')
    : stickyBar.classList.add('fixed');

  highightSelection(pageLocation());
});

function smoothScrollTo(destination, duration) {
  if (duration <= 0) return;

  var distance = destination - page.scrollTop;
  var perTick = (distance / duration) * SCROLL_TICK_LENGTH;

  setTimeout(function() {
    page.scrollTop = page.scrollTop + perTick;

    if (page.scrollTop != destination)
      smoothScrollTo(destination, (duration - SCROLL_TICK_LENGTH));
  }, SCROLL_TICK_LENGTH);
}

sectionLinks.forEach(function(linkEl) {
  var sectionID = linkEl.href.split('#')[1];
  var sectionEl = document.getElementById(sectionID)

  sectionLinksMap[sectionID] = linkEl;

  sectionMap[sectionID] = {
    el: document.getElementById(sectionID),
    offset: (page.scrollTop + sectionEl.getBoundingClientRect().top)
  };

  linkEl.addEventListener('click', function(e) {
    e.preventDefault();

    smoothScrollTo((page.scrollTop +
      sectionMap[sectionID].el
        .getBoundingClientRect().top - 122), SCROLL_TIME);
  });
});

function pageLocation(max) {
  var max;
  var top = page.scrollTop + 200;

  for (var section in sectionMap) {
    if (top > sectionMap[section].offset && top < 2400) {
      max = section;
    }
  }

  return max;
}
