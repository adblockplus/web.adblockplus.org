import { test, expect } from '@playwright/test';
import { PaddlePaymentForm, PaymentTestParameters } from './test-helpers/payment-helper.js';
import { UserAccountsPortal } from './test-pages/user-accounts-portal.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';

const paymentParams = new PaymentTestParameters();
// Test parameters for the monthly and yearly buttons on each payment page:
const paymentPageButtonParameters = paymentParams.paymentPageButtonParameters;
// Test parameters for each payment page for both the old and new User Accounts flow:
const paymentPageFlowParameters = paymentParams.paymentPageFlowParameters;

paymentPageButtonParameters.forEach(({ paymentPage, frequency }) => {
  test('Block multi subscriptions old flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(60_000);

    // Using an email that already has a test subscription
    // TESTMAIL in caps so can ensure casing does not matter!
    const email = 'r3xx5.abp_9ywn2@inbox.TESTMAIL.app';

    const premiumPaymentPage = new paymentPage(page);
    const paddlePaymentForm = new PaddlePaymentForm(page);
    await premiumPaymentPage.openPage();
    await premiumPaymentPage.clickCheckout(frequency);
    await paddlePaymentForm.fillInEmailPage(email);
    const responsePromise = page.waitForResponse(response => response.url() ===
      'https://abp-payments.ey.r.appspot.com/user/has_active_premium_subscription' && response.status() === 200 && response.request().method() === 'POST', { timeout: 10_000 });
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

paymentPageButtonParameters.forEach(({ paymentPage, frequency }) => {
  test('Block multi subscriptions new User Accounts flow: ' + frequency + ' payment on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(60_000);

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
      && response.status() === 200 && response.request().method() === 'GET', { timeout: 15_000 });
    await paddlePaymentForm.continueButton.click();
    const response = await responsePromise;
    const jsonResponse = await response.json();
    const activeSub = await jsonResponse.hasActiveSubscription;
    expect(activeSub).toBeTruthy();
    await paddlePaymentForm.verifyActiveSubscriptionAlreadyMessage();
    await paddlePaymentForm.restorePurchaseButton.click();
    const userAccounts = new UserAccountsPortal(page);
    await userAccounts.checkUserAccountsRestoreCodePageLoaded();
    expect(page.url()).toContain('https://abp.ua-qa.eyeo.it/?s=abp-w');
  });
});

paymentPageFlowParameters.forEach(({ paymentPage, flow }) => {
  test('Ensure past due card update not blocked due to ' + flow + ' multi subs on ' + paymentPage.name, async ({ page }) => {
    test.setTimeout(60_000);
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
