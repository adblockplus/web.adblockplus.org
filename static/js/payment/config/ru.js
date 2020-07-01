window.paymentConfig = {
  RUB: {
    sign: "₽",
    donation: {
      amounts: [250, 400, 500, 1000, 2000, 5000],
      placeholder: 1000,
      minimum: 250
    }
  },
  EUR: {
    sign: "€",
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
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
