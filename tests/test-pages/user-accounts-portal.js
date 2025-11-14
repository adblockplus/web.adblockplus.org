import { expect } from '@playwright/test';

export class UserAccountsPortal {

  // The User Accounts portal is located in a separate repository
  // This supports testing that the website hands off to the User Accounts portal correctly

  constructor(page) {
    this.page = page;
  }

  get emailField() {
    return this.page.locator('#enter-email-email');
  }

  get sendCodeButton() {
    return this.page.locator('#enter-email-submit');
  }

  get setUpCodeField1() {
    return this.page.locator('#finish-setup-input-1');
  }

  get setUpCodeField2() {
    return this.page.locator('#finish-setup-input-2');
  }

  get setUpCodeField3() {
    return this.page.locator('#finish-setup-input-3');
  }

  get setUpCodeField4() {
    return this.page.locator('#finish-setup-input-4');
  }

  get setUpCodeField5() {
    return this.page.locator('#finish-setup-input-5');
  }

  get setUpCodeField6() {
    return this.page.locator('#finish-setup-input-6');
  }

  get setUpVerifyButton() {
    return this.page.locator('#finish-setup-submit');
  }

  get restoreCodeField1() {
    return this.page.locator('#enter-otp-input-1');
  }

  get restoreCodeField2() {
    return this.page.locator('#enter-otp-input-2');
  }

  get restoreCodeField3() {
    return this.page.locator('#enter-otp-input-3');
  }

  get restoreCodeField4() {
    return this.page.locator('#enter-otp-input-4');
  }

  get restoreCodeField5() {
    return this.page.locator('#enter-otp-input-5');
  }

  get restoreCodeField6() {
    return this.page.locator('#enter-otp-input-6');
  }

  get restoreVerifyButton() {
    return this.page.locator('#enter-otp-submit');
  }

  async checkUserAccountsEmailLoginPageLoaded() {
    await expect(this.emailField).toBeVisible();
    await expect(this.sendCodeButton).toBeVisible();
  }

  async checkUserAccountsSetUpCodePageLoaded() {
    await expect(this.setUpCodeField1).toBeVisible({ timeout: 15_000 });
    await expect(this.setUpCodeField2).toBeVisible();
    await expect(this.setUpCodeField3).toBeVisible();
    await expect(this.setUpCodeField4).toBeVisible();
    await expect(this.setUpCodeField5).toBeVisible();
    await expect(this.setUpCodeField6).toBeVisible();
    await expect(this.setUpVerifyButton).toBeVisible();
  }

  async checkUserAccountsRestoreCodePageLoaded() {
    await expect(this.restoreCodeField1).toBeVisible({ timeout: 15_000 });
    await expect(this.restoreCodeField2).toBeVisible();
    await expect(this.restoreCodeField3).toBeVisible();
    await expect(this.restoreCodeField4).toBeVisible();
    await expect(this.restoreCodeField5).toBeVisible();
    await expect(this.restoreCodeField6).toBeVisible();
    await expect(this.restoreVerifyButton).toBeVisible();
  }

}
