/* global adblock */

const formTemplate = document.getElementById("appeal-form");
const frequencyTemplate = document.getElementById("appeal-form-frequency");
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
  const dollars = toDollarNumber(currency, cents);
  const longFormat = { style: "currency", currency: currency }
  const shortFormat = Object.assign({}, longFormat, { notation: "compact" });
  const outputFormat = Number.isInteger(dollars) ? shortFormat : longFormat;
  return new Intl.NumberFormat(getLanguage(), outputFormat).format(dollars);
}

export class AppealForm {

  #paddleConfiguration;

  #formConfiguration;

  #form;

  #currencySelect;

  #frequencies;

  #error;

  constructor({placeholder, paddleConfiguration, formConfiguration}) {
    this.#paddleConfiguration = paddleConfiguration;
    this.#formConfiguration = formConfiguration;
    this.#constructForm()
    this.#constructCurrencies();
    this.#constructFrequencies();
    this.#error = this.#form.querySelector(".appeal-form__error");
    placeholder.replaceWith(this.#form);
  }

  #constructForm() {
    this.#form = formTemplate.content.cloneNode(true).firstElementChild;
    this.#form.querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    this.#form.querySelector(".appeal-form-checkout__submit span").innerHTML = adblock.strings["appeal-form-checkout__submit"]
    this.#form.addEventListener("submit", event => this.#onSubmit(event));
  }

  #constructCurrencies() {
    this.#currencySelect = this.#form.querySelector(".appeal-form-header__select");
    for (const currency in this.#paddleConfiguration.products) {
      const option = document.createElement("option");
      option.textContent = currency;
      this.#currencySelect.appendChild(option);
    }
    this.#currencySelect.value = this.#formConfiguration.currency;
    this.#currencySelect.addEventListener("change", event => this.#onCurrencyChange(event));
  }

  #constructFrequencies() {
    this.#frequencies = this.#form.querySelector(".appeal-form-frequencies");
    this.#replaceFrequencies(this.#formConfiguration.currency);
    this.#frequencies.querySelectorAll(".appeal-form-amount__radio")[this.#formConfiguration.selected].checked = true;
    this.#frequencies.addEventListener("focusin", event => this.#onAmountFocusin(event));
    this.#frequencies.addEventListener("input", event => this.#handleAmountInput(event));
  }

  #replaceFrequencies(currency) {
    const frequencies = [];
    for (const frequency in this.#paddleConfiguration.products[currency]) {
      const frequencySection = frequencyTemplate.content.cloneNode(true).firstElementChild;
      frequencySection.querySelector(".appeal-form-frequency__heading").innerHTML = adblock.strings[`appeal-form-frequency__heading--${frequency}`];
      const amountsParent = frequencySection.querySelector(".appeal-form-amounts");
      for (const amount in this.#paddleConfiguration.products[currency][frequency]) {
        if (amount == "custom") {
          const customAmount = customAmountTemplate.content.cloneNode(true).firstElementChild;
          const input = customAmount.querySelector(".appeal-form-amount__input");
          input.placeholder = toDollarString(currency, Object.keys(this.#paddleConfiguration.products[currency][frequency])[3]);
          input.min = toDollarNumber(currency, this.#paddleConfiguration.products[currency][frequency][amount]);
          input.dataset.frequency = frequency;
          input.dataset.product = "custom";
          amountsParent.appendChild(customAmount);
        } else {
          const fixedAmount = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
          fixedAmount.querySelector(".appeal-form-amount__text").textContent = toDollarString(currency, amount);
          const radio = fixedAmount.querySelector(".appeal-form-amount__radio");
          radio.value = amount;
          radio.dataset.frequency = frequency;
          radio.dataset.product = this.#paddleConfiguration.products[currency][frequency][amount];
          amountsParent.appendChild(fixedAmount);
        }
      }
      frequencies.push(frequencySection);
    }
    this.#frequencies.replaceChildren(...frequencies);
  }

  #onCurrencyChange(event) {
    const inputValues = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__input")).map(element => element.value);
    const selectedRadio = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__radio")).find(element => element.checked);
    const selectedRadioIndex = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__radio")).findIndex(element => element.checked);
    this.#replaceFrequencies(event.currentTarget.value);
    this.#frequencies.querySelectorAll(".appeal-form-amount__input").forEach((input, i) => input.value = inputValues[i]);
    this.#frequencies.querySelectorAll(".appeal-form-amount__radio")[selectedRadioIndex].checked = true;
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
      this.#error.innerHTML = adblock.strings[`appeal-form__error--${target.dataset.frequency}`].replace(
        '<span class="amount"></span>',
        numberFormat.format(minimumAmount)
      );
      this.#error.hidden = false;
    } else {
      this.#error.hidden = true;
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

  #handleAmountInput(event) {
    if (event.target.type == "number") {
      this.#handleInputError(event.target);
    }
  }

  #submitCallbacks = [];

  onSubmit(callback) {
    this.#submitCallbacks.push(callback);
  }

  #onSubmit(event) { 
    event.preventDefault();
    const currency = this.#currencySelect.value;
    let selected = this.#frequencies.querySelector(":checked");
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
    this.#form.classList.add("appeal-form--disabled");
    this.#form.querySelectorAll("input, button").forEach(field => { field.disabled = true; });
  }

  enable() {
    this.#form.classList.remove("appeal-form--disabled");
    this.#form.querySelectorAll("input, button").forEach(field => { field.disabled = false; });
  }

}