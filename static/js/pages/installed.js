'use strict';

const installedParams = new URLSearchParams(window.location.search);
const currentBrowser = installedParams.get('ap');

if (currentBrowser === "firefox") {
  const version = installedParams.get('av');

  const showDataCollectionText = (v1, v2) => {
    const thisVersion = v1.split(".").map((number) => parseInt(number));
    const lastUnsupported = v2.split(".").map((number) => parseInt(number));
    return thisVersion.some((num, i) => num > lastUnsupported[i]);
  };

  // List of release versions here: https://blog.adblockplus.org/releases
  // 3.22 introduced the content script logic to listen to the hyperlink click
  // 3.21.1 is the latest version without that support
  if (version && showDataCollectionText(version, "3.21.1")) {
    document.getElementById('fx-data-collection').style.display = 'block';
  }
}
