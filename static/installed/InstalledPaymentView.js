import { getDollarString, getDollarNumber, getCentNumber } from "../shared/currency.js";

export function InstalledPaymentView ({ parentElement, paymentOptions, defaultCurrency, submitCallback }) {
  
  const currencySelect = parentElement.querySelector(".installed-payment-currency__select");
  const optionButtons = parentElement.querySelectorAll(".installed-payment-option");
  const fixedOptionButtons = parentElement.querySelectorAll(".installed-payment-option--fixed");
  const customOptionButtons = parentElement.querySelectorAll(".installed-payment-option--custom");
  const rewardText = parentElement.querySelector(".payment-reward__text");
  const checkoutButton = parentElement.querySelector(".installed-payment-checkout__button");

  if (customOptionButtons[0].placeholder.length > 8) {
    parentElement.classList.add("installed-payment--long-language");
  }

  currencySelect.innerHTML = "";
  
  for (const currency in paymentOptions) {
    const option = document.createElement("option");
    option.textContent = currency;
    currencySelect.appendChild(option);
  }

  let selectedCurrency = currencySelect.value = defaultCurrency;

  let selectedOption = parentElement.querySelector(".installed-payment-option--active");
  
  function updateReward() {
    const amount = selectedOption.dataset.amount // fixed amount
      || getCentNumber(selectedCurrency, selectedOption.value); // custom amount
    if (amount) {
      rewardText.innerHTML = adblock.strings["payment-reward"].replace(
        `<span>35.00</span>`, 
        `<span class="amount">${getDollarString(adblock.settings.language, selectedCurrency, amount)}</span>`
      );
    }
  }

  function onCurrencyChange() {
    let isLongCurrency = false;
    selectedCurrency = currencySelect.value;
    fixedOptionButtons.forEach((optionButton, i) => {
      const amountNumber = paymentOptions[selectedCurrency].amounts[i];
      const amountString = getDollarString(adblock.settings.language, selectedCurrency, amountNumber);
      optionButton.textContent = amountString;
      optionButton.dataset.amount = amountNumber;
      if (amountString.length > 5) isLongCurrency = true;
    });
    customOptionButtons.forEach((optionInput, i) => {
      optionInput.dataset.min = paymentOptions[selectedCurrency].minimums[i];
      if (optionInput.classList.contains("installed-payment-option--active")) {
        selectedOption.min = getDollarNumber(selectedCurrency.value, selectedOption.dataset.min);
      }
    });
    if (isLongCurrency) {
      parentElement.classList.add("installed-payment--long-currency");
      if (selectedOption == fixedOptionButtons[2]) {
        onOptionSelect(fixedOptionButtons[3]);
      } else if (selectedOption == fixedOptionButtons[7]) {
        onOptionSelect(fixedOptionButtons[8]);
      }
    } else {
      parentElement.classList.remove("installed-payment--long-currency")
    }
    updateReward();
  }
  
  currencySelect.addEventListener("change", onCurrencyChange);

  onCurrencyChange();

  function onOptionSelect(optionButton) {
    selectedOption = optionButton;
    const lastFrequency = parentElement.querySelector(".installed-payment-frequency--active");
    const nextFrequency = selectedOption.closest(".installed-payment-frequency");
    if (nextFrequency != lastFrequency) {
      lastFrequency.classList.remove("installed-payment-frequency--active");
      nextFrequency.classList.add("installed-payment-frequency--active");
    }
    const lastOption = parentElement.querySelector(".installed-payment-option--active");
    if (selectedOption != lastOption) {
      lastOption.classList.remove("installed-payment-option--active");
      selectedOption.classList.add("installed-payment-option--active");
    }
    if (lastOption.tagName == "INPUT") {
      lastOption.removeAttribute("min");
      lastOption.required = false;
    }
    if (selectedOption.tagName == "INPUT") {
      selectedOption.min = getDollarNumber(selectedCurrency.value, selectedOption.dataset.min);
      selectedOption.required = true;
    }
    updateReward();
  }
  
  optionButtons.forEach(optionButton => {
    optionButton.addEventListener("focus", () => onOptionSelect(optionButton));
  });
  
  customOptionButtons.forEach(input => {
    input.addEventListener("input", () => updateReward());
  });

  const enable = element => { element.disabled = false; };  
  const disable = element => { element.disabled = true; };

  function onSubmit(event) {
    event.preventDefault();
    optionButtons.forEach(disable);
    disable(checkoutButton);  
    submitCallback({
      currency: selectedCurrency,
      frequency: selectedOption.dataset.frequency,
      amount: selectedOption.dataset.amount || getCentNumber(selectedCurrency, selectedOption.value),
    }).finally(() => {
      optionButtons.forEach(enable);
      enable(checkoutButton);  
    });
  }

  parentElement.addEventListener("submit", onSubmit);

}
