'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var navbarDonateButton = document.querySelector('.scroll-to-donate');
var donateSection = document.querySelector('.donate');

document.documentElement.classList.remove('no-js');

navbarDonateButton
  .addEventListener('click', function() {
    smoothScrollTo(donateSection.getBoundingClientRect().top, SCROLL_TIME);
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

var abbSections = document.getElementsByClassName("abb");
var footerFRP = document.getElementsByClassName("footer");

if (abbSections.length > 0 && (bowser.msedge || bowser.msedge_chromium || bowser.msie)) {
    abbSections[0].classList.add("hide-on-ms");
    footerFRP[0].classList.add("footer-ms");
}