import { query } from "../utils.js";

export const PADDLE_CONFIG = {
  test: {
    vendorId: 11004,
    monthly: { amount: 200, productId: 55427 },
    yearly: { amount: 2000, productId: 55428 },
  },
  live: {
    vendorId: 164164,
    monthly: { amount: 200, productId: 842007 },
    yearly: { amount: 2000, productId: 842011 },
  },
};

export const isTestmode = query.has("testmode");

export const paddleEnvironment = isTestmode
  ? PADDLE_CONFIG.test
  : PADDLE_CONFIG.live;

export function getPaddleVendorId(frequency) {
  return paddleEnvironment[frequency].vendorId;
}

export function getPaddleAmount(frequency) {
  return paddleEnvironment[frequency].amount;
}

export function getPaddleProductId(frequency) {
  return paddleEnvironment[frequency].productId;
}

// CAUTION: Hard coded
export function getPaddleLocale() {
  return "en";
}
