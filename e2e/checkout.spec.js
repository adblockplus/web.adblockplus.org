import { test, expect } from "playwright/test";
import { testCheckoutAmount } from "./shared/checkout.utils.js";
import { paddleConfig } from "../static/shared/paddleConfig.js";

const checkoutURL = process.env.CHECKOUT_URL || "https://adblockplus.org/en/installed";

for (const environmentName in paddleConfig.environments) {
  if (environmentName != "sandbox") continue;
  const environmentConfig = paddleConfig.environments[environmentName];
  for (const productName in environmentConfig.products) {
    const productConfig = environmentConfig.products[productName];
    for (const currencyName in productConfig) {
      const currencyConfig = productConfig[currencyName];
      for (const frequencyName in currencyConfig) {
        const frequencyConfig = currencyConfig[frequencyName];
        for (const amount in frequencyConfig) {
          test(`${environment} / ${productName} / ${currencyName} / ${frequencyName} / ${ amount }`, async ({ page }) => {
            const urlSearch = environment == "sandbox" ? "?testmode" : "";
            await page.goto(`${checkoutURL}${urlSearch}`);
            await testCheckoutAmount(page, {
              amount, 
              product: productName,
              currency: currencyName,
              frequency: frequencyName,
            });
          });
        }
      }
    }
  }
}

async function expectCheckoutParameters(page, { language, title, currency, frequency, amount }) {
  const frame = await page.frameLocator('iframe[name="paddle_frame"]');
  const amountFormat = {currency, style: "currency", currencyDisplay: "narrowSymbol"};
  const formattedAmount = new Intl.NumberFormat(language, amountFormat).format(amount);
  await expect(frame.getByTestId("cart-item-name")).toContainText(title);
  await expect(frame.getByTestId("summary-total-trial-or-recurring")).toContainText(frequency);
  await expect(frame.getByTestId("price-summary")).toContainText(formattedAmount);
}
