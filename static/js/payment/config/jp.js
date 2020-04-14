window.paymentConfig = {
  JPY: {
    sign: "¥",
    donation: {
      amounts: [500, 1000, 1500, 3000, 5000, 10000],
      placeholder: 3000,
      minimum: 500
    }
  },
  USD: {
    sign: "$",
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    }
  }
};
