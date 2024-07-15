import { test, expect } from "playwright/test";
import { formatAmount } from "./shared/currency";
import { expectPaddlePresents } from "./shared/paddle";
import { getNumber } from "../static/shared/currency";
import { InstalledPaymentOptions } from "../static/installed/InstalledPaymentOptions";
import { checkoutConfig } from "../static/shared/checkoutConfig";

const TEST_DOMAIN = process.env.TEST_DOMAIN = "http://localhost:8080";

const PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || "sandbox";

const TRANSLATED_LOCALES = process.env.TRANSLATED_LOCALES
|| ["ar", "de", "el", "es", "fr", "hu", "it", "ja", "ko", "nl", "pl", "pt_BR", "ru", "tr", "zh_CN"];

const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || "en";

const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "USD";

const DEFAULT_FREQUENCY = process.env.DEFAULT_OPTION_FREQUENCY = "yearly";

const DEFAULT_FIXED_OPTION = process.env.DEFAULT_FIXED_OPTION || 3;

/** classname patterns that can be used to determine an (option|frequency) selection */
const SELECTION_PATTERNS = {
  frequency: /installed-payment-frequency--active/,
  option: /installed-payment-option--active/,
};

function getFixedAmount(currency, frequency, option) {
  return InstalledPaymentOptions[currency].amounts[frequency][option];
}

function getCustomMinimum(currency, frequency) {
  return InstalledPaymentOptions[currency].minimums[frequency];
}

async function gotoPage(page, locale = "en") {
  const search = new URLSearchParams();
  if (PADDLE_ENVIRONMENT == "sandbox") search.append("testmode", true);
  await page.goto(`${TEST_DOMAIN}/${locale}/installed?${search.toString()}`);
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

async function testUserStory(page, {locale, currency, frequency, fixedOption, customDollarAmount}) {
  if (fixedOption != undefined && customDollarAmount != undefined) throw new Error("testUserStory() requires {fixedOption OR customAmount, NOT BOTH}");
  if (locale == undefined) locale = DEFAULT_LOCALE;
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  if (currency != undefined) await selectCurrency(currency)
  else currency = DEFAULT_CURRENCY;
  await expectCurrencySelected(currency);
  await expectFixedAmountSelection(page, locale, currency);
  if (frequency == undefined) frequency = DEFAULT_FREQUENCY;
  let dollarAmount;
  if (customDollarAmount != undefined) {
    await selectCustomOption(frequency);
    await expectCustomOptionSelected(frequency);
    await fillCustomOption(frequency, customDollarAmount);
    dollarAmount = await getCustomOptionValue(frequency);
  } else {
    if (fixedOption != undefined) await selectFixedOption(frequency, fixedOption);
    if (fixedOption == undefined && customDollarAmount == undefined) fixedOption = DEFAULT_FIXED_OPTION;
    await expectFixedOptionSelected(frequency, fixedOption);
    dollarAmount = await getFixedOptionValue(frequency, fixedOption);
  }
  await pressCheckoutButton();
  const title = checkoutConfig.plans.contribution.title;
  const minimumDollarAmount = getCustomMinimum(currency, frequency);
  const formattedAmount = await formatAmount(page, {locale, currency, dollarAmount});
  if (customDollarAmount != undefined && dollarAmount < minimumDollarAmount) {
    await expectInvalidForm();
  } else {
    await expectPaddlePresents(page, {title, currency, frequency, formattedAmount});
  }
}

test("default", async ({page}) => {
  await testUserStory(page, {
    locale: "en",
    currency: "USD",
    frequency: "yearly",
    fixedOption: 0
  });
});