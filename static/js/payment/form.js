/* global _, eyeo */
(function(doc, _, ns, i18n){

var DEFAULTS = {
  USD: {
    sign: '$',
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5,
    },
    monthly: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    },
    yearly: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5,
    }
  },
  EUR: {
    sign: '€',
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    monthly: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    },
    yearly: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5,
    }
  }
};

ns.setupForm = function(config)
{
  config = config || DEFAULTS;

  var defaultCurrency = Object.keys(config)[0];

  // ejs templates
  var _header = _.template(doc.getElementById("payment-header-template").innerHTML)
  var _frequencies = _.template(doc.getElementById("payment-frequencies-template").innerHTML);
  var _amounts = _.template(doc.getElementById("payment-amounts-template").innerHTML);

  var $form = doc.getElementById("payment-form");
  // if config has multiple currencies then _header will create $currency
  var $header = doc.getElementById("payment-header");
  $header.innerHTML = _header({
    currencies: Object.keys(config)
  });
  var $currency = doc.getElementById("payment-currency");
  var $frequencies = doc.getElementById("payment-frequencies");
  var $frequency = doc.getElementById("payment-frequency"); 
  var $providers = doc.getElementById("payment-providers");
  var $buttons = doc.getElementById("payment-buttons");
  var $error = doc.getElementById("payment-error");

  function error(error)
  {
    if (error)
    {
      $error.innerHTML = error;
      $form.classList.add("has-error");
      _.each($buttons.children, function($button) { $button.disabled = true; });
    }
    else
    {
      $form.classList.remove("has-error");
      _.each($buttons.children, function($button) { $button.disabled = false; });
    }
  }

  function updateFrequencies()
  {
    $frequencies.innerHTML = _frequencies({
      config: config[$currency ? $currency.value : defaultCurrency],
      _amounts: _amounts
    });
  }

  // Set frequencies and amounts for the first time
  updateFrequencies();

  // Update frequencies and amounts when currency changes
  if ($currency) // $currency only exists if config has multiple currencies
    $currency.addEventListener("change", updateFrequencies);
  
  $frequencies.addEventListener("change", function(event)
  {
    // Track amount frequency in hidden input
    // Each amount radio has a data-frequency
    if ("frequency" in event.target.dataset)
      $frequency.value = event.target.dataset.frequency;

    // Focus custom amount input on custom radio check
    if ("input" in event.target.dataset)
      doc.getElementById(event.target.dataset.input).focus();

    // Clear minimum amount error when a custom amount is unselected
    if (!event.target.parentElement.classList.contains("custom-payment-amount"))
      if ($form.classList.contains("has-error"))
        error(false);
  });

  function validateCustomAmount(input)
  {
    if (!input.min || !("frequency" in input.dataset)) return;
    
    var value = parseFloat(input.value);
    if (isNaN(value)) value = 0;
    
    if (value < parseFloat(input.min))
      error(i18n["min_" + input.dataset.frequency]);
    else
      error(false);
  }
  
  $frequencies.addEventListener("input", function(event)
  {
    // Show an error when a custom amount is below it's minimum
    validateCustomAmount(event.target);
  });

  $frequencies.addEventListener("focusin", function(event)
  {
    // Custom amount input data-radio points at it's sibling radio
    if ("radio" in event.target.dataset)
    {
      // Check custom amount radio button on custom amount text input focus
      doc.getElementById(event.target.dataset.radio).checked = true;

      // Re-show min custom amount error if custom amount is below min
      validateCustomAmount(event.target);
    }      
  });

  // Toggle submit button according to provider radio
  $providers.addEventListener("change", function(event)
  {
    // Provider button display is set by parent [data-provider] in css
    $buttons.dataset.provider = event.target.value;
  });

  $form.addEventListener("submit", function(event)
  {
    event.preventDefault();
    
    var data = api.data();

    _.each(submitCallbacks, function(callback)
    {
      callback(data);
    });
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
    var formData = new FormData($form);

    var amount = formData.get("amount");

    if (amount.startsWith("custom"))
      amount = formData.get(formData.get("amount"));

    var currency = formData.get("currency");

    return {
      currency: currency,
      frequency: formData.get("frequency"),
      amount: amount,
      provider: formData.get("provider"),
      sign: config[currency].sign
    }
  }

  return api;
}

})(document, _, path("payment"), path("i18n.payment.form"));