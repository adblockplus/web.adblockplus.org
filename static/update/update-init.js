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
  const hasMimimumExtensionVersion = await checkExtensionVersion();

  if (hasMimimumExtensionVersion) {
    initUserAccountsFlow();
  } else {
    initLegacyPurchaseFlow();
  }
}

initPurchaseFlow();

/**
 * The update page going to be used for users having free trial accepted on Email Marketing Program
 * */

async function checkIsFreemiumUser() {
  return new Promise((resolve, reject) => {
    try {
      adblock.afterAdblockPlusDetected(() => {
        if (adblock.adblockPlus?.isTrial) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, () => {
        resolve(false);
      });
    } catch (error) {
      adblock.logScriptError("checkIsFreemiumUser", error);
      resolve(false);
    }
  });
}

async function initHeaderContent() {
  const isFreemiumUser = await checkIsFreemiumUser();
  const isFreemiumParam = adblock.query.has('trial')
  const regularHeaderContent = document.getElementById("regular-user-header");
  const freemiumHeaderContent = document.getElementById("freemium-user-header");

  regularHeaderContent.hidden = isFreemiumUser || isFreemiumParam;
  freemiumHeaderContent.hidden = !isFreemiumUser && !isFreemiumParam;

  if (isFreemiumUser) freemiumHeaderContent.classList.remove("placeholder")
}

initHeaderContent();
