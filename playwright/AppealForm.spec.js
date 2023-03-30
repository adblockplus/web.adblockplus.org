import * as dotenv from 'dotenv'; dotenv.config(); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { test, expect } from "@playwright/test";
import parsecurrency from "parsecurrency";

const url = process.env.AppealFormURL || "http://localhost:5000/en/appeal?skipLoading=1";

const languages = process.env.AppealFormLanguages || ["ar", "en", "hu", "ko", "pt_BR", "zh_CN", "de", "es", "it", "nl", "ru", "el", "fr", "ja", "pl", "tr"];

/**
 * There are various ways of configuring products and prices in Paddle but we chose to create one product for each amount in each frequency in each currency.
 * 
 * AppealForm config format {
 *   "currency": { // e.g. USD, EUR, etc
 *     "frequency": { // e.g. once, monthly, yearly
 *       "centAmount": productNumber, // e.g. 1000 (1000 cents == 10 dollars) : 816549 (Paddle productNumber)
 *       "centAmount": productNumber, 
 *       "centAmount": productNumber, 
 *       "centAmount": productNumber,
 *       "centAmount": productNumber,
 *       "custom": minimumCentAmount, // e.g. "custom": 500 (500 cents = 5 dollars)
 *     }
 *   }
 * }
 * 
 * Additional rules:
 * 
 * - All currencies must have the same frequencies (e.g. once, monthly, yearly)
 * - All frequencies must have 5 fixed "centAmounts":productNumber and one "custom":minimumCentAmount
 * 
 * Additional notes:
 * 
 * - It's assumed that all configured and minimum amounts are higher than Paddle's minimum amounts per currency
 */
const config = process.env.AppealFormConfig || {
  "USD": {
    "once": {
      "1000": 816549,
      "1500": 816550,
      "2000": 816551,
      "3500": 816552,
      "5000": 816553,
      "custom": 500
    },
    "monthly": {
      "199": 816774,
      "299": 816775,
      "399": 816776,
      "499": 816777,
      "999": 816778,
      "custom": 199
    },
    "yearly": {
      "1000": 816779,
      "1500": 816780,
      "2000": 816781,
      "3500": 816782,
      "5000": 816783,
      "custom": 500
    }
  },
  "AUD": {
    "once": {
      "1000": 816522,
      "1500": 816523,
      "2000": 816524,
      "3500": 816525,
      "5000": 816526,
      "custom": 500
    },
    "monthly": {
      "199": 816692,
      "299": 816693,
      "399": 816694,
      "499": 816696,
      "999": 816697,
      "custom": 199
    },
    "yearly": {
      "1000": 816699,
      "1500": 816700,
      "2000": 816702,
      "3500": 816703,
      "5000": 816705,
      "custom": 500
    }
  },
  "CAD": {
    "once": {
      "1000": 816528,
      "1500": 816529,
      "2000": 816530,
      "3500": 816531,
      "5000": 816532,
      "custom": 500
    },
    "monthly": {
      "199": 816706,
      "299": 816708,
      "399": 816710,
      "499": 816711,
      "999": 816712,
      "custom": 199
    },
    "yearly": {
      "1000": 816714,
      "1500": 816715,
      "2000": 816716,
      "3500": 816717,
      "5000": 816718,
      "custom": 500
    }
  },
  "EUR": {
    "once": {
      "1000": 816517,
      "1500": 816518,
      "2000": 816519,
      "3500": 816520,
      "5000": 816521,
      "custom": 500
    },
    "monthly": {
      "199": 816681,
      "299": 816682,
      "399": 816683,
      "499": 816684,
      "999": 816686,
      "custom": 199
    },
    "yearly": {
      "1000": 816687,
      "1500": 816688,
      "2000": 816689,
      "3500": 816690,
      "5000": 816691,
      "custom": 500
    }
  },
  "GBP": {
    "once": {
      "1000": 816538,
      "1500": 816539,
      "2000": 816540,
      "3500": 816541,
      "5000": 816542,
      "custom": 500
    },
    "monthly": {
      "199": 816734,
      "299": 816735,
      "399": 816736,
      "499": 816737,
      "999": 816738,
      "custom": 199
    },
    "yearly": {
      "1000": 816739,
      "1500": 816740,
      "2000": 816741,
      "3500": 816743,
      "5000": 816744,
      "custom": 500
    }
  },
  "JPY": {
    "once": {
      "1500": 816554,
      "2000": 816555,
      "2500": 816556,
      "3500": 816557,
      "5000": 816558,
      "custom": 500
    },
    "monthly": {
      "200": 816784,
      "300": 816785,
      "500": 816786,
      "1000": 816787,
      "1500": 816788,
      "custom": 200
    },
    "yearly": {
      "1500": 816789,
      "2000": 816791,
      "2500": 816792,
      "3500": 816794,
      "5000": 816795,
      "custom": 500
    }
  },
  "NZD": {
    "once": {
      "1000": 816543,
      "1500": 816544,
      "2000": 816545,
      "3500": 816547,
      "5000": 816548,
      "custom": 500
    },
    "monthly": {
      "199": 816760,
      "299": 816762,
      "399": 816764,
      "499": 816766,
      "999": 816768,
      "custom": 199
    },
    "yearly": {
      "1000": 816769,
      "1500": 816770,
      "2000": 816771,
      "3500": 816772,
      "5000": 816773,
      "custom": 500
    }
  },
  "CHF": {
    "once": {
      "1000": 816533,
      "1500": 816535,
      "2000": 816534,
      "3500": 816536,
      "5000": 816537,
      "custom": 500
    },
    "monthly": {
      "199": 816720,
      "299": 816722,
      "399": 816723,
      "499": 816725,
      "999": 816726,
      "custom": 199
    },
    "yearly": {
      "1000": 816727,
      "1500": 816728,
      "2000": 816730,
      "3500": 816731,
      "5000": 816733,
      "custom": 500
    }
  },
  "RUB": {
    "once": {
      "25000": 816559,
      "50000": 816560,
      "100000": 816561,
      "250000": 816562,
      "500000": 816563,
      "custom": 25000
    },
    "monthly": {
      "15000": 816796,
      "25000": 816797,
      "40000": 816799,
      "50000": 816800,
      "100000": 816801,
      "custom": 15000
    },
    "yearly": {
      "25000": 816802,
      "50000": 816803,
      "100000": 816804,
      "250000": 816805,
      "500000": 816806,
      "custom": 25000
    }
  },
};

const configCurrencies = Object.keys(config);

const configFrequencies = Object.keys(config.USD);

function centToDollarNumber(currency, amount) {
  return currency == "JPY" ? amount : amount / 100;
}

function centToDollarString(currency, amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(centToDollarNumber(currency, amount));
}

test.describe.configure({ mode: "serial" });

let page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(url);
  await page.getByTestId("appeal-form-constructed");
});

test.afterAll(async () => {
  await page.close();
});

test("config", () => {
  for (const currency of configCurrencies) {
    expect(Object.keys(config[currency]), "All currencies should have the same frequencies").toStrictEqual(configFrequencies);
    for (const frequency of configFrequencies) {
      const amounts = Object.keys(config[currency][frequency]);
      expect(amounts.length, "All frequencies should have 6 amounts").toBe(6);
      expect(amounts[5], "The last amount of each frequency should be \"custom\"").toBe("custom");
      for (const amount of amounts.slice(0, 5)) {
        expect(Number.isInteger(parseFloat(amount)), "All fixed (not \"custom\") amounts should be integers (in cents)").toBeTruthy();
      }
      expect(Number.isInteger(parseFloat(config[currency][frequency]["custom"])), "The custom (minimum) amount should be an integer (in cents)").toBeTruthy();    
    }     
  }
});

async function saveScreenshots(language, currency, description) {
  await page.setViewportSize({ width: 920, height: 573 }); // based on 1 month of traffic in 2022
  await page.screenshot({ path: `playwright-report/screenshots/${description}-${language}-${currency}-popular-small.png` });
  await page.setViewportSize({ width: 1366, height: 712 }); // based on 1 month of traffic in 2022
  await page.screenshot({ path: `playwright-report/screenshots/${description}-${language}-${currency}-popular-large.png` });
  await page.setViewportSize({ width: 320, height: 480 }); // first gen iphone
  await page.screenshot({ path: `playwright-report/screenshots/${description}-${language}-${currency}-mobile-small.png` });
  await page.setViewportSize({ width: 428, height: 926 }); // latest iphone pro max
  await page.screenshot({ path: `playwright-report/screenshots/${description}-${language}-${currency}-mobile-large.png` });
  await page.setViewportSize({ width: 600, height: 1024 }); // portrait first amazon kindle fire
  await page.screenshot({ path: `playwright-report/screenshots/${description}-${language}-${currency}-tablet-small.png` });
}

test.describe("translations", async () => {
  const fixedStringSelectors = [
    ".appeal-form-header__heading",
    ".appeal-form-checkout__submit",
  ];
  const frequencyHeadingSelector = ".appeal-form-frequency__heading";
  const frequencies = ["once", "monthly", "yearly"];
  for (const language of languages) {
    test(language, async () => {
      if (language == "fr" || language == "de") return;
      await page.goto(url.replace("/en/", `/${language}/`));
      await page.locator(".appeal-form-header__heading");
      for (const selector of fixedStringSelectors) {
        const text = await page.locator(selector).textContent();
        expect(text.trim(), `${selector} text populated`).toBeTruthy();
      }
      const error = await page.locator(".appeal-form__error");
      let i = -1;
      for (const frequency of frequencies) {
        const headerText = await page.locator(frequencyHeadingSelector).nth(i++).textContent();
        expect(headerText.trim()).toBeTruthy();
        const input = await page.locator(`.appeal-form-amount__input[data-frequency="${frequency}"]`);
        await input.fill("1");
        const errorText = await error.textContent();
        expect(errorText.trim(), `${frequency} error text populated`).toBeTruthy();
      }
      await saveScreenshots(language, "USD", "errors");
      const currencySelect = await page.locator(".appeal-form-header__select");
      for (const currency of configCurrencies) {
        await currencySelect.selectOption(currency);
        await saveScreenshots(language, currency, "currencies");
      }
    });
  }
});

test.describe("products", async () => {
  for (const currency of configCurrencies) {
    test(currency, async () => {
      const currencySelect = await page.locator(".appeal-form-header__select");
      const checkoutButton = await page.locator(".appeal-form-checkout__submit");
      const errorMessage = await page.locator(".appeal-form__error");
      await currencySelect.selectOption(currency);
      const amountOptions = await page.locator(".appeal-form-amount");
      let index = 0;
      for (const frequency of configFrequencies) {
        for (const amount in config[currency][frequency]) {
          const amountOption = await amountOptions.nth(index);
          index++;
          if (amount == "custom") {
            const minimumAmount = config[currency][frequency][amount];
            await testCustomAmount(amountOption, checkoutButton, errorMessage, currency, minimumAmount);
          } else {
            await testFixedAmount(amountOption, checkoutButton)
          }
        }
      }
    });
  }  
});

/**
 * Test checking out with Paddle from AppealForm with a fixed amount selected
 * 
 * @param {Playwright.Locator} amountOption - A playwright locator of an AppealForm fixed amount
 * @param {Playwright.Locator} checkoutButton - A playwright locator of the AppealForm checkout button
 */
async function testFixedAmount(amountOption, checkoutButton) {
  const amountValue = parsecurrency(await amountOption.locator(".appeal-form-amount__text").textContent());
  const amountRadio = await amountOption.locator(".appeal-form-amount__radio");
  await amountRadio.click();
  await checkoutButton.click();
  await testPaddleCheckoutAmount(amountValue);
}

/**
 * Test checking out with Paddle from AppealForm with a custom amount selected
 * 
 * This test includes cases for when:
 * 
 * - The custom amount is empty
 * - The custom amount is below the minimum amount allowed for the selected currency
 * - The custom amount is equal to the minimum allowed for the selected currency
 * - The custom amount is above the minimum allowed for the selected currency
 * 
 * This test also checks the errorMessage for the correct minimumAmount float
 * 
 * @param {Playwright.Locator} amountOption - A playwright locator of an AppealForm custom amount
 * @param {Playwright.Locator} checkoutButton - A playwright locator of the AppealForm checkout button
 * @param {Playwright.Locator} errorMessage - A playwright locator of the AppealForm error message element
 * @param {string} currency - The currently selected currency in the AppealForm
 * @param {number} minimumAmount - The minimum amount allowed to be submitted for the currency selected in the AppealForm
 */
async function testCustomAmount(amountOption, checkoutButton, errorMessage, currency, minimumAmount) {
  // Reference main elements
  const amountRadio = await amountOption.locator(".appeal-form-amount__radio");
  const amountInput = await amountOption.locator(".appeal-form-amount__input");
  // Check default state of error
  expect(await errorMessage).toBeHidden();
  // Construct amount test strings
  const minimumAmountString = String(centToDollarNumber(currency, minimumAmount));
  const belowMinimumAmountString = String(centToDollarNumber(currency, minimumAmount - 1));
  const aboveMinimumAmountString = String(centToDollarNumber(currency, minimumAmount + 1)) 
  // Check empty custom amount submission
  await amountRadio.click();
  await checkoutButton.click();
  await expectMinimumAmountError(amountOption, amountInput, errorMessage, minimumAmount);

  await amountInput.fill(belowMinimumAmountString);
  expect(await errorMessage).toBeVisible();
  expect(await errorMessage).toContainText(minimumAmount);
  await checkoutButton.click();
  expect(await amountOption.locator(".appeal-form-amount__input:invalid").count()).toEqual(1);
  expect(amountInput).toBeFocused();
  expect(await page.locator(".paddle-frame").count()).toEqual(0);
  await amountInput.fill(String(centToDollarNumber(currency, minimumAmount)));
  expect(await amountOption.locator(".appeal-form-amount__input:invalid").count()).toEqual(0);
  await amountInput.fill(aboveMinimumAmountString);
  expect(await amountOption.locator(".appeal-form-amount__input:invalid").count()).toEqual(0);
  const fixedAmount = parsecurrency(aboveMinimumAmountString);
  // exclude localhost from custom amount checkout tests
  if (new URL(url).hostname != "localhost") {
    await checkoutButton.click();
    await testPaddleCheckoutAmount(fixedAmount);
  }
}

async function expectMinimumAmountError(amountOption, amountInput, errorMessage, minimumAmount) {
  expect(await amountOption.locator(".appeal-form-amount__input:invalid").count()).toEqual(1);
  expect(amountInput).toBeFocused();
  expect(await page.locator(".paddle-frame").count()).toEqual(0);
  expect(await errorMessage).toBeVisible();
  expect(await errorMessage).toContainText(minimumAmount);
}

async function expectNoMinimumAmountError(amountOption, amountInput, errorMessage, minimumAmount) {
  expect(await amountOption.locator(".appeal-form-amount__input:invalid").count()).toEqual(0);
  expect(await errorMessage).toBeHidden();
  expect(await page.locator(".paddle-frame").count()).toEqual(0);
}


/**
 * Tests whether the Paddle Checkout (iframe) has the provided total amount
 * 
 * @param {Object} testAmount - A parsecurrency() amount object
 * @param {number} testAmount.value - Float number of dollars and cents in amount string
 * @param {string} testAmount.symbol - Currency symbol used it amount string
 * @param {string} testAmount.currency - Currency text used in amount string
 */
async function testPaddleCheckoutAmount(testAmount) {
  const paddleFrame = await page.mainFrame().frameLocator(".paddle-frame");
  const paddleAmountText = await paddleFrame.getByTestId("summary-total").locator("var[price]").textContent();
  const paddleAmount = parsecurrency(paddleAmountText);
  expect(testAmount.value).toBe(paddleAmount.value);
  expect(testAmount.symbol).toBe(paddleAmount.symbol);
  expect(testAmount.currency).toBe(paddleAmount.currency);
  await paddleFrame.getByTestId("wideOverlayCloseIcon").click();
  const paddleIframe = page.locator(".paddle-frame");
  expect(await paddleIframe.count()).toBe(0);
}