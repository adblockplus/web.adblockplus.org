const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const BUCKET = process.env.AI_STATS_GCS_BUCKET;
const FILE_PREFIX = 'ai-ad-data-';

const ERROR_CACHE_CONTROL = 'public, max-age=60';
// The scheduled BigQuery `EXPORT DATA` job requires a wildcard in its
// destination URI, which it fills with a zero-padded shard index. Our dataset
// fits in a single shard, so each run (over)writes this one deterministic
// object name. Reading it directly avoids listing the bucket on every request.
const DATA_FILE = `${FILE_PREFIX}000000000000.json`;

async function handleAiAdData(req, res) {
  try {
    let contents;
    try {
      [contents] = await storage.bucket(BUCKET).file(DATA_FILE).download();
    } catch (err) {
      if (err.code !== 404) throw err;
      // No export in place yet (or its name changed) — surface as "not ready"
      // rather than a hard error, and negative-cache it briefly.
      res.set('Cache-Control', ERROR_CACHE_CONTROL);
      return res.status(503).json({ error: 'Data not yet available' });
    }

    const raw = JSON.parse(contents.toString('utf8').trim());

    // reshape providers from array to keyed object
    if (Array.isArray(raw.providers)) {
      raw.providers = Object.fromEntries(
        raw.providers.map(p => {
          const { provider, ...rest } = p;
          return [provider, rest];
        })
      );
    }

    // stale-if-error lets the CDN serve the last good payload when the origin errors
    res.set('Cache-Control', 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=86400');
    res.json(raw);
  } catch (err) {
    console.error('Failed to fetch ai-ad-data:', err);
    res.set('Cache-Control', ERROR_CACHE_CONTROL);
    res.status(503).json({ error: 'Data temporarily unavailable' });
  }
}

module.exports = { handleAiAdData };
