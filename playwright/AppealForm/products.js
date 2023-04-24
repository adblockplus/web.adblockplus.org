import { CONFIGURATION } from "../../static/components/AppealForm/configuration.js"

export const PRODUCTS = CONFIGURATION.Paddle.sandbox.products;

export const CURRENCIES = Object.keys(PRODUCTS);

export const DEFAULT_CURRENCY = CONFIGURATION.AppealForm.currency;

export const FREQUENCIES = Object.keys(PRODUCTS[DEFAULT_CURRENCY]);