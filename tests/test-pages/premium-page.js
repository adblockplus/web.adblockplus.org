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

  // These elements only appear on /premium when extension already has Premium enabled
  get thankYouBanner() {
    return this.page.getByRole('heading', { name: 'Thank you for subscribing to AdBlock Plus Premium' });
  }

  get settingsButton() {
    return this.page.getByRole("link", { name: "Settings" });
  }

  get helpCenterButton() {
    return this.page.getByRole("link", { name: "Help Center" });
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/premium';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
  }

  async clickCheckout(frequency = 'Yearly') {
    if (frequency == 'Monthly') {
      await this.monthlyGetPremiumButton.click();
    }
    else {
      await this.yearlyGetPremiumButton.click();
    }
  }

}
