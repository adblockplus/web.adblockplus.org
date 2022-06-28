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
   additionalStaticOffset = additionalStaticOffset || 0;
   var offsetTargetOffset = offsetTarget.getBoundingClientRect().top
    + document.documentElement.scrollTop;
   heightTarget.style.height = (offsetTargetOffset + additionalStaticOffset) + 'px';
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