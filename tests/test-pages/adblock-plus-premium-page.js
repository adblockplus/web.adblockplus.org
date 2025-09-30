import { URLHelper } from '../test-helpers/url-helper.js';

export class AdblockPlusPremiumPage {

  constructor(page) {
    this.page = page;
  }

  get completePurchaseButton() {
    return this.page.locator('#cta-2');
  }

  get frequencyToggle() {
    return this.page.locator('#frequency-switch-monthly');
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

  async openPage(optionalParam = '') {
    const pageURL = '/en/adblock-plus-premium';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
    // Slow loading due to User Accounts flow for EN users and old flow for others
    // Can remove this eventually when all users on User Accounts flow
    await this.page.waitForTimeout(1_000);
  }

  async clickCheckout(frequency = 'Yearly') {
    if (frequency == 'Monthly') {
      // Toggle defaults to Yearly so need to set to Monthly
      await this.frequencyToggle.click();
    }
    await this.completePurchaseButton.click();
  }
}
