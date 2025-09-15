import { checkExtensionVersion } from "./utils/check-extension-version.js";

function initUserAccountsFlow() {
  const checkoutScript = document.createElement("script");
  checkoutScript.type = "module";
  checkoutScript.async = false;
  checkoutScript.src = "/js/premium-checkout-user-accounts.js";
  document.body.appendChild(checkoutScript);

  const preventDuplicateScript = document.createElement("script");
  preventDuplicateScript.type = "module";
  preventDuplicateScript.async = false;
  preventDuplicateScript.src = "/js/prevent-duplicate-subscription-user-accounts.js";
  document.body.appendChild(preventDuplicateScript);
}

function initLegacyPremiumFlow() {
  const checkoutScript = document.createElement("script");
  checkoutScript.type = "module";
  checkoutScript.async = false;
  checkoutScript.src = "/js/premium-checkout.js";
  document.body.appendChild(checkoutScript);

  const preventDuplicateScript = document.createElement("script");
  preventDuplicateScript.type = "module";
  preventDuplicateScript.async = false;
  preventDuplicateScript.src = "/js/prevent-duplicate-subscription.js";
  document.body.appendChild(preventDuplicateScript);
}

/**
 * Exclude referrals from other pages handing off to old activation flow.
 * Limit new flow to English only for now.
 */
async function initPremiumFlow() {
  const meetsCriteria = !adblock.query.has("premium-checkout__handoff") &&
                        !adblock.query.has("premium-checkout__flow") &&
                        !adblock.query.has("restore-purchase") &&
                        !adblock.query.has("already-contributed") &&
                        !adblock.query.has("_ptxn") &&
                        "en" === adblock.settings.locale;

  if (meetsCriteria) {
    const hasMimimumExtensionVersion = await checkExtensionVersion();

    if (hasMimimumExtensionVersion) {
      initUserAccountsFlow();
    } else {
      initLegacyPremiumFlow();
    }
  } else {
    initLegacyPremiumFlow();
  }
}

initPremiumFlow();
