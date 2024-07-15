import { test, expect } from "playwright/test";
import { formatAmount } from "./shared/currency";
import { expectPaddlePresents } from "./shared/paddle";
import { getNumber, getDollarNumber } from "../static/shared/currency";
import { PaymentOptions } from "../static/installed/PaymentOptions";
import { checkoutConfig } from "../static/shared/checkoutConfig";

const TEST_HOST = process.env.TEST_HOST = "http://localhost:8080";

const TEST_PAGE = process.env.TEST_PAGE = "installed";

const PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || "sandbox";

const TRANSLATED_LOCALES = process.env.TRANSLATED_LOCALES
|| ["ar", "de", "el", "es", "fr", "hu", "it", "ja", "ko", "nl", "pl", "pt_BR", "ru", "tr", "zh_CN"];

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || "en";

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "USD";

const DEFAULT_FREQUENCY = process.env.DEFAULT_OPTION_FREQUENCY = "yearly";

const DEFAULT_FIXED_OPTION = process.env.DEFAULT_FIXED_OPTION || 3;

const currencies = Object.keys(PaymentOptions);

const frequencies = Object.keys(PaymentOptions.USD.minimums);

/** classname patterns that can be used to determine an (option|frequency) selection */
const SELECTION_PATTERNS = {
  frequency: /installed-payment-frequency--active/,
  option: /installed-payment-option--active/,
};

function getFixedAmount(currency, frequency, option) {
  return PaymentOptions[currency].amounts[frequency][option];
}

function getCustomMinimum(currency, frequency) {
  return PaymentOptions[currency].minimums[frequency];
}

async function gotoPage(page, locale = "en") {
  const search = new URLSearchParams();
  if (PADDLE_ENVIRONMENT == "sandbox") search.append("testmode", true);
  await page.goto(`${TEST_HOST}/${locale}/${TEST_PAGE}?${search.toString()}`);
}

let installedForm;

// We can wait for key elements and refer to them via object (installedForm)
// CAUTION: This wouldn't work if key elements were added and removed
async function awaitInstalledForm(page) {
  installedForm = {
    form: await page.getByTestId("installed-payment"),
    currency: await page.getByTestId("installed-payment-currency"),
    frequencies: {
      yearly: await page.getByTestId("installed-payment-frequency--yearly"),
      monthly: await page.getByTestId("installed-payment-frequency--monthly"),
    },
    fixedOptions: {
      yearly: [
        await page.getByTestId("installed-payment-option--yearly-1"),
        await page.getByTestId("installed-payment-option--yearly-2"),
        await page.getByTestId("installed-payment-option--yearly-3"),
        await page.getByTestId("installed-payment-option--yearly-4"),
        await page.getByTestId("installed-payment-option--yearly-5"),
      ],
      monthly: [
        await page.getByTestId("installed-payment-option--monthly-1"),
        await page.getByTestId("installed-payment-option--monthly-2"),
        await page.getByTestId("installed-payment-option--monthly-3"),
        await page.getByTestId("installed-payment-option--monthly-4"),
        await page.getByTestId("installed-payment-option--monthly-5"),
      ],
    },
    customOptions: {
      yearly: await page.getByTestId("installed-payment-option--yearly-6"),
      monthly: await page.getByTestId("installed-payment-option--monthly-6"),
    },
    submit: await page.getByTestId("installed-payment-checkout"),
    reward: await page.getByTestId("installed-payment-reward"),
  };
}

async function selectCurrency(currency) {
  await installedForm.currency.selectOption(currency);
}

async function expectCurrencySelected(currency) {
  await expect(installedForm.currency).toHaveValue(currency);
}

async function expectFixedAmountSelection(page, locale, currency) {
  for (const frequency in installedForm.fixedOptions) {
    installedForm.fixedOptions[frequency].forEach(async (fixedOptionButton, optionIndex) => {
      const centAmount = getFixedAmount(currency, frequency, optionIndex);
      const dollarString = await formatAmount(page, {locale, currency, centAmount, narrowSymbol: true});
      await expect(fixedOptionButton).toContainText(dollarString);
    });
  }
}

async function selectFixedOption(frequency, option) {
  await installedForm.fixedOptions[frequency][option].click();
}

async function expectFixedOptionSelected(frequency, option) {
  await expect(installedForm.fixedOptions[frequency][option]).toHaveClass(SELECTION_PATTERNS.option);
}

async function selectCustomOption(frequency) {
  await installedForm.customOptions[frequency].click();
}

async function fillCustomOption(frequency, value) {
  await installedForm.customOptions[frequency].fill(value);
}

async function expectCustomOptionSelected(frequency) {
  await expect(installedForm.customOptions[frequency]).toHaveClass(SELECTION_PATTERNS.option);
}

async function expectFrequencySelected(frequency) {
  await expect(installedForm.frequencies[frequency]).toHaveClass(SELECTION_PATTERNS.frequency);
}

async function pressCheckoutButton() {
  await installedForm.submit.click();
}

async function expectInvalidForm() {
  await expect(installedForm.form.locator(":invalid")).toHaveCount(1);
}

async function getFixedOptionValue(frequency, option) {
  return getNumber(await installedForm.fixedOptions[frequency][option].textContent());
}

async function getCustomOptionValue(frequency) {
  return getNumber(await installedForm.customOptions[frequency].inputValue())
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function expectResults(page, {currency, frequency, option, dollarAmount}) {
  if (option == 5 && dollarAmount < getCustomMinimum(currency, frequency)) {
    await expectInvalidForm();
  } else {
    await expectPaddlePresents(page, {
      title: checkoutConfig.plans.contribution.title,
      frequency,
      formattedAmount: formatAmount(page, {locale, currency, dollarAmount}),
    });
  }
}

async function testNoActions(page, locale) {
  const currency = DEFAULT_CURRENCY;
  await expectCurrencySelected(currency);
  await expectFixedAmountSelection(page, locale, currency);
  const frequency = DEFAULT_FREQUENCY;
  const option = DEFAULT_FIXED_OPTION;
  await expectFixedOptionSelected(frequency, option);
  dollarAmount = await getFixedOptionValue(frequency, option);
  await pressCheckoutButton();
  await expectResults(page, {currency, frequency, option, dollarAmount});
}

async function testStandardActions(page, {locale, currency, frequency, option, dollarAmount}) {
  if (locale == undefined) locale = DEFAULT_LOCALE;
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  if (currency != undefined) await selectCurrency(currency)
  else currency = DEFAULT_CURRENCY;
  await expectCurrencySelected(currency);
  await expectFixedAmountSelection(page, locale, currency);
  if (frequency == undefined) frequency = DEFAULT_FREQUENCY;
  if (option == 5) {
    await selectCustomOption(frequency);
    await expectCustomOptionSelected(frequency);
    await fillCustomOption(frequency, dollarAmount);
    dollarAmount = await getCustomOptionValue(frequency);
  } else {
    if (option != undefined) await selectFixedOption(frequency, fixedOption);
    else option = DEFAULT_FIXED_OPTION;
    await expectFixedOptionSelected(frequency, option);
    dollarAmount = await getFixedOptionValue(frequency, fixedOption);
  }
  await pressCheckoutButton();
  await expectResults(page, {currency, frequency, option, dollarAmount});
}

async function testRandomActions(page, locale, actions) {
  if (locale == undefined) locale = DEFAULT_LOCALE;
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  let currency, frequency, option, dollarAmount;
  for (let i = 0; i < actions; i++) {
    const action = getRandomNumber(0,2);
    if (action == 0) {
      currency = state.currency = currencies[getRandomNumber(0, currencies.length - 1)];
      await selectCurrency(currency);
    } else if (action == 1) {
      frequency = frequencies[getRandomNumber(0,1)];
      option = getRandomNumber(0,4);
      await selectFixedOption(frequency, option);
    } else {
      dollarAmount = getDollarNumber(currency, getRandomNumber(0, 900100));
      await fillCustomOption(frequency, dollarAmount);
    }
  }
  await pressCheckoutButton();
  await expectResults(page, {currency, frequency, option, dollarAmount});
}

test("default", async ({page}) => {
  await testUserStory(page, {
    locale: "en",
    currency: "USD",
    frequency: "yearly",
    fixedOption: 0
  });
});