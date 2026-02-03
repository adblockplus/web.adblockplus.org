import { checkExtensionVersion } from "../js/utils/check-extension-version.js";

function initUserAccountsFlow() {
  const checkoutScript = document.createElement("script");
  checkoutScript.type = "module";
  checkoutScript.async = false;
  checkoutScript.src = "/installed/installed-user-accounts.js";
  document.body.appendChild(checkoutScript);

  const preventDuplicateScript = document.createElement("script");
  preventDuplicateScript.type = "module";
  preventDuplicateScript.async = false;
  preventDuplicateScript.src = "/js/prevent-duplicate-subscription-user-accounts.js";
  document.body.appendChild(preventDuplicateScript);
}

function initLegacyPurchaseFlow() {
  const checkoutScript = document.createElement("script");
  checkoutScript.type = "module";
  checkoutScript.async = false;
  checkoutScript.src = "/installed/installed.js";
  document.body.appendChild(checkoutScript);

  const preventDuplicateScript = document.createElement("script");
  preventDuplicateScript.type = "module";
  preventDuplicateScript.async = false;
  preventDuplicateScript.src = "/js/prevent-duplicate-subscription.js";
  document.body.appendChild(preventDuplicateScript);
}

async function initPurchaseFlow() {
  const hasMinimumExtensionVersion = await checkExtensionVersion();

  if (hasMinimumExtensionVersion) {
    initUserAccountsFlow();
  } else {
    initLegacyPurchaseFlow();
  }
}

// initPurchaseFlow();

/**
 * Init experiment for Email Marketing Program
 * */

function applyControl() {
  const loader = document.getElementById("installed-loader");
  if (loader) {
    loader.hidden = true;
  }
  const defaultContent = document.getElementById("installed")
  if (defaultContent) {
    defaultContent.classList.remove("placeholder");
    defaultContent.hidden = false;
  }
  console.log('init purchase flow');
  initPurchaseFlow();
}

async function setupExperiment() {
  const dev = adblock.query.has("emp");
  const meetsCriteria = (["US", "CA", "AU"].includes(adblock.strings.country)
      && adblock.strings.locale === 'en')
    || dev;
  console.log('country meets criteria: ', meetsCriteria);
  if (!meetsCriteria) {
    console.log('apply control');
    applyControl();
    return;
  }

  const hasMinimumExtensionVersion = await checkExtensionVersion();

  adblock.setupExperiment({
    id: "EMP",
    conditions: () => hasMinimumExtensionVersion || dev,
    noParticipateCallback: applyControl,
    trafficAllocation: 0,
    control: {
      script: ["https://cdn.paddle.com/paddle/v2/paddle.js", "/js/vendor/NumberFormat.min.js"]
    },
    variant: {
      script: "/experiments/email-marketing-program/variant.js"
    },
  });

}

setupExperiment();
