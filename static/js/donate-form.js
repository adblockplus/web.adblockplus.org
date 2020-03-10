(function (root, doc)
{
  /**
   * Donation form currencies
   * Depends on pre-loaded / inline currency config
   * @example
   * window.donationFormCurrencies = {
   *   "USD": { // currency type value / label
   *     "sign": "$", // currency type sign label
   *     "donationAmounts: [10], //  donation amounts
   *     "subscriptionAmounts: [10] // (optional) subscription amounts
   *   }
   *  }
   */
  var currencies = root.donationFormCurrencies;

  if (typeof currencies != "object")
    throw new Error("Missing donation form config");

  var DONATION_TYPE = "one-time";

  var SUBSCRIPTION_TYPE = "monthly";

  var DONATION_PREFIX = "donation";

  var SUBSCRIPTION_PREFIX = "subscription";

  var CURRENCY_OPTION_TEMPLATE = '<option value="{currency}">{currency}</option>';

  var CURRENCY_AMOUNT_TEMPLATE = ''
    + '<div class="{prefix}-amount column one-third">'
    +   '<input id="{prefix}-{amount}" name="{prefix}-amount" type="radio" value="{amount}" {checked}>'
    +   '<label for="{prefix}-{amount}">{sign}{amount}</label>'
    + '</div>';

  function exportTemplate (template, inputs)
  {
    var result = template;
    for (var input in inputs) {
      result = result.replace(
        new RegExp("{" + input + "}", "g"),
        inputs[input]
      );
    }
    return result;
  }

  function DonationForm ()
  {
    var defaultCurrency = (function () {
      for (var currency in currencies)
        return currencies[currency];
    }());

    var currenciesSelect = doc.getElementById("donation-currencies");

    var currencyOptions = [];

    for (var currencyOption in currencies)
      currencyOptions
        .push(
          exportTemplate(
            CURRENCY_OPTION_TEMPLATE,
            {currency: currencyOption}
          )
        );

    currenciesSelect.innerHTML = currencyOptions.join("");

    var donationAmountsFieldset = doc.getElementById("donation-amounts");

    var subscriptionAmountsFieldset = doc.getElementById("subscription-amounts");

    function addAmounts (fieldset, prefix, sign, amounts, checked)
    {
      var exportedAmounts = [];

      for (var i = 0; i < amounts.length; i++)
        exportedAmounts.push(
          exportTemplate(CURRENCY_AMOUNT_TEMPLATE, {
            prefix: prefix,
            sign: sign,
            checked: i == checked ? "checked" : "",
            amount: amounts[i]
          })
        );

      fieldset.innerHTML = exportedAmounts.join("");
    }

    function addDonationAmounts (currency)
    {
      addAmounts(
        donationAmountsFieldset,
        DONATION_PREFIX,
        currency.sign,
        currency.donationAmounts,
        3 // hard coded default donation checked
      );

      doc.body.classList.add("has-donations");
    }

    function addSubscriptionAmounts (currency)
    {
      addAmounts(
        subscriptionAmountsFieldset,
        SUBSCRIPTION_PREFIX,
        currency.sign,
        currency.subscriptionAmounts
      );

      doc.body.classList.remove("has-subscriptions");
    }

    addDonationAmounts(defaultCurrency);

    if (defaultCurrency.subscriptionAmounts)
      addSubscriptionAmounts(defaultCurrency);

    function onCurrencyChange ()
    {
      var currency = currencies[currenciesSelect.value];
      var donationAmounts = currency.donationAmounts;
      var subscriptionAmounts = currency.subscriptionAmounts;

      if (donationAmounts)
        addDonationAmounts(currency, donationAmounts);
      else
        doc.body.classList.remove("has-donations");

      if (subscriptionAmounts)
        addSubscriptionAmounts(currency, subscriptionAmounts);
      else
        doc.body.classList.remove("has-subscriptions");
    }

    currenciesSelect.addEventListener("change", onCurrencyChange);

    function onFieldsetChange (otherFieldset)
    {
      var otherFieldsetSelected = otherFieldset.querySelector("input:checked");

      if (otherFieldsetSelected)
          otherFieldsetSelected.checked = false;
    }

    donationAmountsFieldset.addEventListener(
      "change",
      onFieldsetChange.bind(this, subscriptionAmountsFieldset)
    );

    subscriptionAmountsFieldset.addEventListener(
      "change",
      onFieldsetChange.bind(this, donationAmountsFieldset)
    );

    /**
     * @method toJSON
     * Returns a shallow copy of form data for providers
     */
    this.toJSON = function toJSON ()
    {
      var donationType = DONATION_TYPE;

      var donationAmountChecked = donationAmountsFieldset
        .querySelector("input:checked");

      if (!donationAmountChecked)
      {
        donationType = SUBSCRIPTION_TYPE;
        donationAmountChecked = subscriptionAmountsFieldset
          .querySelector("input:checked");
      }

      return {
        type: donationType,
        currency: currenciesSelect.value,
        amount: donationAmountChecked.value
      };
    };
  }

  function constructDonationForm()
  {
    root.donationForm = new DonationForm();
  }

  if (doc.readyState == "loading")
    doc.addEventListener("DOMContentLoaded", constructDonationForm);
  else
    constructDonationForm();

}(window, document));
