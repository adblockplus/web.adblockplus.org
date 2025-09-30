import { URLHelper } from '../test-helpers/url-helper.js';

export class BlockCookieBannersPage {

  constructor(page) {
    this.page = page;
  }

  get yearlySubscriptionButton() {
    return this.page.locator('#yearly-option');
  }

  get monthlySubscriptionButton() {
    return this.page.locator('#monthly-option');
  }

  get checkoutNowButton() {
    return this.page.getByRole('button', { name: 'Checkout Now' });
  }

  // This element only appear with an extension that supports User Accounts
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
