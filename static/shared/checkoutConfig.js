export const checkoutConfig = {
  customAmountService: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
  plans: {
    contribution: {
      code: "",
      title: "Adblock Plus",
      successURL: "https://adblockplus.org/payment-complete",
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
