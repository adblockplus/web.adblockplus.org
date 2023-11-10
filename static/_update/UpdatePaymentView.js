import Events from "./events.js";
import { getCentNumber, getDollarString, getDollarNumber } from "./currency.js";

export default class UpdatePaymentView {

  /**
   * @param {Element} parent
   * @param {object} options
   * @param {object} options.products currency{} > frequency{} > amount{} = product
   * @param {object} options.minimums currency{} > frequency{} > amount
   * @param {string} options.defaultCurrency 3 letter code
   * @param {string} options.defaultFrequency once|monthly|yearly
   * @param {string} options.defaultAmount default selected amount (amount must be in product frequency)
   */
  constructor(parent, { products, minimums, defaultCurrency, defaultFrequency, defaultAmount }) {

    this.events = new Events();
    this.parent = parent;
    this.products = products;
    this.minimums = minimums;

    // Populate configured products currencies
    const currencySelect = parent.querySelector(".update-payment-currency");
    const defaultCurrencyOption = parent.querySelector(".update-payment-currency__default");
    defaultCurrencyOption.textContent = defaultCurrency;
    for (const currency in products) {
      if (currency == defaultCurrency) continue;
      const option = document.createElement("option");
      option.textContent = currency;
      currencySelect.append(option);
    }
    // Bind select change to currency state change
    currencySelect.addEventListener("change", () => {
      const checkedRecurringFrequency = parent.querySelector("update-payment-switch__radio:checked");
      this._renderAmounts("once");
      this._renderAmounts(checkedRecurringFrequency ? checkedRecurringFrequency.value : "monthly");
    });

    // update amounts for defalut currency
    this._renderAmounts("once");
    this._renderAmounts(defaultFrequency == "yearly" ? "yearly" : "monthly");

    // The following handler toggles the monthly/yearly switch when the user
    // clicks either option. The switch is toggled regardless of option clicked
    // to be more familiar/alike a typical on/off switch
    let lastFrequency = "monthly";
    let didFlipFrequency = false;
    parent.addEventListener("click", event => {
      if (event.target.classList.contains("update-payment-switch__radio")) {
        if (event.target.value == lastFrequency && false == didFlipFrequency) {
          parent.querySelector(".update-payment-switch__radio:not(:checked)").click();
          didFlipFrequency = true;
        } else {
          didFlipFrequency = false;
        }
        lastFrequency = event.target.value;
      }
    });

    /**
     * Pointer to the current/last non-empty custom amount input selected
     *
     * Below we will set and unset its min attribute when it is selected, changed,
     * and deselected to enable and disable minimum amount validation appropriately.
     */
    let customInput = null;

    // listen to custom amount text input
    parent.addEventListener("input", event => {
      if (event.target.classList.contains("update-payment-amount__input")) {
        const input = event.target;
        if (input.value.length != 0) {
          input.min = event.target.dataset.min;
          customInput = input;
        } else {
          input.removeAttribute("min");
        }
        const radio = input.closest(".update-payment-amount").querySelector(".update-payment-amount__radio");
        // keep custom amount sibling radio amount in sync with custom amount input amount
        radio.dataset.amount = getCentNumber(this.currency, input.value) ||  input.dataset.default;
        this.events.fire("amount");
      }
    }, true);
    
    // listen to radio and custom input focus events (via keyboard tab/arrow and mouse click)
    parent.addEventListener("focus", event => {
      let radio, input;
      if (event.target.classList.contains("update-payment-amount__radio")) {
        radio = event.target;
        input = radio.closest(".update-payment-amount").querySelector(".update-payment-amount__input");
        // input will be null when radio is not a custom amount radio
      } else if (event.target.classList.contains("update-payment-amount__input")) {
        input = event.target;
        radio = input.closest(".update-payment-amount").querySelector(".update-payment-amount__radio");
        radio.checked = true;
      }
      if (
        radio && !input && customInput // custom amount is deselected
        || radio && input && customInput && input != customInput // alternate custom amount is selected
      ) {
        customInput.removeAttribute("min");
        customInput = null;
      }
      if (input && radio && input.value.length != 0) {
        input.min = input.dataset.min;
        customInput = input;
      }
      if (radio && input) {
        this.events.fire("amount");
      }
    }, true);

    parent.addEventListener("change", event => {

      // fire amount change event on selected amount change
      if (event.target.classList.contains("update-payment-amount__radio")) {
        this.events.fire("amount");
        parent.dataset.frequency = event.target.dataset.frequency;

      // render recurring frequency amounts on recurring frequency switch change
      } else if (event.target.classList.contains("update-payment-switch__radio")) {
        this._renderAmounts(event.target.value);
        this.events.fire("amount")
      }

    }, true);

    parent.addEventListener("keydown", event => {
      if (event.key == "Enter") {
        event.preventDefault();
        this._submit();
      }
    });

    parent.addEventListener("submit", event => {
      event.preventDefault();
      this._submit();
    });

  }

  get currency() {
    return this.parent.querySelector(".update-payment-currency").value;
  }

  get frequency() {
    return this.parent.querySelector(".update-payment-amount__radio:checked").dataset.frequency;
  }

  get amount() {
    return this.parent.querySelector(".update-payment-amount__radio:checked").dataset.amount;
  }

  setRewardDuration(duration) {
    let baseTranslation;
    if (duration > 12) {
      baseTranslation = adblock.strings["update-payment-reward__n-years"];
    } else if (duration == 12) {
      baseTranslation = adblock.strings["update-payment-reward__1-year"];
    } else if (duration > 1) {
      baseTranslation = adblock.strings["update-payment-reward__n-months"];
    } else if (duration == 1) {
      baseTranslation = adblock.strings["update-payment-reward__1-month"];
    } else {
      baseTranslation = adblock.strings["update-payment-reward"];
    }
    this.parent.querySelector(".update-payment-reward__text").innerHTML = baseTranslation
    .replace(
      `<span class="amount">35.00</span>`, 
      `<span class="amount">${getDollarString(this.currency, this.amount)}</span>`
    )
    .replace(
      `<span class="product">Adblock Plus Premium</span>`, 
      `<span class="product">${adblock.strings["product__premium"]}</span>`
    )
    .replace(
      `<span class="duration">8</span>`,
      `<span class="duration">${Math.floor(duration > 12 ? duration / 12 : duration)}</span>`
    );
  }

  setSubmitting(submitting) {
    this.parent.dataset.submitting = submitting;
    if (submitting) {
      this.parent.querySelectorAll("input").forEach(element => element.disabled = true);
      this.parent.querySelectorAll(".update-payment__checkout-button").forEach(button => {
        button.dataset.innerHTML = button.innerHTML;
        button.innerHTML = `<div class="update-payment__loader"></div>`;
      });  
    } else {
      this.parent.querySelectorAll("input").forEach(element => element.disabled = false);
      this.parent.querySelectorAll(".update-payment__checkout-button").forEach(button => {
        if (button.dataset.innerHTML) {
          button.innerHTML = button.dataset.innerHTML;
        }
      });
    }
    this.events.fire("submitting", { submitting });
  }

  _renderAmounts(frequency) {
    const amountParentClassname = `.update-payment-frequency--${frequency == "once" ? "once" : "recurring"}`
    const radios = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__radio`);
    const labels = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__value`);
    const amounts = this.products[this.currency][frequency];
    let i = 0;
    for (const amount in amounts) {
      if (amount == "custom") { // the label is a number input
        if (radios[i].dataset.amount == labels[i].dataset.default) { // update radio value to input default when input is unchanged
          radios[i].dataset.amount = getCentNumber(labels[i].value) || amounts[amount];
        }
        labels[i].placeholder = getDollarString(this.currency, amounts[amount]);
        labels[i].dataset.default = amounts[amount];
        labels[i].dataset.min = getDollarNumber(this.currency, this.minimums[this.currency][frequency]);
        if (radios[i].checked) {
          labels[i].min = labels[i].dataset.min;
        }
      } else {
        labels[i].textContent = getDollarString(this.currency, amount);
        radios[i].dataset.amount = amount;
      }
      radios[i].dataset.frequency = frequency;
      i++;
    }
  }

  _submit() {
    const filterable = { 
      currency: this.currency,
      frequency: this.frequency,
      amount: this.amount
    };
    // a "filter" enables someone to change properties by reference
    this.events.fire("submit-filter", filterable);
    this.events.fire("submit", filterable);
  }
}