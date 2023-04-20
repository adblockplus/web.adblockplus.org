/* global adblock */

const formTemplate = document.getElementById("appeal-form");
const fixedAmountTemplate = document.getElementById("appeal-form-amount--fixed");
const customAmountTemplate = document.getElementById("appeal-form-amount--custom");

/** 
 * Cent amount (int) to dollar amount (float) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

/** 
 * Dollar amount (float) to cent amount (int) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} dollar - amount in dollars (for applicable currencies)
 */
function toCentNumber(currency, dollar) {
  return currency == "JPY" ? dollar : dollar * 100;
}

/** 
 * Cent amount (int) to dollar amount (float) with localised formatting (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarString(currency, cents) {
  return new Intl.NumberFormat(navigator.language, { style: "currency", currency, minimumFractionDigits: 0 }).format(toDollarNumber(currency, cents));
}

export class AppealForm {

  /** @member {Object} paddle config @see ./configuration.js */
  #paddleConfig;

  /** @member {Element} form parent element */
  #parentElement;

  /** @member {Element} form currency select element */
  #currencySelect;

  /** @member {Element} form frequencies (once, monthly, yearly) parent element */
  #frequenciesParentElement;

  /** @member {Element[]} form amount control elements (parent, label, and inputs) */
  #amountsControlElements = [];

  /** @member {Element} form error message (above checkout button) */
  #errorMessageElement;

  /** @member {Element} form submit button */
  #submitButton;

  constructor({placeholder, paddleConfig, formConfig}) {
    this.#paddleConfig = paddleConfig;
    this.#parentElement = formTemplate.content.cloneNode(true).firstElementChild;
    this.#parentElement.querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    this.#parentElement.querySelector(".appeal-form-checkout__submit").innerHTML = adblock.strings["appeal-form-checkout__submit"];
    this.#errorMessageElement = this.#parentElement.querySelector(".appeal-form__error");
    this.#submitButton = this.#parentElement.querySelector(".appeal-form-checkout__submit");
    // construct and reference form currency select
    this.#currencySelect = this.#parentElement.querySelector(".appeal-form-header__select");
    for (const currency in paddleConfig.products) {
      const option = document.createElement("option");
      option.textContent = currency.toUpperCase();
      option.value = currency.toUpperCase();
      this.#currencySelect.appendChild(option);
    }
    this.#currencySelect.value = formConfig.currency;
    // construct and reference form amounts
    this.#frequenciesParentElement = this.#parentElement.querySelector(".appeal-form-frequencies");
    for (const frequency in paddleConfig.products[formConfig.currency]) {
      let radioNumber = 1;
      const frequencyParent = this.#frequenciesParentElement.querySelector(`.appeal-form-frequency--${frequency}`);
      frequencyParent.querySelector(".appeal-form-frequency__heading").innerHTML = adblock.strings[`appeal-form-frequency__heading--${frequency}`]
      const amountsParent = frequencyParent.querySelector(".appeal-form-amounts");
      for (const amount in paddleConfig.products[formConfig.currency][frequency]) {
        let amountControl, amountRadio, amountInput;
        if (amount == "custom") {
          amountControl = customAmountTemplate.content.cloneNode(true).firstElementChild;
          amountInput = amountControl.querySelector(".appeal-form-amount__input");
          amountInput.dataset.testid = `appeal-form-amount__input--${frequency}`;
          amountInput.dataset.frequency = frequency;
        } else {
          amountControl = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
        }
        amountRadio = amountControl.querySelector(".appeal-form-amount__radio");
        amountRadio.dataset.testid = `appeal-form-amount__radio--${frequency}-${radioNumber++}`;
        amountRadio.dataset.frequency = frequency;
        this.#amountsControlElements.push(amountControl);
        amountsParent.appendChild(amountControl);
      }
    }
    this.#updateAmounts(formConfig.currency);
    this.#frequenciesParentElement.querySelectorAll(".appeal-form-amount__radio")[formConfig.selected].checked = true;
    // add form interaction listeners
    this.#currencySelect.addEventListener("change", event => this.#updateAmounts(event.currentTarget.value));
    this.#frequenciesParentElement.addEventListener("focusin", event => this.#onAmountFocusin(event));
    this.#frequenciesParentElement.addEventListener("input", event => this.#onAmountInput(event));
    this.#parentElement.addEventListener("submit", event => this.#onSubmit(event));
    // replace placeholder with constructed form
    placeholder.replaceWith(this.#parentElement);
    // set testid on parent to signal to playwright tests that construction is completed
    this.#parentElement.dataset.testid = "appeal-form-constructed";
  }

  /**
   * Update amount control labels and values (in place)
   * 
   * @param {string} currency - 3 letter currency
   */
  #updateAmounts(currency) {
    let i = 0;
    for (const frequency in this.#paddleConfig.products[currency]) {
      for (const amount in this.#paddleConfig.products[currency][frequency]) {
        const control = this.#amountsControlElements[i++];
        const radio = control.querySelector(".appeal-form-amount__radio");
        if (amount == "custom") {
          const input = control.querySelector(".appeal-form-amount__input");
          input.placeholder = String(toDollarNumber(currency, Object.keys(this.#paddleConfig.products[currency][frequency])[3]));
          input.dataset.minimum = toDollarNumber(currency, this.#paddleConfig.products[currency][frequency][amount]);
          radio.dataset.product = "custom";
        } else {
          control.querySelector(".appeal-form-amount__text").textContent = toDollarString(currency, amount);
          radio.value = amount;
          radio.dataset.product = this.#paddleConfig.products[currency][frequency][amount];
        }
      }
    }
  }

  /** show minimum amount error for custom amount input */
  #showMinimumAmountError(input) {
    this.#errorMessageElement.innerHTML = adblock.strings[`appeal-form__error--${input.dataset.frequency}`];
    this.#errorMessageElement.hidden = false;
    this.#submitButton.disabled = true;
  }

  #hideMinimumAmountError() {
    this.#errorMessageElement.hidden = true;
    this.#submitButton.disabled = false;
  }

  /** Handle possibility of minimum amount error on target custom amount input */
  #handleMinimumAmountError(input) {
    if (input.value && parseFloat(input.value) < parseFloat(input.dataset.minimum)) {
      this.#showMinimumAmountError(input)
    } else {
      this.#hideMinimumAmountError();
    }
  }

  /** Get custom amount input from reference to custom amount radio */
  #getCustomRadioInput(radio) {
    return radio.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")
  }

  /** Get custom amount radio from reference to custom amount input */
  #getCustomInputRadio(input) {
    return input.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")
  }

  /** Handle when a custom amount input is selected / focused for input */
  #onAmountFocusin(event) {
    if (event.target.type == "number") {
      // Check checkbox beside custom amount input when custom amount input is selected for entry
      this.#getCustomInputRadio(event.target).checked = true;
      // Handle possible minimum amount error when custom amount input re-selected already has a value below the minimum
      this.#handleMinimumAmountError(event.target);
    }
  }

  /** Handle when an amount radio is selected or a custom amount input is filled */
  #onAmountInput(event) {
    if (event.target.type == "number") {
      // Handle possible minimum amount error when custom amount input is filled
      this.#handleMinimumAmountError(event.target);
    } else if (event.target.type == "radio") {
      // Handle possible minimum amount error when custom amount is re-selected via radio
      if (event.target.value == "custom") {
        this.#handleMinimumAmountError(this.#getCustomRadioInput(event.target));
      } else {
        // Hide minimum amount error when fixed amount (a non custom amount) is selected
        this.#hideMinimumAmountError();
      }
    }
  }

  #submitCallbacks = [];

  /** Register a callback for when the form is submitted */
  onSubmit(callback) {
    this.#submitCallbacks.push(callback);
  }

  /** Handle when the form is submitted */
  #onSubmit(event) { 
    event.preventDefault();
    let radio = this.#frequenciesParentElement.querySelector(".appeal-form-amount__radio:checked");
    const currency = this.#currencySelect.value;
    const frequency = radio.dataset.frequency;
    const product = radio.dataset.product;
    let amount = radio.value;
    if (amount == "custom") {
      const input = this.#getCustomRadioInput(radio);
      if (!input.value || parseFloat(input.value) < parseFloat(input.dataset.minimum)) {
        return this.#showMinimumAmountError(input);
      } else {
        amount = toCentNumber(currency, parseFloat(input.value));
      }
    }
    this.#submitCallbacks.forEach(callback => callback({ currency, frequency, amount,  product, }));
  }

  disable() {
    this.#parentElement.classList.add("appeal-form--disabled");
    this.#parentElement.querySelectorAll("input, button").forEach(field => { field.disabled = true; });
  }

  enable() {
    this.#parentElement.classList.remove("appeal-form--disabled");
    this.#parentElement.querySelectorAll("input, button").forEach(field => { field.disabled = false; });
  }

}