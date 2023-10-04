import { customElement } from "solid-element";
import { CONFIGURATION as config } from "../../AppealForm/configuration";

import styles from '../../AppealForm/AppealForm.css';

function AppealForm(props) {
  const currency = props.currency;
  const products =
    config.Paddle[props.environment !== "production" ? "sandbox" : "live"]
      .products[currency];

  return (
    <form
      class="appeal-form"
      // on:submit={(e) => {
      //   e.preventDefault();
      //   const data = new FormData(e.target);
      //   const entries = [...data.entries()];
        
      //   // TODO: Handle form submission
      // }}
    >
      <div class="appeal-form-frequencies">
        {/* <Frequency
          frequency="once"
          products={products.once}
          legendText="Make a <strong>one-off</strong> contribution"
        />
        <Frequency
          frequency={products[recurringFrequency]}
          products={products[recurringFrequency]}
          legendText="Make a <strong>Recurring</strong> contribution"
        />
        <ToggleSwitch on:click={handleToggleFrequencyClick} /> */}
      </div>
      <input type="submit" value="Submit" />
      <style>{styles}</style>
    </form>
  );
}

customElement(
  "appeal-form",
  { currency: "USD", environment: "development" },
  (props) => {
    return (
      <AppealForm currency={props.currency} environment={props.environment} />
    );
  }
);
