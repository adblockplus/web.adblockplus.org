'use strict';

const installedParams = new URLSearchParams(window.location.search);
const currentBrowser = installedParams.get('ap');

if (currentBrowser.toLowerCase() === "firefox") {
  const version = installedParams.get('av');

  // List of release versions here: https://blog.adblockplus.org/releases
  // 3.22 introduced the content script logic to listen to the hyperlink click
  // 3.21.1 is the latest version without that support
  const shouldShowDataCollectionText = (version) => {
    const versionArray = version.split('.').map((number) => parseInt(number));
    const lastUnsupported = [ 3, 21, 1 ];

    for (var i in versionArray) {
      if (versionArray[i] > lastUnsupported[i]) {
        return true;
      }
      else if (versionArray[i] < lastUnsupported[i]) {
        return false;
      }
      else if (versionArray.length - 1 == i) {
        return false;
      }
    }
  };

  if (version && shouldShowDataCollectionText(version)) {
    document.getElementById('fx-data-collection').style.display = 'block';
  }
}
