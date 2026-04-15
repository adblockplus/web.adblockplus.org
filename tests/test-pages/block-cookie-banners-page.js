import { URLHelper } from '../test-helpers/url-helper.js';

export class BlockCookieBannersPage {

  constructor(page) {
    this.page = page;
  }

  get yearlySubscriptionButton() {
    // Struggled to set up ID due to page design, but for now this is the first button
		return this.page.getByRole("button").first();
  }

  get monthlySubscriptionButton() {
    // Struggled to set up ID due to page design, this is the second button
		return this.page.getByRole("button").nth(1);
  }

  get checkoutNowButton() {
    return this.page.getByRole('button', { name: 'Checkout Now' });
  }

  // This element only appears with an extension that supports User Accounts
  get signInLink() {
    return this.page.getByRole('link', { name: 'Click to sign in' });
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/block-cookie-banners';
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
    await this.checkoutNowButton.click();
  }
}
