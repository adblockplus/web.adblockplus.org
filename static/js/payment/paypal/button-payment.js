/* global eyeo, URLSearchParams, paymentTranslations */
(function(doc, ns, i18n){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

var pageLanguage = doc.documentElement.lang;

// Maps our locale codes to PayPal's locale codes (excluding same values)
var PAYPAL_LOCALE = {
  "en": "US",
  "zh_cn": "C2",
  "pt_br": "BR",
  "tr": "TM",
  "el_gr": "GR",
  "jp": "JP",
  "kr": "KO",
  "ar": "DZ"
};

var protectedInputs = {
  charset: "utf-8",
  lc: PAYPAL_LOCALE[pageLanguage] || pageLanguage.toUpperCase(),
  cmd: "_xclick",
  item_name: i18n.item,
  image_url: siteURL + "/img/adblock-plus-paypal.png",
  return: siteURL + ns.paymentCompleteUrl,
  cancel_return: location.href,
  no_note: 1
};

/**
 * Submit a PayPal button payment
 * @param {Object} environment
 * @param {string} environment.action - PayPal payment form action endpoint
 * @param {string} environment.business - PayPal payment reciever
 * @param {Object} submission
 * @param {number} submission.amount - Float payment amount
 * @param {string} submission.custom - Payment session ID
 * @param {string} submission.currency - Payment currency ID
 */
ns.paypalButtonPayment = function(environment, submission)
{
  var form = doc.createElement("form");
  form.target = "_blank";
  form.method = "post";
  form.action = environment.action;
  
  var inputs = Object.assign({}, protectedInputs, {
    business: environment.business,
    amount: submission.amount,
    custom: submission.custom,
    currency_code: submission.currency
  });

  var input;
  for (var name in inputs)
  {
    input = doc.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = inputs[name];
    form.appendChild(input);
  }

  doc.body.appendChild(form);
  form.submit();
  doc.body.removeChild(form);  
};

})(document, path("payment"), path("i18n.payment.form"));
