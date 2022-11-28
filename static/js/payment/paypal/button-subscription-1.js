/* global eyeo, URLSearchParams, paymentTranslations */
(function(doc, ns, i18n){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

// Locales supported by our website that have different PayPal codes
var LOCALES = {
  "en": "US",
  "zh_cn": "C2",
  "pt_br": "BR",
  "tr": "TM",
  "el_gr": "GR",
  "jp": "JP",
  "kr": "KO",
  "ar": "DZ"
};

var SUBSCRIPTION_TYPE = {
  'monthly': 'M',
  'yearly': 'Y'
};

var lang = doc.documentElement.lang;

var paypalAPIConfig = {
  live: {
    business: "till@adblockplus.org",
    url: "https://www.paypal.com/cgi-bin/webscr"
  },
  test: {
    business: "abp-sandbox@adblockplus.org",
    url: "https://www.sandbox.paypal.com/cgi-bin/webscr"
  }
};

var paypalEnv = (
  window.location.hostname == "adblockplus.org" 
  || window.location.hostname.endsWith(".adblockplus.org")
) ? "live" : "test";

var returnParams = new URLSearchParams(window.location.search);
returnParams.append('thankyou', 1);
returnParams.append('u', forceGetUserId());
returnParams.append('from', 'update-1');

var DEFAULTS = {
  charset: "utf-8",
  lc: LOCALES[lang] || lang.toUpperCase(),
  cmd: "_xclick-subscriptions",
  business: paypalAPIConfig[paypalEnv].business,
  item_name: i18n.item,
  image_url: siteURL + "/img/adblock-plus-paypal.png",
  return: siteURL + '/premium?' + returnParams.toString(),
  cancel_return: location.href,
  no_note: 1,
  p3: 1, // Subscription duration (N*p3)
  src: 1 // Subscription payments recur 1 or not 0
};

/**
 * Submit a PayPal button subscription
 * @param {Object} data - A compatible card payment data object
 */
ns.paypalButtonSubscription = function (data)
{
  var form = doc.createElement("form");
  form.target = "_blank";
  form.method = "post";
  form.action = paypalAPIConfig[paypalEnv].url;

  var frequency = SUBSCRIPTION_TYPE[data.frequency];

  var inputs = Object.assign({}, DEFAULTS, {
    custom: data.custom + "-" + frequency.toLowerCase(),
    currency_code: data.currency,
    a3: data.amount, // Subscription price
    t3: frequency, // Regular subscription units of duration. (D/W/M/Y)
    item_number: data.item_number, // payment-server tracking string
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
  