import { test, expect } from '@playwright/test';
import { VisualRegressionHelper } from './test-helpers/visual-regression-helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('Homepage displays as expected', { tag: ['@visual_regression'] }, async ({ page, browserName, channel }) => {
  const snapshotName = await VisualRegressionHelper.PrepareForVisualRegression(test, page, browserName, channel);
  await expect(page).toHaveScreenshot(`${snapshotName}.png`, { fullPage: true, maxDiffPixels: 408 });
});

// Phones show a mobile intro in place of the desktop one, which holds the
// page's only h1 and the sentence that defines Adblock Plus. On phones,
// screen readers must still find the h1 and that sentence, and the layout
// must not change.
const phones = [
  {
    name: 'Android Chrome',
    bodyClass: /android/,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  },
  {
    name: 'Samsung Internet',
    bodyClass: /android.*samsungBrowser|samsungBrowser.*android/,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36',
  },
  {
    name: 'iPhone Safari',
    bodyClass: /ios/,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  },
];

for (const phone of phones) {
  test(`Phones still get the main headline: ${phone.name}`, async ({ browser }) => {
    const context = await browser.newContext({ userAgent: phone.userAgent });
    const page = await context.newPage();
    await page.goto('');
    await expect(page.locator('body'), `detected as ${phone.name}`).toHaveClass(phone.bodyClass);
    await expect(page.getByRole('heading', { level: 1 }), 'exactly one h1 available to screen readers').toHaveCount(1);
    await expect(page.locator('#intro-standard-definition'), 'definition sentence is not display: none').not.toHaveCSS('display', 'none');
    await expect(page.locator('#install-button'), 'desktop install button stays hidden').toBeHidden();
    await context.close();
  });
}

test('AI Block-o-Meter link', async ({ page, browserName }) => {
  await page.locator('#abom-banner-cta').click();
  expect(page.url()).toContain('/ai-block-o-meter?s=hpban');
});

test('Extension download link', { tag: ['@all_browsers'] }, async ({ page, browserName, channel }) => {
  if (browserName !== 'webkit') {
    await page.locator('#install-button').click();
  }
  switch(browserName) {
    case 'firefox':
      await expect(page).toHaveURL('https://addons.mozilla.org/en-US/firefox/addon/adblock-plus/');
      break;
    case 'webkit':
      // Playwright cannot interact with App Store so check link is correct without clicking
      await expect(page.locator('#install-button')).toHaveAttribute('href', 'https://apps.apple.com/us/app/adblock-plus-for-safari-abp/id1432731683');
      break;
    default:
      switch(channel) {
        case 'msedge':
          await expect(page).toHaveURL('https://microsoftedge.microsoft.com/addons/detail/adblock-plus-free-ad-bl/gmgoamodcdcjnbaobigkjelfplakmdhh');
          break;
        default:
          await expect(page).toHaveURL('https://chromewebstore.google.com/detail/adblock-plus-free-ad-bloc/cfhdojbkjhnklbpkdaibdccddilifddb');
      }
  };
});

[
  { pageLink: 'Terms of Use', expectedUrl: '/terms' },
  { pageLink: 'Download Adblock Plus for another browser', expectedUrl: '/download' },
  { pageLink: 'Block YouTube ads in another browser', expectedUrl: '/youtube' },
  { pageLink: 'Learn more about Acceptable Ads', expectedUrl: '/acceptable-ads' },
].forEach(({ pageLink, expectedUrl }) => {
  test('Page links: ' + pageLink, async ({ page }) => {
    await page.getByRole('link', { name: pageLink, exact: true }).click();
    expect(page.url()).toContain(expectedUrl);
  });
});

test('Gnu.org link', { tag: ['@third_party_link'] }, async ({ page }) => {
  await expect(page.getByRole('link', { name: 'GPLv3+' })).toHaveAttribute('href', 'https://www.gnu.org/licenses/gpl.html');
});

[
  { pageLink: 'Business Insider logo', expectedUrl: 'https://www.businessinsider.com/theres-nothing-wrong-about-the-way-adblock-plus-makes-money-2015-9' },
  { pageLink: 'Tech Crunch logo', expectedUrl: 'https://techcrunch.com/2016/05/09/adblock-plus-closes-in-on-a-billion-downloads/' },
  { pageLink: 'Wall St. Journal logo', expectedUrl: 'https://www.wsj.com/articles/adblock-plus-chief-till-faida-says-consumers-are-fed-up-with-current-online-ads-1462981668' },
  { pageLink: 'New York Times logo', expectedUrl: 'https://www.nytimes.com/2015/08/20/technology/personaltech/ad-blockers-and-the-nuisance-at-the-heart-of-the-modern-web.html' },
  { pageLink: 'Media post logo', expectedUrl: 'https://www.mediapost.com/publications/article/289691/adblock-plus-comes-to-new-york.html' },
].forEach(({ pageLink, expectedUrl }) => {
  test('As mentioned on links: ' + pageLink, { tag: ['@third_party_link'] }, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Only need to test third party links on Chromium');
    const pagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: pageLink }).click();
    const newTab = await pagePromise;
    await expect(newTab).toHaveURL(expectedUrl);
  });
});
