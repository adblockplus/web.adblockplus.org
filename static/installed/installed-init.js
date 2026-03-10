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
  // TODO: remove mock
  const dev = adblock.query.has("emp");
  const mockVariant = adblock.query.get('v');
  if (dev && mockVariant) {
    localStorage.setItem('EMP', mockVariant);
  }
  // TODO: mock end

  adblock.setupExperiment({
    id: "EMP",
    conditions: () => (!localStorage.getItem('EMP-completed')
        && ["US", "CA", "AU"].includes(adblock.settings.country)
        && adblock.settings.locale === 'en') || dev,
    noParticipateCallback: applyControl,
    trafficAllocation: 7.5,
    control: {
      script: "/experiments/email-marketing-program/control.js"
    },
    variants: [
      {script: "/experiments/email-marketing-program/variant.js"},
      {script: "/experiments/email-marketing-program/variant-2.js"},
    ],
  });
}

setupExperiment();
