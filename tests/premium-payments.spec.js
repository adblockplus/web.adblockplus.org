import { test, expect } from '@playwright/test';
import { PremiumPage } from './test-pages/premium-page.js';
import { UpdatePage } from './test-pages/update-page.js';
import { InstalledPage } from './test-pages/installed-page.js';
import { BlockCookieBannersPage } from './test-pages/block-cookie-banners-page.js';
import { AdblockPlusPremiumPage } from './test-pages/adblock-plus-premium-page.js';
import { PaddlePaymentForm } from './test-pages/paddle-payment-form.js';
import { UserAccountsPortal } from './test-pages/user-accounts-portal.js';
import { EmailHelper } from './test-helpers/email-helper.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';

const paymentPages = [PremiumPage, UpdatePage, InstalledPage, BlockCookieBannersPage, AdblockPlusPremiumPage];
const flow = ['Old', 'New'];
const paymentPageParameters = paymentPages.flatMap(paymentPage => flow.map(flow => ({ paymentPage, flow: flow })));
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
    await ExtensionHelper.mockExtensionData(page, '4.28.0', false);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    const email = await EmailHelper.createNewEmail(paymentPage.name + frequency);
    await paddlePaymentForm.makeTestPayment(email);
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsSetUpCodePageLoaded();
    await expect(page).toHaveURL('https://abp.ua-qa.eyeo.it/?s=abp-w');
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
    await expect(page).toHaveURL('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});

testParameters.forEach(({ paymentPage, frequency }) => {
  test('Block multi subscriptions old flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {

    // Using an email that already has a test subscription
    // TESTMAIL in caps so can ensure casing does not matter!
    const email = 'r3xx5.abp_9ywn2@inbox.TESTMAIL.app';

    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    await paddlePaymentForm.fillInEmailPage(email);
    const responsePromise = page.waitForResponse(response => response.url() ===
      'https://abp-payments.ey.r.appspot.com/user/has_active_premium_subscription' && response.status() === 200, { timeout: 10000 });
    await paddlePaymentForm.continueButton.click();
    const response = await responsePromise;
    const jsonResponse = await response.json();
    const activeSub = await jsonResponse.has_active_premium_sub;
    expect(activeSub).toBeTruthy();
    await paddlePaymentForm.verifyActiveSubscriptionAlreadyMessage();
    await paddlePaymentForm.restorePurchaseButton.click();
    expect(page.url()).toContain('/en/restore-purchase?email=r3xx5.abp_9ywn2%40inbox.testmail.app');
  });
});

testParameters.forEach(({ paymentPage, frequency }) => {
	test('Block multi subscriptions new User Accounts flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {

    // Using an email that already has a test subscription
    // TESTMAIL in caps so can ensure casing does not matter!
    const email = 'r3xx5.abp_9ywn2@inbox.TESTMAIL.app';

    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await ExtensionHelper.mockExtensionData(page, '4.28.0', false);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    await paddlePaymentForm.fillInEmailPage(email);
    const responsePromise = page.waitForResponse(response => response.url().startsWith('https://api.ua-qa.eyeo.it/v1/subscriptions/abp/has-active?customerId=')
      && response.status() === 200, { timeout: 10000 });
    await paddlePaymentForm.continueButton.click();
    const response = await responsePromise;
    const jsonResponse = await response.json();
    const activeSub = await jsonResponse.hasActiveSubscription;
    expect(activeSub).toBeTruthy();
    await paddlePaymentForm.verifyActiveSubscriptionAlreadyMessage();
    await paddlePaymentForm.restorePurchaseButton.click();
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsRestoreCodePageLoaded();
    await expect(page).toHaveURL('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});

paymentPageParameters.forEach(({ paymentPage, flow }) => {
  test('Ensure past due card update not blocked due to ' + flow + ' multi subs on ' + paymentPage.name, async ({ page }) => {
    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    if (flow === 'New') {
      await ExtensionHelper.mockExtensionData(page, '4.28.0', true);
    }
    // Include a Paddle past due payment in URL
    await premiumPaymentPage.openPage('_ptxn=txn_01jy3p1czw4zk0rce047q73ggj');
    var activeSubMessage = false;
    try {
      await paddlePaymentForm.verifyActiveSubscriptionAlreadyMessage();
      activeSubMessage = true;
      throw new Error('Active subscription message shows - card update should not be blocked for past due user');
    }
    catch {
      if (activeSubMessage === true) {
        throw new Error('Active subscription message shows - card update should not be blocked for past due user');
      }
    }
    // Use PayPal button to check Paddle form opened
    // Will pass if not on the correct page, but will fail if form failed to open
    await expect(paddlePaymentForm.payPalButton).toBeVisible();
  });
});
