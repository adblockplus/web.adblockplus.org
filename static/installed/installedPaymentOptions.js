export const InstalledPaymentOptions = {
  USD: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  AUD: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  CAD: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  EUR: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  GBP: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  JPY: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1500, 2000, 2500, 3500, 5000],
      monthly: [200, 300, 500, 1000, 1500],
    },
  },
  NZD: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  CHF: {
    minimums: { yearly: 500, monthly: 200 },
    amounts: {
      yearly: [1000, 1500, 2000, 3500, 5000],
      monthly: [200, 300, 400, 500, 1000],
    },
  },
  RUB: {
    minimums: { yearly: 25000, monthly: 15000 },
    amounts: {
      yearly: [25000, 50000, 100000, 250000, 500000],
      monthly: [15000, 25000, 40000, 50000, 100000],
    },
  },
}

export function getInstalledPaymentAmount(currency, frequency, index) {
  return InstalledPaymentOptions[currency].amounts[frequency][index];
}

export function getInstalledPaymentMinimum(currency, frequency) {
  return InstalledPaymentOptions[currency].minimums[frequency];
}
