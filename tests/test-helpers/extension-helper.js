
import { existsSync } from 'fs';
import { join, resolve, basename } from 'path';
import { test as base, expect, chromium } from '@playwright/test';
import extractZip from "extract-zip";

export class ExtensionHelper {

  static async mockExtensionData(page, extensionVersion, isPremium) {
    await page.addInitScript((config) => {
      // This function runs in the browser context before any page scripts
      // Wait for the HTML element to be available
      const addDataAttribute = () => {
        const htmlElement = document.documentElement;
        if (htmlElement) {
          const extensionData = JSON.stringify({ isPremium: config.isPremium, version: config.version });
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
    }, { version: extensionVersion, isPremium: isPremium });
  }

static async installExtension(tempPage, channel) {

    const extensionPath = await this.downloadExtensionFile(tempPage, channel);
    const userDataDir = `/tmp/test-user-data-dir-${Date.now()}`;

    const contextOptions = {
      // Use 'msedge' for Edge (MV2), otherwise use bundled 'chromium' for better extension support
      channel: channel === 'msedge' ? 'msedge' : 'chromium',
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ]
    };

    const browserContext = await chromium.launchPersistentContext(userDataDir, contextOptions);

    // Wait for installed page to open so that it doesn't interfere with tests
    const installPagePromise = browserContext.waitForEvent('page');
    const installPage = await installPagePromise;
    await expect(installPage).toHaveURL(new RegExp('^https://adblockplus.org/en/installed/'));

    return browserContext;
  }

  static async getExtensionName(channel) {
    var extensionName;
    switch(channel) {
      case 'msedge':
        extensionName = /adblockplus-chrome-.*-mv2.zip/;
        break;
      default:
        extensionName = /adblockplus-chrome-.*-mv3.zip/;
    }
    return extensionName;
  }

  static async downloadExtensionFile(tempPage, channel) {
    const releasesUrl = 'https://gitlab.com/eyeo/browser-extensions-and-premium/extensions/extensions/-/releases';
    await tempPage.goto(releasesUrl);
    var extensionName = await this.getExtensionName(channel);
    var downloadDir = './tests/playwright/test-helpers/extension-downloads/';
    var latestDownloadLink = await tempPage.getByRole('link', { name: extensionName }).first();
    var extensionFile = await latestDownloadLink.textContent();
    const filePath = join(downloadDir, basename(extensionFile.trim(), '.zip'));

    if (!existsSync(filePath)) {
      const downloadPromise = tempPage.waitForEvent('download');
      await latestDownloadLink.click();
      const download = await downloadPromise;
      var downloadPath = await download.path();
      await extractZip(downloadPath, {dir: resolve(filePath)});
    }

    const absolutePath = resolve(filePath);
    return absolutePath;
  }
}

export const testWithExtension = base.extend({
  context: [async ({ browser, browserName, channel }, use) => {
    base.skip(browserName != 'chromium', 'Extension cannot be installed on Safari and these tests aren\'t yet supported for Firefox');
    if (browserName === 'chromium') {
      const tempContext = await browser.newContext();
      const tempPage = await tempContext.newPage();
      const context = await ExtensionHelper.installExtension(tempPage, channel);
      await tempPage.close();
      await tempContext.close();
      await use(context);
      await context.close();
    } else {
      // Fallback for other browsers (the tests are skipped for these)
      const context = await browser.newContext();
      await use(context);
      await context.close();
    }
  }, { timeout: 600_000 }]
});
