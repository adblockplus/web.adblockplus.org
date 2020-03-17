/*global PaymentForm, updatePaymentConfig, _*/

/**
 * Update page payment form
 * @constructor
 * @requires updatePaymentConfig
 * @requires _.template
 * @requires _.each
 */
function PaymentForm()
{
  // required ordered collection
  var currencies = updatePaymentConfig;

  // get first currency in ordered collection
  var currency = currencies[(function() {
    for (var currencyName in currencies)
      return currencyName;
  }())];

  var paymentCurrency = document.getElementById("payment-currencies");

  var theCurrencyOptions = _.template(
    document.getElementById("payment-currency-options").innerHTML
  );

  paymentCurrency.innerHTML = theCurrencyOptions({
    currencies: currencies
  });

  var donationAmounts = document.getElementById("donation-amounts");

  var subscriptionAmounts = document.getElementById("subscription-amounts");

  var thePresetAmounts = _.template(
    document.getElementById("preset-payment-amounts").innerHTML
  );

  var theCustomAmount = _.template(
    document.getElementById("custom-payment-amount").innerHTML
  );

  function updateAmounts()
  {
    currency = currencies[paymentCurrency.value];

    var donationOptions = {
      type: "donation",
      sign: currency.sign,
      amounts: currency.donation.amounts,
      placeholder: currency.donation.placeholder
    };

    donationAmounts.innerHTML = ""
      + thePresetAmounts(donationOptions)
      + theCustomAmount(donationOptions);

    if (currency.subscription)
    {
      document.body.classList.add("has-subscriptions");

      var subscriptionOptions = {
        type: "subscription",
        sign: currency.sign,
        amounts: currency.subscription.amounts,
        placeholder: currency.subscription.placeholder
      };

      subscriptionAmounts.innerHTML = ""
        + thePresetAmounts(subscriptionOptions)
        + theCustomAmount(subscriptionOptions);
    }
    else
    {
      document.body.classList.remove("has-subscriptions");
      subscriptionAmounts.innerHTML = "";
    }
  }

  updateAmounts();

  paymentCurrency.addEventListener("change", updateAmounts);

  // uncheck donation amount when subscription amount is selected and vise versa
  function onFieldsetChange (otherFieldset)
  {
    var otherFieldsetSelected = otherFieldset.querySelector("input:checked");

    if (otherFieldsetSelected)
      otherFieldsetSelected.checked = false;
  }

  donationAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, subscriptionAmounts)
  );

  subscriptionAmounts.addEventListener(
    "change",
    onFieldsetChange.bind(this, donationAmounts)
  );

  // Select custom amount radio when textbox is focused
  function onCustomFieldSelect(event)
  {
    if (
      event.target.type
      && event.target.type == "text"
    ) {
      event.target.parentElement.querySelector('input[type="radio"]').click();
    }
  }

  donationAmounts.addEventListener("focus", onCustomFieldSelect, true);

  subscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);

  /**
   * Export form data to JSON compatible object
   * @function
   */
  this.toJSON = function()
  {
    var checked = document.querySelector(".payment-amount input[type=radio]:checked");

    var type = checked.name.indexOf("donation") != -1 ?
      "donation" : "subscription";

    var amount = checked.value;

    if (amount == "custom")
      amount = checked.parentElement.querySelector('input[type="text"]').value;

    return {
      lang: document.documentElement.lang,
      type: type,
      currency: paymentCurrency.value,
      amount: amount,
    };
  };

  function noop () {}

  var providerHandlers = {};

  /**
   * Add a payment provider submission handler
   * @function
   */
  this.addProviderListener = function(provider, handler)
  {
    if (!providerHandlers[provider])
      providerHandlers[provider] = [];

    providerHandlers[provider].push(handler);
  };

  var paymentProviders = document.getElementById("payment-providers");

  function onPaymentProviderSubmit(event)
  {
    event.preventDefault();

    if (!event.target.name) return;

    var provider = event.target.name.replace("-provider", "");

    var handlers = providerHandlers[provider];

    if (!handlers) return;

    _.each(handlers, function(handler) {return handler();});
  }

  paymentProviders.addEventListener("click", onPaymentProviderSubmit);
}
