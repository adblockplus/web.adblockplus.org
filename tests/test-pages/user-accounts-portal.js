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

  get codeField1() {
    return this.page.locator('#finish-setup-input-1');
  }

  get codeField1() {
    return this.page.locator('#finish-setup-input-1');
  }

  get codeField2() {
    return this.page.locator('#finish-setup-input-2');
  }

  get codeField3() {
    return this.page.locator('#finish-setup-input-3');
  }

  get codeField4() {
    return this.page.locator('#finish-setup-input-4');
  }

  get codeField5() {
    return this.page.locator('#finish-setup-input-5');
  }

  get codeField6() {
    return this.page.locator('#finish-setup-input-6');
  }

  get verifyButton() {
    return this.page.locator('#finish-setup-submit');
  }

  async checkUserAccountsEmailLoginPageLoaded() {
    await expect(this.emailField).toBeVisible();
    await expect(this.sendCodeButton).toBeVisible();
  }

  async checkUserAccountsCodePageLoaded() {
    await expect(this.codeField1).toBeVisible({ timeout: 12_000 });
    await expect(this.codeField2).toBeVisible();
    await expect(this.codeField3).toBeVisible();
    await expect(this.codeField4).toBeVisible();
    await expect(this.codeField5).toBeVisible();
    await expect(this.codeField6).toBeVisible();
    await expect(this.verifyButton).toBeVisible();
  }

}
