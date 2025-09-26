import { URLHelper } from '../test-helpers/url-helper.js';

export class UpdatePage {
  constructor(page) {
    this.page = page;
  }

  get yearlyCompletePurchaseButton() {
    return this.page.getByRole('button', { name: 'Complete Purchase' }).first();
  }

  get monthlyCompletePurchaseButton() {
    return this.page.getByRole('button', { name: 'Complete Purchase' }).nth(1);
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/update';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
    // Slow loading due to User Accounts flow for EN users and old flow for others
    // Can remove this eventually when all users on User Accounts flow
    await this.page.waitForTimeout(1_500);
  }

  async clickCheckout(frequency = 'Yearly') {
    if (frequency == 'Monthly') {
      await this.monthlyCompletePurchaseButton.click();
    }
    else {
      await this.yearlyCompletePurchaseButton.click();
    }
  }

}
