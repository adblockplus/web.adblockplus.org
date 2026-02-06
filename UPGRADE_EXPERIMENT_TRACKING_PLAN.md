# Upgrade Page Experiment Tracking Plan

## Overview

This document outlines the plan to ensure experiment and variant IDs are properly passed into Paddle checkout on the `/upgrade` page, similar to how it's implemented on the `/install` page.

## Current State Analysis

### How Experiment Tracking Works on /install Page

1. **Experiment Setup**: Experiments are configured using `adblock.setupExperiment()` from `includes/scripts/frontend-experiments.html`
2. **ID Storage**: This sets two key properties:
   - `adblock.experiment` - experiment ID converted to a number via FNV-1a hash
   - `adblock.variant` - variant index (0 for control, 1+ for variants)
3. **Paddle Integration**: The `paddle.js` module (static/modules/paddle.js) provides:
   - `adblock.api.setExperimentId()` - sets experiment ID and flags as experiment
   - `adblock.api.setExperimentVariantId()` - sets variant ID and flags as experiment
4. **Checkout Data**: When `checkout()` is called (paddle.js:856-962), experiment data is automatically included in `customData` (lines 933-936):
   ```javascript
   experiment_id: adblock.hasOwnProperty("experiment") ? adblock.experiment : "",
   variant_index: adblock.hasOwnProperty("variant") ? adblock.variant : -1,
   ```

### Current /upgrade Page Implementation

**Files involved:**
- `pages/upgrade.html` - page template
- `static/update/update-user-accounts.js` - handles checkout button clicks

**Current behavior:**
- Calls `checkout()` from `paddle.js` module (which already supports experiment tracking)
- Does NOT include frontend-experiments script
- Does NOT set experiment IDs before checkout

**Key finding**: The infrastructure is already in place in `paddle.js`. We just need to set `adblock.experiment` and `adblock.variant` before calling `checkout()`.

## Implementation Options

### Option 1: Full Experiment Framework (Recommended for A/B Testing)

**When to use**: If you plan to run A/B tests on the /upgrade page itself.

**Implementation:**
1. Add frontend-experiments include to `/upgrade` page
2. Create experiment configuration for /upgrade page
3. Use `adblock.setupExperiment()` to handle variant assignment

**Changes required:**
- `pages/upgrade.html`: Add `<? include scripts/frontend-experiments ?>`
- Create experiment-specific JS file (e.g., `static/experiments/upgrade-experiment.js`)
- Configure experiment with variants

**Example experiment setup:**
```javascript
await adblock.setupExperiment({
  id: "upgrade-page-test",
  conditions: () => true,
  variant: {
    // variant configuration
  }
});
```

### Option 2: Query Parameter Passthrough (Recommended for Campaign Tracking)

**When to use**: If users arrive at /upgrade from an experiment running on another page, and you want to track which experiment led them there.

**Implementation:**
1. Check for `experiment` and `variant` query parameters on page load
2. Set experiment IDs before checkout if present

**Changes required:**
- `static/update/update-user-accounts.js`: Add experiment detection logic

**Example implementation:**
```javascript
// In update-user-accounts.js, before checkout buttons are set up
const experimentParam = adblock.query.get("experiment");
const variantParam = adblock.query.get("variant");

if (experimentParam) {
  adblock.api.setExperimentId(experimentParam);
}
if (variantParam) {
  adblock.api.setExperimentVariantId(parseInt(variantParam, 10));
}
```

### Option 3: Detect Existing Experiment Data (Simplest)

**When to use**: If experiment data is already set by included scripts or other page logic.

**Implementation:**
1. Check if `adblock.experiment` and `adblock.variant` exist
2. If they do, call the API methods to flag as experiment

**Changes required:**
- `static/update/update-user-accounts.js`: Add detection logic

**Example implementation:**
```javascript
// In update-user-accounts.js, before checkout buttons are set up
if (typeof adblock.experiment !== "undefined") {
  adblock.api.setExperimentId(adblock.experiment);
}
if (typeof adblock.variant !== "undefined") {
  adblock.api.setExperimentVariantId(adblock.variant);
}
```

## Recommended Implementation Steps

### Phase 1: Add Query Parameter Support (Option 2)

This provides immediate value for tracking experiments that lead to /upgrade:

1. **Modify `static/update/update-user-accounts.js`**:
   - Add experiment parameter detection after imports
   - Set experiment IDs before checkout button setup

2. **Test**:
   - Visit `/upgrade?experiment=test-exp-123&variant=1`
   - Trigger checkout
   - Verify experiment data appears in Paddle customData

### Phase 2: Add Full Experiment Support (Option 1) - If Needed

If you later want to run experiments ON the /upgrade page:

1. **Modify `pages/upgrade.html`**:
   - Add frontend-experiments script include

2. **Create experiment configuration**:
   - Set up experiment with variants
   - Configure conditions and traffic allocation

3. **Test**:
   - Verify variant assignment
   - Verify experiment data flows to Paddle

## Technical Details

### Paddle Module Integration

The `checkout()` function in `static/modules/paddle.js` automatically includes experiment data when calling Paddle:

**Relevant code** (paddle.js:933-936):
```javascript
experiment: "",
experiment_id: adblock.hasOwnProperty("experiment") ? adblock.experiment : "",
variant: "",
variant_index: adblock.hasOwnProperty("variant") ? adblock.variant : -1,
```

### Experiment ID Format

- Frontend experiments use FNV-1a hash to convert string IDs to 53-bit signed integers
- Query parameter approach can pass experiment IDs directly (string or number)
- Both approaches are compatible with the Paddle integration

### Price Lookup

The `checkout()` function checks both standard and experiment prices:

**Relevant code** (paddle.js:876-880):
```javascript
const priceId = PADDLE_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount]?.[trial]
|| PADDLE_EXPERIMENT_PRICES[paddleEnvironment][product]?.[currency]?.[frequency]?.[amount]?.[trial];
```

If using experimental prices, ensure they're defined in `PADDLE_EXPERIMENT_PRICES` in paddle.js.

## Testing Checklist

- [ ] Experiment ID is set before checkout
- [ ] Variant ID is set before checkout
- [ ] Paddle checkout includes experiment_id in customData
- [ ] Paddle checkout includes variant_index in customData
- [ ] Correct price ID is selected (standard or experiment)
- [ ] Data flows through to post-checkout success URL
- [ ] Analytics/logging receives experiment data

## Files to Modify

### Required Changes

- `static/update/update-user-accounts.js` - Add experiment detection/setting logic

### Optional Changes (depending on approach)

- `pages/upgrade.html` - Add frontend-experiments include (Option 1)
- `static/experiments/upgrade-*.js` - New experiment configuration (Option 1)
- `static/modules/paddle.js` - Add experiment prices if needed

## Related Documentation

- Experiment tracking guide: `EXPERIMENT_TRACKING_GUIDE.md`
- Query parameters reference: `QUERY_PARAMETERS.md`
- Frontend experiments: `includes/scripts/frontend-experiments.html`
- Paddle module: `static/modules/paddle.js`
