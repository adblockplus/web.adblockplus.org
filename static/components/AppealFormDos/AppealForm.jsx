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
import Frequency from "./Frequency";
import ToggleSwitch from "./ToggleSwitch";
import PremiumUpsellBanner from "./PremiumUpsellBanner";

import styles from "./AppealForm.css";

const paddleConfig = createPaddleConfig();
const defaultAmount = 3500;

/**
 * TODO: Add translations
 * TODO: set ui error message after checkout error
 */

function AppealForm(props) {
  const [recurringFrequency, setRecurringFrequency] = createSignal("monthly"); // "monthly" or "yearly"
  const [amount, setAmount] = createSignal(defaultAmount);
  const [activeFrequency, setActiveFrequency] = createSignal("once"); // "once" or "recurring"
  const [buttonDisabled, setButtonDisabled] = createSignal(false);
  const [currency, setCurrency] = createSignal(props.currency);

  const getFrequency = () => {
    return activeFrequency() === "once" ? "once" : recurringFrequency();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount()) {
      adblock.error("No amount selected."); // TODO: add translation
      return;
    }

    setButtonDisabled(true);

    const frequency = getFrequency();

    const data = {
      product: paddleConfig.products[currency()][frequency][amount()],
      frequency,
      currency: currency(),
      amount: amount(),
    };

    const contributionInfo = createContributionInfo(data);
    const successParameters = createSuccessParameters(data);

    eyeo.payment.productId = "ME";
    eyeo.payment.variantName = "update__202308";
    eyeo.payment.paymentCompleteUrl = "https://accounts.adblockplus.org/premium";

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

  const handleToggleFrequencyClick = (e) => {
    const freq = e.target.checked ? "yearly" : "monthly";
    const startingProductIndex = 3;
    const firstAmount = Number(Object.keys(paddleConfig.products[currency()][freq])[startingProductIndex]);

    setAmount(firstAmount);
    setRecurringFrequency(freq);
    setActiveFrequency("recurring");
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleProductChange = (freq) => (e) => {
    setActiveFrequency(freq);

    if (e.target.type === "number" && currency() !== "JPY") {
      // text/number "custom" input convert to cents
      setAmount(e.target.value * 100);
    } else {
      setAmount(e.target.value);
    }
  }

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
      >
        <div class="appeal-form-frequencies">
          <Frequency
            frequency="once"
            products={paddleConfig.products[currency()]["once"]}
            legendText="Make a <strong>one-off</strong> contribution"
            currency={currency()}
            checkedProduct={getFrequency() === "once" && paddleConfig.products[currency()]["once"][amount()]}
            active={activeFrequency() === "once"}
            onChange={handleProductChange("once")}
          />
          <Frequency
            frequency={recurringFrequency()}
            products={paddleConfig.products[currency()][recurringFrequency()]}
            legendText="Make a <strong>Recurring</strong> contribution"
            currency={currency()}
            checkedProduct={
              activeFrequency() === "recurring" &&
              paddleConfig.products[currency()][recurringFrequency()][amount()]
            }
            active={activeFrequency() === "recurring"}
            onChange={handleProductChange("recurring")}
          >
            <ToggleSwitch onClick={handleToggleFrequencyClick} />
          </Frequency>
        </div>
        <PremiumUpsellBanner
          products={paddleConfig.products[currency()]}
          currency={currency()}
          amount={amount()}
          frequency={getFrequency()}
        />
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
