'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var navbarDonateButton = document.querySelector('.scroll-to-donate');
var donateSection = document.querySelector('.donate');
var abbSection = page.querySelector('.abb');

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

if (navigator.userAgent.indexOf("Edg/") != -1)
  bowser.msedge_chromium = true;

if (abbSection && (bowser.msedge || bowser.msie || bowser.msedge_chromium))
  body.classList.add('hide-abb-section');
