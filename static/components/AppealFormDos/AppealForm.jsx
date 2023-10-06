import { createSignal } from "solid-js";
import { customElement } from "solid-element";

import {
  createPaddleConfig,
  createContributionInfo,
  createSuccessParameters,
  createPassthrough,
  createCheckoutOptions,
  checkout,
} from "../AppealForm/controller";
import { toDollarString } from "../currency";
import Frequency from "./Frequency";
import ToggleSwitch from "./ToggleSwitch";
import Banner from "./Banner";

import styles from "./AppealForm.css";

const paddleConfig = createPaddleConfig();
const defaultAmount = 3500;

/**
 * TODO: Switch out banner text depending on the amount selected
 * TODO: Add translations
 * TODO: set ui error message after checkout error
 * BUG: When switching from monthly to yearly, the you get an error unless you select another amount
 */

function AppealForm(props) {
  const [recurringFrequency, setRecurringFrequency] = createSignal("monthly"); // "monthly" or "yearly"
  const [amount, setAmount] = createSignal(defaultAmount);
  const [activeFrequency, setActiveFrequency] = createSignal("once"); // "once" or "recurring"
  const [buttonDisabled, setButtonDisabled] = createSignal(false);
  const [currency, setCurrency] = createSignal(props.currency);

  const handleToggleFrequencyClick = (e) => {
    setRecurringFrequency(e.target.checked ? "yearly" : "monthly");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount()) {
      adblock.error("No amount selected."); // TODO: add translation
      return;
    }

    setButtonDisabled(true);

    const frequency =
      activeFrequency() === "once" ? "once" : recurringFrequency();

    const data = {
      product: paddleConfig.products[currency()][frequency][amount()],
      frequency,
      currency: currency(),
      amount: amount(),
    };

    const contributionInfo = createContributionInfo(data);
    const successParameters = createSuccessParameters(data);

    // Storing information to be consumed by optimizely and hotjar experiments
    if (eyeo.payment.shouldStoreContributionInfo) {
      localStorage.setItem("contributionInfo", contributionInfo);
    }

    // Passing contributionInfo from new.abp.o to accounts.abp.o to work around
    // Premium activation limitation. See premium.html for read.
    if (
      eyeo.payment.shouldStoreContributionInfo &&
      eyeo.payment.productId == "ME"
    ) {
      successParameters.append("from__contributionInfo", contributionInfo);
    }

    const passthrough = createPassthrough(data, successParameters);
    const checkoutOptions = createCheckoutOptions(successParameters, () => {
      setButtonDisabled(false);
    });

    checkout(data.product, passthrough, checkoutOptions, (error) => {
      setButtonDisabled(false);
      // setErrorMessage(error);
    });
  };

  const handleFormChange = (e) => {
    // this means one of the radio buttons for custom amounts was clicked and it shouldn't do anything
    if (e.target.value === "custom" || e.target.type === "checkbox") return;

    // starting off the amount is zero so we don't want to do anything until they've started typing
    if (e.target.type === "number") {
      e.target.value ? setAmount(e.target.value * 100) : setAmount(0);
    } else {
      setAmount(e.target.value);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <>
      <header class="appeal-form-header">
        <h2
          class="appeal-form-header__heading"
          data-testid="appeal-form-header__heading"
        >
          Name a fair amount:
        </h2>
        <select
          class="appeal-form-header__select"
          data-testid="appeal-form-header__select"
          onChange={handleCurrencyChange}
        >
          <For each={Object.keys(paddleConfig.products)}>
            {(currency) => <option value={currency}>{currency}</option>}
          </For>
        </select>
      </header>
      <form
        class="appeal-form"
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        onInput={handleFormChange}
      >
        <div class="appeal-form-frequencies">
          <Frequency
            frequency="once"
            products={paddleConfig.products[currency()]["once"]}
            legendText="Make a <strong>one-off</strong> contribution"
            currency={currency()}
            defaultProduct={defaultAmount.toString()}
            active={activeFrequency() === "once"}
            onClick={() => setActiveFrequency("once")}
          />
          <Frequency
            frequency={recurringFrequency()}
            products={paddleConfig.products[currency()][recurringFrequency()]}
            legendText="Make a <strong>Recurring</strong> contribution"
            currency={currency()}
            borderColor="#2196f3"
            active={activeFrequency() === "recurring"}
            onClick={() => setActiveFrequency("recurring")}
          >
            <ToggleSwitch onClick={handleToggleFrequencyClick} />
          </Frequency>
        </div>
        <Banner amount={toDollarString(currency(), amount())} />
        <div class="appeal-form-checkout">
          <input
            class="appeal-form-checkout__submit"
            data-testid="appeal-form-checkout__submit"
            type="submit"
            value="Checkout Now"
            disabled={buttonDisabled()}
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

customElement("appeal-form", { currency: "USD" }, (props) => {
  return <AppealForm currency={props.currency} />;
});
