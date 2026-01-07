import { test as setup } from '@playwright/test';

// QA User Accounts needs to initialise before tests run or else first test may time out
// Calling the health endpoint wakes the API
setup('Initialise User Accounts', async ({ page }) => {
  await page.goto('https://abp.ua-qa.eyeo.it/v1/health');
});
