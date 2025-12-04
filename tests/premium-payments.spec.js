import { test, expect } from '@playwright/test';
import { PremiumPage } from './test-pages/premium-page.js';
import { PaddlePaymentForm, PaymentTestParameters } from './test-helpers/payment-helper.js';
import { UserAccountsPortal } from './test-pages/user-accounts-portal.js';
import { EmailHelper } from './test-helpers/email-helper.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';

const paymentParams = new PaymentTestParameters();
// Test parameters for the monthly and yearly buttons on each payment page:
const paymentPageButtonParameters = paymentParams.paymentPageButtonParameters;
// Test parameters for each payment page that has a User Accounts sign in link:
const signInParameters = paymentParams.signInParameters;

paymentPageButtonParameters.forEach(({ paymentPage, frequency }) => {
  test('Premium payment old flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
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

paymentPageButtonParameters.forEach(({ paymentPage, frequency }) => {
  test('Premium payment User Accounts flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await ExtensionHelper.mockExtensionData(page, '4.28.0', false);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    const email = await EmailHelper.createNewEmail(paymentPage.name + frequency);
    await paddlePaymentForm.makeTestPayment(email);
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsSetUpCodePageLoaded();
    expect(page.url()).toContain('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});

signInParameters.forEach(({ paymentPage }) => {
  test('Premium payment page Activate Here old flow: ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.20.0', false);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.activateHereLink.click();
    await expect(premiumPaymentPage.activateFlowEmailHeading).toBeVisible();
  });
});

signInParameters.forEach(({ paymentPage }) => {
  test('Premium payment page Sign In User Accounts flow: ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.28.0', false);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.signInLink.click();
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsEmailLoginPageLoaded();
    expect(page.url()).toContain('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});
