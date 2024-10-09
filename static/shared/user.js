// AdBlock's user.js adapted for adblockplus.org

export function getUserId() {
  if (adblock.query.has("u")) {
    const userid = adblock.query.get("u");
    const page = document.documentElement.dataset.page;
    if (page == "manage" || userid.length == 16 || userid.length == 15) return userid;
  }
  return "";
}

export function generateUserId() {
  const timestamp = (Date.now()) % 1e8; // 8 digits from end of timestamp
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const generatedChars = [];
  for (let i = 0; i < 8; i++) {
      const randomCharIndex = Math.floor(Math.random() * allowedChars.length);
      generatedChars.push(allowedChars[randomCharIndex]);
  }
  return generatedChars.join('') + timestamp;
}

export function generateTrackingId(productId, userid) {
  const browserId = getBrowserId();
  const osId = getOsId();
  const sourceId = getSourceId();
  const funnelId = adblock.query.has("s") ? adblock.query.get("s").trim() : "";
  const productPrefix = funnelId ? `${productId}_${funnelId} ` : productId ? `${productId} ` : "";
  return `${productPrefix}X0G0 F${browserId}${osId}${sourceId} ${userid}`;
};

export function getBrowserId() {
  let id = "U";
  const chrome = navigator.userAgent.indexOf("Chrome");
  const opera = navigator.userAgent.indexOf("OPR");
  const edg = navigator.userAgent.indexOf("Edg");
  const edge = navigator.userAgent.indexOf("Edge");
  const safari = navigator.userAgent.indexOf("Safari");
  const firefox = navigator.userAgent.indexOf("Firefox");
  const samsung = navigator.userAgent.indexOf("Samsung");
  const trident = navigator.userAgent.indexOf("Trident");
  if (
    chrome !== -1 &&
    opera === -1 &&
    samsung === -1 &&
    edg === -1 &&
    edge === -1
  ) {
    id = "E";
  } else if (
    safari !== -1 &&
    opera === -1 &&
    samsung === -1 &&
    edg === -1 &&
    edge === -1
  ) {
    id = "S";
  } else if (firefox !== -1) {
    id = "F";
  } else if (opera !== -1) {
    id = "O";
  } else if (edge !== -1) {
    id = "M";
  } else if (edg !== -1) {
    id = "CM";
  } else if (navigator.appName == 'Microsoft Internet Explorer') {
    id = "T";
  } else if (trident !== -1) {
    id = "T";
  } else if (samsung !== -1) {
    id = "G";
  }
  return id;
}

export function isIOS() {
  return navigator.userAgent.indexOf("iPhone") != -1 ||
    navigator.userAgent.indexOf("iPad") != -1 ||
    navigator.userAgent.indexOf("iPod") != -1;
}

export function getOSSingleChar() {
  let char = "U";
  if (- 1 != navigator.appVersion.indexOf("Win")) {
    char = "W";
  } else if (isIOS()) {
    char = "I";
  } else if (-1 != navigator.appVersion.indexOf("Mac")) {
    char = "M";
  } else if (-1 != navigator.appVersion.indexOf("X11")) {
    char = "L";
  } else if (-1 != navigator.appVersion.indexOf("Linux")) {
    char = "L";
  }
  return char;
}

export function getOsId() {
  return "O" + getOSSingleChar();
}

export function getSourceId() {
  return "S" + getPlainSource();
}

export function getPlainSource() {
  const page = (() => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 1];
  })();
  const pageIds = {
    "installed": "I",
    "installed-fallback": "I",
    "contribution": "Y",
    "contribution-fallback": "Y",
    "update": "B",
    "update-fallback": "B",
    "premium": "ME",
    "block-cookie-banners": "BCB",
  }
  return pageIds[page] || "U";
}