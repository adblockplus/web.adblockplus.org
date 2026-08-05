import { URLHelper } from '../test-helpers/url-helper.js';

export class VideoTrialPage {

  constructor(page) {
    this.page = page;
  }

  // Trial length in days, matching the default the page falls back to
  static trialDays = 7;

  /**
   * `trialStarted` is epoch milliseconds. Helpers rather than fixtures because a
   * hardcoded timestamp would silently flip the page to its expired state once it
   * aged past the trial length.
   */
  static activeTrialParams(daysElapsed = 2) {
    const started = Date.now() - daysElapsed * 24 * 60 * 60 * 1000;
    return `trialStarted=${started}&trial=${VideoTrialPage.trialDays}`;
  }

  static expiredTrialParams(daysElapsed = 30) {
    const started = Date.now() - daysElapsed * 24 * 60 * 60 * 1000;
    return `trialStarted=${started}&trial=${VideoTrialPage.trialDays}`;
  }

  // Campaign parameters as the extension's reverse-trial dialog sends them
  static campaignParams() {
    return 's=reverse_trial_opd&opdStep=2&ipm-campaign-id=reverse-trial-test';
  }

  get monthlyGetPremiumButton() {
    return this.page.locator('.video-trial-checkout-button[data-frequency="monthly"]');
  }

  get yearlyGetPremiumButton() {
    return this.page.locator('.video-trial-checkout-button[data-frequency="yearly"]');
  }

  // Present in the pricing section in both states, and again in the final CTA
  // once the trial has expired, so this is scoped to the first occurrence.
  get signInLink() {
    return this.page.getByRole('link', { name: 'Click to sign in' }).first();
  }

  get countdownBanner() {
    return this.page.locator('.video-trial-banner');
  }

  get countdownTimer() {
    return this.page.locator('#video-trial-countdown');
  }

  get heroHeading() {
    return this.page.locator('.video-trial-hero__heading');
  }

  get pricingSection() {
    return this.page.locator('#video-trial-pricing');
  }

  get comparisonTable() {
    return this.page.locator('.video-trial-comparison__table');
  }

  get browserMockup() {
    return this.page.locator('.video-trial-mockup');
  }

  get errorSection() {
    return this.page.locator('.video-trial-error');
  }

  get activeBadge() {
    return this.page.locator('.video-trial-badge--active');
  }

  get monthlyPrice() {
    return this.page.locator('[data-frequency="monthly"] .video-trial-plan__amount');
  }

  get yearlyPrice() {
    return this.page.locator('[data-frequency="yearly"] .video-trial-plan__amount');
  }

  // Sections are hidden per trial state rather than only reordered
  section(name) {
    return this.page.locator(`.video-trial-section--${name}`);
  }

  /** The trial state the page resolved, as published on <html> before paint. */
  async trialState() {
    return await this.page.locator('html').getAttribute('data-trial-state');
  }

  /** Section names in the order they are painted, ignoring hidden ones. */
  async visibleSectionOrder() {
    return await this.page.evaluate(() => [...document.querySelectorAll('.video-trial-section')]
      .filter(section => getComputedStyle(section).display !== 'none')
      .map(section => ({ name: section.className.match(/video-trial-section--(\S+)/)[1],
                         order: Number(getComputedStyle(section).order) }))
      .sort((a, b) => a.order - b.order)
      .map(section => section.name));
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/video-trial';
    const testURL = await URLHelper.addURLParameter(pageURL, optionalParam);
    await this.page.goto(testURL);
  }

  async openActiveTrial(daysElapsed = 2) {
    await this.openPage(`${VideoTrialPage.activeTrialParams(daysElapsed)}&${VideoTrialPage.campaignParams()}`);
  }

  async openExpiredTrial() {
    await this.openPage(`${VideoTrialPage.expiredTrialParams()}&${VideoTrialPage.campaignParams()}`);
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
