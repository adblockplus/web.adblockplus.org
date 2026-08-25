import { test, expect } from '@playwright/test';
import { WhatsNewPage } from './test-pages/whats-new-page.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';
// The page's own price table, so the checkout amount is checked against the
// source the page bills from rather than against a number repeated here.
import { PRICES } from '../static/modules/prices.js';

// Payment and sign-in flows for this page are covered by the shared parameters in
// premium-payments.spec.js and block-multi-subs.spec.js. These tests cover what is
// specific to it: the stat tiles derived from the extension payload, and pricing.
//
// The expected stat strings below assume the en-US formatting the test browsers
// run with, since the page groups numbers by navigator.language.

test.describe('Whats new page - stats from the extension', () => {

  test('Derives all three tiles from the extension payload', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false, {
      blockCount: 5400,
      installDate: WhatsNewPage.installDate(340),
    });
    await whatsNew.openPage();

    await expect(whatsNew.stat('ads-blocked'), 'Counts below 10,000 should stay fully grouped').toHaveText('5,400');
    await expect(whatsNew.stat('time-saved'), '5,400 ads at 2 seconds each is 3 hours').toHaveText('3h');
    await expect(whatsNew.stat('days-protected'), 'An install 340 days ago should read as 340 days protected').toHaveText('340');
    await expect(whatsNew.headlineCount, 'The headline should repeat the blocked count').toHaveText('5,400');
  });

  test('Switches to compact notation above ten thousand', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false, {
      blockCount: 147579,
      installDate: WhatsNewPage.installDate(340),
    });
    await whatsNew.openPage();

    await expect(whatsNew.stat('ads-blocked'), 'Large counts should be compacted so they fit the tile').toHaveText('147.6K');
    await expect(whatsNew.stat('time-saved'), '147,579 ads at 2 seconds each is just over 3 days').toHaveText('3d');
    await expect(whatsNew.headlineCount, 'The headline should stay fully grouped even when the tile compacts').toHaveText('147,579');
  });

  test('Lets the bc parameter override the extension count', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false, { blockCount: 5400 });
    await whatsNew.openPage('bc=147579');

    await expect(whatsNew.stat('ads-blocked'), 'bc is the QA override and should win over the extension payload').toHaveText('147.6K');
  });

  test('Shows the extension version in the pill', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
    await whatsNew.openPage();

    await expect(whatsNew.versionPill, 'The version pill should show the running extension version').toHaveText('v4.31.0');
  });

});

test.describe('Whats new page - without extension data', () => {

  test('Falls back rather than leaving the tiles empty', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    await expect(whatsNew.stat('ads-blocked'), 'A fresh install should read zero rather than nothing').toHaveText('0');
    await expect(whatsNew.stat('time-saved'), 'Time saved should never round down to zero').toHaveText('1m');
    await expect(whatsNew.stat('days-protected'), 'Days protected should start at one').toHaveText('1');
  });

  test('Leaves the blocked-count line out of the headline at zero', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    await expect(whatsNew.headline, 'The headline should still say the extension is up to date').toContainText('up to date');
    await expect(whatsNew.headlineCount, 'We should not open with "We have blocked 0 ads for you"').toBeHidden();
  });

  test('Falls back to v1.0.0 in the version pill', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    await expect(whatsNew.versionPill, 'The pill should fall back to v1.0.0, as AdBlock does').toHaveText('v1.0.0');
  });

});

test.describe('Whats new page - pricing', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Shows US pricing per month with the yearly total spelled out', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=US');

    await expect(whatsNew.monthlyPrice, 'US monthly should be $4').toHaveText('$4');
    await expect(whatsNew.yearlyPrice, 'US yearly is $40, which is $3.33 a month').toHaveText('$3.33');
    await expect(whatsNew.yearlyBilled, 'The real yearly charge should be stated under the per-month figure').toHaveText('Billed yearly at $40');
    await expect(whatsNew.savingsBadge, 'The yearly card should carry the savings badge').toHaveText('Save 16%');
  });

  test('Shows euro pricing for an EU country', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=DE');

    await expect(whatsNew.monthlyPrice, 'EU monthly should be EUR 3.50').toHaveText('€3.50');
    await expect(whatsNew.yearlyPrice, 'EU yearly is EUR 35, which is EUR 2.92 a month').toHaveText('€2.92');
    await expect(whatsNew.yearlyBilled, 'The real yearly charge should be stated under the per-month figure').toHaveText('Billed yearly at €35');
  });

  test('Clears the price placeholders once the prices resolve', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=US');

    expect(await page.locator('.whats-new-plan__amount.placeholder').count(), 'No price should be left in its loading state').toEqual(0);
  });

});

test.describe('Whats new page - changelog', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Lists the release notes against the running version', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();
    await whatsNew.changelogSummary.click();

    await expect(whatsNew.changelogVersion, 'The changelog should name the version it describes').toHaveText('v4.31.0');
    expect(await whatsNew.changelogBullets.count(), 'The release notes should be a bullet list').toBeGreaterThan(0);
    await expect(whatsNew.changelogLink, 'The panel should link out to the full release notes').toHaveAttribute('href', /RELEASE_NOTES\.md$/);
    await expect(whatsNew.changelogLink, 'The changelog lives off-site, so it opens in a new tab').toHaveAttribute('target', '_blank');
  });

  // The summary is a block element by default, which made the whole width of the
  // section toggle the panel. Only the label and its chevron should.
  test('Keeps the toggle on the label rather than the whole row', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    const box = await whatsNew.changelogSummary.boundingBox();
    await page.mouse.click(box.x - 120, box.y + box.height / 2);
    expect(await whatsNew.changelogIsOpen(), 'Clicking beside the label should not open the panel').toEqual(false);

    await whatsNew.changelogSummary.click();
    expect(await whatsNew.changelogIsOpen(), 'Clicking the label should open the panel').toEqual(true);
  });

});

test.describe('Whats new page - content', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Compares free against Premium in a table', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    await expect(whatsNew.comparisonTable, 'The benefits section should render as a comparison table').toBeVisible();
    await expect(whatsNew.comparisonTable.getByRole('columnheader', { name: 'Free' }), 'The table should have a Free column').toBeVisible();
    await expect(whatsNew.comparisonTable.getByRole('columnheader', { name: 'Premium' }), 'The table should have a Premium column').toBeVisible();
  });

  // Neither in-page CTA starts a checkout. The visitor has not chosen a plan at
  // that point, so both send them to the cards rather than opening Paddle on a
  // plan we picked for them.
  for (const cta of ['benefitsCta', 'testimonialsCta']) {
    test(`Sends the ${cta} to the pricing cards, not to checkout`, async ({ page }) => {
      const whatsNew = new WhatsNewPage(page);
      await whatsNew.openPage('country=US');

      await expect(whatsNew[cta], 'The CTA should link to the pricing section').toHaveAttribute('href', '#whats-new-pricing');

      await whatsNew[cta].click();
      await expect(whatsNew.pricingSection, 'Clicking it should bring the pricing cards into view').toBeInViewport();
      expect(await page.locator('iframe[name="paddle_frame"]').count(), 'It should not open the payment form').toEqual(0);
    });
  }

  // It used to open a second, shorter list of the same features.
  test('Jumps from "See what is included" to the comparison table', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    await expect(whatsNew.seeIncludedLink, 'It should link to the benefits section').toHaveAttribute('href', '#whats-new-benefits');

    await whatsNew.seeIncludedLink.click();
    await expect(whatsNew.benefitsSection, 'Clicking it should bring the comparison table into view').toBeInViewport();
  });

  test('Leaves the checkout on the two pricing cards only', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=US');

    expect(await page.locator('.whats-new-checkout-button').count(), 'Only the monthly and yearly cards should start a checkout').toEqual(2);
  });

  /*
   * Geometry rather than toBeVisible(): the chevron was once pushed past the
   * card by a box-sizing quirk and clipped away by the item's overflow: hidden.
   * It still had a bounding box throughout, so a visibility check passed while
   * nothing was on screen.
   */
  test('Keeps the FAQ chevron inside its card', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    const chevron = await whatsNew.faqItems.first().locator('.whats-new-faq__chevron').boundingBox();
    const card = await whatsNew.faqItems.first().boundingBox();

    expect(chevron.x + chevron.width, 'The chevron should sit inside the card, not be clipped by it')
      .toBeLessThanOrEqual(card.x + card.width);
    expect(chevron.width, 'The chevron should have a real size').toBeGreaterThan(0);
  });

  test('Opens FAQ answers on click', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage();

    const firstItem = whatsNew.faqItems.first();
    const firstAnswer = firstItem.locator('.whats-new-faq__answer');

    await expect(firstAnswer, 'FAQ answers should start collapsed').toBeHidden();
    await firstItem.locator('summary').click();
    await expect(firstAnswer, 'Clicking a question should reveal its answer').toBeVisible();
  });

});

// ?variant picks the presentation and ?trial picks the offer. The two are
// independent, so the states below are every combination that ships, plus the
// two that nobody sends but that have to stay coherent.
test.describe('Whats new page - states', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Shows the update figures and the pay-now offer by default', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=US');

    await expect(whatsNew.statusSection, 'The page should open on the update figures').toBeVisible();
    await expect(whatsNew.promoImage, 'The promo image belongs to vpn-opd only').toBeHidden();
    await expect(whatsNew.standardHeading, 'The standard heading should be the one shown').toBeVisible();
    await expect(whatsNew.trialBadge, 'There is no trial to announce').toBeHidden();
    await expect(whatsNew.ctaLabel('monthly'), 'The CTA should sell the subscription').toHaveText('Upgrade Now');
  });

  test('Swaps the figures for the image and the heading on vpn-opd', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('variant=vpn-opd&country=US');

    await expect(whatsNew.promoImage, 'The image should stand where the figures stand').toBeVisible();
    await expect(whatsNew.statusSection, 'The update figures should be gone').toBeHidden();
    await expect(whatsNew.opdHeading, 'The campaign heading should be the one shown').toBeVisible();
    await expect(whatsNew.standardHeading, 'The standard heading should be gone').toBeHidden();
    await expect(whatsNew.heroText, 'The VPN copy comes with this variant').toContainText('Adblock Plus VPN');
    // The offer is a separate axis, so this state sells at full price.
    await expect(whatsNew.trialBadge, 'Without ?trial there is no trial').toBeHidden();
    await expect(whatsNew.ctaLabel('monthly'), 'The CTA should sell the subscription').toHaveText('Upgrade Now');
  });

  // ?variant=vpn keeps the standard heading; only vpn-opd brings its own.
  test('Keeps the standard heading on the plain vpn variant', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('variant=vpn&country=US');

    await expect(whatsNew.standardHeading, 'The heading should not change with the copy').toBeVisible();
    await expect(whatsNew.opdHeading, 'The campaign heading belongs to vpn-opd').toBeHidden();
    await expect(whatsNew.statusSection, 'The update figures should stay').toBeVisible();
    await expect(whatsNew.heroText, 'The VPN copy should be the one shown').toContainText('Adblock Plus VPN');
  });

  test('Turns the whole offer over to the trial on trial=7', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('variant=vpn-opd&trial=7&country=US');

    await expect(whatsNew.trialBadge, 'The badge should announce the trial').toContainText('7 days');
    await expect(whatsNew.trialLine, 'The paragraph should end with the offer').toBeVisible();
    await expect(whatsNew.pricingHeading, 'The pricing panel should offer the trial').toContainText('free for 7 days');
    await expect(whatsNew.ctaLabel('monthly'), 'The CTA should start the trial, not a purchase').toHaveText('Start free trial');
    await expect(whatsNew.trialFaqItem, 'The FAQ should answer what the trial creates').toBeVisible();

    const intent = await whatsNew.checkoutIntent('monthly');
    expect(intent.trial, 'The checkout should ask Paddle for the 7 day price').toEqual(7);
    expect(intent.trigger, 'The trigger should tell the two offers apart').toEqual('pricing-monthly-trial7');
  });

  test('Leaves the trial out of the FAQ and the checkout without the parameter', async ({ page }) => {
    const whatsNew = new WhatsNewPage(page);
    await whatsNew.openPage('country=US');

    await expect(whatsNew.trialFaqItem, 'The trial question should only appear with a trial').toBeHidden();
    expect((await whatsNew.checkoutIntent('monthly')).trial, 'The checkout should ask for the plain price').toEqual(0);
  });

  /*
   * The trial is the same offer everywhere: the page shows it in the visitor's
   * own currency and asks Paddle for that currency's trial price. It is the
   * price table, not the page, that decides whether such a price exists — so
   * this checks the page never quotes one offer while sending another.
   */
  for (const country of ['US', 'DE', 'JP']) {
    test(`Offers the trial in the local currency in ${country}`, async ({ page }) => {
      const whatsNew = new WhatsNewPage(page);
      await whatsNew.openPage(`variant=vpn-opd&trial=7&country=${country}`);

      await expect(whatsNew.trialBadge, 'The trial should be announced').toBeVisible();
      await expect(whatsNew.ctaLabel('monthly'), 'The CTA should start the trial').toHaveText('Start free trial');

      const intent = await whatsNew.checkoutIntent('monthly');
      expect(intent.trial, 'The checkout should ask for the trial the page is showing').toEqual(7);
      expect(intent.amount, 'The checkout should ask for this currency\'s price')
        .toEqual(PRICES[intent.currency].monthly);
    });
  }

});
