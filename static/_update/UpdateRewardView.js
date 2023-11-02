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
        `<span class="amount">35.00</span>`, 
        getDollarString(currency, amount)
      )
      .replace( // replace product
        `<span class="product">Adblock Plus Premium</span>`, 
        this.planName
      )
      .replace( // replace duration (when not 1 month or year)
        `<span class="duration">8</span>`,
        Math.floor(duration > 12 ? duration / 12 : duration)
      );
  }

}