'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;
var MIN_FX_VERSION = 3.22;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var donationHeading = document.querySelector('.payment-heading');
var dataCollectionParagraph = document.getElementById('fx-data-collection');

var installedParams = new URLSearchParams(window.location.search);
var browser = installedParams.get('ap');
if (browser === "firefox") {
  const versionNumber = parseFloat(installedParams.get('av'));
  if (!isNaN(versionNumber) && versionNumber >= MIN_FX_VERSION) {
    dataCollectionParagraph.style.display = 'block';
  }
}

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
