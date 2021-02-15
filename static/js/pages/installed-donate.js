'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var navbarDonateButton = document.querySelector('.scroll-to-donate');
var donateSection = document.querySelector('.donate');
var abbSection = page.querySelector('.abb');

// sticky footer (here only cause the A/B test #628)
document.querySelector('main.container').setAttribute('id', 'content');

// Detatched Donation form (here only cause the A/B test #628)
var donateSectionHtml = donateSection.innerHTML;

var newDonateSectionHtml = '<div class="fake-container">' + donateSectionHtml + '</div>';

donateSection.innerHTML = newDonateSectionHtml;

var closeFormButton = document.createElement('a');

closeFormButton.setAttribute('id', 'close-form-button');

closeFormButton.addEventListener('click', function() {
  page.classList.remove('show-form');
  page.classList.add('hide-form');
})

donateSection.appendChild(closeFormButton);

window.addEventListener('resize', function() {
  if (window.innerWidth > 991)
    if (!page.classList.contains('hide-form'))
      page.classList.add('show-form');
  else
    page.classList.remove('show-form');
});

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
