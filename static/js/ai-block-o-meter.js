(function () {
  var DATA_URL = '/data/ai-block-o-meter.json';

  var PLATFORM_ORDER = ['chatgpt', 'perplexity', 'copilot', 'gemini'];

  var rafId = null;
  var visibilityListener = null;

  var PLATFORM_META = {
    chatgpt: {
      domain: 'chatgpt.com · openai.com',
      icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22.28 9.6a5.74 5.74 0 0 0-.49-4.72 5.8 5.8 0 0 0-6.24-2.78A5.74 5.74 0 0 0 11.25 0a5.8 5.8 0 0 0-5.53 4.02 5.74 5.74 0 0 0-3.83 2.79 5.8 5.8 0 0 0 .71 6.8 5.74 5.74 0 0 0 .49 4.71 5.8 5.8 0 0 0 6.24 2.78 5.74 5.74 0 0 0 4.3 2.1 5.8 5.8 0 0 0 5.53-4.02 5.74 5.74 0 0 0 3.83-2.78 5.8 5.8 0 0 0-.71-6.8ZM13.55 21.5a4.3 4.3 0 0 1-2.76-.99l.14-.08 4.57-2.64a.76.76 0 0 0 .38-.66v-6.44l1.93 1.11a.07.07 0 0 1 .04.06v5.34a4.32 4.32 0 0 1-4.3 4.3Zm-9.27-3.96a4.3 4.3 0 0 1-.51-2.88l.13.08 4.58 2.64a.76.76 0 0 0 .76 0L14.5 14l1.93 1.12a.07.07 0 0 1 .03.07l-4.63 2.67a4.32 4.32 0 0 1-5.9-1.57l-.55-.75Zm-1.2-10.02a4.3 4.3 0 0 1 2.25-1.89v5.42a.76.76 0 0 0 .38.66l5.26 3.04-1.93 1.11a.07.07 0 0 1-.07 0L4.4 13.2a4.32 4.32 0 0 1-.71-5.68h-.61Zm15.87 3.7-5.26-3.04 1.93-1.12a.07.07 0 0 1 .07 0l4.57 2.64a4.32 4.32 0 0 1-.67 7.8v-5.41a.76.76 0 0 0-.38-.66l-.26-.21Zm1.92-2.9-.13-.08-4.57-2.64a.76.76 0 0 0-.76 0L9.5 9.97 7.57 8.86a.07.07 0 0 1-.03-.07l4.62-2.67a4.32 4.32 0 0 1 6.42 4.48l-.25.22-.01-.1Zm-10.5 3.45-1.93-1.12a.07.07 0 0 1-.04-.06V5.25a4.32 4.32 0 0 1 7.08-3.32l-.14.08L10.77 4.6a.76.76 0 0 0-.38.66l-.02 6.51Zm1.05-2.26 2.34-1.35 2.34 1.35v2.7l-2.34 1.35-2.34-1.35v-2.7Z" fill="currentColor"/></svg>'
    },
    perplexity: {
      domain: 'perplexity.ai',
      icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    copilot: {
      domain: 'copilot.microsoft.com',
      icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4.2 2.4-7.3L2 9.4h7.6L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
    },
    gemini: {
      domain: 'gemini.google.com',
      icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2c0 5.52-4.48 10-10 10 5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" fill="currentColor"/></svg>'
    }
  };

  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function renderDigits(containerId, value, minDigits) {
    var container = document.getElementById(containerId);
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

  function renderPlatforms(data) {
    var container = document.getElementById('abom-platforms');
    if (!container) return;
    container.innerHTML = '';
    PLATFORM_ORDER.forEach(function (id) {
      var p = data.providers[id];
      if (!p) return;
      var meta = PLATFORM_META[id] || {};
      var allTime = p.tracking ? (p.adsBlockedYesterday || 0) + (p.adsBlockedExcludingYesterday || 0) : 0;
      var wow = calcWowPercent(p.adsBlockedLastFullWeek || 0, p.adsBlockedPreviousFullWeek);
      var wowRounded = wow !== null ? Math.round(wow) : null;
      var wowText = Number.isFinite(wowRounded)
        ? (wowRounded >= 0 ? '+' : '-') + Math.abs(wowRounded) + '% w/w · ' + (meta.domain || '')
        : (meta.domain || '');
      var badgeHtml = p.tracking
        ? '<span class="abom-badge abom-badge--live"><span class="abom-live-dot abom-live-dot--sm" aria-hidden="true"></span>LIVE</span>'
        : '<span class="abom-badge abom-badge--soon">COMING SOON</span>';
      var bodyHtml = p.tracking
        ? '<div class="abom-pc-count">' + formatNumber(allTime) + '</div>' +
          '<div class="abom-pc-meta">' + wowText + '</div>'
        : '<p class="abom-pc-soon-text">Ads detected — tracking coming soon</p>' +
          '<span class="abom-pc-domain">' + (meta.domain || '') + '</span>';
      var card = document.createElement('div');
      card.className = 'abom-pc';
      card.innerHTML =
        '<div class="abom-pc-hd">' +
          '<span class="abom-pc-icon">' + (meta.icon || '') + '</span>' +
          badgeHtml +
        '</div>' +
        '<h3 class="abom-pc-name"></h3>' +
        bodyHtml +
        '<div class="abom-pc-chart">' + drawSparkline(p.dailyAdsBlocked, p.tracking) + '</div>';
      card.querySelector('.abom-pc-name').textContent = p.name || id;
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
  function calcHistoricalRate(providers) {
    var total = 0;
    var hasTracking = false;
    PLATFORM_ORDER.forEach(function (id) {
      var p = providers[id];
      if (!p || !p.tracking) return;
      if (p.dailyAdsBlocked && p.dailyAdsBlocked.length > 0) {
        var recent = p.dailyAdsBlocked.slice(-7);
        var avg = recent.reduce(function (a, b) { return a + b; }, 0) / recent.length;
        total += avg;
        hasTracking = true;
      }
    });
    return hasTracking ? total / 86400 : 0;
  }

  // Drives both the all-time counter and the since-open counter from a single RAF loop.
  // baseValue: the starting all-time total at the moment the page loaded.
  // perSecond: the rate at which ads are being blocked.
  function startAnimatedCounters(baseValue, perSecond) {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (visibilityListener) {
      document.removeEventListener('visibilitychange', visibilityListener);
      visibilityListener = null;
    }

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      renderDigits('alltime-digits', baseValue, 8);
      var srStaticEl = document.getElementById('alltime-sr');
      if (srStaticEl) srStaticEl.textContent = formatNumber(baseValue);
      return;
    }

    var sinceOpenEl = document.getElementById('since-open');
    var alltimeSr = document.getElementById('alltime-sr');
    var startTime = Date.now();
    var pausedMs = 0;
    var pausedAt = null;
    var lastAlltime = -1;
    var lastSinceOpen = -1;

    var baseRounded = Math.round(baseValue);

    function tick() {
      var elapsed = (Date.now() - startTime - pausedMs) / 1000;
      var sinceOpenVal = Math.floor(elapsed * perSecond);
      var alltimeVal = baseRounded + sinceOpenVal;

      if (alltimeVal !== lastAlltime) {
        renderDigits('alltime-digits', alltimeVal, 8);
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

    visibilityListener = function () {
      if (document.hidden) {
        pausedAt = Date.now();
        cancelAnimationFrame(rafId);
      } else {
        if (pausedAt !== null) {
          pausedMs += Date.now() - pausedAt;
          pausedAt = null;
        }
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', visibilityListener);
  }

  function render(data) {
    if (!data || !data.providers) {
      showError();
      return;
    }
    var providers = data.providers;

    var excludingYesterday = 0;
    var yesterdayTotal = 0;
    var weekTotal = 0;
    var prevWeekTotal = 0;

    PLATFORM_ORDER.forEach(function (id) {
      var p = providers[id];
      if (p && p.tracking) {
        excludingYesterday += p.adsBlockedExcludingYesterday || 0;
        yesterdayTotal += p.adsBlockedYesterday || 0;
        weekTotal += p.adsBlockedLastFullWeek || 0;
        prevWeekTotal += p.adsBlockedPreviousFullWeek || 0;
      }
    });

    var generatedAt = new Date(data.generatedAt);
    var dataAgeSeconds = isNaN(generatedAt.getTime())
      ? 0
      : Math.max(0, (Date.now() - generatedAt.getTime()) / 1000);

    var baseValue;
    var perSecond;

    if (dataAgeSeconds <= 86400) {
      // Data is fresh: show how much of yesterday has elapsed since generation,
      // then continue counting at yesterday's per-second rate.
      var progress = dataAgeSeconds / 86400;
      baseValue = excludingYesterday + progress * yesterdayTotal;
      perSecond = yesterdayTotal > 0 ? yesterdayTotal / 86400 : calcHistoricalRate(providers);
    } else {
      // Data is stale (> 24h): yesterday is fully counted. Continue at the
      // 7-day historical average so the counter stays live while waiting for
      // a fresh data file. The "Updated X ago" label signals the staleness.
      baseValue = excludingYesterday + yesterdayTotal;
      perSecond = calcHistoricalRate(providers);
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
    renderPlatforms(data);
    startAnimatedCounters(baseValue, perSecond);
  }

  function showError() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (visibilityListener) {
      document.removeEventListener('visibilitychange', visibilityListener);
      visibilityListener = null;
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
    if (platforms) platforms.innerHTML = '<p class="abom-error-label">Data temporarily unavailable</p>';
    if (sinceOpen) sinceOpen.hidden = true;
  }

  fetch(DATA_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(render)
    .catch(showError);
})();
