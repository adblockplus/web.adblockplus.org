import { test, expect } from "@playwright/test";
import { defaultLanguage, languages, toIntlLanguage } from "../languages.js";
import { url } from "../url.js";
import { readFileSync } from "fs";
import ELEMENTS from "./elements.js";
import { PRODUCTS, CURRENCIES, DEFAULT_CURRENCY, FREQUENCIES } from "./products.js";
import { toDollarNumber, toDollarString } from "./amounts.js";

test.beforeEach(async ({ page }) => {
  await page.goto(url(defaultLanguage, "appeal"));
  await page.getByTestId("appeal-form-constructed");
});

test("All ELEMENTS must be located on page", async ({ page }) => {
  for (const id of Object.values(ELEMENTS)) {
    const missingError = `${id} element is missing`;
    await expect(await page.getByTestId(id), missingError).toHaveCount(1);
  }
});

test("All configured currency > frequency > amounts must be locateable on page", async ({ page }) => {

  const getConfiguredAmounts = (currency, frequency) =>  Object.keys(PRODUCTS[currency][frequency]);

  const getConfiguredPlaceholder = (currency, frequency) => Object.keys(PRODUCTS[currency][frequency])[3];

  const getAmountLabel = async (frequency, amountNumber) => await page.getByTestId(`appeal-form-amount__radio--${frequency}-${amountNumber}`).locator("..").locator(".appeal-form-amount__text");

  const getAmountInput = async (frequency, amountNumber) => await page.getByTestId(`appeal-form-amount__radio--${frequency}-${amountNumber}`).locator("..").locator(".appeal-form-amount__input");

  const currencySelect = await page.getByTestId(ELEMENTS.currencySelect);

  for (const currency of CURRENCIES) {
    await currencySelect.selectOption(currency);
    for (const frequency of FREQUENCIES) {
      let amountNumber = 0;
      for (const amount of getConfiguredAmounts(currency, frequency)) {
        let expectation, reality;
        if (amount == "custom") {
          const input = await getAmountInput(frequency, amountNumber);
          expectation = toDollarNumber(currency, parseFloat(getConfiguredPlaceholder(currency, frequency)));
          reality = parseFloat(await input.getAttribute("placeholder"));
        } else {
          const label = await getAmountLabel(frequency, amountNumber);
          expectation = toDollarString(defaultLanguage, currency, amount);
          reality = await label.textContent();
        }
        const amountOrLocalisationError = `Amount ${amountNumber} { expectation: ${expectation}, reality: ${reality} }`;
        // expect.soft() because browser Intl and node Intl may not agree on how to localise an amount in a currency.
        // node and chrome don't agree about ar amounts at the time of writing (2023/04/24) and I think node is ahead.
        await expect.soft(reality, amountOrLocalisationError).toEqual(expectation);
        amountNumber = amountNumber + 1;
      }
    }
  }
});

test("All strings should be translated in select lanugages", async ({ browser }) => {

  const getTranslation = (translations, id) =>  translations[id] ? translations[id].message : "";

  const stripHTML = (input) =>  input.replaceAll(/<(.*?)>/gimu, "");

  async function testTranslation(locator, translations, translationId) {
    const expectation = stripHTML(getTranslation(translations, translationId));
    const reality = await stripHTML(await locator.innerHTML());
    const emptyError = `${translationId} element content is empty`;
    await expect(reality.length, emptyError).toBeGreaterThan(0);
    const untranslatedError = `${translationId} element content is untranslated`;
    // expect soft because we may choose to publish the component with incomplete translations
    await expect.soft(reality, untranslatedError).toContain(expectation);
  }

  for (const language of languages) {
    const context = await browser.newContext({ locale: toIntlLanguage(language) });
    const page = await context.newPage();
    await page.goto(url(language, "appeal"));    
    const translations = JSON.parse(readFileSync(`locales/${language}/payment-form.json`, { encoding: 'utf-8' }));
    const alwaysVisible = [
      "appeal-form-header__heading",
      "appeal-form-frequency__heading--once",
      "appeal-form-frequency__heading--monthly",
      "appeal-form-frequency__heading--yearly",
      "appeal-form-checkout__submit",
    ];
    for (const id of alwaysVisible) {
      await testTranslation(await page.getByTestId(id), translations, id);
    }
    const minimumAmountErrors = {
      "appeal-form-amount__input--once": "appeal-form__error--once",
      "appeal-form-amount__input--monthly": "appeal-form__error--monthly",
      "appeal-form-amount__input--yearly": "appeal-form__error--yearly",
    }
    const error = await page.getByTestId(ELEMENTS.errorMessage);
    for (const id in minimumAmountErrors) {
      const input = await page.getByTestId(id);
      await input.fill("0");
      await testTranslation(error, translations, id);
      await input.fill("");
      // expect soft because we may choose to publish the component with incomplete translations
      await expect.soft(error).toBeHidden();
    }
    // confirm checkout title passed to paddle displays in paddle checkout
    //
    // commented out because this test wouldn't pass for every language in succession because of paddle's security
    // we could choose to re-write it as a manual or delayed test to avoid paddle's security
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // await page.getByTestId(ELEMENTS.onceAmount1).click();
    // await page.getByTestId(ELEMENTS.checkoutButton).click();
    // await testTranslation(
    //   await page.mainFrame().frameLocator(".paddle-frame").getByTestId("cart-item"),
    //   translations,
    //   "appeal-form-checkout__title"
    // );
    await context.close();
  }
});

test("Minimum amount error should show when custom input is below minimum configured", async ({ page }) => {

  const onceAmount1 = await page.getByTestId(ELEMENTS.onceAmount1);
  const onceInput = await page.getByTestId(ELEMENTS.onceCustomInput);
  const onceRadio = await page.getByTestId(ELEMENTS.onceCustomRadio);
  const onceMinimum = PRODUCTS[DEFAULT_CURRENCY].once.custom;
  const monthlyInput = await page.getByTestId(ELEMENTS.monthlyCustomInput);
  const monthlyRadio = await page.getByTestId(ELEMENTS.monthlyCustomRadio);
  const monthlyMinimum = PRODUCTS[DEFAULT_CURRENCY].monthly.custom;
  const yearlyInput = await page.getByTestId(ELEMENTS.yearlyCustomInput);
  const yearlyRadio = await page.getByTestId(ELEMENTS.yearlyCustomRadio);
  const yearlyMinimum = PRODUCTS[DEFAULT_CURRENCY].yearly.custom;
  const checkoutButton = await page.getByTestId(ELEMENTS.checkoutButton);
  const errorMessage = await page.getByTestId(ELEMENTS.errorMessage);

  const expectError = async () => {
    await expect(errorMessage).toBeVisible();
    await expect(checkoutButton).toBeDisabled();
  }

  const expectNoError = async () => {
    await expect(errorMessage).toBeHidden();
    await expect(checkoutButton).toBeVisible();
  }

  const resetError = async (input) => {
    await input.fill("");
    await expectNoError();
  }

  const byFrequency = [
    [onceInput, onceRadio, onceMinimum],
    [monthlyInput, monthlyRadio, monthlyMinimum],
    [yearlyInput, yearlyRadio, yearlyMinimum]
  ];

  for (const [input, radio, minimum] of byFrequency) {
    await expectNoError(); // start without error

    await input.fill(String(toDollarNumber(DEFAULT_CURRENCY, minimum - 1)));
    await expectError(); // error after filling below minimum

    await input.fill(String(toDollarNumber(DEFAULT_CURRENCY, minimum)));
    await expectNoError(); // no error after filling minimum

    await resetError(input); // no error after filling empty

    await input.fill(String(toDollarNumber(DEFAULT_CURRENCY, minimum - 1)));
    await onceAmount1.click();
    await expectNoError(); // no error when input with amount below minimum is deselected

    await input.click();
    await expectError(); // error when input with amount below minimum is reselected via input click

    await onceAmount1.click();
    await expectNoError();
    await radio.click(); 
    await expectError() // error when input with amount below minimum is reselected via radio click

    await resetError(input);
  }
});