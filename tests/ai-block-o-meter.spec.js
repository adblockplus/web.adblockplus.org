import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/en/ai-block-o-meter');
});

test('/ai-block-o-meter data has been updated within 48 hours', async ({ page }) => {
  test.skip(process.env.STAGING === '1', "Fresh data will only display for production, staging env shows stale data");
  const el = page.locator('#abom-updated');
  await expect(el, 'abom-updated should leave loading state within 10s — check /data/ai-ad-data.json is reachable').not.toHaveText('Loading…', { timeout: 10000 });
  const text = (await el.textContent()).trim();

  expect(text, '"Updated recently" — generatedAt is missing or unparseable in /data/ai-ad-data.json').not.toBe('Updated recently');
  expect(text, '"Data temporarily unavailable" — fetch of /data/ai-ad-data.json failed (network error or non-2xx HTTP response)').not.toBe('Data temporarily unavailable');
  expect(text, `"${text}" — data file has not been regenerated in over 48 hours`).not.toMatch(/^Updated ([2-9]|\d{2,}) days ago$/);
});

test('/ai-block-o-meter ChatGPT data is shown with a LIVE badge', async ({ page }) => {
  const chatgptCard = page.locator('.abom-pc').filter({ has: page.locator('.abom-pc-name', { hasText: 'ChatGPT' }) });
  await expect(chatgptCard, 'ChatGPT platform card should be visible').toBeVisible({ timeout: 10000 });
  await expect(chatgptCard.locator('.abom-badge--live'), 'ChatGPT card should show a LIVE badge').toBeVisible({ timeout: 10000 });
  const countEl = chatgptCard.locator('.abom-pc-count');
  await expect(countEl, 'ChatGPT count element should be visible').toBeVisible({ timeout: 10000 });
  const countText = await countEl.textContent();
  const count = parseInt(countText.replace(/,/g, ''), 10);
  expect(count, 'ChatGPT all-time ad count should be greater than zero').toBeGreaterThan(0);
});
