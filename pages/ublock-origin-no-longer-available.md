title=uBlock Origin is no longer available in Chrome due to MV3
description=Discover how Google’s Manifest V3 affects uBlock Origin and other ad blockers on Chrome. Learn about the implications for your browsing experience and explore alternative solutions to maintain ad-blocking functionality.
template=editor

<style>
  .editor li > strong { display: block; }
</style>

# {{ s1 uBlock Origin is leaving Chrome. Here’s what to know: }}

{{ s2 Google Chrome has begun disabling uBlock Origin in its browser. Early this summer Chrome transitioned its extensions platform to Manifest V3, ending support for Manifest V2 and all MV2 extensions. Chrome extensions not updated to Manifest V3 are now being phased out in the browser. }}

{{ s3 As an MV2 extension, uBlock Origin will no longer work in Chrome. uBlock Origin has publicly stated that it will not update its full version to meet MV3 requirements and <a href="https://www.racunalniske-novice.com/en/google-chrome-has-started-to-discontinue-ublock-origin/#:~:text=Google%20Chrome%20has%20begun%20phasing,the%20original%20application%20still%20works">Chrome is automatically turning off uBlock Origin because it is no longer supported.</a>] }}

## {{ s4 What to do as a Chrome user }}

1. {{ s5 <strong>Make sure your browser is up-to-date</strong> Normally browser updates happen in the background, but if you haven’t closed your browser in a while you may have a pending update. Extensions may not work properly if your browser is outdated. Find out <a href="https://support.google.com/chrome/answer/95414?hl=en&co=GENIE.Platform%3DDesktop#:~:text=update%20Google%20Chrome:-,On%20your%20computer%2C%20open%20Chrome.,the%20update%20will%20be%20applied.">here</a> how to manually update Chrome on your desktop, Android or iOS devices or just check that you are on the latest version. }}
2. {{ s6 <strong>Find extensions that work in Chrome</strong> If your current ad blocker or extension no longer works in Chrome, visit the <a href="https://chromewebstore.google.com/">Chrome Web Store</a> to find MV3-compatible extensions. }}

## {{ s7 What does Manifest V3 mean for ad blockers? }}

{{ s8 Extensions, like ad blockers and password managers, are tools we add to our browsers to make our online experience more personalized and secure. Behind the scenes, browsers provide a platform that developers use to build these extensions ensuring they run smoothly while respecting user privacy and security. }}

{{ s9 Recently, Google updated the way Chrome handles extensions through its platform, <a href="https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3">Manifest V3</a>. These updates have impacted how many Chrome extensions work, including some popular ad blockers. Key changes include replacing older features with newer ones like using “service workers” instead of background pages, introducing stricter rules for modifying web requests and banning code that’s hosted remotely. Google says these updates are intended to improve the security, privacy and performance of extensions while maintaining important functionality. }}

{{ s10 However, extensions, like uBlock Origin Chrome, that did not transition to MV3 are currently being removed from the Chrome Web Store and will stop working in Chrome. }}

## {{ s11 Adblock Plus is MV3-compatible and available in Chrome }}

{{ s12 When Manifest V3 was announced we went to work updating and testing Adblock Plus so we could continue offering you the same high-quality ad-blocking experience across all of your devices and browsers. }}

{{ s13 We believe you should have the choice of what browser to use and still have the tools available to make your online experience better. <a href="https://blog.adblockplus.org/blog/how-adblock-plus-is-getting-ready-for-manifest-v3">Adblock Plus was one of the first extensions to migrate to Manifest V3</a> and is compatible with the latest version of Chrome. Hopefully, you didn’t even notice when the change happened. }}
{ .mb3 }