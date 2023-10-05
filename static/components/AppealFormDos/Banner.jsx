export default function Banner(props) {
  return (
    <div id="what-is-included" class="info premium-upsell">
      <span class="info-line premium-upsell__border-start"></span>
      <p id="one-year" class="premium-upsell__year">
        Nice! A <span class="premium-upsell__currency"></span>
        <span class="premium-upsell__amount">{props.amount}</span> contribution
        gets Adblock Plus Premium for one year. Thanks for your support.
      </p>
      <p id="x-years" class="premium-upsell__years" hidden>
        Nice! A <span class="premium-upsell__currency"></span>
        <span class="premium-upsell__amount"></span> contribution gets Adblock
        Plus Premium for <span class="premium-upsell__duration"></span> years.
        Thanks for your support.
      </p>
      <p id="x-months" class="premium-upsell__months" hidden>
        Nice! A <span class="premium-upsell__currency"></span>
        <span class="premium-upsell__amount"></span> contribution gets Adblock
        Plus Premium for <span class="premium-upsell__duration"></span> months.
        Thanks for your support.
      </p>
      <p id="monthly" class="premium-upsell__monthly" hidden>
        Nice! A monthly <span class="premium-upsell__currency"></span>
        <span class="premium-upsell__amount"></span> contribution gets Adblock
        Plus Premium. Thanks for your support.
      </p>
      <p id="yearly" class="premium-upsell__yearly" hidden>
        Nice! A yearly <span class="premium-upsell__currency"></span>
        <span class="premium-upsell__amount"></span> contribution gets Adblock
        Plus Premium. Thanks for your support.
      </p>
    </div>
  );
}
