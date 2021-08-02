/*global PaymentForm, updatePaymentConfig, _*/
(function(root, doc, _) {
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
   * @param {Object=} currencies[].yearlySubscription - (optional) yearly payment options for currency
   * @param {Number[]} currencies[].yearlySubscription.amounts - Amounts offered for yearly payment
   * @param {Number} currencies[].yearlySubscription.placeholder - Custom amount placeholder for yearly
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
    
    var yearlySubscriptionAmounts =
    doc.getElementById("yearly-subscription-amounts");
  
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
        doc.body.classList.add("has-yearly");
  
        var subscriptionOptions = {
          type: "monthly-subscription",
          sign: currency.sign,
          amounts: currency.subscription.amounts,
          placeholder: currency.subscription.placeholder
        };
  
        subscriptionAmounts.innerHTML = ""
          + thePresetAmounts(subscriptionOptions)
          + theCustomAmount(subscriptionOptions);
        
        if (currency.yearly) {
          var yearlySubscriptionOptions = {
            type: "yearly-subscription",
            sign: currency.sign,
            amounts: currency.yearly.amounts,
            placeholder: currency.yearly.placeholder
          };
  
          yearlySubscriptionAmounts.innerHTML = ""
            + thePresetAmounts(yearlySubscriptionOptions)
            + theCustomAmount(yearlySubscriptionOptions);
  
        } else {
          doc.body.classList.remove("has-yearly");
        } 
      }
      else
      {
        doc.body.classList.remove("has-subscriptions");
        subscriptionAmounts.innerHTML = "";
      }
    }
  
    updateAmounts();
  
    paymentCurrency.addEventListener("change", function(e) {
      updateAmounts();
      validateCustomAmount(e);
    });
  
    // uncheck donation amount when subscription amount is selected and vise versa
    function onFieldsetChange (otherFieldset, event)
    {
      var otherFieldsetSelected = otherFieldset.querySelector("input:checked");
  
      if (otherFieldsetSelected)
      {
        otherFieldsetSelected.checked = false;
        validateCustomAmount(event);
      }
    }
  
    donationAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, subscriptionAmounts));
  
    donationAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, yearlySubscriptionAmounts));
  
    subscriptionAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, donationAmounts)
    );
  
    subscriptionAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, yearlySubscriptionAmounts)
    );
  
    yearlySubscriptionAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, donationAmounts)
    );
  
    yearlySubscriptionAmounts.addEventListener(
      "change",
      onFieldsetChange.bind(this, subscriptionAmounts)
    );
  
    // Select custom amount radio when textbox is focused
    function onCustomFieldSelect(event)
    {
      if (event.target.type == "text")
      {
        event.target.parentElement.querySelector('input[type="radio"]').click();
        validateCustomAmount(event);
      }
    }
  
    donationAmounts.addEventListener("focus", onCustomFieldSelect, true);
  
    subscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);
    
    yearlySubscriptionAmounts.addEventListener("focus", onCustomFieldSelect, true);
  
    function clearCustomAmountErrors()
    {
      doc.body.classList.remove("minimum-donation-error");
      doc.body.classList.remove("minimum-subscription-error");
      doc.body.classList.remove("minimum-yearly-error");
  
      enableForm(true);
    }
  
    function enableForm(enabled)
    {
      _.each(
        _.toArray(doc.querySelectorAll("#payment-providers button")),
        function(button)
        {
          button.disabled = !enabled;
        }
      );
    }
  
    function isValidAmount(amount, type, currency)
    {
      amount = parseFloat(amount);
  
      type = (type == 'yearly-subscription') ? 'yearly' : type;
  
      type = (type == 'monthly-subscription') ? 'subscription' : type;
  
      return _.isFinite(amount) && amount >= currency[type].minimum;
    }
  
    function otherTypes(type) {
      return ["donation", "subscription", "yearly"].filter(function(item) {
        return item != type;
      });
    }
  
    function validateCustomAmount(event)
    {
      var checkedRadio = doc.querySelector(".payment-amount input:checked");
  
      if (checkedRadio.value != "custom")
      {
        return clearCustomAmountErrors();
      }
  
      var amount = checkedRadio.parentElement.querySelector(
        'input[type="text"]'
      ).value;
  
      if (amount.trim() == "")
      {
        return clearCustomAmountErrors();
      }
  
      amount = parseFloat(amount);
  
      var currency = currencies[paymentCurrency.value];
      var selectedType = event.currentTarget.id.split("-")[0];
      var typeError = "minimum-" + selectedType + "-error";
      var minimumAmount = currency[selectedType].minimum;
  
      if (isValidAmount(amount, selectedType, currency))
      {
        clearCustomAmountErrors();
        return;
      }
  
      otherTypes(selectedType).forEach(function(otherType) {
        doc.body.classList.remove("minimum-" + otherType + "-error");
      });
      
      doc.body.classList.add(typeError);
      
      enableForm(false);
  
      doc.querySelector(
        ".minimum-" + selectedType + "-warning .minimum-amount"
      ).textContent = currency.sign + minimumAmount;
    }
    
    function actionType(text) {
      var type;
  
      if (/donation/.test(text)) {
        type = 'donation';
  
      } else if (/monthly/.test(text)) {
        type = 'monthly-subscription';
  
      } else if (/yearly/.test(text)) {
        type = 'yearly-subscription';
      }
  
      return type;
    }
  
    donationAmounts.addEventListener("change", validateCustomAmount, true);
    subscriptionAmounts.addEventListener("change", validateCustomAmount, true);
    yearlySubscriptionAmounts.addEventListener("change", validateCustomAmount, true);
    
    donationAmounts.addEventListener("input", validateCustomAmount, true);
    subscriptionAmounts.addEventListener("input", validateCustomAmount, true);
    yearlySubscriptionAmounts.addEventListener("input", validateCustomAmount, true);
  
    /**
     * Export form data to JSON compatible object
     * @function
     */
    this.toJSON = function()
    {
      var currency = currencies[paymentCurrency.value];
  
      var checked = doc.querySelector(".payment-amount input[type=radio]:checked");
  
      var type = actionType(checked.name);
  
      var amount = checked.value;
  
      if (amount == "custom")
      {
        checked = checked.parentElement.querySelector('input[type="text"]');
        amount = isValidAmount(
          checked.value,
          type,
          currencies[paymentCurrency.value]
        ) ? checked.value : checked.placeholder;
      }
  
      return {
        lang: doc.documentElement.lang,
        type: type,
        currency: paymentCurrency.value,
        amount: parseFloat(amount),
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
  
      var buttonName = event.target.name || event.target.parentNode.name;
  
      var disabled = event.target.disabled || event.target.parentNode.disabled;
  
      if (!buttonName || disabled) return;
  
      var provider = buttonName.replace("-provider", "");
  
      var handlers = providerHandlers[provider];
  
      if (!handlers) return;
  
      _.each(handlers, function(handler) {return handler();});
    }
  
    paymentProviders.addEventListener("click", onPaymentProviderSubmit);
  }
  
  root.PaymentForm = PaymentForm;
  
  }(window, document, _));
  