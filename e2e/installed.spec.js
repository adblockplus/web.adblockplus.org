import { test, expect } from "playwright/test";
import { formatAmount } from "./shared/currency";
import { expectPaddlePresents } from "./shared/paddle";
import { getNumber, getDollarNumber } from "../static/shared/currency";
import { PaymentOptions, getInstalledAmount, getInstalledMinimum } from "../static/_installed/PaymentOptions";
import { checkoutConfig } from "../static/shared/checkoutConfig";

const TEST_HOST = process.env.TEST_HOST || "https://adblockplus.org";
const TEST_PAGE = process.env.TEST_PAGE || "_installed";
const TEST_LOCALES = (process.env.TEST_LOCALES || "en").split(",");

const PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || "sandbox";
const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || "GBP";
const DEFAULT_FREQUENCY = process.env.DEFAULT_OPTION_FREQUENCY = "yearly";
const DEFAULT_OPTION = process.env.DEFAULT_OPTION || 3;

const MINIMUM_AMOUNT = 0.01;
const ACCEPTABLE_AMOUNT = 9001;

const randomActions = Array(100).map(() => getRandomNumber(0, 20));
const currencies = Object.keys(PaymentOptions);
const frequencies = Object.keys(PaymentOptions.USD.minimums);

/** classname patterns that can be used to determine an (option|frequency) selection */
const SELECTION_PATTERNS = {
  frequency: /installed-payment-frequency--active/,
  option: /installed-payment-option--active/,
};

async function gotoPage(page, locale) {
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
      const centAmount = getInstalledAmount(currency, frequency, optionIndex);
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
  await installedForm.customOptions[frequency].fill(String(value));
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

async function expectResults(page, {locale, currency, frequency, option, dollarAmount}) {
  if (option == 5 && dollarAmount < getInstalledMinimum(currency, frequency)) {
    await expectInvalidForm();
  } else {
    await expectPaddlePresents(page, {
      title: checkoutConfig.plans.contribution.title,
      frequency,
      formattedAmount: await formatAmount(page, {locale, currency, dollarAmount}),
    });
  }
}

async function testNoActions(page, locale) {
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  const currency = DEFAULT_CURRENCY;
  await expectCurrencySelected(currency);
  await expectFixedAmountSelection(page, locale, currency);
  const frequency = DEFAULT_FREQUENCY;
  const option = DEFAULT_OPTION;
  await expectFixedOptionSelected(frequency, option);
  const dollarAmount = await getFixedOptionValue(frequency, option);
  await pressCheckoutButton();
  await expectResults(page, {locale, currency, frequency, option, dollarAmount});
}

async function testStandardActions(page, {locale, currency, frequency, option, dollarAmount}) {
  if (option != undefined && dollarAmount != undefined) throw new Error("testStandardActions() requires {option or dollarAmount, not both}")
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  if (currency != undefined) await selectCurrency(currency)
  else currency = DEFAULT_CURRENCY;
  await expectCurrencySelected(currency);
  await expectFixedAmountSelection(page, locale, currency);
  if (frequency == undefined) frequency = DEFAULT_FREQUENCY;
  if (dollarAmount) option = 5;
  if (option == 5) {
    await selectCustomOption(frequency);
    await expectCustomOptionSelected(frequency);
    await fillCustomOption(frequency, dollarAmount);
    dollarAmount = await getCustomOptionValue(frequency);
  } else {
    if (option != undefined) await selectFixedOption(frequency, option);
    else option = DEFAULT_OPTION;
    await expectFixedOptionSelected(frequency, option);
    dollarAmount = await getFixedOptionValue(frequency, option);
  }
  await pressCheckoutButton();
  await expectResults(page, {locale, currency, frequency, option, dollarAmount});
}

async function testRandomActions(page, {locale, actions}) {
  await gotoPage(page, locale);
  await awaitInstalledForm(page);
  let currency = DEFAULT_CURRENCY;
  let frequency = DEFAULT_FREQUENCY;
  let option = DEFAULT_OPTION;
  let dollarAmount;
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
      frequency = frequencies[getRandomNumber(0,1)];
      await fillCustomOption(frequency, getDollarNumber(currency, getRandomNumber(0, 900100)));
    }
  }
  await pressCheckoutButton();
  if (option == 5) dollarAmount = await getCustomOptionValue(frequency);
  else dollarAmount = await getFixedOptionValue(frequency, option);
  await expectResults(page, {locale, currency, frequency, option, dollarAmount});
}

for (const locale of TEST_LOCALES) {

  const noActionParams = {test: "no actions", locale};
  test(JSON.stringify(noActionParams), async ({page}) => {
    await testNoActions(page, locale);
  });

  for (const currency in PaymentOptions) {
    for (const frequency in PaymentOptions[currency].amounts) {

      for (let option = 0; option < PaymentOptions[currency].amounts[frequency].length; option++) {
        const fixedOptionParams = {test: "fixed option selection", locale, currency, frequency, option};
        test(JSON.stringify(fixedOptionParams), async ({page}) => {
          await testStandardActions(page, fixedOptionParams);
        });
      }

      const customBelowParams = {test: "custom amount below min", dollarAmount: MINIMUM_AMOUNT, locale, currency, frequency};
      test(JSON.stringify(customBelowParams), async ({page}) => {
        await testStandardActions(page, customBelowParams);
      });

      const customBetweenParams = {test: "custom amount between min and max", dollarAmount: ACCEPTABLE_AMOUNT, locale, currency, frequency};
      test(JSON.stringify(customBetweenParams), async ({page}) => {
        await testStandardActions(page, customBelowParams);
      });

      // const customAboveParams = {test: "custom amount above max", dollarAmount: MAXIMUM_AMOUNT, locale, currency, frequency};
      // test(JSON.stringify(customAboveParams), async ({page}) => {
      //   await testStandardActions(page, customAboveParams);
      // });

    }
  }

  for (let iteration = 0; iteration < 100; iteration++) {
    const randomTestParams = {test: "random actions", iteration, locale, actions: randomActions[iteration]};
    test(JSON.stringify(randomTestParams), async ({page}) => {
      await testRandomActions(page, randomTestParams);
    });
  }

 }