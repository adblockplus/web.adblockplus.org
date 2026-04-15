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
    return this.page.locator('#purchase-button');
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/installed';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
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
