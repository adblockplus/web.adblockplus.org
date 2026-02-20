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
const trialEmailModal = document.getElementById("trial-offer-email");

// Trap focus: make all sibling body content inert
const backgroundEls = [...document.body.children].filter(el => el !== variant);
backgroundEls.forEach(el => el.setAttribute('inert', ''));

// Show email collection modal
if (trialEmailModal) {
  trialEmailModal.hidden = false;
  trialEmailModal.focus();
}

// Handle email form submission
const emailForm = document.getElementById("trial-email-form");
if (emailForm) {
  emailForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailInput = document.getElementById("trial-email-input");
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email) {
      alert("Please enter a valid email address");
      return;
    }

    // Log the submission
    adblock.log("click", { trigger: "submit-email-trial", email: email });

    // Construct URL with email parameter
    const url = `${USER_ACCOUNTS_DOMAIN}?email=${encodeURIComponent(email)}&flow=trial&s=abp-w&e=${adblock.experiment}-${adblock.variant}`;

    // Redirect to user portal
    window.location.href = url;
  })
}

// Handle "Maybe later" link
const skipEmailLink = document.getElementById("skip-email-trial");
if (skipEmailLink) {
  skipEmailLink.addEventListener("click", function(e) {
    e.preventDefault();
    adblock.log("click", { trigger: e.target.id });

    // Hide email modal
    if (trialEmailModal) {
      trialEmailModal.hidden = true;
    }

    // Show traditional trial offer modal
    if (trialOffer) {
      trialOffer.hidden = false;
      trialOffer.focus();
    }
  })
}

// Handle skip on trial offer (if shown after "Maybe later")
const skipTrialLink = document.getElementById("skip-trial-offer");
if (skipTrialLink) {
  skipTrialLink.addEventListener("click", function(e) {
    adblock.log("click", { trigger: e.target.id });
    document.documentElement.classList.remove('modal-open');
    if (trialOffer) {
      trialOffer.hidden = true;
    }
    if (trialEmailModal) {
      trialEmailModal.hidden = true;
    }
    if (overlay) {
      overlay.hidden = true;
    }
    backgroundEls.forEach(el => el.removeAttribute('inert'));
  })
}

// Handle accept trial offer button (if shown after "Maybe later")
const acceptTrialButton = document.getElementById("accept-trial-offer");
if (acceptTrialButton) {
  acceptTrialButton.href = `${USER_ACCOUNTS_DOMAIN}?flow=trial&s=abp-w&e=${adblock.experiment}-${adblock.variant}`
  acceptTrialButton.addEventListener("click", async (e) => {
    adblock.log("click", { trigger: e.currentTarget.id });
  })
}
