import { checkExtensionVersion } from "../js/utils/check-extension-version.js";

function initUserAccountsFlow() {
  const checkoutScript = document.createElement("script");
  checkoutScript.type = "module";
  checkoutScript.async = false;
  checkoutScript.src = "/update/update-user-accounts.js";
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
  checkoutScript.src = "/update/update.js";
  document.body.appendChild(checkoutScript);

  const preventDuplicateScript = document.createElement("script");
  preventDuplicateScript.type = "module";
  preventDuplicateScript.async = false;
  preventDuplicateScript.src = "/js/prevent-duplicate-subscription.js";
  document.body.appendChild(preventDuplicateScript);
}

/**
 * Init update page scripts.
 */
async function initPurchaseFlow() {
  const hasMinimumExtensionVersion = await checkExtensionVersion();

  // redirect to the upgrade page users with active trial
  const isTrialActive = adblock.adblockPlus?.isTrial || adblock.query.has("trial");
  if (isTrialActive) window.location.replace(`/${adblock.settings.locale}/upgrade${window.location.search}`);

  if (hasMinimumExtensionVersion) {
    initUserAccountsFlow();
  } else {
    initLegacyPurchaseFlow();
  }
}

initPurchaseFlow();
