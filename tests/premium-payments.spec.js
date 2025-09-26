import { test, expect } from '@playwright/test';
import { PremiumPage } from './test-pages/premium-page.js';
import { UpdatePage } from './test-pages/update-page.js';
import { InstalledPage } from './test-pages/installed-page.js';
import { BlockCookieBannersPage } from './test-pages/block-cookie-banners-page.js';
import { AdblockPlusPremiumPage } from './test-pages/adblock-plus-premium-page.js';
import { PaddlePaymentForm } from "./test-pages/paddle-payment-form.js";
import { UserAccountsPortal } from "./test-pages/user-accounts-portal.js";
import { EmailHelper } from "./test-helpers/email-helper.js";
import { ExtensionHelper } from './test-helpers/extension-helper.js';

const paymentPages = [PremiumPage, UpdatePage, InstalledPage, BlockCookieBannersPage, AdblockPlusPremiumPage];
const frequency = ['Monthly', 'Yearly'];
const testParameters  = paymentPages.flatMap(paymentPage => frequency.map(freq => ({ paymentPage, frequency: freq })));
const paymentPagesWithSignIn = [PremiumPage, BlockCookieBannersPage, AdblockPlusPremiumPage];
const signInParameters  = paymentPagesWithSignIn.flatMap(paymentPage => ({ paymentPage }));

testParameters.forEach(({ paymentPage, frequency }) => {
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

testParameters.forEach(({ paymentPage, frequency }) => {
  test('Premium payment User Accounts flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await ExtensionHelper.mockExtensionData(page, '4.28.0');
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    const email = await EmailHelper.createNewEmail(paymentPage.name + frequency);
    await paddlePaymentForm.makeTestPayment(email);
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsCodePageLoaded();
    await expect(page).toHaveURL('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});

signInParameters.forEach(({ paymentPage }) => {
  test('Premium payment page Activate Here old flow: ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.20.0');
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.activateHereLink.click();
    await expect(premiumPaymentPage.activateFlowEmailHeading).toBeVisible();
  });
});

signInParameters.forEach(({ paymentPage }) => {
  test('Premium payment page Sign In User Accounts flow: ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(90_000);
    const premiumPaymentPage = new paymentPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.28.0');
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.signInLink.click();
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsEmailLoginPageLoaded();
    await expect(page).toHaveURL('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});
