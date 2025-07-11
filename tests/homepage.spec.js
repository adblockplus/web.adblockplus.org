import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('Cookie Banner link', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Cookie Banner does not appear on Safari');
  await page.getByRole('link', { name: 'Learn More', exact: true }).click();
  expect(page.url()).toContain('/block-cookie-banners?s=hpban');
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

test('Adblock Browser download link', async ({ page }) => {
  await page.getByRole('link', { name: 'Download Adblock Browser for' }).click();
  await expect(page).toHaveURL('https://play.google.com/store/apps/details?id=org.adblockplus.browser');
});

[
  { pageLink: 'learn more', expectedUrl: '/acceptable-ads' },
  { pageLink: '1', expectedUrl: '/#footnote' },
  { pageLink: 'Terms of Use', expectedUrl: '/terms' },
  { pageLink: 'Download Adblock Plus for another browser', expectedUrl: '/download' },
  { pageLink: 'Learn how', expectedUrl: '/acceptable-ads#optout' },
  { pageLink: 'criteria', expectedUrl: '/acceptable-ads#criteria-general' },
  { pageLink: 'forum', expectedUrl: 'https://forum.adblockplus.org//viewforum.php?f=12' },
].forEach(({ pageLink, expectedUrl }) => {
  test('Page links: ' + pageLink, async ({ page }) => {
    await page.getByRole('link', { name: pageLink, exact: true }).click();
    expect(page.url()).toContain(expectedUrl);
  });
});

test('Gnu.org link', { tag: ['@third_party_link'] }, async ({ page }) => {
  await page.getByRole('link', { name: 'GPLv3+' }).click();
  await expect(page).toHaveURL('https://www.gnu.org/licenses/gpl-3.0.html');
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
