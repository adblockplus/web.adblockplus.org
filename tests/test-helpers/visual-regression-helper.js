import { CookieBanner } from '../test-pages/cookie-banner.js';

export class VisualRegressionHelper {

  static async PrepareForVisualRegression(test, page, browserName, channel) {
    test.skip(process.env.CI_RUN === '1' && (browserName !== 'chromium' || channel != null), "Will only run visual regression on GitLab for Chromium");

    const cookieBanner = new CookieBanner(page);
    await cookieBanner.dismissCookieBanner();

    // Map browser to snapshot name - Chrome/Edge share chromium snapshots
    const snapshotName = (browserName === 'chromium' && channel === 'msedge') ? 'edge' : browserName;
    return snapshotName;
  }

}
