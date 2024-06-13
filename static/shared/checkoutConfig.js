export const checkoutConfig = {
  customAmountService: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
  defaultProduct: "contribution",
  products: {
    premium: {
      code: "ME",
      title: "Adblock Plus Premium",
      successURL: "https://accounts.adblockplus.org/premium",
    },
    contribution: {
      code: "",
      title: "Adblock Plus",
      successURL: "https://adblockplus.org/payment-complete",
    },
  },
  pageCodes: {
    "installed": "I",
    // FIXME
  }
};
