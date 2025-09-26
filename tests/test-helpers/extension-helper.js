
export class ExtensionHelper {

  static async mockExtensionData(page, extensionVersion) {
    await page.addInitScript((version) => {
      // This function runs in the browser context before any page scripts
      // Wait for the HTML element to be available
      const addDataAttribute = () => {
        const htmlElement = document.documentElement;
        if (htmlElement) {
          const extensionData = '{\"isPremium\":false,\"version\":\"' + version + '\"}';
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
    }, extensionVersion);
  }

}
