import { expect } from '@playwright/test';

export class PaddlePaymentForm {

  // This is a third party payment form owned by Paddle.com

  constructor(page) {
    this.page = page;
  }

  get paddleFrame() {
    return this.page.frameLocator('iframe[name=\"paddle_frame\"]');
  }

  get emailAddressField() {
    return this.paddleFrame.getByTestId('authenticationEmailInput');
  }

  get zipPostcodeField() {
    return this.paddleFrame.getByTestId('postcodeInput');
  }

  get continueButton() {
    return this.paddleFrame.getByTestId('combinedAuthenticationLocationFormSubmitButton');
  }

  get cardNumberField() {
    return this.paddleFrame.getByTestId('cardNumberInput');
  }

  get nameOnCardField() {
    return this.paddleFrame.getByTestId('cardholderNameInput');
  }

  get expirationDateField() {
    return this.paddleFrame.getByTestId('expiryDateField');
  }

  get SecurityCodeField() {
    return this.paddleFrame.getByTestId('cardVerificationValueInput');
  }

  get subscribeNowButton() {
    return this.paddleFrame.getByTestId('cardPaymentFormSubmitButton');
  }

  get payPalButton() {
    return this.paddleFrame.getByTestId('PAYPAL_PaymentSelectionButton');
  }

  // activeSubscriptionMessage and restorePurchaseButton only appear if the user already has a subscription
  get activeSubscriptionMessage() {
    return this.page.getByRole('heading', { name: 'We found an active subscription with that email' });
  }

  get restorePurchaseButton() {
    return this.page.getByRole('link', { name: 'Restore Purchase' });
  }

  async fillInEmailPage(email) {
    await this.emailAddressField.fill(email);
    if (await this.zipPostcodeField.isVisible()) {
      // Postcode field does not appear for all countries
      await this.zipPostcodeField.fill('99950');
    }
  }

  async makeTestPayment(email) {
    await this.fillInEmailPage(email);
    await this.continueButton.click();
    await this.cardNumberField.fill('4242424242424242');
    await this.nameOnCardField.fill('Test Payment');
    await this.expirationDateField.fill('0945');
    await this.SecurityCodeField.fill('737');
    await this.subscribeNowButton.click();
  }

  async verifyActiveSubscriptionAlreadyMessage() {
    await expect(this.activeSubscriptionMessage).toBeVisible({ timeout: 10_000 });
    await expect(this.restorePurchaseButton).toBeVisible();
  }

}
