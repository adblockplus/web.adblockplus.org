/* global Paddle, adblock */
import { getDollarString, getDollarNumber, getCentNumber } from "../shared/currency.js";
import { PaymentOptions, getInstalledAmount, getInstalledMinimum } from "./PaymentOptions.js";
import { checkout } from "../shared/checkout.js";

const LOCALE_BREAKPOINT = 8;
const CURRENCY_BREAKPOINT = 5;

const paymentForm = document.querySelector(".installed-payment");
const currencySelect = document.querySelector(".installed-payment-currency__select");
const optionButtons = document.querySelectorAll(".installed-payment-option");
const monthlyFixedOptionButtons = document.querySelectorAll(".installed-payment-frequency--monthly .installed-payment-option--fixed");
const yearlyFixedOptionButtons = document.querySelectorAll(".installed-payment-frequency--yearly .installed-payment-option--fixed");
const monthlyCustomOptionButton = document.querySelector(".installed-payment-frequency--monthly .installed-payment-option--custom");
const yearlyCustomOptionButton = document.querySelector(".installed-payment-frequency--yearly .installed-payment-option--custom");
const rewardText = document.querySelector(".payment-reward__text");
const checkoutButton = document.querySelector(".installed-payment-checkout__button");

// apply form presentation modifier if the translated placeholder text exceeds the length of the custom amount field
if (yearlyCustomOptionButton.placeholder.length > LOCALE_BREAKPOINT) 
  paymentForm.classList.add("installed-payment--long-locale");

// populate currencies, select default currency, and reference the selected currency
currencySelect.innerHTML = "";
for (const currency in PaymentOptions) {
  const option = document.createElement("option");
  option.textContent = currency;
  currencySelect.appendChild(option);
}
let selectedCurrency = currencySelect.value = adblock.settings.defaultCurrency || "USD";

let selectedOption = document.querySelector(".installed-payment-option--active");

function updateReward() {
  const amount = selectedOption.dataset.amount // fixed amount
    || getCentNumber(selectedCurrency, selectedOption.value); // custom amount
  if (amount) { // don't update the reward when the custom amount is empty
    rewardText.innerHTML = adblock.strings["payment-reward"].replace(
      `<span>35.00</span>`, 
      `<span class="amount">${getDollarString(adblock.settings.locale, selectedCurrency, amount)}</span>`
    );
  }
}

function getCurrencySign(string) {
  return string.replace(/[\d,]/g, "").trim();
}

function handleCurrencyChange() {
  let isLongCurrency = false;
  selectedCurrency = currencySelect.value;
  function updateFixedOptionButton(optionButton, index) {
    const centAmountNumber = getInstalledAmount(selectedCurrency, optionButton.dataset.frequency, index);
    const dollarAmountString = getDollarString(adblock.settings.locale, selectedCurrency, centAmountNumber);
    optionButton.textContent = dollarAmountString;
    optionButton.dataset.amount = centAmountNumber;
    if (dollarAmountString.length > CURRENCY_BREAKPOINT) isLongCurrency = true;
  }
  monthlyFixedOptionButtons.forEach(updateFixedOptionButton);
  yearlyFixedOptionButtons.forEach(updateFixedOptionButton);
  function updateCustomOptionButton(optionButton) {
    optionButton.dataset.min = getInstalledMinimum(selectedCurrency, optionButton.dataset.frequency);
    // update custom option minimum if custom option is selected
    if (optionButton.classList.contains("installed-payment-option--active")) {
      optionButton.min = getDollarNumber(selectedCurrency, optionButton.dataset.min);
    }
  }
  updateCustomOptionButton(yearlyCustomOptionButton);
  updateCustomOptionButton(monthlyCustomOptionButton);
  // apply form presentation modifier if the localised dollar amount text exceeds the length of the fixed option buttons
  paymentForm.classList[isLongCurrency ? "add" : "remove"]("installed-payment--long-currency");
  const customText = adblock.strings["installed-payment-option--custom"].replace("$", getCurrencySign(monthlyFixedOptionButtons[0].textContent));
  yearlyCustomOptionButton.placeholder = customText;
  monthlyCustomOptionButton.placeholder = customText;
  updateReward();
}
currencySelect.addEventListener("change", handleCurrencyChange);
handleCurrencyChange();

function onOptionSelect(optionButton) {
  selectedOption = optionButton;
  const lastFrequency = document.querySelector(".installed-payment-frequency--active");
  const nextFrequency = selectedOption.closest(".installed-payment-frequency");
  if (nextFrequency != lastFrequency) {
    lastFrequency.classList.remove("installed-payment-frequency--active");
    nextFrequency.classList.add("installed-payment-frequency--active");
  }
  const lastOption = document.querySelector(".installed-payment-option--active");
  if (selectedOption != lastOption) {
    lastOption.classList.remove("installed-payment-option--active");
    selectedOption.classList.add("installed-payment-option--active");
  }
  if (lastOption.classList.contains("installed-payment-option--custom")) {
    lastOption.removeAttribute("min");
    lastOption.required = false;
  }
  if (selectedOption.classList.contains("installed-payment-option--custom")) {
    selectedOption.min = getDollarNumber(selectedCurrency, selectedOption.dataset.min);
    selectedOption.required = true;
  }
  updateReward();
}
optionButtons.forEach(optionButton =>  optionButton.addEventListener("focus", () => onOptionSelect(optionButton)));
yearlyCustomOptionButton.addEventListener("input", updateReward);
monthlyCustomOptionButton.addEventListener("input", updateReward);

const enable = element => { element.disabled = false; };  
const disable = element => { element.disabled = true; };

function onSubmit(event) {
  event.preventDefault();
  optionButtons.forEach(disable);
  disable(checkoutButton);
  checkout({
    plan: "contribution",
    currency: selectedCurrency,
    frequency: selectedOption.dataset.frequency,
    amount: selectedOption.dataset.amount || getCentNumber(selectedCurrency, selectedOption.value), // fixed || custom
  })
  .finally(() => {
    optionButtons.forEach(enable);
    enable(checkoutButton);  
  });
}

paymentForm.addEventListener("submit", onSubmit);