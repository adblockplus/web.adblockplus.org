import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/en/ai-block-o-meter');
});

test('data has been updated within 48 hours', async ({ page }) => {
  const el = page.locator('#abom-updated');
  await expect(el).not.toHaveText('Loading…', { timeout: 10000 });

  const text = (await el.textContent()).trim();

  expect(text, '"Updated recently" — generatedAt is missing or unparseable in /data/ai-block-o-meter.json').not.toBe('Updated recently');
  expect(text, '"Data temporarily unavailable" — fetch of /data/ai-block-o-meter.json failed (network error or non-2xx HTTP response)').not.toBe('Data temporarily unavailable');
  expect(text, `"${text}" — data file has not been regenerated in over 48 hours`).not.toMatch(/^Updated ([2-9]|\d{2,}) days ago$/);
});
