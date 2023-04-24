import * as dotenv from 'dotenv'; dotenv.config();
import { join } from 'path';
import { defaultLanguage } from './languages.js';

export const URL = process.env.ABP_URL || "http://localhost:5000";

export function url(language, page, params) {
  return `${join(URL, language || defaultLanguage, page)}?${new URLSearchParams(params).toString()}`;
}
