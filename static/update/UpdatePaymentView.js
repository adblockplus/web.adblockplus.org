import Events from "./events.js";
import { getCentNumber, getDollarString, getDollarNumber } from "../shared/currency.js";

export default class UpdatePaymentView {

  /**
   * 
   * @param {Element} parent 
   * @param {Object} options
   * @param {Object} options.products see update.js paddle config products
   * @param {Object} options.minimums see update.js paddle config minimums
   * @param {string} options.defaultCurrency default 3 letter currency
   * @param {string} options.defaultAmount default cent amount
   */
  constructor(parent, { products, minimums, defaultCurrency, defaultFrequency, defaultAmount }) {

    this.events = new Events();
    this.parent = parent;
    this.products = products;
    this.minimums = minimums;
    this.defaultCurrency = defaultCurrency;
    this.defaultFrequency = defaultFrequency;
    this.defaultAmount = defaultAmount;
    this.submitting = false;
    this.rewardDuration = null;
    this.frequencyHeaders = parent.querySelectorAll(".update-payment-frequency__header");

    parent.querySelector(".update-payment-currency").addEventListener("change", () => {
      this.events.fire("currency");
    });
    
    this.events.on("currency", () => {
      this._renderAmounts("once");
      this._renderAmounts(this.recurringFrequency);
      this._renderRewardDuration(this.rewardDuration);
      this.events.fire("amount");
    });
  
    parent.querySelector(".update-payment-switch__toggle").addEventListener("click", () => {
      // toggle monthly/yearly switch on click regardless of side clicked
      parent.querySelector(".update-payment-switch__radio:not(:checked)").click();
    });

    parent.addEventListener("input", event => {
      if (event.target.classList.contains("update-payment-amount__input")) {
        this.events.fire("amount");
      }
    }, true);

    parent.addEventListener("focus", event => {
      if (event.target.classList.contains("update-payment-amount__input")) {
        // check custom amount radio when custom amount input is focused
        event.target.closest(".update-payment-amount").querySelector(".update-payment-amount__radio").click();
      }
    }, true);

    parent.addEventListener("change", event => {
      if (event.target.classList.contains("update-payment-amount__radio")) {
        this.events.fire("amount");
      }
      if (event.target.classList.contains("update-payment-switch__radio")) {
        this.events.fire("recurringFrequency");
      }
    }, true);

    this.events.on("recurringFrequency", () => {
      this._renderAmounts(this.recurringFrequency);
      this.events.fire("amount");
    });

    // set and validate selected custom amount min only when custom amount is selected and submitted
    // submit button click event occurs on click and space/enter key press before submit event
    parent.querySelector(".update-payment__checkout-button").addEventListener("click", () => {
      document.querySelectorAll(".update-payment-amount__input").forEach(input => input.removeAttribute("min"));
      const checkedAmountRadio = this.parent.querySelector(".update-payment-amount__radio:checked");
      if (checkedAmountRadio.classList.contains("update-payment-amount__radio--custom")) {
        const customAmountInput = checkedAmountRadio.closest(".update-payment-amount").querySelector(".update-payment-amount__input");
        customAmountInput.min = customAmountInput.dataset.min;
      }
    });

    parent.addEventListener("submit", event => {
      event.preventDefault();
      this._submit();
    });

    this._constructCurrencies(defaultCurrency);
    this._renderAmounts("once");
    this._renderAmounts(defaultFrequency == "yearly" ? "yearly" : "monthly");
    parent.querySelector(`.update-payment-amount__radio[data-frequency="${defaultFrequency}"][value="${defaultAmount}"]`).click();
    window.addEventListener("resize", () => this._onresize());
    this._onresize();
  }

  get currency() {
    return this.parent.querySelector(".update-payment-currency").value;
  }

  get frequency() {
    return this.parent.querySelector(".update-payment-amount__radio:checked").dataset.frequency;
  }

  get recurringFrequency() {
    return this.parent.querySelector(".update-payment-switch__radio:checked").value;
  }

  get amount() {
    const checked = this.parent.querySelector(".update-payment-amount__radio:checked");
    // if checked amount is custom
    if (checked.classList.contains("update-payment-amount__radio--custom")) {
      const customInput = checked.closest(".update-payment-amount").querySelector(".update-payment-amount__input");
      // return custom value or default
      let centNumber = getCentNumber(this.currency, customInput.value);
      if (isNaN(centNumber)) return customInput.dataset.default;
      else return centNumber;
    } else {
      return checked.value;
    }
  }

  setRewardDuration(duration) {
    this.rewardDuration = duration;
    this.parent.querySelector(".update-payment-reward").hidden = false;
    this._renderRewardDuration(duration);
    this.events.fire("rewardDuration");
  }

  hideRewardDuration() {
    this.parent.querySelector(".update-payment-reward").hidden = true;
  }

  setSubmitting(submitting) {
    this.submitting = submitting;
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
    this.events.fire("submitting");
  }

  _constructCurrencies(defaultCurrency) {
    const currencySelect = this.parent.querySelector(".update-payment-currency");
    const defaultCurrencyOption = this.parent.querySelector(".update-payment-currency__default");
    defaultCurrencyOption.textContent = defaultCurrency;
    for (const currency in this.products) {
      if (currency == defaultCurrency) continue;
      const option = document.createElement("option");
      option.textContent = currency;
      currencySelect.append(option);
    }
  }

  _renderAmounts(frequency) {
    const amountParentClassname = `.update-payment-frequency--${frequency == "once" ? "once" : "recurring"}`
    const radios = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__radio`);
    const labels = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__value`);
    const amounts = this.products[this.currency][frequency];
    let i = 0;
    for (const amount in amounts) {
      const radio = radios[i];
      const label = labels[i];
      if (amount == "custom") {
        const input = label;
        input.placeholder = getDollarString(adblock.settings.locale, this.currency, amounts[amount]);
        input.dataset.default = amounts[amount];
        input.dataset.min = getDollarNumber(this.currency, this.minimums[this.currency][frequency]);
      } else {
        label.textContent = getDollarString(adblock.settings.locale, this.currency, amount);
        radio.value = amount;
      }
      radio.dataset.frequency = frequency;
      i++;
    }
  }

  _renderRewardDuration(duration) {
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
      `<span>35.00</span>`, 
      `<span class="amount">${getDollarString(this.currency, this.amount)}</span>`
    )
    .replace(
      `<span>Adblock Plus Premium</span>`, 
      `<span class="product">${adblock.strings["product__premium"]}</span>`
    )
    .replace(
      `<span>8</span>`,
      `<span class="duration">${Math.floor(duration > 12 ? duration / 12 : duration)}</span>`
    );
  }

  _onresize() {
    // CAUTION: Assumes two columns with two frequency headers
    this.frequencyHeaders.forEach(frequencyHeader => frequencyHeader.style.height = "auto");    
    if (this.frequencyHeaders[0].clientHeight > this.frequencyHeaders[1].clientHeight) {
      this.frequencyHeaders[1].style.height = this.frequencyHeaders[0].clientHeight + "px";
    } else {
      this.frequencyHeaders[0].style.height = this.frequencyHeaders[1].clientHeight + "px";
    }
  }

  _submit() {
    // a "filter" enables someone to change properties by reference
    const filterable = { 
      currency: this.currency,
      frequency: this.frequency,
      amount: this.amount
    };
    this.events.fire("submit-filter", filterable);
    this.events.fire("submit", filterable);
  }
}