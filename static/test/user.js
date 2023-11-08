// CAUTION: Hard coded
export function getLocale() {
  return "en";
}

// CAUTION: Hard coded
export function getCurrency() {
  return "USD";
}

// Generates a userId based on same code as within the adblock extension
export function generateUserId() {
  const timestamp = (Date.now()) % 1e8; // 8 digits from end of timestamp
  const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
  const chosen = [];
  for (let i = 0; i < 8; i++) {
    const choice = Math.floor(Math.random() * allowed.length);
    chosen.push(allowed[choice]);
  }
  return chosen.join('') + timestamp;
}

// CAUTION: Defaults hard coded for testing
export function generateTrackingId(userid, product = "ME", browser = "E", os = "OM", source = "SHME") {
  const experimentId = "0"; // ABP doesn't support AdBlock experiments
  const experimentVariant = "0";
  return `${product ? product + " " : ""}X${experimentId}G${experimentVariant} F${browser}${os}${source} ${userid}`;
}
