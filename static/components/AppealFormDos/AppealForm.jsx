import { createSignal, createEffect } from "solid-js";
import { customElement } from "solid-element";
import { initializePaddle } from "@paddle/paddle-js";

import { CONFIGURATION as config } from "./configuration";
import { formatAmount } from "../utils";
import Frequency from "./Frequency";
import ToggleSwitch from "./ToggleSwitch";
import Banner from "./Banner";

import styles from "./AppealForm.css";

function AppealForm(props) {
  const currency = props.currency;
  const isSandbox = props.environment !== "production";
  const paddleEnv = isSandbox ? "sandbox" : "live";
  const products = config.Paddle[paddleEnv].products[currency];

  const [recurringFrequency, setRecurringFrequency] = createSignal("monthly");
  const [amount, setAmount] = createSignal(3500);
  const [paddle, setPaddle] = createSignal();
  const [activeFrequency, setActiveFrequency] = createSignal();

  createEffect(async () => {
    const paddleInstance = await initializePaddle({
      seller: config.Paddle[paddleEnv].vendor,
    });

    if (paddleInstance) {
      setPaddle(paddleInstance);
    } else {
      console.warn("Paddle not initialized");
    }
  });

  const handleToggleFrequencyClick = (e) => {
    setRecurringFrequency(e.target.checked ? "yearly" : "monthly");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = [...data.entries()];

    if (entries.length === 0) {
      alert("no product selected");
      return;
    }

    paddle().Checkout.open({
      allowQuantity: false,
      product: entries[0][1],
    });
  };

  return (
    <>
      <form
        class="appeal-form"
        onSubmit={handleSubmit}
        onChange={(e) => {
          e.preventDefault();
          setAmount(e.target.value);
        }}
      >
        <div class="appeal-form-frequencies">
          <Frequency
            frequency="once"
            products={products["once"]}
            legendText="Make a <strong>one-off</strong> contribution"
            currency={currency}
            defaultProduct={"3500"}
            active={activeFrequency() === "once"}
            onClick={() => setActiveFrequency("once")}
          />
          <Frequency
            frequency={products[recurringFrequency()]}
            products={products[recurringFrequency()]}
            legendText="Make a <strong>Recurring</strong> contribution"
            currency={currency}
            borderColor="#2196f3"
            active={activeFrequency() === "recurring"}
            onClick={() => setActiveFrequency("recurring")}
          >
            <ToggleSwitch onClick={handleToggleFrequencyClick} />
          </Frequency>
        </div>
        <Banner amount={formatAmount(amount(), currency)} />
        <div class="appeal-form-checkout">
          <input
            class="appeal-form-checkout__submit"
            data-testid="appeal-form-checkout__submit"
            type="submit"
            value="Checkout Now"
          />
          <img
            alt=""
            src="/components/AppealForm/appeal-form-checkout__image.svg"
            class="appeal-form-checkout__image"
          />
        </div>
      </form>
      <style>{styles}</style>
    </>
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
