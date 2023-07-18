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

/**
 * Simple inline tooltip
 * 
 * Shows, hides, and absolutely positions a tooltip by an inline link/button.
 * 
 * Positions text-bottom 1rm right by default and 1rm left when there isn't
 * enough room to the right.
 * 
 * Expects an inline link/button and a tooltip element that's closest relative
 * container is the document (i.e. put the tooltip at the beginning or ending
 * of the document to avoid positioning issues).
 */
class InlineTooltip {

  constructor(trigger, tooltip) {

    const repositionTooltip = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      // Position to the left by default
      let left = triggerRect.left + window.pageXOffset + triggerRect.width + 16;
      // Position to the right if there's not enough room on the left
      if ((left + tooltipRect.width) > document.body.clientWidth) {
        left = triggerRect.left + window.pageXOffset - tooltipRect.width - 16;
      }
      tooltip.style.left =  left + 'px';
      tooltip.style.top = (triggerRect.top + window.pageYOffset + triggerRect.height - tooltipRect.height) + 'px';
    }
  
    window.addEventListener("resize", () => {
      if (tooltip.classList.contains("active")) {
        repositionTooltip();
      }
    });
  
    trigger.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      if (tooltip.classList.contains("active")) {
        tooltip.classList.remove("active");
      } else {
        repositionTooltip();
        tooltip.classList.add("active");
      }
    });
  
    document.addEventListener("click", event => {
      if (tooltip.classList.contains("active") && !tooltip.contains(event.target)) {
        tooltip.classList.remove("active");
      }
    });  

  }
}

new InlineTooltip(
  document.getElementById("anti-adblock-pass-tooltip-trigger"),
  document.getElementById("anti-adblock-pass-tooltip")
);