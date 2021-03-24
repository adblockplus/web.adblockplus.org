'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var navbarDonateButton = document.querySelector('.scroll-to-donate');
var donationHeading = document.querySelector('.donation-heading');
var abbSection = page.querySelector('.abb');

window.addEventListener('resize', function() {
  if (window.innerWidth > 991)
    if (!page.classList.contains('hide-form'))
      page.classList.add('show-form');
  else
    page.classList.remove('show-form');
});

document.documentElement.classList.remove('no-js');

// sticky footer
document.querySelector('main.container').setAttribute('id', 'content');

// hide ABB in IE/Edge devices
if (navigator.userAgent.indexOf('Edg/') != -1)
  bowser.msedge_chromium = true;

if (bowser.msedge || bowser.msie || bowser.msedge_chromium)
  abbSection.classList.add('hide');

navbarDonateButton
  .addEventListener('click', function() {
    smoothScrollTo(donationHeading.getBoundingClientRect().top, SCROLL_TIME);
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
