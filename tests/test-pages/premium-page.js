import { expect } from '@playwright/test';
import { URLHelper } from '../test-helpers/url-helper.js';

export class PremiumPage {

  constructor(page) {
    this.page = page;
  }

  get yearlyGetPremiumButton() {
    return this.page.locator('#get-premium-yearly');
  }

  get monthlyGetPremiumButton() {
    return this.page.locator('#get-premium-monthly');
  }

  // This element only appears with an extension that supports User Accounts
  get signInLink() {
    return this.page.getByRole('link', { name: 'Click to sign in' });
  }

  // These elements only appear with no extension installed or an old extension that does not support User Accounts
  get activateHereLink() {
    return this.page.getByRole('link', { name: 'Activate here' });
  }

  get activateFlowEmailHeading() {
    return this.page.getByRole('heading', { name: 'Step 1: Enter your email address' });
  }

  // This element only appears on /premium thank you page with no extension installed
  get installButton() {
    return this.page.locator('#install-button').first();
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/premium';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
    // Slow loading due to User Accounts flow for EN users and old flow for others
    // Can remove this eventually when all users on User Accounts flow
    await this.page.waitForTimeout(1_500);
  }

  async clickCheckout(frequency = 'Yearly') {
    if (frequency == 'Monthly') {
      await this.monthlyGetPremiumButton.click();
    }
    else {
      await this.yearlyGetPremiumButton.click();
    }
  }

  async checkThankYouPageLoadsNoExtension() {
    await expect(this.installButton).toBeVisible({ timeout: 15_000 });
  }

}
