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

  async openPage(optionalParam = '') {
    const pageURL = '/en/adblock-plus-premium';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
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
