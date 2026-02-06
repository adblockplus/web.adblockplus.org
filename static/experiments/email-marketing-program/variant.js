document.documentElement.classList.add("modal-open");

const loader = document.getElementById("installed-loader");
const variant = document.getElementById("installed-variant");
const environment = location.hostname === "localhost" ? "dev"
  : location.hostname.endsWith(".web.app") ? "dev" : "live";

const USER_ACCOUNTS_DOMAIN = environment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

if (loader) {
  loader.hidden = true
}
if (variant) {
  variant.hidden = false
}

const trialOffer = document.getElementById("trial-offer");
const trialBenefits = document.getElementById("trial-offer-benefits");
const overlay = document.getElementById("installed-blur-overlay");

const skipLink = document.getElementById("skip-trial-offer");
if (skipLink) {
  skipLink.addEventListener("click", function(e) {
    adblock.log("click", {trigger: e.target.id});
    if (trialOffer) {
      trialOffer.hidden = true;
    }
    if (trialBenefits) {
      trialBenefits.hidden = false;
    }
  })
}

const ignoreLink = document.getElementById("ignore-trial-offer");
if (ignoreLink) {
  ignoreLink.addEventListener("click", function(e) {
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
  })
}

document.querySelectorAll(".installed-primary-button").forEach((element) => {
  element.href = `${USER_ACCOUNTS_DOMAIN}?flow=trial&s=abp-w`
  element.addEventListener("click", (e) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    adblock.log("click", { trigger: e.currentTarget.id });

    // set timeout before navigate to log a click
    setTimeout(() => {
      window.location.href = href;
    }, 100);
  })
});
