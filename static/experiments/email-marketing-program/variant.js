document.documentElement.classList.add("modal-open");

const loader = document.getElementById("installed-loader");
const variant = document.getElementById("installed-variant");
const overlay = document.getElementById("installed-blur-overlay");
const environment = location.hostname === "localhost" ? "dev"
  : location.hostname.endsWith(".web.app") ? "dev" : "live";

const USER_ACCOUNTS_DOMAIN = environment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

if (loader) {
  loader.hidden = true
}
if (variant) {
  variant.hidden = false
}
if (overlay) {
  overlay.hidden = false
}

const trialOffer = document.getElementById("trial-offer");
const trialBenefits = document.getElementById("trial-offer-benefits");

// Trap focus: make all sibling body content inert
const backgroundEls = [...document.body.children].filter(el => el !== variant);
backgroundEls.forEach(el => el.setAttribute('inert', ''));

// Move focus into the dialog so screen readers announce it without highlighting a button
if (variant) variant.focus();

const ignoreLink = document.getElementById("ignore-trial-offer");
if (ignoreLink) {
  ignoreLink.addEventListener("click", function(e) {
    adblock.log("click", {trigger: e.target.id});
    if (trialBenefits) {
      trialBenefits.hidden = true;
    }
    if (trialOffer) {
      trialOffer.hidden = false;
      trialOffer.focus();
    }
  })
}

const skipLink = document.getElementById("skip-trial-offer");
if (skipLink) {
  skipLink.addEventListener("click", function(e) {
    adblock.log("click", {trigger: e.target.id});
    document.documentElement.classList.remove('modal-open');
    if (trialOffer) {
      trialOffer.hidden = true;
    }
    if (trialBenefits) {
      trialBenefits.hidden = true;
    }
    if (overlay) {
      overlay.hidden = true;
    }
    backgroundEls.forEach(el => el.removeAttribute('inert'));
  })
}

document.querySelectorAll(".installed-primary-button").forEach((element) => {
  element.href = `${USER_ACCOUNTS_DOMAIN}?flow=trial&s=abp-w&e=${adblock.experiment}-${adblock.variant}`
  element.addEventListener("click", async (e) => {
    adblock.log("click", { trigger: e.currentTarget.id });
  })
});
