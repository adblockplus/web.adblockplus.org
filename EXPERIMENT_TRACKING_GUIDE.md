# Email Marketing Program Experiment - Tracking Guide

## How Logging Works

The `adblock.log(event, data)` function sends events to `/access` endpoint which generates Firebase Hosting log entries. Each call to `adblock.log()` creates a request to:

```
/access?trigger=<value>&event=<event>&sid=<sessionId>&pageName=<page>&...
```

These requests appear in Firebase Hosting logs in the `httpRequest.requestUrl` field.

## Event Tracking for Trial Offer Experiment

### 1. Signup Flow Start Rate (Users who see variant 1)

**Method**: Users load `/installed` page with `variant=1`

**What to track**: Page views with experiment loaded

**BigQuery Query**:
```sql
SELECT
  COUNT(DISTINCT httpRequest.remoteIp) AS unique_users_saw_variant1,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  -- Page is /installed
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/installed')
  AND httpRequest.status = 200
  -- Has variant=1 parameter
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]variant=([^&]*)') = '1'
  -- Also logged via adblock.log("experiment.loaded") which creates /access request
  OR (
    REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
    AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'experiment.loaded'
    AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]pagePath=([^&]*)') LIKE '%/installed%'
  )
GROUP BY date
ORDER BY date DESC
```

**Alternative - Using experiment.loaded events only**:
```sql
SELECT
  COUNT(*) AS variant1_loaded_count,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'experiment.loaded'
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]pagePath=([^&]*)') LIKE '%/installed%'
GROUP BY date
ORDER BY date DESC
```

### 2. Signup Flow Offer Acceptance Rate (Click "Activate my free month")

**Event logged**: `adblock.log("click", { trigger: "activate-trial" })`

**Request URL**: `/access?event=click&trigger=activate-trial&...`

**BigQuery Query**:
```sql
SELECT
  COUNT(*) AS activate_trial_clicks,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'activate-trial'
GROUP BY date
ORDER BY date DESC
```

### 3. Signup Flow Offer Rejection Rate (Click "Maybe later")

**Event logged**: `adblock.log("click", { trigger: "ignore-trial-offer" })`

**Request URL**: `/access?event=click&trigger=ignore-trial-offer&...`

**BigQuery Query**:
```sql
SELECT
  COUNT(*) AS maybe_later_clicks,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'ignore-trial-offer'
GROUP BY date
ORDER BY date DESC
```

### 4. Signup Flow Page 1b Acceptance Rate (Accept from "Maybe later" screen)

**Event logged**: `adblock.log("click", { trigger: "accept-trial-offer" })`

**Request URL**: `/access?event=click&trigger=accept-trial-offer&...`

**BigQuery Query**:
```sql
SELECT
  COUNT(*) AS page1b_accept_clicks,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'accept-trial-offer'
GROUP BY date
ORDER BY date DESC
```

### 5. Skip Trial (Final rejection)

**Event logged**: `adblock.log("click", { trigger: "skip-trial-offer" })`

**Request URL**: `/access?event=click&trigger=skip-trial-offer&...`

**BigQuery Query**:
```sql
SELECT
  COUNT(*) AS skip_trial_clicks,
  DATE(timestamp) AS date
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) >= '2026-02-01'
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
  AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'skip-trial-offer'
GROUP BY date
ORDER BY date DESC
```

---

## Combined Funnel Analysis Query

```sql
WITH
  variant1_views AS (
    SELECT
      COUNT(*) AS users_saw_variant1
    FROM
      `your-project.firebase_hosting_logs.firebase_domain_*`
    WHERE
      DATE(_PARTITIONTIME) >= '2026-02-01'
      AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'experiment.loaded'
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]pagePath=([^&]*)') LIKE '%/installed%'
  ),

  activate_clicks AS (
    SELECT
      COUNT(*) AS activate_count
    FROM
      `your-project.firebase_hosting_logs.firebase_domain_*`
    WHERE
      DATE(_PARTITIONTIME) >= '2026-02-01'
      AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'activate-trial'
  ),

  maybe_later_clicks AS (
    SELECT
      COUNT(*) AS maybe_later_count
    FROM
      `your-project.firebase_hosting_logs.firebase_domain_*`
    WHERE
      DATE(_PARTITIONTIME) >= '2026-02-01'
      AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'ignore-trial-offer'
  ),

  page1b_accepts AS (
    SELECT
      COUNT(*) AS page1b_count
    FROM
      `your-project.firebase_hosting_logs.firebase_domain_*`
    WHERE
      DATE(_PARTITIONTIME) >= '2026-02-01'
      AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'accept-trial-offer'
  ),

  skip_clicks AS (
    SELECT
      COUNT(*) AS skip_count
    FROM
      `your-project.firebase_hosting_logs.firebase_domain_*`
    WHERE
      DATE(_PARTITIONTIME) >= '2026-02-01'
      AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') = 'click'
      AND REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') = 'skip-trial-offer'
  )

SELECT
  users_saw_variant1,
  activate_count,
  maybe_later_count,
  page1b_count,
  skip_count,

  -- Conversion rates
  ROUND((activate_count / NULLIF(users_saw_variant1, 0)) * 100, 2) AS direct_activation_rate_pct,
  ROUND((maybe_later_count / NULLIF(users_saw_variant1, 0)) * 100, 2) AS maybe_later_rate_pct,
  ROUND((page1b_count / NULLIF(maybe_later_count, 0)) * 100, 2) AS page1b_conversion_rate_pct,
  ROUND((skip_count / NULLIF(maybe_later_count, 0)) * 100, 2) AS final_rejection_rate_pct,
  ROUND(((activate_count + page1b_count) / NULLIF(users_saw_variant1, 0)) * 100, 2) AS total_acceptance_rate_pct

FROM variant1_views, activate_clicks, maybe_later_clicks, page1b_accepts, skip_clicks
```

---

## Event Flow Diagram

```
Page Load (/installed?variant=1)
│
├─> experiment.loaded event logged
│
└─> User sees trial offer modal
    │
    ├─> Click "Activate my free month" → trigger=activate-trial
    │   └─> Redirect to user accounts
    │
    └─> Click "Maybe later" → trigger=ignore-trial-offer
        │
        └─> Show second modal (Page 1b)
            │
            ├─> Click "Start free trial" → trigger=accept-trial-offer
            │   └─> Redirect to user accounts
            │
            └─> Click "Continue with basic protection" → trigger=skip-trial-offer
                └─> Close modal, continue to /installed page
```

---

## All Tracked Events

| User Action | Event Type | Trigger Value | Code Location |
|-------------|------------|---------------|---------------|
| Variant 1 loads | experiment.loaded | N/A | frontend-experiments.html:112 |
| Click "Activate my free month" | click | activate-trial | variant.js:68 |
| Click "Maybe later" | click | ignore-trial-offer | variant.js:36 |
| Click "Start free trial" (page 1b) | click | accept-trial-offer | variant.js:68 |
| Click "Continue with basic protection" | click | skip-trial-offer | variant.js:50 |

---

## Parameters Available in `/access` Logs

Every `adblock.log()` call includes these parameters in the `/access` request URL:

- **event** - The event name (e.g., "click", "experiment.loaded")
- **trigger** - The element ID that triggered the event (for click events)
- **sid** - Session ID
- **pageName** - Page identifier from settings
- **pageLocale** - Page locale
- **pagePath** - URL pathname (e.g., "/installed")
- **urlParams** - JSON string of URL query parameters
- **experiments** - Experiment tracking info (experiment ID and variant)
- **logVersion** - Always "2.1.1"

You can extract any of these using `REGEXP_EXTRACT()` in BigQuery.

---

## Example: Parse All Parameters

```sql
SELECT
  timestamp,
  REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]event=([^&]*)') AS event_type,
  REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]trigger=([^&]*)') AS trigger_id,
  REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]sid=([^&]*)') AS session_id,
  REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]pagePath=([^&]*)') AS page_path,
  REGEXP_EXTRACT(httpRequest.requestUrl, r'[?&]experiments=([^&]*)') AS experiments
FROM
  `your-project.firebase_hosting_logs.firebase_domain_*`
WHERE
  DATE(_PARTITIONTIME) = CURRENT_DATE()
  AND REGEXP_CONTAINS(httpRequest.requestUrl, r'/access')
LIMIT 100
```
