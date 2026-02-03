const loader = document.getElementById("installed-loader");
const control = document.getElementById("installed")
const variant = document.getElementById("installed-variant");

// TODO: wait for final design to be approved
// document.documentElement.classList.add("background--pattern");
document.documentElement.classList.add("background--color");

const environment = location.hostname === "localhost" ? "dev"
  : location.hostname.endsWith(".web.app") ? "dev" : "live";

const USER_ACCOUNTS_DOMAIN = environment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

if (loader) {
  loader.hidden = true
}

if (variant && control) {
  variant.hidden = false;
  control.hidden = true;
}

const trialOffer = document.getElementById("trial-offer");
const trialBenefits = document.getElementById("trial-offer-benefits");
const skipLink = document.getElementById("skip-trial-offer");
const offerAcceptLink = document.getElementById("accept-trial-offer");
if (offerAcceptLink) {
  offerAcceptLink.href = `${USER_ACCOUNTS_DOMAIN}?flow=trial&s=abp-w`
}
const activateTrialLink = document.getElementById("activate-trial");
if (activateTrialLink) {
  activateTrialLink.href = `${USER_ACCOUNTS_DOMAIN}?flow=trial&s=abp-w`
}

if (skipLink) {
  skipLink.addEventListener("click", function() {
    adblock.log("click", {trigger: 'skip-trial-offer'});
    trialOffer.hidden = true;
    trialBenefits.hidden = false;
  })
}

function handleTrialAccepted(e) {
  e.preventDefault();

  const href = e.currentTarget.href;
  adblock.log("click", { trigger: e.currentTarget.id });

  // set timeout before navigate to log a click
  setTimeout(() => {
    window.location.href = href;
  }, 100);
}

if (offerAcceptLink) {
  offerAcceptLink.addEventListener("click", handleTrialAccepted)
}

if (activateTrialLink) {
  activateTrialLink.addEventListener("click", handleTrialAccepted)
}

