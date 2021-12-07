path("payment.config", {
  EUR: {
    sign: "€",
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    }
  },
  GBP: {
    sign: "£",
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    }
  },
  USD: {
    sign: "$",
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    }
  }
});
