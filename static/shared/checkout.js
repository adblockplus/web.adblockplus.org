/* global adblock, Paddle */

import { paddleConfig } from "./paddleConfig.js";
import { checkoutConfig } from "./checkoutConfig.js";
import { getDollarNumber } from "./currency.js";

adblock.config.paddleConfig = paddleConfig;
adblock.config.checkoutConfig = checkoutConfig;
adblock.lib.getDollarNumber = getDollarNumber;

const environment = adblock.query.has("testmode") ? "sandbox" : "live";

if (environment == "sandbox") Paddle.Environment.set("sandbox");

Paddle.Setup({
  vendor: environment == "sandbox"
    ? paddleConfig.environments.sandbox.vendor
    : paddleConfig.environments.live.vendor,
  eventCallback: data => adblock.events.fire(`Paddle.${data.event}`, data)
});

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
  if (!checkoutConfig.products.hasOwnProperty(productName)) throw new Error("Unknown product");
  const productCode = checkoutConfig.products[productName].code;
  return productCode ? `${productCode} ${trackingId}` : trackingId;
}

const reTrackingId = /([EX])([0-9]+)G(.) (?:F((?:CM)|.{1}))?(?:O(.))?(?:S([A-Z]+))?(?: ([a-z0-9]{0,7}[a-z][a-z0-9]{0,7}[0-9]{0,8}))?/;

function isValidTrackingId(productName, trackingId) {
  const parts = trackingId.split(" ");
  let productCode = "";
  if (parts.length == 4) productCode = parts[0].split("_")[0];
  if (productCode != checkoutConfig.products[productName].code) return false;
  if (!reTrackingId.test(trackingId)) return false;
  return true;
}

export const checkout = adblock.lib.checkout = function checkout({ product, currency, frequency, amount }) {

  return new Promise((resolve, reject) => {

    const page = adblock.settings.page;
    if (!checkoutConfig.pageCodes.hasOwnProperty(page)) throw new Error("Unknown page");

    product = product || checkoutConfig.defaultProduct;
    if (!checkoutConfig.products.hasOwnProperty(product)) throw new Error("Unknown product");

    const title = checkoutConfig.products[product].title;
    const locale = paddleConfig.locales[adblock.settings.locale] || adblock.settings.locale;

    const premiumId = adblock.settings.premiumId || generatePremiumId();
    if (!isValidPremiumId(premiumId)) throw new Error("Invalid premiumId");

    const trackingId = generateTrackingId(page, product, premiumId);
    if (!isValidTrackingId(product, trackingId)) throw new Error("Invalid trackingId");

    amount = parseFloat(amount);
    if (amount < 0 || amount % 1 != 0) throw new Error("Invalid amount");

    const successParams = new URLSearchParams();
    successParams.set("checkout__page", page);
    successParams.set("checkout__currency", currency);
    successParams.set("checkout__frequency", frequency);
    successParams.set("checkout__amount", amount);
    successParams.set("checkout__product", product);

    const successURL = `${checkoutConfig.products[product].successURL}?${successParams.toString()}`;

    const paddleMetadata = {
      locale,
      userid: premiumId,
      tracking: trackingId,
      testmode: environment == "sandbox",
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

    let paddleProduct;
    try { paddleProduct = paddleConfig.environments[environment].products[product][currency][frequency][amount]; }
    catch (error) { /* we expect custom amount products to be missing */ }

    if (paddleProduct) {

      Paddle.Checkout.open({
        title,
        locale,
        product: paddleProduct,
        allowQuantity: false,
        success: successURL,
        passthrough: paddleMetadata,
        closeCallback: () => resolve(),
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
            title: title,
            locale: locale,
            override: session.url,
            closeCallback: () => reject({from: "Paddle.Close"})
          });
        },
        error => reject({from: "PaymentServer.Response.JSON", error})
      );

    }

  });

}