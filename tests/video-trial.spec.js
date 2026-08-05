import { test, expect } from '@playwright/test';
import { VideoTrialPage } from './test-pages/video-trial-page.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';

// Payment and sign-in flows for this page are covered by the shared parameters in
// premium-payments.spec.js and block-multi-subs.spec.js. These tests cover what is
// specific to it: the two trial states, and that each renders the right page.

test.describe('Video trial page - active trial', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Resolves the active state and counts down', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openActiveTrial();

    expect(await videoTrial.trialState(), 'Trial started 2 days into a 7 day trial should resolve as active').toEqual('active');
    await expect(videoTrial.countdownTimer, 'The countdown should show days, hours, minutes and seconds remaining').toHaveText(/^\d+d \d{2}h \d{2}m \d{2}s$/);

    const firstReading = await videoTrial.countdownTimer.textContent();
    await expect(videoTrial.countdownTimer, 'The countdown should tick down once per second').not.toHaveText(firstReading, { timeout: 5_000 });
  });

  test('Shows the features section and browser mockup, not the expired-only sections', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openActiveTrial();

    await expect(videoTrial.section('features'), 'The features section should be shown while the trial is running').toBeVisible();
    await expect(videoTrial.browserMockup, 'The browser mockup should be shown while the trial is running').toBeVisible();
    await expect(videoTrial.section('premium-features'), 'The Premium feature cards are for the expired state only').toBeHidden();
    await expect(videoTrial.section('testimonials'), 'Testimonials are for the expired state only').toBeHidden();
    await expect(videoTrial.section('final-cta'), 'The final CTA is for the expired state only').toBeHidden();
  });

  test('Orders the sections with pricing after the feature sections', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openActiveTrial();

    expect(await videoTrial.visibleSectionOrder(), 'Active trial should lead with features and comparison before pricing')
      .toEqual(['features', 'comparison', 'pricing', 'faq']);
  });

  test('Marks the video row in the comparison table as active', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openActiveTrial();

    await expect(videoTrial.activeBadge, 'The Active badge should be shown while the visitor still has the feature').toBeVisible();
  });

});

test.describe('Video trial page - expired trial', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Resolves the expired state when the trial start is older than the trial length', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openExpiredTrial();

    expect(await videoTrial.trialState(), 'A trial started 30 days into a 7 day trial should resolve as expired').toEqual('expired');
    await expect(videoTrial.countdownTimer, 'The countdown should not be shown once the trial has ended').toBeHidden();
  });

  test('Resolves the expired state when no trial parameters are given', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openPage();

    expect(await videoTrial.trialState(), 'A visitor arriving with no trial parameters should see the expired state').toEqual('expired');
  });

  test('Leads with pricing and shows the expired-only sections', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openExpiredTrial();

    expect(await videoTrial.visibleSectionOrder(), 'Expired trial should lead with pricing and drop the features section')
      .toEqual(['pricing', 'premium-features', 'comparison', 'testimonials', 'faq', 'final-cta']);
    await expect(videoTrial.section('features'), 'The features section should be dropped once the trial has ended').toBeHidden();
  });

  test('Hides the Active badge once the visitor no longer has the feature', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openExpiredTrial();

    await expect(videoTrial.comparisonTable, 'The comparison table should be shown in both trial states').toBeVisible();
    await expect(videoTrial.activeBadge, 'The Active badge should be hidden once the trial has ended').toBeHidden();
  });

});

test.describe('Video trial page - pricing', () => {

  test.beforeEach(async ({ page }) => {
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
  });

  test('Fills in prices in the visitor currency and clears the skeleton', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openPage('country=US');

    await expect(videoTrial.monthlyPrice, 'The monthly price should be populated from the price table').toHaveText('$4');
    await expect(videoTrial.yearlyPrice, 'The yearly price should be populated from the price table').toHaveText('$40');
    await expect(page.locator('.video-trial-plan.placeholder'), 'The loading skeleton should be cleared once prices are in').toHaveCount(0);
  });

  test('Shows prices in the local currency for a Euro country', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await videoTrial.openPage('country=DE');

    await expect(videoTrial.monthlyPrice, 'A German visitor should be quoted in Euros').toHaveText('€3.50');
    await expect(videoTrial.yearlyPrice, 'A German visitor should be quoted in Euros').toHaveText('€35');
  });

  test('Is reachable in both trial states', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);

    await videoTrial.openActiveTrial();
    await expect(videoTrial.pricingSection, 'Pricing should be reachable while the trial is running').toBeVisible();

    await videoTrial.openExpiredTrial();
    await expect(videoTrial.pricingSection, 'Pricing should be reachable once the trial has ended').toBeVisible();
  });

});

test.describe('Video trial page - error state', () => {

  test('Replaces the page content when checkout cannot be set up', async ({ page }) => {
    const videoTrial = new VideoTrialPage(page);
    await ExtensionHelper.mockExtensionData(page, '4.31.0', false);
    await videoTrial.openPage('has-error=1');

    await expect(videoTrial.errorSection, 'The error state should be shown when has-error is set').toBeVisible();
    await expect(videoTrial.pricingSection, 'The page content should be replaced by the error state').toBeHidden();
  });

});
