/* global _, eyeo */
(function(doc, _, ns, i18n){

var DEFAULT_AMOUNTS = {
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
};

var CURRENCY_CONFIG = {
  USD: { sign: "$" },
  AUD: { sign: "$" },
  CAD: { sign: "$" },
  CHF: { sign: "CHF "},
  EUR: { sign: "€" },
  GBP: { sign: "£" },
  JPY: {
    sign: "¥",
    once: {
      amounts: [1500, 2000, 2500, 3500, 5000],
      placeholder: 3500,
      minimum: 1500
    },
    monthly: {
      amounts: [200, 300, 500, 1000, 1500],
      placeholder: 650,
      minimum: 250
    }
  },
  NZD: { sign: "$" },
  RUB: {
    sign: "₽",
    once: {
      amounts: [250, 500, 1000, 2500, 5000],
      placeholder: 2500,
      minimum: 250
    },
    monthly: {
      amounts: [150, 250, 400, 500, 1000],
      placeholder: 500,
      minimum: 150
    }
  }
};

/* Set VARIANT_CONFIG[CURRENCY][(once|monthly|yearly)] from DEFAULTS.USD
 * Except copy yearly values from once values
 */
for (var currency in CURRENCY_CONFIG) 
{
  if (!CURRENCY_CONFIG[currency].once)
    CURRENCY_CONFIG[currency].once = DEFAULT_AMOUNTS.once;
  if (!CURRENCY_CONFIG[currency].monthly)
    CURRENCY_CONFIG[currency].monthly = DEFAULT_AMOUNTS.monthly;
  if (!CURRENCY_CONFIG[currency].yearly)
    CURRENCY_CONFIG[currency].yearly = CURRENCY_CONFIG[currency].once;
}

ns.setupForm = function(_config)
{
  var defaultCurrency = _config.defaultCurrency || 'USD';
  var currencies = Object.keys(CURRENCY_CONFIG);
  // Ensure the default currency from config (not VARIANT_CONFIG) is first
  if (currencies.indexOf(defaultCurrency) != -1)
    currencies.splice(currencies.indexOf(defaultCurrency), 1);
  currencies = [defaultCurrency].concat(currencies);

  // ejs templates
  var _header = _.template(doc.getElementById("payment-header-template").innerHTML)
  var _frequencies = _.template(doc.getElementById("payment-frequencies-template").innerHTML);
  var _amounts = _.template(doc.getElementById("payment-amounts-template").innerHTML);

  var $form = doc.getElementById("payment-form");
  // if config has multiple currencies then _header will create $currency
  var $header = doc.getElementById("payment-header");
  $header.innerHTML = _header({
    currencies: currencies
  });
  var $currency = doc.getElementById("payment-currency");
  var $frequencies = doc.getElementById("payment-frequencies");
  var $frequency = doc.getElementById("payment-frequency"); 
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
    // Set form dataset for styling when currency options exist and change
    if ($currency) $form.dataset.currency = $currency.value;
    $frequencies.innerHTML = _frequencies({
      config: CURRENCY_CONFIG[$currency ? $currency.value : defaultCurrency],
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
      // Click respective radio btn to trigger update of frequencies
      doc.getElementById(event.target.dataset.radio).click();

      // Re-show min custom amount error if custom amount is below min
      validateCustomAmount(event.target);
    }      
  });

  $buttons.addEventListener("click", function(event) {
    event.preventDefault();
    var data;
    if (event.target.classList.contains('paypal-button'))
      data = api.data('paypal');
    else if (event.target.classList.contains('stripe-button'))
      data = api.data('stripe');
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

  api.data = function(privider)
  {
    var formData = new FormData($form);

    var amount = formData.get("amount");

    if (amount.startsWith("custom"))
      amount = formData.get(formData.get("amount"));

    var currency = Object.keys(CURRENCY_CONFIG).length > 1
      ? formData.get("currency")
      : defaultCurrency;

    return {
      currency: currency,
      frequency: formData.get("frequency"),
      amount: amount,
      provider: privider,
      sign: CURRENCY_CONFIG[currency].sign
    }
  }

  return api;
}

})(document, _, path("payment"), path("i18n.payment.form"));