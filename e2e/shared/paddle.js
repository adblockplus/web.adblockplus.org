import { test, expect } from "playwright/test";

export async function expectPaddlePresents(page, {title, frequency, formattedAmount}) {
  const frame = page.frameLocator('iframe[name="paddle_frame"]');
  await expect(await frame.getByTestId("cart-item-name")).toContainText(title);
  if (frequency != "once") {
    await expect(await frame.getByTestId("summary-total-trial-or-recurring")).toContainText(frequency);
  }
  await expect(await frame.getByTestId("price-summary")).toContainText(formattedAmount);
}

export async function closePaddleForm(page) {
  await page.frameLocator('iframe[name="paddle_frame"]').getByTestId("wideOverlayCloseIcon").click();
}
