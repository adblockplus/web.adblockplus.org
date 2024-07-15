import { test, expect } from "playwright/test";
import { paddleConfig } from "../static/shared/paddleConfig.js";
import { checkoutConfig } from "../static/shared/checkoutConfig.js";
import { formatAmount } from "./shared/currency.js";
import { expectPaddlePresents } from "./shared/paddle.js";

const CHECKOUT_HOST = process.env.CHECKOUT_HOST || "http://localhost:8080";
const CHECKOUT_LOCALE = process.env.CHECKOUT_LOCALE || "en";
const CHECKOUT_PAGE = process.env.CHECKOUT_PAGE || "installed";
const CHECKOUT_ENVIRONMENT = process.env.CHECKOUT_ENVIRONMENT || "sandbox";
const CHECKOUT_SEARCH = CHECKOUT_ENVIRONMENT == "sandbox" ? "?testmode" : "";

const environmentConfig = paddleConfig.environments[CHECKOUT_ENVIRONMENT];
for (const plan in environmentConfig.plans) {
  const planConfig = environmentConfig.plans[plan];
  for (const currency in planConfig) {
    const currencyConfig = planConfig[currency];
    for (const frequency in currencyConfig) {
      const frequencyConfig = currencyConfig[frequency];
      for (const amount in frequencyConfig) {
        test(JSON.stringify({CHECKOUT_ENVIRONMENT, plan, currency, frequency, amount}), async ({page}) => {
          await page.goto(`${CHECKOUT_HOST}/${CHECKOUT_LOCALE}/${CHECKOUT_PAGE}${CHECKOUT_SEARCH}`);
          await page.evaluate(({plan, currency, frequency, amount}) => {
            adblock.api.checkout({plan, currency, frequency, amount});
          }, {plan, currency, frequency, amount});
          const formattedAmount = await formatAmount(page, {
            locale: CHECKOUT_LOCALE,
            currency,
            centAmount: amount
          });
          await expectPaddlePresents(page, {
            title: checkoutConfig.plans[plan].title,
            frequency,
            formattedAmount
          });
        });
      }
    }
  }
}
