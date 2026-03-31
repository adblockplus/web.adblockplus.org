/**
 * Init experiment for Email Marketing Program
 * */
function applyControl() {
  const loader = document.getElementById("installed-loader");
  if (loader) {
    loader.hidden = true;
  }
  const overlay = document.getElementById("installed-blur-overlay");
  if (overlay) {
    overlay.hidden = true;
  }
}

async function setupExperiment() {
  adblock.setupExperiment({
    id: "EMP",
    conditions: () => !localStorage.getItem('EMP-completed')
        && ["US", "CA", "AU"].includes(adblock.settings.country)
        && adblock.settings.locale === 'en',
    noParticipateCallback: applyControl,
    trafficAllocation: 7.5,
    control: {
      script: "/experiments/email-marketing-program/control.js"
    },
    variants: [
      {script: "/experiments/email-marketing-program/variant.js"},
      {script: "/experiments/email-marketing-program/variant-2.js"},
    ],
  });
}

setupExperiment();
