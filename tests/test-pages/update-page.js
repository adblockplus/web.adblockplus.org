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
