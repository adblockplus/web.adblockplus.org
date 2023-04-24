import { test, expect } from "@playwright/test";
import { defaultLanguage } from "../languages.js";
import { url } from "../url.js";
import ELEMENTS from "./elements.js";
import { PRODUCTS, CURRENCIES, FREQUENCIES } from "./products.js";
import { toDollarNumber } from "./amounts.js";

test.beforeEach(async ({ page }) => {
  await page.goto(url(defaultLanguage, "appeal"));
  await page.getByTestId("appeal-form-constructed");
});

test.describe("Amounts configured should match amounts presented on checkout", () => {
  const getProduct = (currency, frequency, amount) => PRODUCTS[currency][frequency][amount];
  for (const currency of CURRENCIES) {
    for (const frequency of FREQUENCIES) {
      for (const amount in PRODUCTS[currency][frequency]) {
        if (amount == "custom") continue;
        const testName = `${currency} > ${frequency} > ${amount} :: ${getProduct(currency, frequency, amount)}`;
        test(testName, async ({ page }) => {
          const index = Object.keys(PRODUCTS[currency][frequency]).indexOf(amount) + 1;
          await page.getByTestId(ELEMENTS.currencySelect).selectOption(currency);
          await page.getByTestId(ELEMENTS[`${frequency}Amount${index}`]).click();
          await page.getByTestId(ELEMENTS.checkoutButton).click();
          const event = await page.locator(".paddle-checkout-event[data-event=\"Checkout.Loaded\"]");
          await expect(await event.getAttribute("data-currency")).toBe(currency);
          await expect(await event.getAttribute("data-total")).toBe(String(toDollarNumber(currency, amount).toFixed(2)));
        });
      }
    }
  }
});