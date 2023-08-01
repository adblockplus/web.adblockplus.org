/**
 * Set all targets height equal to the largest targets height
 * CAUTION: This only works as-is for elements without padding
 * @param {NodeList} targets
 */
function setMatchingHeights(targets)
{
  var largestHeight = 0;
  var targetHeight;
  var i;
  for (i = 0; i < targets.length; i++)
  {
    targetHeight = targets[i].clientHeight;
    if (targetHeight > largestHeight) {
      largestHeight = targetHeight;
    }
  }
  for (i = 0; i < targets.length; i++)
  {
    targets[i].style.height = largestHeight + 'px';
  }
}

/**
 * Set all targets height to auto
 * @param {NodeList} targets
 */
function setAutoHeights(targets)
{
  for (var i = 0; i < targets.length; i++)
  {
    targets[i].style.height = 'auto';
  }
}

/**
 * Set heightTarget height from offsetTarget top position and additionalStaticOffset
 * CAUTION: offsetTarget top position doesn't count border width
 * @param {Element} heightTarget
 * @param {ELement} offsetTarget
 * @param {Number} additionalStaticOffset
 */
 function setHeightFromOffsetTop(heightTarget, offsetTarget, additionalStaticOffset)
 {
   var bodyPaddingTop = parseFloat(getComputedStyle(document.body).paddingTop);
   additionalStaticOffset = additionalStaticOffset || 0;
   var offsetTargetOffset = offsetTarget.getBoundingClientRect().top
    + document.documentElement.scrollTop;
   heightTarget.style.height = (offsetTargetOffset + additionalStaticOffset - bodyPaddingTop) + 'px';
 }

// Enable pre-selecting monthly/yearly payment options via clicking a 
// .premium-cta[data-plan] with an allowlisted plan
const premiumPlans = ['monthly', 'yearly'];
window.addEventListener('click', event => {
  if (
    event.target.classList
    && event.target.classList.contains('premium-cta')
    && event.target.dataset
    && event.target.dataset.plan
  ) {
    const plan = event.target.dataset.plan;
    if (premiumPlans.indexOf(plan) == -1) return;
    document
      .querySelector(`[data-recurring-frequency="${plan}"]`)
      .click();
  }
});

if (adblock.searchParameters.has("bc")) {
  document.querySelector(".premium-header--default").hidden = true;
  document.querySelector(".premium-header--churned").hidden = false;
  document.querySelector(".premium-churned__heading__blocked").textContent = adblock.searchParameters.get("bc")
}

function onDOMContentLoaded()
{
  // Set up FAQ toggles
  var premiumFaqs = document.querySelector('.premium-faqs');
  premiumFaqs.addEventListener('click', function(event)
  {
    if (event.target.classList.contains('premium-faq-question')) {
      event.target.closest('.premium-faq').classList.toggle('active');
    }
  });

  var largeScreenQuery = window.matchMedia('(min-width:992px)');

  // Set heights and resize for sections that should match in height
  var premiumPlanDescriptions = document.querySelectorAll('.premium-plan-description');
  var premiumFeaturesDescriptions = document.querySelectorAll('.premium-feature-description');
  function onMatchingHeightsScreenTransition()
  {
    if (largeScreenQuery.matches) {
      setMatchingHeights(premiumPlanDescriptions);
      setMatchingHeights(premiumFeaturesDescriptions);
    } else {
      setAutoHeights(premiumPlanDescriptions);
      setAutoHeights(premiumFeaturesDescriptions);
    }
  }
  largeScreenQuery.addEventListener('change', onMatchingHeightsScreenTransition);
  if (
    document.readyState != "complete"
    && document.readyState != "loaded"
  ) {
    window.addEventListener('load', onMatchingHeightsScreenTransition);
  }
  onMatchingHeightsScreenTransition();

  // Set heights and resize for backgrounds that should extend to specific points
  var premiumBackground1 = document.querySelector('.premium-background-1');
  var premiumPlan1 = document.querySelector('.premium-plan');
  var premiumFeatureImage1 = document.querySelector('.premium-feature-image');
  function onHeightFromOffsetChange()
  {
    if (largeScreenQuery.matches) {
      setHeightFromOffsetTop(
        premiumBackground1,
        premiumFeatureImage1,
        (premiumFeatureImage1.clientHeight / 2)
      );
    } else {
      setHeightFromOffsetTop(
        premiumBackground1,
        premiumPlan1,
        4
      );
    }
  }
  largeScreenQuery.addEventListener('change', onHeightFromOffsetChange);
  window.addEventListener('resize', function()
  {
    if (!largeScreenQuery.matches) {
      onHeightFromOffsetChange();
    }
  });
  if (
    document.readyState != "complete"
    && document.readyState != "loaded"
  ) {
    window.addEventListener('load', onHeightFromOffsetChange);
  }
  onHeightFromOffsetChange();

  // .premium-plan-yearly default style is .premium-plan:hover
  // When a .premium-plan is hovered then .premium-plan-yearly is styled
  // like the other .premium-plan until no .premium-plan is hovered again
  document.querySelectorAll('.premium-plan').forEach(plan => {
    plan.addEventListener('mouseenter', () => {
      document.querySelector('.premium-plans').classList.remove('not-hovered');
    });
    plan.addEventListener('mouseleave', () => {
      document.querySelector('.premium-plans').classList.add('not-hovered');
    })
  });

  if (
    document.documentElement.classList.contains('de')
    || document.documentElement.classList.contains('fr')
  ) {
    // Show and position tooltips using data-tooltip-target
    document.querySelectorAll('[data-tooltip-target]').forEach(tooltip => {
      tooltip.style.display = 'block';
      const tooltipHeight = tooltip.getBoundingClientRect().height;
      tooltip.style.height = tooltipHeight + 'px'
      tooltip.style.display = 'none';
      tooltip.style.zIndex = 9001;
      tooltip.style.visibility = 'visible';
      document.querySelectorAll(tooltip.dataset.tooltipTarget).forEach(tooltipTarget => {
        tooltipTarget.addEventListener('mouseover', () => {
          const targetRect = tooltipTarget.getBoundingClientRect();
          tooltip.style.top =  (targetRect.top - tooltipHeight - 14 + window.scrollY) + 'px';
          tooltip.style.left = (targetRect.left - 16 + window.scrollX) + 'px';
          tooltip.style.display = 'block';
        });
        tooltipTarget.addEventListener('mouseout', () => {
          tooltip.style.display = 'none';
        });
      });
    });
  }
}

if (
  document.readyState === "complete"
  || document.readyState === "loaded"
  || document.readyState === "interactive"
) {
  onDOMContentLoaded();
} else {
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded)
}