export const checkoutConfig = {
  customAmountService: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
  plans: {
    contribution: { // All ABP contributions award premium ATM
      code: "ME",
      title: "Adblock Plus Premium",
      successURL: "https://accounts.adblockplus.org/premium",
    },
    premium: {
      code: "ME",
      title: "Adblock Plus Premium",
      successURL: "https://accounts.adblockplus.org/premium",
    },
  },
  pageCodes: {
    "test-checkout": "TC",
    "installed": "I",
  }
};
