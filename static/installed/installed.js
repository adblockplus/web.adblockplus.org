/* global Paddle, adblock */

import { checkout } from "../shared/checkout.js";
import { installedPaymentOptions } from "./installedPaymentOptions.js";
import { InstalledPaymentView } from "./InstalledPaymentView.js";

new InstalledPaymentView({
  parentElement: document.getElementById("installed-payment"),
  paymentOptions: installedPaymentOptions,
  defaultCurrency: adblock.settings.defaultCurrency || "USD",
  submitCallback: function onSubmit({ currency, frequency, amount, }) {
    return checkout({
      product: "contribution",
      currency,
      frequency,
      amount,
    }).catch(error => console.log(error));
  },
});