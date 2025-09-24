import { test } from '@playwright/test';
import { PremiumPage } from './test-pages/premium-page.js';
import { UpdatePage } from './test-pages/update-page.js';
import { InstalledPage } from './test-pages/installed-page.js';
import { BlockCookieBannersPage } from './test-pages/block-cookie-banners-page.js';
import { AdblockPlusPremiumPage } from './test-pages/adblock-plus-premium-page.js';
import { PaddlePaymentForm } from "./test-pages/paddle-payment-form.js";
import { EmailHelper } from "./test-helpers/email-helper.js";

const testParameters = [
  { paymentPage: PremiumPage, frequency: 'Monthly' },
	{ paymentPage: PremiumPage, frequency: 'Yearly' },
	{ paymentPage: UpdatePage, frequency: 'Monthly' },
	{ paymentPage: UpdatePage, frequency: 'Yearly' },
	{ paymentPage: InstalledPage, frequency: 'Monthly' },
	{ paymentPage: InstalledPage, frequency: 'Yearly' },
	{ paymentPage: BlockCookieBannersPage, frequency: 'Monthly' },
	{ paymentPage: BlockCookieBannersPage, frequency: 'Yearly' },
	{ paymentPage: AdblockPlusPremiumPage, frequency: 'Monthly' },
  { paymentPage: AdblockPlusPremiumPage, frequency: 'Yearly' }
]

testParameters.forEach(({ paymentPage, frequency }) => {
  test('Premium payment old flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    const email = await EmailHelper.createNewEmail(paymentPage.name + frequency);
    await paddlePaymentForm.makeTestPayment(email);
    const thankYouPage = new PremiumPage(page);
    await thankYouPage.checkThankYouPageLoadsNoExtension();
  });
});
