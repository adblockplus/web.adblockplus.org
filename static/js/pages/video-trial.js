/**
 * Video trial — reverse-trial upsell campaign page.
 *
 * Traffic arrives from the extension's reverse-trial on-page dialog, e.g.
 *   /video-trial?trialStarted=<epoch-ms>&trial=7&s=reverse_trial_opd
 *     &opdStep=<n>&ipm-campaign-id=<id>
 *
 * Trial state is already resolved by the inline script in pages/video-trial.html
 * and exposed on document.documentElement.dataset, so it is not re-parsed here.
 */

import { checkout } from "../../modules/paddle.js";
import { getDollarString, getDollarNumber } from "../../modules/currency.js";
import { fireGAConversionEvent } from "../../modules/conversion.js";
import { USER_ACCOUNTS_BASE_URL } from "../../modules/environment.js";
import {
  PRICES,
  LONG_AMOUNT_CURRENCIES,
  getCurrency,
  getYearlySavingsPercent,
} from "../../modules/prices.js";

const root = document.documentElement;

const trialState = root.dataset.trialState;
const trialDays = parseInt(root.dataset.trialDays, 10) || 7;
const trialEndsAt = parseInt(root.dataset.trialEndsAt, 10) || 0;

const currency = getCurrency();

const opdStep = adblock.query.get("opdStep") || "";
const campaignId = adblock.query.get("ipm-campaign-id") || "";

/**
 * Extra dimensions for campaign attribution, added to the checkout-start click
 * and the conversion event. There is no custom pageview: the shared `load` event
 * from includes/scripts/load-tracking.html is ABP's pageview and already carries
 * the full query string as urlParams, matching /premium, /update and /installed.
 *
 * A function rather than a constant because the countdown flips
 * `data-trial-state` to expired in place, so a conversion late in the session
 * must not report the state the page loaded with.
 */
function campaignFields() {
  return { trialState: root.dataset.trialState, opdStep, campaignId };
}

function text(id) {
  return adblock.strings[id] || "";
}

function showError() {
  root.dataset.videoTrialError = "1";
}

////////////////////////////////////////////////////////////////////////////////
// TRIAL LENGTH COPY
////////////////////////////////////////////////////////////////////////////////

// Substitute the trial length into the first FAQ question.
const faqQuestion = document.getElementById("video-trial-faq-after-trial");
if (faqQuestion) {
  faqQuestion.textContent = text("video-trial-faq__after-trial-question")
    .replace("{days}", trialDays);
}

////////////////////////////////////////////////////////////////////////////////
// COUNTDOWN
////////////////////////////////////////////////////////////////////////////////

const countdown = document.getElementById("video-trial-countdown");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const remaining = Math.max(0, trialEndsAt - Date.now());

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remaining % (60 * 1000)) / 1000);

  const d = text("video-trial-countdown__days");
  const h = text("video-trial-countdown__hours");
  const m = text("video-trial-countdown__minutes");
  const s = text("video-trial-countdown__seconds");

  if (countdown) {
    countdown.textContent = `${days}${d} ${pad(hours)}${h} ${pad(minutes)}${m} ${pad(seconds)}${s}`;
  }

  if (remaining <= 0) {
    // Flip the whole page to the expired treatment in place.
    root.dataset.trialState = "expired";
    return false;
  }

  return true;
}

if (trialEndsAt && trialState === "active") {
  updateCountdown();
  const timer = setInterval(() => {
    if (!updateCountdown()) clearInterval(timer);
  }, 1000);
}

////////////////////////////////////////////////////////////////////////////////
// PRICES
////////////////////////////////////////////////////////////////////////////////

try {
  adblock.api.updateVATState(currency);

  document.querySelectorAll(".video-trial-plan__price").forEach(price => {
    const amount = PRICES[currency][price.dataset.frequency];
    const amountElement = price.querySelector(".video-trial-plan__amount");
    if (!amountElement) return;
    amountElement.textContent = getDollarString(currency, amount, false);
    if (LONG_AMOUNT_CURRENCIES.includes(currency)) {
      amountElement.classList.add("video-trial-plan__amount--long");
    }
  });

  const savings = document.getElementById("video-trial-savings");
  if (savings) {
    savings.textContent = text("video-trial-pricing__savings")
      .replace("{savingsPercent}", getYearlySavingsPercent(currency));
  }

  document.querySelectorAll(".placeholder").forEach(el => el.classList.remove("placeholder"));
} catch (error) {
  adblock.logScriptError("video-trial.prices", error);
  showError();
}

////////////////////////////////////////////////////////////////////////////////
// CHECKOUT
////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll(".video-trial-checkout-button").forEach((button, index) => {
  const frequency = button.dataset.frequency;
  const amount = PRICES[currency][frequency];
  const trigger = `pricing-${frequency}`;

  // Picked up by includes/scripts/click-tracking.html
  button.dataset.click = JSON.stringify({
    type: "checkout-start",
    currency,
    frequency,
    amount,
    trigger,
    ...campaignFields(),
  });

  button.addEventListener("click", () => {
    try {
      checkout({ product: "premium", currency, frequency, amount, trigger });
    } catch (error) {
      adblock.logScriptError("video-trial.checkout", error);
      showError();
    }
  });
});

adblock.on("checkout.completed", data => {
  if (!data.transaction_id || !data.customer || !data.customer.email) return;

  /*
   * Show the duplicate-subscription spinner while the portal takes over, as
   * /premium and /update do. Only the attribute is needed — the selector in
   * prevent-duplicate-subscription.css is unscoped, and #account-restore is
   * already a body-level element, so re-parenting it would only restart the
   * loader animation.
   */
  root.dataset.account = "finding";

  const custom = data.custom_data || {};

  /*
   * modules/paddle.js writes this key as `subType` in its customData, but every
   * existing reader — paddle.js itself, premium-checkout-user-accounts.js, update
   * and installed — reads `sub_type`. Only one of those can be right, and
   * fireGAConversionEvent needs an exact "monthly"/"yearly" to resolve a send_to,
   * so a wrong key means no conversion is reported at all. Accepting both keeps
   * this page correct either way; the discrepancy itself needs fixing centrally.
   */
  const frequency = custom.sub_type || custom.subType;
  const currency = custom.currency;
  const amount = custom.amount_cents;

  try {
    if (frequency && currency && amount) {
      fireGAConversionEvent(frequency, currency, `${getDollarNumber(currency, amount)}`);
    } else {
      adblock.logScriptError("video-trial.conversion-data", new Error(
        `Incomplete conversion data: frequency=${frequency} currency=${currency} amount=${amount}`
      ));
    }
  } catch (error) {
    adblock.logScriptError("video-trial.conversion", error);
  }

  /*
   * Same event name as /premium so it lands in the existing dashboards;
   * adblock.log() adds pageName and the full urlParams, and the campaign fields
   * are promoted so the conversion is attributable without parsing that blob.
   */
  adblock.log("premium-checkout__paddle-complete",
    { frequency, currency, amount, ...campaignFields() });

  const transactionId = encodeURIComponent(data.transaction_id);
  const email = encodeURIComponent(data.customer.email);
  // Safe to redirect immediately: conversion.js sends via transport_type "beacon",
  // which survives unload, so there is no need to race a timeout.
  window.location.href =
    `${USER_ACCOUNTS_BASE_URL}?transaction_id=${transactionId}&email=${email}&s=abp-w`;
});

document.querySelectorAll(".video-trial-sign-in-link").forEach(link => {
  link.href = `${USER_ACCOUNTS_BASE_URL}?premium=false&s=abp-w`;
});

////////////////////////////////////////////////////////////////////////////////
// PAGE CHROME
////////////////////////////////////////////////////////////////////////////////

const nav = document.getElementById("video-trial-nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("video-trial-nav--scrolled", window.scrollY > 10);
  }, { passive: true });
}

/**
 * Publish the real height of the sticky banner + nav so anchor targets land flush
 * underneath them. Measured rather than hard-coded because the banner wraps to a
 * second line on narrow viewports, which a fixed offset would not track.
 */
function syncStickyOffset() {
  const banner = document.querySelector(".video-trial-banner");
  const height = (banner ? banner.offsetHeight : 0) + (nav ? nav.offsetHeight : 0);
  if (height > 0) root.style.setProperty("--vt-sticky-height", `${height}px`);
}

syncStickyOffset();
window.addEventListener("resize", syncStickyOffset, { passive: true });
// Detection can reflow the banner and nav, so re-measure once it has settled
adblock.afterAdblockPlusDetected(syncStickyOffset, true);

const revealTargets = document.querySelectorAll("[data-reveal]");

function revealAll() {
  revealTargets.forEach(target => target.classList.add("video-trial--revealed"));
}

if (revealTargets.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("video-trial--revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(target => observer.observe(target));
} else {
  revealAll();
}

/**
 * The reveal animation offsets sections by translateY(1.5rem). The browser
 * resolves an anchor target against that *transformed* box, so a section that
 * has not been revealed yet is measured 24px too low; once the reveal clears
 * the transform mid-scroll, the destination ends up 24px under the sticky
 * header. Settling every reveal synchronously — with transitions suppressed so
 * it happens in this frame rather than over 0.6s — means the browser measures
 * final positions when it runs the default anchor scroll.
 */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    root.classList.add("video-trial--settle-reveals");
    revealAll();
  });
});

