(function () {
  // On localhost the CMS dev server serves static/data/ai-ad-data.json (gitignored)
  // at this same path, overriding the Cloud Run endpoint. To create or refresh it:
  //   curl -s https://adblockplus.org/data/ai-ad-data.json > static/data/ai-ad-data.json
  const DATA_URL = '/data/ai-ad-data.json';

  const PLATFORM_ORDER = ['chatgpt', 'perplexity', 'copilot', 'gemini'];

  let rafId = null;

  const PLATFORM_META = {
    chatgpt:    { displayName: 'ChatGPT',           domain: 'chatgpt.com · openai.com' },
    perplexity: { displayName: 'Perplexity',        domain: 'perplexity.ai',           noAds: true, body: 'Tested sponsored answers, but then dropped them in early 2026. Ad-free for now. If that changes again, we block and count them.' },
    copilot:    { displayName: 'Microsoft Copilot', domain: 'copilot.microsoft.com' },
    gemini:     { displayName: 'Google Gemini',     domain: 'gemini.google.com',       noAds: true, body: 'Ad-free for now, though reports suggest ads may be coming. The moment ads show up, we block and count them.' }
  };

  // Manually-verified providers whose data is cleared for public display.
  // Add a provider here only after confirming the data pipeline is clean.
  const ENABLED_PROVIDERS = ['chatgpt', 'copilot'];

  const QUOTES = [
    "I hate it and won't use them if it stands",
    "I don't like ads in applications",
    "Of course everything is for sale and it drives me insane",
    "It was inevitable",
    "I dislike it.",
    "They suck",
    "It sounds like it was bound to happen when looking at the prevalence of ads in all sorts of media and other avenues",
    "So odd. What is the point? It's like we're living in a Black Mirror episode",
    "I don't really like them",
    "I don't like ads, so they're annoying",
    "Don't like it",
    "I don't like it. Everything fake now",
    "They are pervasive and a highly annoying imposition upon my personal AI experience. I will not use an AI agent that has ads.",
    "I find them to be very annoying.",
    "Honestly, I don't really like it. It feels like it would make the answers less clean and more influenced by sponsors instead of just being straightforward help. I get why companies do it, but it could make people trust the responses less.",
    "I don't like it at all. It will compromise the system.",
    "It was eventually going to happen.",
    "It depends, but it's becoming too much",
    "There will always be ads in everything",
    "I don't like it. It feels intrusive",
    "Bad",
    "Disappointing and irritating, but not at all surprising.",
    "It's very annoying",
    "It's no place for it",
    "I despise it because of trust issues with AI",
    "I think they should stay away",
    "It was only a matter of time",
    "I think that it is too much. We already experience ads everywhere. There is no need to have them inside of the AI assistants.",
    "They should be blocked",
    "Although it's annoying, overall I feel pretty neutral about it.",
    "I hate it.",
    "I don't like the ads",
    "It is a part of modern technology.",
    "I don't trust AI",
    "My reaction to advertisements inside AI assistants like ChatGPT and Copilot: I had a feeling sooner or later that was gonna happen, to get people to buy a premium plan",
    "It's kind of annoying, taking up your time",
    "I hate it because it interrupted my time with the apps",
    "No different than seeing them on TV. Usually disgusted by most of them.",
    "If I did research using ChatGPT and Copilot and during my research ads are appearing, it really makes me irritated. Otherwise, regular time, I am okay with it.",
    "Not sure if I fully understand or trust AI",
    "Not surprised",
    "I don't like it, because it slows things down.",
    "Dislike, as ads already permeate websites and all apps. This may make AI results less trustworthy"
  ];

  const MS_PER_MIN = 60000;
  const MS_PER_HOUR = 3600000;
  const MS_PER_DAY = 86400000;
  const MS_PER_SEC = 1000;
  const SECS_PER_DAY = 86400;

  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function renderDigits(containerOrId, value, minDigits) {
    const container = typeof containerOrId === 'string'
      ? document.getElementById(containerOrId)
      : containerOrId;
    if (!container) {
      return;
    }

    if (!isFinite(value)) {
      value = 0;
    }

    let str = String(Math.round(value));

    if (minDigits && str.length < minDigits) {
      str = str.padStart(minDigits, '0');
    }

    let html = '';
    for (let i = 0; i < str.length; i++) {
      html += '<span class="abom-digit">' + str[i] + '</span>';
      const posFromRight = str.length - 1 - i;
      if (posFromRight > 0 && posFromRight % 3 === 0) {
        html += '<span class="abom-digit-sep">,</span>';
      }
    }
    container.innerHTML = html;
  }

  function drawBarchart(dailyData, isLive) {
    const BAR_WIDTH_RATIO = 0.78;
    const RECENT_DAYS = 7;
    const n = dailyData ? dailyData.length : 0;
    const w = 200, h = 56;
    const slotW = w / n;
    const barW = Math.max(1, slotW * BAR_WIDTH_RATIO);
    const recentStart = Math.max(0, n - RECENT_DAYS);
    let max = 0;
    let rects = '';

    if (!dailyData || dailyData.length < 2) {
      return '';
    }

    for (let i = 0; i < n; i++) {
      if (dailyData[i] > max) {
        max = dailyData[i];
      }
    }

    if (max <= 0) {
      max = 1;
    }

    for (let j = 0; j < n; j++) {
      const v = Math.max(0, dailyData[j]);
      const bh = Math.max(2, (v / max) * (h - 4));
      const x = j * slotW + (slotW - barW) / 2;
      const y = h - bh;
      const fill = isLive ? (j >= recentStart ? '#d4623a' : '#e8a98a') : '#ddd';
      rects += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="1.5" fill="' + fill + '"/>';
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' + rects + '</svg>';
  }

  function calcWowPercent(current, previous) {
    return previous > 0 ? ((current - previous) / previous) * 100 : null;
  }

  function renderBadge(enabled) {
    if (enabled) {
      return '<span class="abom-badge abom-badge--live"><span class="abom-live-dot abom-live-dot--sm" aria-hidden="true"></span>LIVE</span>';
    }
    return '<span class="abom-badge abom-badge--no-ads">No ads currently</span>';
  }

  function renderCardBody(enabled, allTime, trendHtml, p, meta) {
    if (enabled) {
      return '<div class="abom-pc-count">' + formatNumber(allTime) + '</div>' +
        '<div class="abom-pc-chart-hd">' +
          '<span class="abom-pc-chart-label">last 30 days</span>' +
          trendHtml +
        '</div>' +
        '<div class="abom-pc-chart">' + drawBarchart(p.dailyAdsBlocked, true) + '</div>' +
        '<p class="abom-pc-domain">' + (meta.domain || '') + '</p>';
    }
    return '<p class="abom-pc-soon-text">' + meta.body + '</p>' +
      '<p class="abom-pc-domain">' + (meta.domain || '') + '</p>';
  }

  function renderPlatforms(providerMap, progress) {
    const container = document.getElementById('abom-platforms');
    if (!container) {
      return;
    }

    container.innerHTML = '';
    PLATFORM_ORDER.forEach(function (id) {
      const meta = PLATFORM_META[id] || {};
      const p = providerMap[id];
      const enabled = ENABLED_PROVIDERS.indexOf(id) !== -1 && !!p;
      const allTime = enabled ? (p.adsBlockedExcludingYesterday || 0) + progress * (p.adsBlockedYesterday || 0) : 0;
      const wow = enabled ? calcWowPercent(p.adsBlockedLastFullWeek || 0, p.adsBlockedPreviousFullWeek) : null;
      const wowRounded = wow !== null ? Math.round(wow) : null;

      let trendHtml = '';

      if (Number.isFinite(wowRounded)) {
        const arrow = wowRounded >= 0 ? '↑' : '↓';
        trendHtml = '<span class="abom-pc-trend">' + arrow + ' ' + Math.abs(wowRounded) + '% this week</span>';
      }

      const card = document.createElement('div');
      card.className = 'abom-pc';
      card.innerHTML =
        '<div class="abom-pc-hd">' +
          renderBadge(enabled) +
        '</div>' +
        '<h3 class="abom-pc-name"></h3>' +
        renderCardBody(enabled, allTime, trendHtml, p, meta);
      card.querySelector('.abom-pc-name').textContent = meta.displayName || id;
      container.appendChild(card);
    });
  }

  function updateLastUpdated(generatedAt) {
    const el = document.getElementById('abom-updated');
    const generated = new Date(generatedAt);
    const diffMs = (generatedAt && !isNaN(generated.getTime())) ? (new Date() - generated) : -1;
    const diffDays = Math.floor(diffMs / MS_PER_DAY);
    let label;

    if (!el) {
      return;
    }

    if (diffMs < 0) {
      el.textContent = 'Updated recently';
      return;
    }
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / MS_PER_HOUR);
      if (diffHours < 1) {
        const diffMins = Math.floor(diffMs / MS_PER_MIN);
        label = diffMins < 1 ? 'Updated just now' : 'Updated ' + diffMins + ' minute' + (diffMins !== 1 ? 's' : '') + ' ago';
      } else {
        label = 'Updated ' + diffHours + ' hour' + (diffHours !== 1 ? 's' : '') + ' ago';
      }
    } else if (diffDays === 1) {
      label = 'Updated yesterday';
    } else {
      label = 'Updated ' + diffDays + ' days ago';
    }
    el.textContent = label;
  }

  // 7-day rolling average rate — used as a fallback when data is > 24h old
  function calcHistoricalRate(providerMap) {
    let total = 0;
    let hasData = false;
    ENABLED_PROVIDERS.forEach(function (id) {
      const p = providerMap[id];
      if (!p || !p.dailyAdsBlocked || p.dailyAdsBlocked.length === 0) {
        return;
      }

      const recent = p.dailyAdsBlocked.slice(-7);
      const sum = recent.reduce(function (a, b) { return a + b; }, 0);
      if (sum <= 0) {
        return;
      }

      total += sum / recent.length;
      hasData = true;
    });
    return hasData ? total / SECS_PER_DAY : 0;
  }

  // Drives both the all-time counter and the since-open counter from a single RAF loop.
  // baseValue: the starting all-time total at the moment the page loaded.
  // perSecond: the rate at which ads are being blocked.
  function startAnimatedCounters(baseValue, perSecond) {
    const sinceOpenRowEl = document.getElementById('abom-since-open-row');
    const sinceOpenEl = document.getElementById('since-open');
    const alltimeSr = document.getElementById('alltime-sr');
    const alltimeDigitsEl = document.getElementById('alltime-digits');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseRounded = Math.round(baseValue);
    let startTime = null;
    let lastAlltime = -1;
    let lastSinceOpen = -1;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    if (reducedMotion || perSecond <= 0) {
      renderDigits('alltime-digits', baseValue, 8);
      if (alltimeSr) {
        alltimeSr.textContent = formatNumber(baseValue);
      }
      if (sinceOpenRowEl) {
        sinceOpenRowEl.hidden = true;
      }
      return;
    }

    if (sinceOpenRowEl) {
      sinceOpenRowEl.hidden = false;
    }

    function tick(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = (timestamp - startTime) / MS_PER_SEC;
      const sinceOpenVal = Math.floor(elapsed * perSecond);
      const alltimeVal = baseRounded + sinceOpenVal;

      if (alltimeVal !== lastAlltime) {
        renderDigits(alltimeDigitsEl, alltimeVal, 8);
        lastAlltime = alltimeVal;
      }
      if (sinceOpenEl && sinceOpenVal !== lastSinceOpen) {
        sinceOpenEl.textContent = formatNumber(sinceOpenVal);
        lastSinceOpen = sinceOpenVal;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  function render(data) {
    const weekSr = document.getElementById('week-sr');
    const wowEl = document.getElementById('wow');
    const providerMap = {};

    if (!data || !data.providers || typeof data.providers !== 'object' || Array.isArray(data.providers)) {
      showError();
      return;
    }

    Object.keys(data.providers).forEach(function (id) {
      const p = data.providers[id];
      if (!p) {
        return;
      }

      // Cap values at 1e15 (one quadrillion) to guard against corrupt pipeline data
      // and stay safely below JS float precision limits (Number.MAX_SAFE_INTEGER ~9e15).
      const MAX_SAFE = 1e15;
      providerMap[id] = {
        adsBlockedYesterday:          Math.min(MAX_SAFE, Math.max(0, parseInt(p.adsBlockedYesterday, 10) || 0)),
        adsBlockedExcludingYesterday: Math.min(MAX_SAFE, Math.max(0, parseInt(p.adsBlockedExcludingYesterday, 10) || 0)),
        adsBlockedLastFullWeek:       Math.min(MAX_SAFE, Math.max(0, parseInt(p.adsBlockedLastFullWeek, 10) || 0)),
        adsBlockedPreviousFullWeek:   Math.min(MAX_SAFE, Math.max(0, parseInt(p.adsBlockedPreviousFullWeek, 10) || 0)),
        dailyAdsBlocked: Array.isArray(p.dailyAdsBlocked)
          ? p.dailyAdsBlocked.map(function (v) { return Math.max(0, parseInt(v, 10) || 0); })
          : []
      };
    });

    const hasEnabledData = ENABLED_PROVIDERS.some(function (id) { return !!providerMap[id]; });

    if (!hasEnabledData) {
      showError();
      return;
    }

    let excludingYesterday = 0;
    let yesterdayTotal = 0;
    let weekTotal = 0;
    let prevWeekTotal = 0;

    ENABLED_PROVIDERS.forEach(function (id) {
      const p = providerMap[id];
      if (!p) {
        return;
      }

      excludingYesterday += p.adsBlockedExcludingYesterday || 0;
      yesterdayTotal += p.adsBlockedYesterday || 0;
      weekTotal += p.adsBlockedLastFullWeek || 0;
      prevWeekTotal += p.adsBlockedPreviousFullWeek || 0;
    });

    const generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
    const dataAgeSeconds = (!generatedAt || isNaN(generatedAt.getTime()))
      ? Infinity
      : (Date.now() - generatedAt.getTime()) / MS_PER_SEC;

    let baseValue, perSecond;
    let progress = 1;
    if (dataAgeSeconds >= 0 && dataAgeSeconds <= SECS_PER_DAY) {
      // Data is fresh: show how much of yesterday has elapsed since generation,
      // then continue counting at yesterday's per-second rate.
      progress = dataAgeSeconds / SECS_PER_DAY;
      baseValue = excludingYesterday + progress * yesterdayTotal;
      perSecond = yesterdayTotal / SECS_PER_DAY;
      if (perSecond <= 0) {
        perSecond = calcHistoricalRate(providerMap);
      }
    } else {
      // Data is stale (> 24h) or client clock is behind (dataAgeSeconds < 0):
      // yesterday is fully counted. Continue at the 7-day historical average.
      // The "Updated X ago" label signals the staleness.
      baseValue = excludingYesterday + yesterdayTotal;
      perSecond = calcHistoricalRate(providerMap);
    }

    renderDigits('week-digits', weekTotal, 6);

    if (weekSr) {
      weekSr.textContent = formatNumber(weekTotal);
    }

    const wow = calcWowPercent(weekTotal, prevWeekTotal);
    const wowRounded = wow !== null ? Math.round(wow) : null;

    if (wowEl && Number.isFinite(wowRounded)) {
      wowEl.textContent = (wowRounded >= 0 ? '↑ +' : '↓ -') + Math.abs(wowRounded) + '% vs. last week';
    }

    updateLastUpdated(data.generatedAt);
    renderPlatforms(providerMap, progress);
    startAnimatedCounters(baseValue, perSecond);
  }

  function showError() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const alltime = document.getElementById('alltime-digits');
    const week = document.getElementById('week-digits');
    const updated = document.getElementById('abom-updated');
    const platforms = document.getElementById('abom-platforms');
    const sinceOpen = document.getElementById('abom-since-open-row');
    const alltimeSrErr = document.getElementById('alltime-sr');
    const weekSrErr = document.getElementById('week-sr');

    if (alltime) {
      alltime.innerHTML = '<span class="abom-error-label" aria-hidden="true">–</span>';
    }
    if (week) {
      week.innerHTML = '<span class="abom-error-label" aria-hidden="true">–</span>';
    }
    if (alltimeSrErr) {
      alltimeSrErr.textContent = 'Data unavailable';
    }
    if (weekSrErr) {
      weekSrErr.textContent = 'Data unavailable';
    }
    if (updated) {
      updated.textContent = 'Data temporarily unavailable';
    }
    if (platforms) {
      platforms.innerHTML = '';
    }
    if (sinceOpen) {
      sinceOpen.hidden = true;
    }
  }

  function initQuotes() {
    const el = document.getElementById('abom-quotes');
    if (!el) {
      return;
    }

    const pool = QUOTES.slice();

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    el.innerHTML = pool.slice(0, 3).map(function (q) {
      return '<blockquote class="abom-quote" role="listitem">&ldquo;' + q + '&rdquo;</blockquote>';
    }).join('');
  }

  const updatedEl = document.getElementById('abom-updated');

  if (updatedEl) {
    updatedEl.textContent = 'Loading…';
  }

  initQuotes();

  const FETCH_TIMEOUT_MS = 10000;
  const controller = new AbortController();
  const timeoutId = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT_MS);
  fetch(DATA_URL, { signal: controller.signal })
    .then(function (res) {
      if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }
      return res.json();
    })
    .then(function (data) {
      clearTimeout(timeoutId);
      render(data);
    })
    .catch(function () {
      clearTimeout(timeoutId);
      showError();
    });
})();
