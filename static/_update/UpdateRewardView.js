import { getDollarString } from "./currency.js";

export default class UpdateRewardView {

  constructor(parent) {
    this.parent = parent;
    this.textElement = parent.querySelector(".update-payment-reward__text");
    this.planName = "";
    this.planStringIds = {
      "ME": "product__premium"
    };
  }

  render(currency, amount, plan, duration) {
    let baseTranslation;
    if (duration > 12) {
      baseTranslation = adblock.strings["update-payment-reward__n-years"];
    } else if (duration == 12) {
      baseTranslation = adblock.strings["update-payment-reward__1-year"];
    } else if (duration > 1) {
      baseTranslation = adblock.strings["update-payment-reward__n-months"];
    } else if (duration == 1) {
      baseTranslation = adblock.strings["update-payment-reward__1-month"];
    } else {
      baseTranslation = adblock.strings["update-payment-reward"];
    }
    this.planName = adblock.strings[this.planStringIds[plan]];
    this.textElement.textContent = baseTranslation
      .replace( // replace amount
        `<span id=""><span class="currency_symbol">$</span><span id="contribution-amount">35.00</span></span>`, 
        getDollarString(currency, amount)
      )
      .replace( // replace product
        `<span id="contribution-free-products">AdBlock Premium and VPN</span>`, 
        this.planName
      )
      .replace( // replace duration (when not 1 month or year)
        duration > 12
          ? `<span id="duration-in-years">8</span>`
          : `<span id="duration-in-months">8</span>`,
        Math.floor(duration > 12 ? duration / 12 : duration)
      );
  }

}