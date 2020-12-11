'use strict';

function accordion(headings, openInitially) {
  var details = [];

  if (!headings.length) return;

  headings = [].slice.call(headings);

  function hideDetail(el) {
    el.setAttribute('hidden', '');

    el.setAttribute('aria-hidden', true);
  }

  function collapseAll() {
    details.forEach(hideDetail);
  }

  function expand(heading) {
    headings.forEach(function(el) {
      el.classList.remove('open');
      
      el.setAttribute('aria-expanded', false);

      el.setAttribute('aria-selected', false);
    });

    heading.classList.add('open');

    heading.nextElementSibling.removeAttribute('hidden');

    heading.nextElementSibling.setAttribute('aria-hidden', false);

    heading.setAttribute('aria-expanded', true);

    heading.setAttribute('aria-selected', true);
  }

  function collapse(heading) {
    heading.classList.remove('open');

    heading.setAttribute('aria-selected', false);

    hideDetail(heading.nextElementSibling);
  }

  headings.forEach(function(heading) {
    details.push(heading.nextElementSibling);

    function toggle(heading) {
      heading.classList.contains('open')
        ? collapse(heading)
        : selectSection(heading);
    }

    function selectSection(heading) {
      collapseAll();

      expand(heading);
    }

    heading.addEventListener('mousedown', function() {
      heading.removeAttribute('tabindex');
    });

    heading.addEventListener('click', function() {
      toggle(heading);

      heading.setAttribute('tabindex', 0);
    });
    
    heading.addEventListener('keydown', function(e) {
      if (e.keyCode == 13) toggle(e.target);
    });
  });

  collapseAll();

  if (openInitially) {
    expand(openInitially);

  } else if (openInitially !== false) {
    expand(headings[0]);
  }
}
