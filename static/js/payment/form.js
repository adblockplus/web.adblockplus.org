/*global PaymentForm, updatePaymentConfig, _*/
(function(root, doc, _){

/**
 * Construct payment form
 * @constructor
 * @requires _.template
 * @requires _.each
 * @param {Object[]} currencies - Ordered collection of currencies indexed by name
 * @param {String} currencies[].sign - Sign before currency amount
 * @param {Object} currencies[].donation - One time payment options for currency
 * @param {Number[]} currencies[].donation.amounts - Amounts offered for one time payment
 * @param {Number} currencies[].donation.placeholder - Custom amount placeholder for one time payment
 * @param {Object=} currencies[].subscription - (optional) monthly payment options for currency
 * @param {Number[]} currencies[].subscription.amounts - Amounts offered for monthly payment
 * @param {Number} currencies[].subscription.placeholder - Custom amount placeholder for monthly payment
 */
function PaymentForm(currencies)
{
  var defaultCurrency, hasMultiCurrency;

  for (var currencyName in currencies)
  {
    if (!defaultCurrency)
    {
      defaultCurrency = currencyName;
    }
    else
    {
      hasMultiCurrency = true;
      break;
    }
  }

  if (hasMultiCurrency)
  {
    doc.body.classList.add("has-multi-currency");
  }
  else
  {
    doc.body.classList.add("has-single-currency");
    doc.querySelector(".donation-heading .currency").textContent = defaultCurrency.toUpperCase();
  }

  var paymentCurrency = doc.getElementById("payment-currencies");

  var theCurrencyOptions = _.template(
    doc.getElementById("payment-currency-options").innerHTML
  );

  paymentCurrency.innerHTML = theCurrencyOptions({
    currencies: currencies
  });

  var donationAmounts = doc.getElementById("donation-amounts");

  var subscriptionAmounts = doc.getElementById("subscription-amounts");

  var thePresetAmounts = _.template(
    doc.getElementById("preset-payment-amounts").innerHTML
  );

  var theCustomAmount = _.template(
    doc.getElementById("custom-payment-amount").innerHTML
  );

  function updateAmounts()
  {
    var currency = currencies[paymentCurrency.value];

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
      doc.body.classList.add("has-subscriptions");

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
      doc.body.classList.remove("has-subscriptions");
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
    if (event.target.type == "text")
      event.target.parentElement.querySelector('input[type="radio"]').click();
  }

  donationAmounts.addEventListener("focus", onCustomFieldSelect, true);

  subscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);

  /**
   * Export form data to JSON compatible object
   * @function
   */
  this.toJSON = function()
  {
    var checked = doc.querySelector(".payment-amount input[type=radio]:checked");

    var type = checked.name.indexOf("donation") != -1 ?
      "donation" : "subscription";

    var amount = checked.value;

    if (amount == "custom")
      amount = checked.parentElement.querySelector('input[type="text"]').value;

    return {
      lang: doc.documentElement.lang,
      type: type,
      currency: paymentCurrency.value,
      amount: amount,
    };
  };

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

  var paymentProviders = doc.getElementById("payment-providers");

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

root.PaymentForm = PaymentForm;

}(window, document, _));
