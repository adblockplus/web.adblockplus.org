path("payment.config", {
  CAD: {
    sign: "$",
    once: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    monthly: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    },
    yearly: {
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
    },
    monthly: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    },
    yearly: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    }
  }
});
