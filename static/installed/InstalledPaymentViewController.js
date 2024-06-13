class CurrencySelect extends adblock.lib.Events {

  constructor({parentElement, defaultCurrency, currencies}) {
    this.element = parentElement.querySelector(".installed-payment-currency__select");
    this.element.innerHTML = "";  
    for (const currency in currencies) {
      const option = document.createElement("option");
      option.textContent = currency;
      this.element.appendChild(option);
    }
    this.element.value = defaultCurrency;
    this.element.addEventListener("change", () => this.fire("change", this.value));
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }

}

class OptionButton extends adblock.lib.Events {

  constructor({element, currency, amount}) {
    this.element = element;
    this.setAmount(currency, amount);
    this.element.addEventListener("click", () => this.fire("press", {
      amount: this.getAmount(), 
      frequency: this.getFrequency()
    }));
  }

  setActive() {
    this.element.classList.add("installed-payment-option--active");
  }

  isActive() {
    return this.element.classList.contains("installed-payment-option--active");
  }

  getAmount() {
    return this.element.dataset.amount;
  }

  setAmount(currency, amount) {
    const amountString = getDollarString(adblock.settings.language, currency, amount);
    this.element.textContent = amountString;
    this.element.dataset.amount = amount;
  }

  getTextLength() {
    return this.element.textContent.length;
  }

  getFrequency() {
    return this.element.dataset.frequency;
  }

}

class OptionInput extends adblock.lib.Events {

  constructor({element, currency, amount}) {
    this.element = element;
    this.setAmount(currency, amount);
    this.element.addEventListener("click", () => this.fire("press", {
      amount: this.getAmount(), 
      frequency: this.getFrequency()
    }));
  }

  setMinimum(currency, minimum) {
    this.element.dataset.min = minimum;
  }

  getAmount() {
    return this.element.dataset.amount;
  }

  getAmountLength() {
    return this.element.textContent.length;
  }

  setAmount(currency, amount) {
    const amountString = getDollarString(adblock.settings.language, currency, amount);
    this.element.textContent = amountString;
    this.element.dataset.amount = amount;
  }

  getFrequency() {
    return this.element.dataset.frequency;
  }

}