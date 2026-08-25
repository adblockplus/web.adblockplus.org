/**
 * What's new — pricing and checkout.
 *
 * The stat tiles are in /js/pages/whats-new-stats.js, on purpose: this module
 * imports modules/paddle.js, which calls Paddle.Initialize() at module top
 * level, so a blocked cdn.paddle.com stops everything here from running. That
 * must not be able to take the page's main content with it.
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

function text(id) {
  return adblock.strings[id] || "";
}

////////////////////////////////////////////////////////////////////////////////
// PRICES
////////////////////////////////////////////////////////////////////////////////

const currency = getCurrency();

////////////////////////////////////////////////////////////////////////////////
// OFFER
////////////////////////////////////////////////////////////////////////////////

/*
 * Trial length in days, or 0 for the pay-now offer.
 *
 * Read off <html> rather than out of the query string, because the head script
 * has already checked ?trial against the lengths the page has copy for and has
 * shown that copy. Reading the parameter again here could disagree with what is
 * on screen.
 *
 * checkout() resolves a Paddle price by product, currency, frequency, amount
 * and this number, and throws if that combination has none. So a trial length
 * added to the head script before its prices exist in every currency gives a
 * CTA that opens nothing for the visitors it has no price for — the click
 * handler below reports it, but they see no reason for it.
 */
const trial = parseInt(root.dataset.wnTrial, 10) || 0;

/**
 * Per-month figure for a plan, in minor units.
 *
 * Both cards quote a monthly rate so they compare directly; the real charge is
 * spelled out underneath by the "billed" line. Rounded rather than truncated —
 * getDollarNumber() runs parseInt() on what it is given, so 3500/12 would
 * otherwise reach the formatter as 291 and print €2.91 for a €35 plan.
 *
 * @param {string} frequency - "monthly" or "yearly"
 * @returns {number} minor currency units per month
 */
function monthlyAmount(frequency) {
  const amount = PRICES[currency][frequency];
  return frequency === "yearly" ? Math.round(amount / 12) : amount;
}

try {
  adblock.api.updateVATState(currency);

  document.querySelectorAll(".whats-new-plan__price").forEach(price => {
    const frequency = price.dataset.frequency;
    const amountElement = price.querySelector(".whats-new-plan__amount");
    if (!amountElement) return;

    amountElement.textContent = getDollarString(currency, monthlyAmount(frequency), false);
    if (LONG_AMOUNT_CURRENCIES.includes(currency)) {
      amountElement.classList.add("whats-new-plan__amount--long");
    }
  });

  /*
   * The line under each button. With a trial it has to say what happens when
   * the trial ends rather than what is billed now — "Billed monthly at $4" is
   * false on a day nobody is charged.
   */
  const billedKey = trial ? "whats-new-pricing__billed-trial" : "whats-new-pricing__billed";

  document.querySelectorAll("[data-billed-for]").forEach(billed => {
    const frequency = billed.dataset.billedFor;
    billed.textContent = text(`${billedKey}-${frequency}`)
      .replace("{amount}", getDollarString(currency, PRICES[currency][frequency], false));
  });

  const savings = document.getElementById("whats-new-savings");
  if (savings) {
    savings.textContent = text("whats-new-pricing__savings")
      .replace("{savingsPercent}", getYearlySavingsPercent(currency));
  }

  document.querySelectorAll(".placeholder").forEach(element => element.classList.remove("placeholder"));

  /*
   * The CTAs ship disabled and are only enabled here, once there is a real
   * amount to charge. Reaching the catch below — or never getting this far,
   * because modules/paddle.js threw on a blocked CDN — leaves them disabled
   * rather than dead: a button that opens nothing is worse than one that
   * plainly says it cannot be used.
   */
  document.querySelectorAll(".whats-new-checkout-button").forEach(button => {
    button.disabled = false;
  });
} catch (error) {
  adblock.logScriptError("whats-new.prices", error);
}

////////////////////////////////////////////////////////////////////////////////
// CHECKOUT
////////////////////////////////////////////////////////////////////////////////

/*
 * Only the two pricing cards start a checkout. The CTAs under the benefits table
 * and the testimonials are links to those cards, so the trigger names the plan
 * rather than a DOM index, which would silently re-label a button as soon as a
 * section moved.
 */
document.querySelectorAll(".whats-new-checkout-button").forEach(button => {
  const frequency = button.dataset.frequency;
  const amount = PRICES[currency][frequency];
  // The trial is part of the trigger, not only of the checkout: the two offers
  // convert differently, and the funnel numbers have to be able to tell them
  // apart without joining on the URL parameters.
  const trigger = trial ? `pricing-${frequency}-trial${trial}` : `pricing-${frequency}`;

  // Picked up by includes/scripts/click-tracking.html, which binds at
  // DOMContentLoaded — after this module has run, since modules are deferred.
  button.dataset.click = JSON.stringify({
    type: "checkout-start",
    currency,
    frequency,
    amount,
    trial,
    trigger,
  });

  button.addEventListener("click", () => {
    try {
      checkout({ product: "premium", currency, frequency, amount, trial, trigger });
    } catch (error) {
      // The trial is in the message because "Invalid price" on this page is
      // nearly always a trial with no Paddle price in the visitor's currency,
      // and the currency alone does not say which offer was on screen.
      adblock.logScriptError("whats-new.checkout", new Error(
        `${error.message} (currency=${currency} frequency=${frequency} amount=${amount} trial=${trial})`
      ));
    }
  });
});

adblock.on("checkout.completed", data => {
  if (!data.transaction_id || !data.customer || !data.customer.email) return;

  /*
   * Show the duplicate-subscription spinner while the portal takes over, as
   * /premium, /update and /video-trial do. Only the attribute is needed — the
   * selector in prevent-duplicate-subscription.css is unscoped and
   * #account-restore is already a body-level element.
   */
  root.dataset.account = "finding";

  const custom = data.custom_data || {};

  /*
   * modules/paddle.js writes this key as `subType`, but every existing reader
   * reads `sub_type`. Only one of those can be right, and fireGAConversionEvent
   * needs an exact "monthly"/"yearly" to resolve a send_to, so a wrong key means
   * no conversion is reported at all. Accepting both keeps this page correct
   * either way; the discrepancy itself needs fixing centrally.
   */
  const frequency = custom.sub_type || custom.subType;
  const paidCurrency = custom.currency;
  const amount = custom.amount_cents;

  try {
    if (frequency && paidCurrency && amount) {
      fireGAConversionEvent(frequency, paidCurrency, `${getDollarNumber(paidCurrency, amount)}`);
    } else {
      adblock.logScriptError("whats-new.conversion-data", new Error(
        `Incomplete conversion data: frequency=${frequency} currency=${paidCurrency} amount=${amount}`
      ));
    }
  } catch (error) {
    adblock.logScriptError("whats-new.conversion", error);
  }

  // Same event name as /premium and /video-trial so it lands in the existing
  // dashboards; adblock.log() adds pageName and the full urlParams.
  adblock.log("premium-checkout__paddle-complete", { frequency, currency: paidCurrency, amount });

  const transactionId = encodeURIComponent(data.transaction_id);
  const email = encodeURIComponent(data.customer.email);
  // Safe to redirect immediately: conversion.js sends via transport_type "beacon",
  // which survives unload, so there is no need to race a timeout.
  window.location.href =
    `${USER_ACCOUNTS_BASE_URL}?transaction_id=${transactionId}&email=${email}&s=abp-w`;
});

document.querySelectorAll(".whats-new-sign-in-link").forEach(link => {
  link.href = `${USER_ACCOUNTS_BASE_URL}?premium=false&s=abp-w`;
});
