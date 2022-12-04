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
  var $modal = doc.getElementById("stripe-card-modal");
  var $form = doc.getElementById("stripe-card-form");
  var $close = doc.getElementById("stripe-card-modal-close");
  var $email = doc.getElementById("stripe-card-email");
  var $submit = doc.getElementById("stripe-card-submit");
  var $submitLabel = doc.getElementById("stripe-card-submit-label");
  var $error = doc.getElementById("stripe-card-error");

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

  $close.addEventListener("click", function(event)
  {
    event.preventDefault();

    api.hide();
  });

  $form.addEventListener("submit", function(event)
  {
    event.preventDefault();

    if (
      cardBrand != "unknown" 
      && config.supportedCardBrands.indexOf(cardBrand) == -1
    ) {
      return api.showError(i18n.error_card_brand);
    }

    var data = api.data();

    $form.classList.add("is-submitting");
    $submit.disabled = true;

    var submissionProgress = [];

    _.each(submitCallbacks, function(callback)
    {
      submissionProgress.push(Promise.resolve(callback(data)));
    });

    Promise.all(submissionProgress).finally(function()
    {
      if (hasError)
        $form.classList.remove("is-submitting");
    });
  });

  $form.addEventListener("input", function(event)
  {
    if (hasError)
      api.showError(false);
  });

  var cardBrand = "unknown";

  stripeCard.addEventListener("change", function(event)
  {
    if (typeof event.brand == "string" && event.brand != "unknown")
    {
      cardBrand = event.brand;

      if (config.supportedCardBrands.indexOf(event.brand) == -1)
        return api.showError(i18n.error_card_brand);
    }      

    if (typeof event.error != "object") 
      return api.showError(false);
    
    var message;

    if (event.error.code && i18n["error_" + event.error.code])
      message = i18n["error_" + event.error.code];
    else if (event.error.message)
      message = event.error.message;
    else
      message = i18n.error_unexpected

    api.showError(message);
  });
  
  // PUBLIC API ////////////////////////////////////////////////////////////////

  var api = {};

  var submitCallbacks = [];

  api.onSubmit = function(callback)
  {
    submitCallbacks.push(callback);
  }

  api.data = function()
  {
    return {
      email: $email.value,
      stripe: stripe,
      card: stripeCard,
      endpoint: config.endpoint
    };
  }

  api.show = function(config)
  {
    $submitLabel.textContent = i18n[config.frequency]
      .replace(
        "{amount}",  
        config.sign == "€" 
          ? config.amount + config.sign 
          : config.sign + config.amount
      );

    $modal.classList.add("is-active");

    $email.focus();
  }

  api.hide = function()
  {
    $modal.classList.remove("is-active");
  }

  var hasError = false;

  api.showError = function(error)
  {
    if (error)
    {
      hasError = true;
      $modal.classList.add("has-error");
      $error.textContent = error;
      $submit.disabled = true;
    }
    else
    {
      hasError = false;
      $modal.classList.remove("has-error");
      $submit.disabled = false;
    }
  }

  return api;
}

})(document, path("payment"), path("i18n.payment.stripe.cardModal"));
