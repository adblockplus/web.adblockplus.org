import { test as setup } from '@playwright/test';

// QA User Accounts needs to initialise before tests run or else first test may time out
// Calling the health endpoints wakes the API
setup('Initialise User Accounts', async ({ page }) => {
  await page.goto('https://api.ua-qa.eyeo.it/v1/health');
  await page.goto('https://webhook.ua-qa.eyeo.it/health');
});
