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
 * Limit new flow to English only for now.
 */
async function initPurchaseFlow() {
  const meetsCriteria = "en" === adblock.settings.locale;

  if (meetsCriteria) {
    const hasMimimumExtensionVersion = await checkExtensionVersion();

    if (hasMimimumExtensionVersion) {
      initUserAccountsFlow();
    } else {
      initLegacyPurchaseFlow();
    }
  } else {
    initLegacyPurchaseFlow();
  }
}

initPurchaseFlow();
