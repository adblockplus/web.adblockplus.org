import { test, expect } from "playwright/test";
import { installedPaymentOptions } from "../static/installed/installedPaymentOptions";
import { checkoutConfig } from "../static/shared/checkoutConfig";
import { getAccountingNumber, getDollarNumber, getDollarString } from "../static/shared/currency";

const testDomain = process.env.TEST_DOMAIN = "http://localhost:8080";

const testEnvironment = process.env.TEST_ENVIRONMENT || "sandbox";

const defaultLanguage = process.env.DEFAULT_LANGUAGE || "en";

const defaultCurrency = process.env.DEFAULT_CURRENCY || "USD";

const defaultFrequency = process.env.DEFAULT_OPTION_FREQUENCY = "yearly";

const defaultOption = process.env.DEFAULT_OPTION_INDEX || 3;

const activeClassPatterns = {
  frequency: /installed-payment-frequency--active/,
  option: /installed-payment-option--active/,
};

async function gotoPage(page, language = "en") {
  const search = new URLSearchParams();
  if (testEnvironment == "sandbox") search.append("testmode", true);
  await page.goto(`${testDomain}/${language}/installed?${search.toString()}`);
}

let installedForm;

async function awaitInstalledForm(page) {
  installedForm = {
    form: await page.getByTestId("installed-payment"),
    currency: await page.getByTestId("installed-payment-currency"),
    frequencies: {
      yearly: await page.getByTestId("installed-payment-frequency--yearly"),
      monthly: await page.getByTestId("installed-payment-frequency--monthly"),
    },
    options: {
      yearly: [
        await page.getByTestId("installed-payment-option--yearly-1"),
        await page.getByTestId("installed-payment-option--yearly-2"),
        await page.getByTestId("installed-payment-option--yearly-3"),
        await page.getByTestId("installed-payment-option--yearly-4"),
        await page.getByTestId("installed-payment-option--yearly-5"),
        await page.getByTestId("installed-payment-option--yearly-6"),  
      ],
      monthly: [
        await page.getByTestId("installed-payment-option--monthly-1"),
        await page.getByTestId("installed-payment-option--monthly-2"),
        await page.getByTestId("installed-payment-option--monthly-3"),
        await page.getByTestId("installed-payment-option--monthly-4"),
        await page.getByTestId("installed-payment-option--monthly-5"),  
        await page.getByTestId("installed-payment-option--monthly-6"),
      ],
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

async function expectAmountsSelection(language, currency) {
  const fixedOptions = installedForm.options.yearly.slice(0, -1).concat(installedForm.options.monthly.slice(0, -1));
  for (let i = 0; i < fixedOptions.length; i++) {
    const amount = installedPaymentOptions[currency].amounts[i];
    await expect(fixedOptions[i]).toContainText(getDollarString(language, currency, amount));
  }
}

async function selectOption(frequency, option) {
  await installedForm.options[frequency][option].click();
}

async function fillOption(frequency, value) {
  await installedForm.options[frequency][5].fill(value);
}

function dollarStringToNumber(dollarString) {
  return getAccountingNumber(parseFloat(String(dollarString).replace(/\D/g, "").trim()));
}

async function getOptionValue(frequency, option) {
  return dollarStringToNumber(
    await installedForm.options[frequency][option][option == 5 ? "inputValue" : "textContent"]()
  );
}

async function expectOptionSelected(optionFrequency, optionIndex) {
  await expect(installedForm.options[optionFrequency][optionIndex]).toHaveClass(activeClassPatterns.option);
  await expect(installedForm.frequencies[optionFrequency]).toHaveClass(activeClassPatterns.frequency);
}

async function pressCheckoutButton() {
  await installedForm.submit.click();
}

async function expectInvalidForm() {
  await expect(installedForm.form.locator(":invalid")).toHaveCount(1);
}

let paddleForm;

async function awaitPaddleForm(page) {
  let frame = await page.frameLocator('iframe[name="paddle_frame"]');
  paddleForm = {
    frame,
    item: await frame.getByTestId("cart-item-name"),
    frequency: await frame.getByTestId("summary-total-trial-or-recurring"),
    prices: await frame.getByTestId("price-summary"),
    close: await frame.getByTestId("wideOverlayCloseIcon"),
  };
}

async function expectPaddleFormParams({ language, title, currency, frequency, amount }) {
  const amountFormat = {currency, style: "currency", currencyDisplay: "narrowSymbol"};
  const formattedAmount = new Intl.NumberFormat(language, amountFormat).format(amount);
  await expect(paddleForm.item).toContainText(title);
  await expect(paddleForm.frequency).toContainText(frequency);
  await expect(paddleForm.prices).toContainText(formattedAmount);
}

async function closePaddleForm() {
  await paddleForm.close.click();
}

function getMinimumAmountForFrequency(currency, frequency) {
  return getDollarNumber(installedPaymentOptions[currency].minimums[frequency == "yearly" ? 0 : 1]);
}

async function testUserStory(page, { language, currency, frequency, option, fill }) {
  if (language == undefined) language = defaultLanguage;
  await gotoPage(page, language);
  await awaitInstalledForm(page);
  if (currency != undefined) await selectCurrency(currency)
  else currency = defaultCurrency;
  await expectCurrencySelected(currency);
  await expectAmountsSelection(language, currency);
  if (frequency == undefined) frequency = defaultFrequency;
  if (option != undefined) await selectOption(frequency, option);
  else option = defaultOption;
  await expectOptionSelected(frequency, option);
  if (fill != undefined) fillOption(frequency, fill);
  await pressCheckoutButton();
  if (fill != undefined && fill < getMinimumAmountForFrequency(currency, frequency)) {
    await expectInvalidForm();
  } else {
    const title = checkoutConfig.products.contribution.title;
    const amount = await getOptionValue(frequency, option);
    await awaitPaddleForm(page);
    await expectPaddleFormParams({language, title, currency, frequency, amount});
    await closePaddleForm();
  }
}

const coreLanguages = ["ar", "de", "el", "es", "fr", "hu", "it", "ja", "ko", "nl", "pl", "pt_BR", "ru", "tr", "zh_CN"]

for (const language of coreLanguages) {
  for (const currency in installedPaymentOptions) {
    const { amounts, minimums } = installedPaymentOptions[currency];
    for (let i = 0; i < amounts.length; i++) {
      const option = i >= 5 ? i - 5 : i;
      const frequency = i >= 5 ? "monthly" : "yearly";
      const amount = amounts[i];
      test(`${testDomain} / ${testEnvironment} / ${language} / ${currency} / ${frequency} / ${option} / ${amount}`, async ({page}) => {
        await testUserStory(page, {language, currency, frequency, option});
      });
    }
    for (let i = 0; i < minimums.length; i++) {
      const option = i == 1 ? 10 : 5;
      const frequency = i == 1 ? "monthly" : "yearly";
      const minimum = minimums[i];
      // loop array of over, on, and under
      test(`${testDomain} / ${testEnvironment} / ${language} / ${currency} / ${frequency} / ${option} / ${fill}`, async ({page}) => {
        await testUserStory(page, {language, currency, frequency, option});
      });
    }
  }  
}

// test("default", async ({page}) => {
//   await testUserStory(page, {
//     currency: "GBP",
//     option: 5,
//     fill: "10"
//   });
// });