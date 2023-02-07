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

// Maps frequencies we support to frequencies PayPal supports
var PAYPAL_FREQUENCY = {
  'monthly': 'M',
  'yearly': 'Y'
};

var protectedInputs = {
  charset: "utf-8",
  lc: PAYPAL_LOCALE[pageLanguage] || pageLanguage.toUpperCase(),
  cmd: "_xclick-subscriptions",
  item_name: i18n.item,
  image_url: siteURL + "/img/adblock-plus-paypal.png",
  return: siteURL + ns.paymentCompleteUrl,
  cancel_return: location.href,
  no_note: 1,
  p3: 1, // Subscription duration (N*p3)
  src: 1 // Subscription payments recur 1 or not 0
};

/**
 * Submit a PayPal button subscription
 * @param {Object} environment
 * @param {string} environment.action - PayPal payment form action endpoint
 * @param {string} environment.business - PayPal payment reciever
 * @param {Object} submission
 * @param {string} submission.custom - Payment session ID
 * @param {string} submission.currency - Payment currency ID
 * @param {number} submission.amount - Float payment amount
 * @param {string} submission.frequency - Payment frequency
 */
 ns.paypalButtonSubscription = function (environment, submission)
{
  var form = doc.createElement("form");
  form.target = "_blank";
  form.method = "post";
  form.action = environment.action;

  var frequency = PAYPAL_FREQUENCY[submission.frequency];

  var inputs = Object.assign({}, protectedInputs, {
    business: environment.business,
    custom: submission.custom + "-" + frequency.toLowerCase(),
    currency_code: submission.currency,
    a3: submission.amount,
    t3: frequency,
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
  