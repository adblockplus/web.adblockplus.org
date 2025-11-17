
export class CookieBanner {

  constructor(page) {
    this.page = page;
  }

  get acceptButton() {
    return this.page.getByRole('button', { name: 'Ok, got it' });
  }

  async dismissCookieBanner() {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();
    }
  }

}
