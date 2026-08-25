
export class ExtensionHelper {

  /**
   * Fake the payload the extension injects onto <html>.
   *
   * @param {import('@playwright/test').Page} page
   * @param {string} extensionVersion - e.g. '4.31.0'
   * @param {boolean} isPremium - whether Premium is active
   * @param {object} [extra] - further payload fields, e.g. { blockCount, installDate }.
   *   The extension sends more than a version and a Premium flag, and /whats-new
   *   reads blockCount and installDate; anything passed here is merged in.
   */
  static async mockExtensionData(page, extensionVersion, isPremium, extra = {}) {
    await page.addInitScript((config) => {
      // This function runs in the browser context before any page scripts
      // Wait for the HTML element to be available
      const addDataAttribute = () => {
        const htmlElement = document.documentElement;
        if (htmlElement) {
          const extensionData = JSON.stringify({ isPremium: config.isPremium, version: config.version, ...config.extra });
          htmlElement.setAttribute('data-adblock-plus-extension-info', extensionData);
        }
      };
      // Try to add immediately if DOM is already available
      if (document.documentElement) {
        addDataAttribute();
      } else {
        // If not available yet, wait for DOM content to load
        document.addEventListener('DOMContentLoaded', addDataAttribute);
      }
    }, { version: extensionVersion, isPremium: isPremium, extra: extra });
  }

}
