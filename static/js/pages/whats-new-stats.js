/**
 * What's new — the three stat tiles, the headline count and the version pill.
 *
 * Deliberately separate from /js/pages/whats-new.js and deliberately free of
 * imports. whats-new.js imports modules/paddle.js, which calls
 * Paddle.Initialize() at module top level; if cdn.paddle.com fails to load,
 * evaluating that module graph throws and nothing in it runs. Every visitor to
 * this page is by definition running a content blocker, so a blocked payment CDN
 * is a real possibility — and it must not be able to take down the page's main
 * content along with the checkout.
 *
 * The extension payload arrives as JSON on
 * document.documentElement.dataset.adblockPlusExtensionInfo. It can land after
 * first paint, so it is read through adblock.afterAdblockPlusDetected() from
 * includes/scripts/extension-injection.html rather than off the dataset
 * directly — /update reads it synchronously and loses the race whenever the
 * extension is slow.
 */

/*
 * Same constants AdBlock's /whats-new uses, so the two pages cannot quote
 * different numbers for the same extension state.
 */
const SECONDS_SAVED_PER_AD = 2;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
// Above this, a grouped number stops being readable at a glance: "147.6K" reads
// faster than "147,579" in a tile that is 100px wide on a phone.
const COMPACT_THRESHOLD = 10000;
// Shown when the extension gives no version. Same value AdBlock's page uses, and
// the same value includes/whats-new/header.html renders server-side.
const FALLBACK_VERSION = "1.0.0";

/*
 * navigator.language, not adblock.settings.locale: these are counts and
 * durations rather than prices, and the existing block-count line in
 * static/update/update-user-accounts.js already groups by navigator.language.
 * Matching it keeps the same visitor from seeing two different groupings.
 */
function formatNumber(value) {
  return new Intl.NumberFormat(navigator.language).format(value);
}

function formatStatCount(value) {
  if (value <= COMPACT_THRESHOLD) return formatNumber(value);
  return new Intl.NumberFormat(navigator.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatUnit(value, unit, maximumFractionDigits = 0) {
  return new Intl.NumberFormat(navigator.language, {
    style: "unit",
    unit,
    unitDisplay: "narrow",
    maximumFractionDigits,
  }).format(value);
}

/**
 * Render a duration in the largest unit that still reads as a real quantity —
 * "3d" rather than "72h", "2.5h" rather than "150m".
 *
 * @param {number} seconds - total seconds saved
 * @returns {string} localised, e.g. "3d"
 */
function formatTimeSaved(seconds) {
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  if (years >= 1) return formatUnit(years, "year", 1);
  if (days >= 1) return formatUnit(Math.floor(days), "day");
  if (hours >= 1) return formatUnit(hours, "hour", 1);
  // Floored, but never to zero: "0m saved" reads as a bug rather than a small number.
  return formatUnit(Math.max(1, Math.floor(minutes)), "minute");
}

/**
 * Install date, as an epoch millisecond number.
 *
 * The extension has sent this as both a number and a date string over the
 * years — static/modules/paddle.js passes it straight through to Paddle without
 * caring which — so both are accepted here.
 *
 * @param {number|string} installDate - value from the extension payload
 * @returns {number} epoch ms, or NaN when it cannot be resolved
 */
function parseInstallDate(installDate) {
  if (typeof installDate === "number") return installDate;
  if (typeof installDate !== "string" || !installDate) return NaN;

  const parsed = Date.parse(installDate);
  return Number.isFinite(parsed) ? parsed : Number(installDate);
}

function setStat(name, value) {
  const element = document.querySelector(`[data-stat="${name}"]`);
  if (element) element.textContent = value;
}

/**
 * Fill the headline count, the three tiles and the version pill.
 *
 * Safe to call more than once: it runs immediately with whatever is known so
 * the tiles are never empty, then again if the extension payload arrives late.
 *
 * @param {object} [info] - the parsed extension payload
 */
function renderStats(info = {}) {
  // ?bc= is the only way to exercise this without a real extension, and it
  // wins over the payload so QA can reproduce a specific state.
  const queryCount = parseInt(adblock.query.get("bc"), 10);
  const adsBlocked = Number.isFinite(queryCount) ? queryCount : (info.blockCount || 0);

  const installedAt = parseInstallDate(info.installDate);
  const daysProtected = Number.isFinite(installedAt)
    ? Math.max(1, Math.floor((Date.now() - installedAt) / MS_PER_DAY))
    : 1;

  setStat("ads-blocked", formatStatCount(adsBlocked));
  setStat("time-saved", formatTimeSaved(adsBlocked * SECONDS_SAVED_PER_AD));
  setStat("days-protected", formatNumber(daysProtected));

  /*
   * The headline stays a single line at zero. The tile still shows 0, so the
   * number is not hidden — but "We've blocked 0 ads for you" is a poor opening
   * line for someone who just installed, and it is the first thing on the page.
   */
  const headlineCount = document.querySelector(".whats-new-status__headline-count");
  if (headlineCount) {
    headlineCount.textContent = "";
    if (adsBlocked > 0) {
      const template = adblock.strings["whats-new-status__headline-count"] || "";
      const [before = "", after = ""] = template.split("{count}");
      const count = document.createElement("span");
      count.className = "whats-new-status__count";
      count.textContent = formatNumber(adsBlocked);
      headlineCount.append(before, count, after);
    }
  }

  /*
   * FALLBACK_VERSION matches AdBlock's page, which does `info.version ||
   * "1.0.0"` and always renders the pill. In practice the fallback is rarely
   * seen: the extension opens this page after it updates itself, so the payload
   * is there. It shows for someone who reaches the URL without the extension.
   */
  const extensionVersion = info.version || FALLBACK_VERSION;
  // Two places carry it: the pill in the brand bar and the changelog heading.
  document.querySelectorAll(".whats-new-header__version-number, .whats-new-changelog__version")
    .forEach(element => { element.textContent = `v${extensionVersion}`; });
}

try {
  renderStats();
  // `true` so this still resolves after the 1s timeout when no extension is present.
  adblock.afterAdblockPlusDetected(renderStats, true);
} catch (error) {
  adblock.logScriptError("whats-new.stats", error);
}

////////////////////////////////////////////////////////////////////////////////
// CHECKOUT FAILSAFE
////////////////////////////////////////////////////////////////////////////////

/*
 * whats-new.js enables the CTAs once it has prices. If it never runs — blocked
 * payment CDN, CSP, a Paddle outage — the pricing panel would otherwise sit
 * there shimmering, with disabled buttons, forever.
 *
 * This lives here rather than in whats-new.js for the obvious reason: the module
 * that failed cannot report its own failure. After the grace period the panel
 * and the two secondary CTAs are hidden, leaving a coherent page — the stats,
 * the changelog, the benefits and the FAQ — and the failure is reported so it
 * shows up in the logs instead of only in the funnel numbers.
 */
const CHECKOUT_GRACE_PERIOD = 8000;

setTimeout(() => {
  const stillDisabled = document.querySelector(".whats-new-checkout-button:disabled");
  if (!stillDisabled) return;

  document.documentElement.dataset.checkoutUnavailable = "1";
  adblock.logScriptError("whats-new.checkout-unavailable", new Error(
    `Prices did not resolve within ${CHECKOUT_GRACE_PERIOD}ms; paddleLoaded=${!!window.Paddle}`
  ));
}, CHECKOUT_GRACE_PERIOD);
