/* global adblock */

const formTemplate = document.getElementById("appeal-form");
const fixedAmountTemplate = document.getElementById("appeal-form-amount--fixed");
const customAmountTemplate = document.getElementById("appeal-form-amount--custom");

function getLanguage() {
  // prefer navigator language to settings language so that more specific language variants can differentiate currencies
  // e.g. 10 USD in "en" is $10 but 10 USD in "en-CA" is US$10
  return (navigator.language || adblock.settings.language).replace("_", "-");
}

function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

function toCentsNumber(currency, dollars) {
  return currency == "JPY" ? dollars : dollars * 100;
}

function toDollarString(currency, cents) {
  return new Intl.NumberFormat(
    getLanguage(),
    { style: "currency", currency, minimumFractionDigits: 0 }
  ).format(toDollarNumber(currency, cents));
}

export class AppealForm {

  #paddleConfig;

  #formParent;

  #currencySelect;

  #frequenciesParent;

  #amountControls = [];

  #errorAlert;

  constructor({placeholder, paddleConfig, formConfig}) {
    
    // store configuration
    this.#paddleConfig = paddleConfig;
    const defaultCurrency = formConfig.currency;
    const defaultSelected = formConfig.selected;

    // construct and reference form parent
    this.#formParent = formTemplate.content.cloneNode(true).firstElementChild;
    this.#formParent.querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    this.#formParent.querySelector(".appeal-form-checkout__submit span").innerHTML = adblock.strings["appeal-form-checkout__submit"];

    // reference form error alert
    this.#errorAlert = this.#formParent.querySelector(".appeal-form__error");

    // construct and reference form currency select
    this.#currencySelect = this.#formParent.querySelector(".appeal-form-header__select");
    for (const currency in this.#paddleConfig.products) {
      const option = document.createElement("option");
      option.textContent = currency.toUpperCase();
      option.value = currency.toUpperCase();
      this.#currencySelect.appendChild(option);
    }
    this.#currencySelect.value = defaultCurrency;

    // construct and reference form amounts
    this.#frequenciesParent = this.#formParent.querySelector(".appeal-form-frequencies");
    let i = 0;
    for (const frequency in this.#paddleConfig.products[defaultCurrency]) {
      const amountsParent = this.#frequenciesParent.querySelector(`.appeal-form-frequency--${frequency} .appeal-form-amounts`);
      for (const amount in this.#paddleConfig.products[defaultCurrency][frequency]) {
        let amountControl, amountRadio, amountInput;
        if (amount == "custom") {
          amountControl = customAmountTemplate.content.cloneNode(true).firstElementChild;
          amountInput = amountControl.querySelector(".appeal-form-amount__input");
          amountInput.dataset.testid = `appeal-form-amount__input--${frequency};`
          amountInput.dataset.frequency = frequency;
        } else {
          amountControl = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
        }
        amountRadio = amountControl.querySelector(".appeal-form-amount__radio");
        amountRadio.dataset.testid = `appeal-form-amount__radio--${i++}`;
        amountRadio.dataset.frequency = frequency;
        this.#amountControls.push(amountControl);
        amountsParent.appendChild(amountControl);
      }
    }

    // update constructed amounts with configured currency
    this.#updateAmounts(defaultCurrency);
    
    // check configured selected amount
    this.#frequenciesParent.querySelectorAll(".appeal-form-amount__radio")[defaultSelected].checked = true;

    // add form interaction listeners
    this.#currencySelect.addEventListener("change", event => this.#onCurrencyChange(event));
    this.#frequenciesParent.addEventListener("focusin", event => this.#onAmountFocusin(event));
    this.#frequenciesParent.addEventListener("input", event => this.#onAmountInput(event));
    this.#formParent.addEventListener("submit", event => this.#onFormSubmit(event));

    // replace placeholder with constructed form
    placeholder.replaceWith(this.#formParent);

    // set constructed testid for playwright tests
    this.#formParent.dataset.testid = "appeal-form-constructed";
  }

  #updateAmounts(currency) {
    let i = 0;
    for (const frequency in this.#paddleConfig.products[currency]) {
      for (const amount in this.#paddleConfig.products[currency][frequency]) {
        const amountControl = this.#amountControls[i++];
        if (amount == "custom") {
          const amountInput = amountControl.querySelector(".appeal-form-amount__input");
          amountInput.placeholder = toDollarString(currency, Object.keys(this.#paddleConfig.products[currency][frequency])[3]);
          amountInput.min = toDollarNumber(currency, this.#paddleConfig.products[currency][frequency][amount]);
        } else {
          amountControl.querySelector(".appeal-form-amount__text").textContent = toDollarString(currency, amount);
          const amountRadio = amountControl.querySelector(".appeal-form-amount__radio");
          amountRadio.value = amount;
          amountRadio.dataset.product = this.#paddleConfig.products[currency][frequency][amount];
        }
      }
    }
  }

  #onCurrencyChange(event) {
    const inputValues = Array.from(this.#frequenciesParent.querySelectorAll(".appeal-form-amount__input")).map(element => element.value);
    const selectedRadio = Array.from(this.#frequenciesParent.querySelectorAll(".appeal-form-amount__radio")).find(element => element.checked);
    const selectedRadioIndex = Array.from(this.#frequenciesParent.querySelectorAll(".appeal-form-amount__radio")).findIndex(element => element.checked);
    this.#updateAmounts(event.currentTarget.value);
    this.#frequenciesParent.querySelectorAll(".appeal-form-amount__input").forEach((input, i) => input.value = inputValues[i]);
    this.#frequenciesParent.querySelectorAll(".appeal-form-amount__radio")[selectedRadioIndex].checked = true;
    if (selectedRadio.value == "custom") {
      this.#handleInputError(
        selectedRadio.parentElement.querySelector(".appeal-form-amount__input")
      );
    }
  }

  #handleInputError(target) {
    const targetValue = parseFloat(target.value);
    const targetMinimum = parseFloat(target.min);
    if (targetValue && targetValue < targetMinimum) {
      const minimumAmount = parseFloat(target.min);
      const numberFormat = new Intl.NumberFormat(
        getLanguage(), {
          style: "currency",
          currency: this.#currencySelect.value
      });
      this.#errorAlert.innerHTML = adblock.strings[`appeal-form__error--${target.dataset.frequency}`].replace(
        '<span class="amount"></span>',
        numberFormat.format(minimumAmount)
      );
      this.#errorAlert.hidden = false;
    } else {
      this.#errorAlert.hidden = true;
    }
  }

  #onAmountFocusin(event) {
    if (event.target.type == "number") {
      const radio = event.target.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");
      if (false == radio.checked) radio.checked = true;
    }
    if (event.target.type == "number" || event.target.type == "radio") {
      this.#handleInputError(event.target);
    }
  }

  #onAmountInput(event) {
    if (event.target.type == "number") {
      this.#handleInputError(event.target);
    }
  }

  #submitCallbacks = [];

  onSubmit(callback) {
    this.#submitCallbacks.push(callback);
  }

  #onFormSubmit(event) { 
    event.preventDefault();
    const currency = this.#currencySelect.value;
    let selected = this.#frequenciesParent.querySelector(":checked");
    let amount = selected.value;
    if (amount == "custom") {
      selected = selected.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input");
      amount = toCentsNumber(currency, parseFloat(selected.value));
    }
    const frequency = selected.dataset.frequency;
    const product = selected.dataset.product;
    this.#submitCallbacks.forEach(callback => callback({
      currency, 
      frequency, 
      amount, 
      product,
    }));
  }

  disable() {
    this.#formParent.classList.add("appeal-form--disabled");
    this.#formParent.querySelectorAll("input, button").forEach(field => { field.disabled = true; });
  }

  enable() {
    this.#formParent.classList.remove("appeal-form--disabled");
    this.#formParent.querySelectorAll("input, button").forEach(field => { field.disabled = false; });
  }

}