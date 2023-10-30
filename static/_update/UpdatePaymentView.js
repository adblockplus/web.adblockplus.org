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
    this.currency = defaultCurrency;
    this.enabled = true;
    this.submitting = false;
    this._renderAmounts("once");
    this._renderAmounts("monthly");
    parent.querySelector(`.update-payment-amount__radio[data-frequency="${defaultFrequency}"][data-amount="${defaultAmount}"]`).checked = true;
    let requiredInput = null;
    parent.addEventListener("input", event => {
      if (event.target.classList.contains("update-payment-amount__input")) {
        const input = event.target;
        if (input.value.length >= 1) {
          input.min = event.target.dataset.min;
          requiredInput = input;
        }
        const radio = input.closest(".update-payment-amount").querySelector(".update-payment-amount__radio");
        radio.dataset.amount = getCentNumber(this.currency, input.value) ||  input.dataset.default;
        this.events.fire("amount", this.amount);
      }
    }, true);
    parent.addEventListener("focus", event => {
      let radio, input;
      if (event.target.classList.contains("update-payment-amount__radio")) {
        radio = event.target;
        input = radio.closest(".update-payment-amount").querySelector(".update-payment-amount__input");
      }
      if (event.target.classList.contains("update-payment-amount__input")) {
        input = event.target;
        radio = input.closest(".update-payment-amount").querySelector(".update-payment-amount__radio");
        radio.checked = true;
      }
      if (radio && input) {
        this.events.fire("amount", this.amount);
      }
      if (input && radio && input.value.length >= 1) {
        input.min = input.dataset.min;
        requiredInput = input;
      }
      if (radio && requiredInput && !input) {
        requiredInput.removeAttribute("min");
        requiredInput = null;
      }
    }, true);
    parent.addEventListener("change", event => {
      if (event.target.classList.contains("update-payment-amount__radio")) {
        this.events.fire("amount", this.amount);
      } else if (event.target.classList.contains("update-payment-switch__radio")) {
        this.frequency = event.target.value;
      }
    }, true);
    parent.addEventListener("keydown", event => {
      if (event.key == "Enter") {
        event.preventDefault();
        this.submit();
      }
    });
    parent.addEventListener("submit", event => {
      event.preventDefault();
      this.submit();
    });
  }

  _renderAmounts(frequency) {
    const amountParentClassname = `.update-payment-frequency--${frequency == "once" ? "once" : "recurring"}`
    const radios = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__radio`);
    const labels = this.parent.querySelectorAll(`${amountParentClassname} .update-payment-amount__value`);
    const amounts = this.products[this.currency][frequency];
    let i = 0;
    for (const amount in amounts) {
      if (amount == "custom") {
        // the label is a number input
        labels[i].placeholder = getDollarString(this.currency, amounts[amount]);
        labels[i].dataset.default = amounts[amount];
        labels[i].dataset.min = getDollarNumber(this.currency, this.minimums[this.currency][frequency]);
        radios[i].dataset.amount = getCentNumber(labels[i].value) || amounts[amount];
      } else {
        labels[i].textContent = getDollarString(this.currency, amount);
        radios[i].dataset.amount = amount;
        radios[i].dataset.frequency = frequency;
      }
      i++;
    }
  }

  get frequency() {
    return this.parent.querySelector(".update-payment-amount__radio:checked").dataset.frequency;
  }

  set frequency(frequency) {
    this._renderAmounts(frequency);
  }

  get amount() {
    return this.parent.querySelector(".update-payment-amount__radio:checked").dataset.amount;
  }

  submit() {
    const filterable = { 
      currency: this.currency,
      frequency: this.frequency,
      amount: this.amount
    };
    // a "filter" enables someone to change properties by reference
    this.events.fire("submit-filter", filterable);
    this.events.fire("submit", filterable);
  }

  get enabled() {
    return !this.parent.dataset.enabled;
  }

  set enabled(enabled) {
    this.parent.dataset.enabled = enabled;
    this.parent.querySelectorAll("input").forEach(element => element.disabled = !enabled);
    this.events.fire("enabled", { enabled });
  }

  get submitting() {
    return this.parent.dataset.submitting;
  }

  set submitting(submitting) {
    this.parent.dataset.submitting = submitting;
    if (submitting) {
      this.enabled = false;
      this.parent.querySelectorAll(".update-payment__checkout-button").forEach(button => {
        button.dataset.innerHTML = button.innerHTML;
        button.innerHTML = `<div class="update-payment__loader"></div>`;
      });  
    } else {
      this.enabled = true;
      this.parent.querySelectorAll(".update-payment__checkout-button").forEach(button => {
        if (button.dataset.innerHTML) {
          button.innerHTML = button.dataset.innerHTML;
        }
      });
    }
    this.events.fire("submitting", { submitting });
  }

}