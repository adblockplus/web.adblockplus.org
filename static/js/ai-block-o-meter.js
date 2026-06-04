(function () {
  var DATA_URL = '/data/ai-block-o-meter.json';

  var PLATFORM_ORDER = ['chatgpt', 'perplexity', 'copilot', 'gemini'];

  var rafId = null;

  var PLATFORM_META = {
    chatgpt:    { displayName: 'ChatGPT',           domain: 'chatgpt.com · openai.com' },
    perplexity: { displayName: 'Perplexity',        domain: 'perplexity.ai' },
    copilot:    { displayName: 'Microsoft Copilot', domain: 'copilot.microsoft.com' },
    gemini:     { displayName: 'Google Gemini',     domain: 'gemini.google.com' }
  };

  // Manually-verified providers whose data is cleared for public display.
  // Add a provider here only after confirming the data pipeline is clean.
  var ENABLED_PROVIDERS = ['chatgpt', 'copilot'];

  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function renderDigits(containerOrId, value, minDigits) {
    var container = typeof containerOrId === 'string'
      ? document.getElementById(containerOrId)
      : containerOrId;
    if (!container) return;
    if (!isFinite(value)) value = 0;
    var str = String(Math.round(value));
    if (minDigits && str.length < minDigits) {
      str = str.padStart(minDigits, '0');
    }
    var html = '';
    for (var i = 0; i < str.length; i++) {
      html += '<span class="abom-digit">' + str[i] + '</span>';
      var posFromRight = str.length - 1 - i;
      if (posFromRight > 0 && posFromRight % 3 === 0) {
        html += '<span class="abom-digit-sep">,</span>';
      }
    }
    container.innerHTML = html;
  }

  function drawSparkline(dailyData, isLive) {
    if (!dailyData || dailyData.length < 2) return '';
    var w = 200;
    var h = 40;
    var max = Math.max.apply(null, dailyData);
    var min = Math.min.apply(null, dailyData);
    var range = max - min || 1;
    var points = dailyData.map(function (v, i) {
      var x = (i / (dailyData.length - 1)) * w;
      var y = h - ((v - min) / range) * (h - 6) - 3;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var color = isLive ? '#e53935' : '#d1cdc5';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  function calcWowPercent(current, previous) {
    return previous > 0 ? ((current - previous) / previous) * 100 : null;
  }

  function renderPlatforms(providerMap) {
    var container = document.getElementById('abom-platforms');
    if (!container) return;
    container.innerHTML = '';
    PLATFORM_ORDER.forEach(function (id) {
      var meta = PLATFORM_META[id] || {};
      var p = providerMap[id];
      var enabled = ENABLED_PROVIDERS.indexOf(id) !== -1 && !!p;
      var allTime = enabled ? (p.adsBlockedYesterday || 0) + (p.adsBlockedExcludingYesterday || 0) : 0;
      var wow = enabled ? calcWowPercent(p.adsBlockedLastFullWeek || 0, p.adsBlockedPreviousFullWeek) : null;
      var wowRounded = wow !== null ? Math.round(wow) : null;
      var wowText = Number.isFinite(wowRounded)
        ? (wowRounded >= 0 ? '+' : '-') + Math.abs(wowRounded) + '% w/w · ' + (meta.domain || '')
        : (meta.domain || '');
      var badgeHtml = enabled
        ? '<span class="abom-badge abom-badge--live"><span class="abom-live-dot abom-live-dot--sm" aria-hidden="true"></span>LIVE</span>'
        : '<span class="abom-badge abom-badge--soon">COMING SOON</span>';
      var bodyHtml = enabled
        ? '<div class="abom-pc-count">' + formatNumber(allTime) + '</div>' +
          '<div class="abom-pc-meta">' + wowText + '</div>'
        : '<p class="abom-pc-soon-text">Ads detected — tracking coming soon</p>' +
          '<span class="abom-pc-domain">' + (meta.domain || '') + '</span>';
      var card = document.createElement('div');
      card.className = 'abom-pc';
      card.innerHTML =
        '<div class="abom-pc-hd">' +
          badgeHtml +
        '</div>' +
        '<h3 class="abom-pc-name"></h3>' +
        bodyHtml +
        '<div class="abom-pc-chart">' + drawSparkline(enabled ? p.dailyAdsBlocked : null, enabled) + '</div>';
      card.querySelector('.abom-pc-name').textContent = meta.displayName || id;
      container.appendChild(card);
    });
  }

  function updateLastUpdated(generatedAt) {
    var el = document.getElementById('abom-updated');
    if (!el) return;
    var now = new Date();
    var generated = new Date(generatedAt);
    if (!generatedAt || isNaN(generated.getTime())) {
      el.textContent = 'Updated recently';
      return;
    }
    var diffMs = now - generated;
    if (diffMs < 0) {
      el.textContent = 'Updated recently';
      return;
    }
    var diffDays = Math.floor(diffMs / 86400000);
    var label;
    if (diffDays === 0) {
      var diffHours = Math.floor(diffMs / 3600000);
      if (diffHours < 1) {
        var diffMins = Math.floor(diffMs / 60000);
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
    var total = 0;
    var hasData = false;
    ENABLED_PROVIDERS.forEach(function (id) {
      var p = providerMap[id];
      if (!p || !p.dailyAdsBlocked || p.dailyAdsBlocked.length === 0) return;
      var recent = p.dailyAdsBlocked.slice(-7);
      var avg = recent.reduce(function (a, b) { return a + b; }, 0) / recent.length;
      total += avg;
      hasData = true;
    });
    return hasData ? total / 86400 : 0;
  }

  // Drives both the all-time counter and the since-open counter from a single RAF loop.
  // baseValue: the starting all-time total at the moment the page loaded.
  // perSecond: the rate at which ads are being blocked.
  function startAnimatedCounters(baseValue, perSecond) {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || perSecond <= 0) {
      renderDigits('alltime-digits', baseValue, 8);
      var srStaticEl = document.getElementById('alltime-sr');
      if (srStaticEl) srStaticEl.textContent = formatNumber(baseValue);
      var sinceOpenRowEl = document.getElementById('abom-since-open-row');
      if (sinceOpenRowEl) sinceOpenRowEl.hidden = true;
      return;
    }

    var sinceOpenRowEl = document.getElementById('abom-since-open-row');
    if (sinceOpenRowEl) sinceOpenRowEl.hidden = false;
    var sinceOpenEl = document.getElementById('since-open');
    var alltimeSr = document.getElementById('alltime-sr');
    var alltimeDigitsEl = document.getElementById('alltime-digits');
    var startTime = null;
    var lastAlltime = -1;
    var lastSinceOpen = -1;

    var baseRounded = Math.round(baseValue);

    function tick(timestamp) {
      if (startTime === null) startTime = timestamp;
      var elapsed = (timestamp - startTime) / 1000;
      var sinceOpenVal = Math.floor(elapsed * perSecond);
      var alltimeVal = baseRounded + sinceOpenVal;

      if (alltimeVal !== lastAlltime) {
        renderDigits(alltimeDigitsEl, alltimeVal, 8);
        if (alltimeSr) alltimeSr.textContent = formatNumber(alltimeVal);
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
    if (!data || !Array.isArray(data.providers)) {
      showError();
      return;
    }

    var providerMap = {};
    data.providers.forEach(function (p) {
      if (p && p.provider) providerMap[p.provider] = p;
    });

    var excludingYesterday = 0;
    var yesterdayTotal = 0;
    var weekTotal = 0;
    var prevWeekTotal = 0;

    ENABLED_PROVIDERS.forEach(function (id) {
      var p = providerMap[id];
      if (!p) return;
      excludingYesterday += p.adsBlockedExcludingYesterday || 0;
      yesterdayTotal += p.adsBlockedYesterday || 0;
      weekTotal += p.adsBlockedLastFullWeek || 0;
      prevWeekTotal += p.adsBlockedPreviousFullWeek || 0;
    });

    var generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
    var dataAgeSeconds = (!generatedAt || isNaN(generatedAt.getTime()))
      ? 0
      : Math.max(0, (Date.now() - generatedAt.getTime()) / 1000);

    var baseValue;
    var perSecond;

    if (dataAgeSeconds <= 86400) {
      // Data is fresh: show how much of yesterday has elapsed since generation,
      // then continue counting at yesterday's per-second rate.
      var progress = dataAgeSeconds / 86400;
      baseValue = excludingYesterday + progress * yesterdayTotal;
      perSecond = yesterdayTotal / 86400;
    } else {
      // Data is stale (> 24h): yesterday is fully counted. Continue at the
      // 7-day historical average so the counter stays live while waiting for
      // a fresh data file. The "Updated X ago" label signals the staleness.
      baseValue = excludingYesterday + yesterdayTotal;
      perSecond = calcHistoricalRate(providerMap);
    }

    renderDigits('week-digits', weekTotal, 6);
    var weekSr = document.getElementById('week-sr');
    if (weekSr) weekSr.textContent = formatNumber(weekTotal);

    var wow = calcWowPercent(weekTotal, prevWeekTotal);
    var wowEl = document.getElementById('wow');
    var wowRounded = wow !== null ? Math.round(wow) : null;
    if (wowEl && Number.isFinite(wowRounded)) {
      wowEl.textContent = (wowRounded >= 0 ? '↑ +' : '↓ -') + Math.abs(wowRounded) + '% vs. last week';
    }

    updateLastUpdated(data.generatedAt);
    renderPlatforms(providerMap);
    startAnimatedCounters(baseValue, perSecond);
  }

  function showError() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    var alltime = document.getElementById('alltime-digits');
    var week = document.getElementById('week-digits');
    var updated = document.getElementById('abom-updated');
    var platforms = document.getElementById('abom-platforms');
    var sinceOpen = document.getElementById('abom-since-open-row');
    if (alltime) alltime.innerHTML = '<span class="abom-error-label" aria-hidden="true">–</span>';
    if (week) week.innerHTML = '<span class="abom-error-label" aria-hidden="true">–</span>';
    var alltimeSrErr = document.getElementById('alltime-sr');
    var weekSrErr = document.getElementById('week-sr');
    if (alltimeSrErr) alltimeSrErr.textContent = 'Data unavailable';
    if (weekSrErr) weekSrErr.textContent = 'Data unavailable';
    if (updated) updated.textContent = 'Data temporarily unavailable';
    if (platforms) platforms.innerHTML = '';
    if (sinceOpen) sinceOpen.hidden = true;
  }

  var controller = new AbortController();
  var timeoutId = setTimeout(function () { controller.abort(); }, 10000);
  fetch(DATA_URL, { signal: controller.signal })
    .then(function (res) {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(render)
    .catch(showError);
})();
