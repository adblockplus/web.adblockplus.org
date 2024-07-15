import { test, expect } from "playwright/test";
import { paddleConfig } from "../static/shared/paddleConfig.js";
import { checkoutConfig } from "../static/shared/checkoutConfig.js";
import { formatAmount } from "./shared/currency.js";
import { expectPaddlePresents } from "./shared/paddle.js";

const HOST = process.env.CHECKOUT_HOST || "https://adblockplus.org";
const LOCALE = process.env.CHECKOUT_LOCALE || "en";
const PAGE = process.env.CHECKOUT_PAGE || "test-checkout";
const PADDLE_ENVIRONMENT = process.env.CHECKOUT_ENVIRONMENT || "sandbox";

const MINIMUM_AMOUNT = 1;
const ACCEPTABLE_AMOUNT = 9001;
const MAXIMUM_AMOUNT = 999999999999999999999;

const checkoutSearch = PADDLE_ENVIRONMENT == "sandbox" ? "testmode" : "";

test.beforeEach(async ({page}) => {
  await page.goto(`${HOST}/${LOCALE}/${PAGE}?${checkoutSearch}`);
});

const environmentConfig = paddleConfig.environments[PADDLE_ENVIRONMENT];
for (const plan in environmentConfig.plans) {
  const planConfig = environmentConfig.plans[plan];
  for (const currency in planConfig) {
    const currencyConfig = planConfig[currency];
    for (const frequency in currencyConfig) {
      const frequencyConfig = currencyConfig[frequency];

      for (const amount in frequencyConfig) {
        const fixedParams = {PADDLE_ENVIRONMENT, plan, currency, frequency, amount};
        test(JSON.stringify(fixedParams), async ({page}) => {
          await page.evaluate((fixedParams) => {
            adblock.api.checkout(fixedParams);
          }, fixedParams);
          const formattedAmount = await formatAmount(page, {
            locale: LOCALE,
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

      const minimumParams = {PADDLE_ENVIRONMENT, plan, currency, frequency, amount: MINIMUM_AMOUNT};
      test(JSON.stringify(minimumParams), async ({page}) => {
        await expect(page.evaluate((params) => {
          return adblock.api.checkout(params);
        },minimumParams)).rejects.toThrow();
      });

      const acceptableParams = {PADDLE_ENVIRONMENT, plan, currency, frequency, amount: ACCEPTABLE_AMOUNT};
      test(JSON.stringify(acceptableParams), async ({page}) => {
        await page.evaluate((params) => {
          adblock.api.checkout(params);
        },acceptableParams);
        const formattedAmount = await formatAmount(page, {
          locale: LOCALE,
          currency,
          centAmount: acceptableParams.amount
        });
        await expectPaddlePresents(page, {
          title: checkoutConfig.plans[plan].title,
          frequency,
          formattedAmount
        });
      });

      const maximumParams = {PADDLE_ENVIRONMENT, plan, currency, frequency, amount: MAXIMUM_AMOUNT};
      test(JSON.stringify(maximumParams), async ({page}) => {
        await expect(page.evaluate((params) => {
          return adblock.api.checkout(params);
        },maximumParams)).rejects.toThrow();
      });
      
    }
  }
}