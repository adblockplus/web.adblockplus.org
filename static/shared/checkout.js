/* global adblock, Paddle */
import { paddleConfig } from "./paddleConfig.js";
import { checkoutConfig } from "./checkoutConfig.js";

const paddleEnvironment = location.hostname == "localhost" || adblock.query.has("testmode") ? "sandbox" : "live";

if (paddleEnvironment == "sandbox") {
  Paddle.Environment.set("sandbox");
  Paddle.Setup({ vendor: paddleConfig.environments.sandbox.vendor });
} else {
  Paddle.Setup({ vendor: paddleConfig.environments.live.vendor });
}

function generatePremiumId() {
  const timestamp = (Date.now()) % 1e8; // 8 digits from end of timestamp
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const generatedChars = [];
  for (let i = 0; i < 8; i++) {
      const randomCharIndex = Math.floor(Math.random() * allowedChars.length);
      generatedChars.push(allowedChars[randomCharIndex]);
  }
  return generatedChars.join('') + timestamp;
}

const rePremiumId = /^[a-z0-9]{8}[0-9]{7,8}$/;

function isValidPremiumId(premiumId) {
  return rePremiumId.test(premiumId);
}

function getBrowserCode() {
  let char = "U";
  const chrome = navigator.userAgent.includes("Chrome");
  const opera = navigator.userAgent.includes("OPR");
  const edg = navigator.userAgent.includes("Edg");
  const edge = navigator.userAgent.includes("Edge");
  const safari = navigator.userAgent.includes("Safari");
  const firefox = navigator.userAgent.includes("Firefox");
  const samsung = navigator.userAgent.includes("Samsung");
  const trident = navigator.userAgent.includes("Trident");
  if (chrome && !opera && !samsung && !edg && !edge) char = "E";
  else if (safari && !opera && !samsung && !edg && !edge) char = "S";
  else if (firefox) char = "F";
  else if (opera) char = "O";
  else if (edge) char = "M";
  else if (edg) char = "CM";
  else if (navigator.appName == 'Microsoft Internet Explorer') char = "T";
  else if (trident) char = "T";
  else if (samsung) char = "G";
  return char;
}

function getOperatingSystemCode() {
  let char = "U";
  if (navigator.appVersion.includes("Win")) char = "W";
  else if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad") || navigator.userAgent.includes("iPod")) char = "I";
  else if (navigator.appVersion.includes("Mac")) char = "M";
  else if (navigator.appVersion.includes("X11")) char = "L";
  else if (navigator.appVersion.includes("Linux")) char = "L";
  return `O${char}`;
}

function generateTrackingId(pageName, productName, premiumId) {
  if (!checkoutConfig.pageCodes.hasOwnProperty(pageName)) throw new Error("Unknown page");
  const pageCode = checkoutConfig.pageCodes[pageName];
  const trackingId = `X0G0 F${getBrowserCode()}${getOperatingSystemCode()}${pageCode} ${premiumId}`;
  if (!checkoutConfig.plans.hasOwnProperty(productName)) throw new Error("Unknown product");
  const productCode = checkoutConfig.plans[productName].code;
  return productCode ? `${productCode} ${trackingId}` : trackingId;
}

const reTrackingId = /([EX])([0-9]+)G(.) (?:F((?:CM)|.{1}))?(?:O(.))?(?:S([A-Z]+))?(?: ([a-z0-9]{0,7}[a-z][a-z0-9]{0,7}[0-9]{0,8}))?/;

function isValidTrackingId(planName, trackingId) {
  const parts = trackingId.split(" ");
  let productCode = "";
  if (parts.length == 4) productCode = parts[0].split("_")[0];
  if (productCode != checkoutConfig.plans[planName].code) return false;
  if (!reTrackingId.test(trackingId)) return false;
  return true;
}

export const checkout = adblock.api.checkout = function checkout({ plan, currency, frequency, amount}) {
  return new Promise((resolve, reject) => {
    try {

      const page = adblock.settings.page;
      if (!checkoutConfig.pageCodes.hasOwnProperty(page)) throw new Error("Unknown page");
  
      plan = plan || "contribution";
      if (
        false == checkoutConfig.plans.hasOwnProperty(plan) 
        || false == paddleConfig.environments[paddleEnvironment].plans.hasOwnProperty(plan)
      ) {
        throw new Error("Unsupported plan");
      }

      currency = currency || "USD";
      if (false == currency in paddleConfig.environments[paddleEnvironment].plans[plan]) throw new Error("Unsupported currency");

      frequency = frequency || "yearly";
      if (false == frequency in paddleConfig.environments[paddleEnvironment].plans[plan][currency]) throw new Error("Unsupported frequency");
  
      const title = checkoutConfig.plans[plan].title;
      if (false == title) throw new Error("Missing plan title");
      
      const locale = adblock.settings.locale || "en";
  
      const premiumId = adblock.settings.premiumId || generatePremiumId();
      if (!isValidPremiumId(premiumId)) throw new Error("Invalid premiumId");
  
      const trackingId = generateTrackingId(page, plan, premiumId);
      if (!isValidTrackingId(plan, trackingId)) throw new Error("Invalid trackingId");
  
      amount = parseFloat(amount);
      if (isNaN(amount) || amount < 0 || amount % 1 != 0) throw new Error("Invalid amount");

      const clickTimestamp = Date.now();
  
      const successParams = new URLSearchParams();
      successParams.set("premium-checkout__handoff", 1);
      successParams.set("premium-checkout__flow", page);
      successParams.set("premium-checkout__userid", premiumId);
      successParams.set("premium-checkout__currency", currency);
      successParams.set("premium-checkout__amount", amount);
      successParams.set("premium-checkout__frequency", frequency);
      successParams.set("premium-checkout__language", locale);
      successParams.set("premium-checkout__timestamp", clickTimestamp);
  
      const successURL = `${checkoutConfig.plans[plan].successURL}?${successParams.toString()}`;
  
      const paddleMetadata = {
        locale,
        userid: premiumId,
        tracking: trackingId,
        testmode: paddleEnvironment == "sandbox",
        country: "unknown",
        ga_id: "",
        premium: "false",
        premium_cid: "0",
        premium_sid: "0",
        currency: currency,
        recurring: frequency != "once",
        subType: frequency,
        experiment: "",
        experiment_id: "",
        variant: "",
        variant_index: -1,
        amount_cents: amount,
        success_url: successURL,
        cancel_url: window.location.href
      };
  
      let product;
      try { product = paddleConfig.environments[paddleEnvironment].plans[plan][currency][frequency][amount]; }
      catch (error) { /* we expect custom amount plans to be missing */ }
  
      let paddleLocale = paddleConfig.locales[locale] || locale;

      if (product) {
        Paddle.Checkout.open({
          title,
          locale: paddleLocale,
          product,
          allowQuantity: false,
          success: successURL,
          passthrough: paddleMetadata,
          closeCallback: () => resolve({from: "Paddle.Close"}),
        });
      } else {
        fetch(checkoutConfig.customAmountService, {
          method: 'POST',
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(paddleMetadata),
        })
        .then(
          response => response.json(), 
          error => reject({from: "PaymentServer.Response", error})
        )
        .then(session => {
            try {
              if (!session.url.includes(".paddle.com")) throw new Error();
            } catch (error) {
              return reject({from: "PaymentServer.Response", data: session, error: {message:"invalid session URL"}});
            }
            Paddle.Checkout.open({
              title,
              locale: paddleLocale,
              override: session.url,
              closeCallback: () => resolve({from: "Paddle.Close"})
            });
          },
          error => reject({from: "PaymentServer.Response.JSON", error})
        );
      }

    } catch (error) {
      reject({from: "checkout.trycatch", error});
    }

  });

}