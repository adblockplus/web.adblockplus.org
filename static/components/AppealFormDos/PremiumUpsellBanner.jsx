import { Switch, Match, createMemo } from "solid-js";
import { toDollarString } from "../currency.js";

export default function PremiumUpsellBanner(props) {
  const content = createMemo(() =>
    getOneTimeSubscriptionText(props.products, props.amount, props.frequency)
  );
  const amount = createMemo(() => toDollarString(props.currency, props.amount));

  return (
    <div id="what-is-included" class="info premium-upsell">
      <span class="info-line premium-upsell__border-start"></span>
      <Switch>
        <Match when={props.frequency === "monthly"}>
          <p id="monthly" class="premium-upsell__monthly">
            Nice! A monthly <span class="premium-upsell__currency"></span>
            <span class="premium-upsell__amount">{amount()}</span>{" "}
            contribution gets Adblock Plus Premium. Thanks for your support.
          </p>
        </Match>
        <Match when={props.frequency === "yearly"}>
          <p id="yearly" class="premium-upsell__yearly">
            Nice! A yearly <span class="premium-upsell__currency"></span>
            <span class="premium-upsell__amount">{amount()}</span>{" "}
            contribution gets Adblock Plus Premium. Thanks for your support.
          </p>
        </Match>
        <Match when={props.frequency === "once"}>
          <p id="one-year" class="premium-upsell__months">
            Nice! A <span class="premium-upsell__currency"></span>
            <span class="premium-upsell__amount">{amount()}</span>{" "}
            contribution gets Adblock Plus Premium for{" "}
            {content().frequencyClassSuffix.match(/month/)
              ? content().durationMonths
              : content().durationText}{" "}
            <span class="premium-upsell__duration"></span>{" "}
            {content().frequencyClassSuffix}. Thanks for your support.
          </p>
        </Match>
      </Switch>
    </div>
  );
}

function getOneTimeSubscriptionText(products, amount, frequency) {
  const amountNumerator = parseInt(amount, 10);
  const onceDenominator = parseInt(Object.keys(products.once)[2], 10);
  const monthlyDenominator = parseInt(Object.keys(products.monthly)[0], 10);

  let durationText, durationMonths;
  let frequencyClassSuffix = frequency;

  if (amountNumerator < onceDenominator) {
    durationText = Math.floor(amountNumerator / monthlyDenominator);
    frequencyClassSuffix = "months";
    durationMonths = durationText;
  } else {
    durationText = Math.floor(amountNumerator / onceDenominator);
    frequencyClassSuffix = durationText === 1 ? "year" : "years";
    durationMonths = 12 * durationText;
  }

  return { durationText, durationMonths, frequencyClassSuffix };
}