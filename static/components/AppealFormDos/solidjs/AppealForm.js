import { customElement } from "solid-element";
import { CONFIGURATION as config } from "../../AppealForm/configuration";

function AppealForm(props) {
  const currency = props.currency;
  const sandbox = props.environment !== "production";
  const products =
    config.Paddle[sandbox ? "sandbox" : "production"].products[currency];

  return (
    <div>
      <p>currency: {currency}</p>
      <p>sandbox: {sandbox.toString()}</p>
      <p>products: {JSON.stringify(products)}</p>
    </div>
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
