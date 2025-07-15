import steps from '../premium-checkout.js'
import { checkoutEvents } from '../../modules/paddle.js';

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
const plansContainer = document.querySelector('.premium-plans');

checkoutEvents.on("checkout.closed", () => {
  plansContainer.classList.remove('has-selection');
  plansContainer.classList.add('hovered');
  document.querySelectorAll('.premium-plan').forEach(plan => {
    plan.querySelector('.premium-cta').classList.remove('selected');
  });
});

window.addEventListener('click', event => {
  if (
    event.target.classList
    && event.target.classList.contains('premium-cta')
    && event.target.dataset
    && event.target.dataset.plan
  ) {
    plansContainer.classList.remove('hovered');
    plansContainer.classList.add('has-selection');
    event.target.classList.add('selected');
    const plan = event.target.dataset.plan;
    if (premiumPlans.indexOf(plan) == -1) return;
    document
        .querySelector(`.premium-checkout-purchase-price[value="${plan}"]`)
        .click();

    steps.purchase.fire("checkout-now");
  }
});

document.addEventListener("click", event => {
  const link = event.target.closest(".premium-checkout-purchase__restore-purchase-link");
  if (!link) return;

  const allowAction = link.closest(".premium-plans__already-contributed");
  if (!allowAction) return;

  event.preventDefault();

  console.log("Before steps:", {
    purchaseClasses: document.querySelector(".premium-checkout-purchase")?.classList.toString(),
    stepsPurchaseState: steps.purchase?.state,
    stepsVerifyState: steps.verify?.state
  });

  // document.querySelector(".premium-checkout-purchase")?.classList.remove("premium-checkout-step--active");
  // document.querySelector(".premium-checkout-purchase")?.classList.remove("premium-checkout-step--transition");
  document.getElementById("premium-checkout")?.classList.add("visible");

  console.log("Before fire:", {
    purchaseClasses: document.querySelector(".premium-checkout-purchase")?.classList.toString(),
    stepsPurchaseState: steps.purchase?.state,
    stepsVerifyState: steps.verify?.state
  });

  steps.purchase.fire("restore-purchase");

  console.log("After steps:", {
    purchaseClasses: document.querySelector(".premium-checkout-purchase")?.classList.toString(),
    stepsPurchaseState: steps.purchase?.state,
    stepsVerifyState: steps.verify?.state
  });


});

document.querySelectorAll("[data-scroll-target]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const targetId = link.dataset.scrollTarget;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

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

  // .premium-plan-yearly default style is .premium-plan:hover
  // When a .premium-plan is hovered then .premium-plan-yearly is styled
  // like the other .premium-plan until no .premium-plan is hovered again
  document.querySelectorAll('.premium-plan').forEach(plan => {
    plan.addEventListener('mouseenter', () => {
      if (!document.querySelector('.premium-plans').classList.contains('has-selection')){
        document.querySelector('.premium-plans').classList.remove('hovered');
      }
    });
    plan.addEventListener('mouseleave', () => {
      if (!document.querySelector('.premium-plans').classList.contains('has-selection')) {
        document.querySelector('.premium-plans').classList.add('hovered');
      }
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

(function() {
  const modalBody = document.querySelector(".premium-motivation-slider-body");
  const button = document.querySelector(".premium-motivation-silder-modal-slider__button");
  const slider = document.querySelector(".premium-motivation-silder-modal-slider");
  const image = document.querySelector(".premium-motivation-slider-image--after");

  let sliding = false;

  function onMove(event) {
    if (sliding) {
      const touchX = (event.clientX || event.touches[0].clientX);
      const imageX = image.getBoundingClientRect().left;
      const modalWidth = modalBody.offsetWidth;
      let slidePercentage = (((touchX - imageX) / modalWidth)*100);
      if (slidePercentage < 0) slidePercentage = 0;
      if (slidePercentage > 100) slidePercentage = 100;
      slider.style.left = slidePercentage + "%";
      image.style.width = slidePercentage + "%";
    }
  }

  function onStart (event) {
    event.preventDefault();
    if (!sliding) sliding = true;
  }

  function onEnd (event) {
    if (sliding) sliding = false;
  }

  button.addEventListener("mousedown", onStart);
  button.addEventListener("touchstart", onStart);
  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchend", onEnd);
  modalBody.addEventListener("mousemove", onMove);
  modalBody.addEventListener("touchmove", onMove);
})();
