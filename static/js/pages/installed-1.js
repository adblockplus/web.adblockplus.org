'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var donationHeading = document.querySelector('.donation-heading');
var tabLinks = document.querySelectorAll('.payment-types.tabs .tabs-menu a');
var tabPanels = document.querySelectorAll('.payment-types.tabs .tab');

window.addEventListener('resize', function() {
  if (window.innerWidth > 991)
    if (!page.classList.contains('hide-form'))
      page.classList.add('show-form');
  else
    page.classList.remove('show-form');
});

document.documentElement.classList.remove('no-js');

// form payment tabs
tabLinks.forEach(function(link, i) {
  link.addEventListener('click', function(event) {
    event.preventDefault();

    tabPanels.forEach(function(panel) {
      panel.classList.remove('active');
    });

    tabLinks.forEach(function(li) {
      li.parentNode.classList.remove('active');
    });

    if (link.hash.replace(/#/g, '') == tabPanels[i].id)
    {
      link.parentNode.classList.add('active');

      document.getElementById(tabPanels[i].id)
        .classList.add('active');

      // set defaut amount on tab focus
      document.getElementById(tabPanels[i].id)
        .querySelectorAll('.payment-amount')[3].click();
    }
  })
});

// sticky footer
document.querySelector('main.container').setAttribute('id', 'content');
