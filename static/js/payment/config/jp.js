path("payment.config", {
  JPY: {
    sign: "¥",
    once: {
      amounts: [500, 1000, 1500, 3000, 5000, 10000],
      placeholder: 3000,
      minimum: 500
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
