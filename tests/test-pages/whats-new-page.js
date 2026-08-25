import { URLHelper } from '../test-helpers/url-helper.js';

export class WhatsNewPage {

  constructor(page) {
    this.page = page;
  }

  /**
   * Install date as epoch milliseconds. A helper rather than a fixture because a
   * hardcoded timestamp would make the "days protected" tile count up forever.
   */
  static installDate(daysAgo) {
    return Date.now() - daysAgo * 24 * 60 * 60 * 1000;
  }

  get monthlyGetPremiumButton() {
    return this.page.locator('.whats-new-checkout-button[data-frequency="monthly"]');
  }

  // The yearly plan is also offered from the benefits and testimonials sections,
  // so this is scoped to the pricing card.
  get yearlyGetPremiumButton() {
    return this.page.locator('#whats-new-pricing .whats-new-checkout-button[data-frequency="yearly"]');
  }

  get signInLink() {
    return this.page.getByRole('link', { name: 'Click to sign in' }).first();
  }

  get headline() {
    return this.page.locator('.whats-new-status__headline');
  }

  get headlineCount() {
    return this.page.locator('.whats-new-status__count');
  }

  get versionPill() {
    return this.page.locator('.whats-new-header__version');
  }

  //////////////////////////////////////////////////////////////////////////////
  // States — ?variant and ?trial. See the Variants block in whats-new.css.
  //////////////////////////////////////////////////////////////////////////////

  // The two first blocks. One of them is always hidden rather than absent, so
  // these are checked with toBeVisible() rather than by counting.
  get statusSection() {
    return this.page.locator('.whats-new-status');
  }

  get promoImage() {
    return this.page.locator('.whats-new-promo__image');
  }

  get standardHeading() {
    return this.page.locator('[data-wn-heading-only="standard"]');
  }

  get opdHeading() {
    return this.page.locator('[data-wn-heading-only="opd"]');
  }

  /** The hero paragraph the current copy shows, and its trial sentence. */
  get heroText() {
    return this.page.locator('.whats-new-hero__text:visible');
  }

  get trialLine() {
    return this.heroText.locator('.whats-new-hero__trial-line');
  }

  get trialBadge() {
    return this.page.locator('.whats-new-trial-badge');
  }

  get pricingHeading() {
    return this.page.locator('.whats-new-pricing__heading:visible');
  }

  get trialFaqItem() {
    return this.page.locator('.whats-new-faq__item[data-wn-offer="trial"]');
  }

  /**
   * The label a CTA is showing.
   *
   * Both labels ship inside the button and the CSS hides one, so the button's
   * text content holds them both — this is the one the visitor reads.
   *
   * @param {string} frequency - "monthly" or "yearly"
   */
  ctaLabel(frequency = 'monthly') {
    return this.page.locator(`.whats-new-checkout-button[data-frequency="${frequency}"] span:visible`);
  }

  /**
   * What a pricing button would send to Paddle, as click tracking records it.
   *
   * @param {string} frequency - "monthly" or "yearly"
   * @returns {object} the parsed data-click payload
   */
  async checkoutIntent(frequency = 'monthly') {
    const attribute = await this.page
      .locator(`.whats-new-checkout-button[data-frequency="${frequency}"]`)
      .getAttribute('data-click');
    return JSON.parse(attribute || '{}');
  }

  get savingsBadge() {
    return this.page.locator('#whats-new-savings');
  }

  get comparisonTable() {
    return this.page.locator('.whats-new-comparison__table');
  }

  // The two in-page CTAs, under the benefits table and under the testimonials.
  // Both link to the pricing cards; neither starts a checkout.
  get benefitsCta() {
    return this.page.locator('.whats-new-benefits .whats-new-button');
  }

  get testimonialsCta() {
    return this.page.locator('.whats-new-testimonials .whats-new-button');
  }

  get seeIncludedLink() {
    return this.page.locator('.whats-new-jump__link');
  }

  get benefitsSection() {
    return this.page.locator('#whats-new-benefits');
  }

  get pricingSection() {
    return this.page.locator('#whats-new-pricing');
  }

  // Visible ones only: the trial question ships in the markup on every state
  // and is hidden unless the URL asked for a trial, so an unfiltered .first()
  // would reach for a card that is not on the page.
  get faqItems() {
    return this.page.locator('.whats-new-faq__item:visible');
  }

  get changelog() {
    return this.page.locator('.whats-new-disclosure').first();
  }

  get changelogSummary() {
    return this.page.locator('.whats-new-disclosure__summary').first();
  }

  get changelogVersion() {
    return this.page.locator('.whats-new-changelog__version');
  }

  get changelogBullets() {
    return this.page.locator('.whats-new-changelog__list li');
  }

  get changelogLink() {
    return this.page.locator('.whats-new-changelog__more a');
  }

  async changelogIsOpen() {
    return await this.changelog.evaluate(details => details.open);
  }

  get monthlyPrice() {
    return this.page.locator('[data-frequency="monthly"] .whats-new-plan__amount');
  }

  get yearlyPrice() {
    return this.page.locator('[data-frequency="yearly"] .whats-new-plan__amount');
  }

  get monthlyBilled() {
    return this.page.locator('[data-billed-for="monthly"]');
  }

  get yearlyBilled() {
    return this.page.locator('[data-billed-for="yearly"]');
  }

  /** One of 'ads-blocked', 'time-saved' or 'days-protected'. */
  stat(name) {
    return this.page.locator(`[data-stat="${name}"]`);
  }

  async openPage(optionalParam = '') {
    const pageURL = '/en/whats-new';
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
