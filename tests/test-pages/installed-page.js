import { URLHelper } from '../test-helpers/url-helper.js';

export class InstalledPage {

  constructor(page) {
    this.page = page;
  }

  get monthlySubscriptionButton() {
    return this.page.locator('#monthly-option');
  }

  get yearlySubscriptionButton() {
    return this.page.locator('#yearly-option');
  }

  get completePurchaseButton() {
    return this.page.locator("#purchase-button");
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/installed';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
    // Slow loading due to User Accounts flow for EN users and old flow for others
    // Can remove this eventually when all users on User Accounts flow
    await this.page.waitForTimeout(1_500);
  }

  async clickCheckout(frequency = 'Yearly') {
    if (frequency == 'Monthly') {
      await this.monthlySubscriptionButton.click();
    }
    else {
      await this.yearlySubscriptionButton.click();
    }
    await this.completePurchaseButton.click();
  }
}
