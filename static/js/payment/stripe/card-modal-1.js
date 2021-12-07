/* global _, eyeo */
(function(doc, ns, i18n){

var DEFAULT_LOCALE = "auto";

// Updated 21/11/19
var LOCALE_ALTERNATIVE = {
  "es_MX": "es-419",
  "pt_BR": "pt-BR",
  "zh_CN": "zh",
  "zh_TW": "zh-TW"
};

var docLang = doc.documentElement.lang;

var stripeLocale = docLang || DEFAULT_LOCALE;

if (LOCALE_ALTERNATIVE.hasOwnProperty(docLang))
  stripeLocale = LOCALE_ALTERNATIVE[docLang];

ns.setupStripeCardModal = function(config)
{
  var $body = doc.getElementById("stripe-card-body");
  var $email = doc.getElementById("stripe-card-email");

  var hasError = false;
  var cardBrand = false;

  var stripeStyles = {
    base: {
      color: '#32325d',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  var stripe = Stripe(config.key, {locale: stripeLocale});
  var stripeElements = stripe.elements();
  var stripeCard = stripeElements.create("card", {style: stripeStyles});

  stripeCard.mount("#stripe-card");

  $body.addEventListener("input", function(event)
  {
    if (hasError)
      triggerError(false);
  });

  stripeCard.addEventListener("change", function(event)
  {
    if (typeof event.brand == "string" && event.brand != "unknown")
    {
      cardBrand = event.brand;

      if (config.supportedCardBrands.indexOf(event.brand) == -1)
        return triggerError(i18n.error_card_brand);
    }      

    if (typeof event.error != "object") 
      return triggerError(false);
    
    var message;

    if (event.error.code && i18n["error_" + event.error.code])
      message = i18n["error_" + event.error.code];
    else if (event.error.message)
      message = event.error.message;
    else
      message = i18n.error_unexpected

    triggerError(message);
  });
  
  // PUBLIC API ////////////////////////////////////////////////////////////////

  var api = {};

  api.data = function()
  {
    return {
      email: $email.value,
      stripe: stripe,
      card: stripeCard,
      endpoint: config.endpoint
    };
  }

  var errorCallbacks = [];

  api.onError = function(callback)
  {
    errorCallbacks.push(callback);
  };

  function triggerError(message)
  {
    hasError = !!message;

    _.each(errorCallbacks, function(callback)
    {
      callback(message);
    });
  }

  api.getBrand = function()
  {
    return cardBrand;
  }

  return api;
}

})(document, path("payment"), path("i18n.payment.stripe.cardModal"));
