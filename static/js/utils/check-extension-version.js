function meetsExtensionVersion(version) {
  if (!version) return false;

  const target = [4, 26, 0];
  const current = version.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (current[i] > target[i]) return true;
    if (current[i] < target[i]) return false;
  }

  return true;
}

export async function checkExtensionVersion() {
  return new Promise((resolve, reject) => {
    try {
      adblock.afterAdblockPlusDetected(() => {
        const extensionVersion = adblock.query.get("qa-xv") || adblock.adblockPlus?.version;
        if (adblock.adblockPlus?.isPremium) {
          resolve(false);
        } else if (meetsExtensionVersion(extensionVersion)) {
          adblock.log('payment_flow_event_user_accounts');
          resolve(true);
        } else {
          adblock.log('payment_flow_event_legacy');
          resolve(false);
        }
      }, () => {
        resolve(false);
      });
    } catch (error) {
      adblock.logScriptError("checkExtensionVersion", error);
      resolve(false);
    }
  });
}
