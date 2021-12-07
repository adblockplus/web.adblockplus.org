path("payment.config", {
  NZD: {
    sign: "$",
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
