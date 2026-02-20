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

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPLOYEE_DOMAINS = ['@adblockplus.org', '@eyeo.com'];

function validateEmail(email) {
  // Check basic format
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Check for '+' character (email alias abuse prevention)
  if (email.includes('+')) {
    // Allow '+' for employee domains
    const isEmployeeDomain = EMPLOYEE_DOMAINS.some(domain => email.endsWith(domain));
    if (!isEmployeeDomain) {
      return { valid: false, error: "Email addresses with '+' are not allowed" };
    }
  }

  return { valid: true };
}

function showEmailError(message) {
  const emailInput = document.getElementById("trial-email-input");
  let errorElement = document.getElementById("trial-email-error");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = "trial-email-error";
    errorElement.className = "installed-email-error";
    emailInput.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
  errorElement.hidden = false;
  emailInput.classList.add("installed-email-input--error");
  emailInput.setAttribute("aria-invalid", "true");
  emailInput.setAttribute("aria-describedby", "trial-email-error");
}

function clearEmailError() {
  const emailInput = document.getElementById("trial-email-input");
  const errorElement = document.getElementById("trial-email-error");

  if (errorElement) {
    errorElement.hidden = true;
  }

  emailInput.classList.remove("installed-email-input--error");
  emailInput.removeAttribute("aria-invalid");
  emailInput.removeAttribute("aria-describedby");
}

// Handle email form submission
const emailForm = document.getElementById("trial-email-form");
if (emailForm) {
  const emailInput = document.getElementById("trial-email-input");

  // Clear error on input
  if (emailInput) {
    emailInput.addEventListener("input", clearEmailError);
  }

  emailForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput ? emailInput.value.trim() : "";

    if (!email) {
      showEmailError("Please enter your email address");
      return;
    }

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      showEmailError(validation.error);
      return;
    }

    // Clear any errors
    clearEmailError();

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
