import { test, expect } from '@playwright/test';
import { PremiumPage } from './test-pages/premium-page.js';
import { VisualRegressionHelper } from './test-helpers/visual-regression-helper.js';
import { ExtensionHelper } from './test-helpers/extension-helper.js';

// Payment and Premium sign in tests that are relevant to all Premium payment pages can be found in premium-payments.spec.js

test('Premium page displays as expected', { tag: ['@visual_regression'] }, async ({ page, browserName, channel }) => {
  const premiumPage = new PremiumPage(page);
  await premiumPage.openPage('geo=DE');
  const snapshotName = await VisualRegressionHelper.PrepareForVisualRegression(test, page, browserName, channel);
  await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage: true, maxDiffPixels: 61 });
});

test('Premium page: extension already has Premium view', async ({ page }) => {
  await ExtensionHelper.mockExtensionData(page, '4.31.0', true);
  const alreadyPremiumPage = new PremiumPage(page);
  await alreadyPremiumPage.openPage();
  await expect(alreadyPremiumPage.thankYouBanner).toBeVisible();
  await expect(alreadyPremiumPage.settingsButton).toBeVisible();
  await expect(alreadyPremiumPage.helpCenterButton).toBeVisible();
});

test('Premium page: has-premium URL parameter', async ({ page }) => {
  const alreadyPremiumPage = new PremiumPage(page);
  await alreadyPremiumPage.openPage('has-premium');
  await expect(alreadyPremiumPage.thankYouBanner).toBeVisible();
  await expect(alreadyPremiumPage.settingsButton).toBeVisible();
  await expect(alreadyPremiumPage.helpCenterButton).toBeVisible();
});

test('Premium page: ?has-premium Settings link', async ({ page, context }) => {
  const alreadyPremiumPage = new PremiumPage(page);
  await alreadyPremiumPage.openPage('has-premium');
  await alreadyPremiumPage.settingsButton.click();
  // This link should go to the extension Options page (see WEBS-492 in Jira), but for now directs to a Help article
  await expect(page).toHaveURL('https://help.adblockplus.org/hc/en-us/articles/8155189140115-Get-started-with-Adblock-Plus-Premium', { timeout: 10_000 });
});

test('Premium page: ?has-premium Help link', async ({ page }) => {
  const alreadyPremiumPage = new PremiumPage(page);
  await alreadyPremiumPage.openPage('has-premium');
  await alreadyPremiumPage.helpCenterButton.click();
  await expect(page).toHaveURL('https://help.adblockplus.org/hc/en-us');
});
