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
