/**
 * Set matchTarget height to heightTarget height when above minWidth
 */
function matchHeightOnResize(matchTarget, heightTarget, minWidth) {

  const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

  const onResize = () => {
    if (mediaQuery.matches) {
      matchTarget.style.height = window.getComputedStyle(heightTarget).height;
    } else {
      matchTarget.style.height = 'auto';
    }
  };

  window.addEventListener("resize", onResize);

  onResize();

}

matchHeightOnResize(
  document.getElementById("anti-adblock-pass__plan-1__subheading"),
  document.getElementById("anti-adblock-pass__plan-2__subheading"),
  576
);
