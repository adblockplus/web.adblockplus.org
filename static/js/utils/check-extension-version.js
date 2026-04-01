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
        if (meetsExtensionVersion(extensionVersion)) {
          adblock.log('payment_flow_event_user_accounts');
          resolve(true);
        } else {
          adblock.log('payment_flow_event_legacy');
          resolve(false);
        }
      }, () => {
        // do not show notice if the extension is not installed, portal has an own message for that
        resolve(true);
      });
    } catch (error) {
      adblock.logScriptError("checkExtensionVersion", error);
      resolve(false);
    }
  });
}
