'use strict';

const installedParams = new URLSearchParams(window.location.search);
const currentBrowser = installedParams.get('ap');

if (currentBrowser === "firefox") {
  const minSupportedVersion = 3.22;
  const dataCollectionParagraph = document.getElementById('fx-data-collection');
  const versionNumber = parseFloat(installedParams.get('av'));

  if (!isNaN(versionNumber) && versionNumber >= minSupportedVersion) {
    dataCollectionParagraph.style.display = 'block';
  }
}
