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

initPurchaseFlow();

/**
 * Init experiment for Email Marketing Program
 * */

function applyControl() {
  document.documentElement.classList.remove('modal-open');
  const loader = document.getElementById("installed-loader");
  if (loader) {
    loader.hidden = true;
  }
  const overlay = document.getElementById("installed-blur-overlay");
  if (overlay) {
    overlay.hidden = true;
  }
}

async function setupExperiment() {
  document.documentElement.classList.add("modal-open");

  // TODO: remove mock
  const mockVariant = adblock.query.get('v');
  if (mockVariant) {
    localStorage.setItem('EMP', mockVariant);
  }

  const dev = adblock.query.has("emp");
  const meetsCriteria = (["US", "CA", "AU"].includes(adblock.strings.country)
      && adblock.strings.locale === 'en')
    || dev;
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
      script: "/experiments/email-marketing-program/control.js"
    },
    variant: {
      script: "/experiments/email-marketing-program/variant.js"
    },
  });

}

setupExperiment();
