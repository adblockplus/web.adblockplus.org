import { createSignal } from "solid-js";
import { customElement } from "solid-element";

import {
  createPaddleConfig,
  createContributionInfo,
  createSuccessParameters,
  createPassthrough,
  createCheckoutOptions,
  checkout,
} from "./helpers";
import Frequency from "./Frequency";
import ToggleSwitch from "./ToggleSwitch";
import PremiumUpsellBanner from "./PremiumUpsellBanner";

import styles from "./AppealForm.css";

const paddleConfig = createPaddleConfig();
const defaultAmount = 3500;
const defaultCurrency =
  typeof adblock == "object" ? adblock.settings.currency || "USD" : "USD";
const translations = adblock.strings;

function AppealForm() {
  const [recurringFrequency, setRecurringFrequency] = createSignal("monthly"); // "monthly" or "yearly"
  const [amount, setAmount] = createSignal(defaultAmount);
  const [activeFrequency, setActiveFrequency] = createSignal("once"); // "once" or "recurring"
  const [buttonDisabled, setButtonDisabled] = createSignal(false);
  const [currency, setCurrency] = createSignal(defaultCurrency);
  const [errorMessage, setErrorMessage] = createSignal(null);

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
    eyeo.payment.paymentCompleteUrl =
      "https://accounts.adblockplus.org/premium";

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
      setErrorMessage(error.message);
    });
  };

  const handleToggleFrequencyClick = (e) => {
    const freq = e.target.checked ? "yearly" : "monthly";
    const startingProductIndex = 3;
    const firstAmount = Number(
      Object.keys(paddleConfig.products[currency()][freq])[startingProductIndex]
    );

    setAmount(firstAmount);
    setRecurringFrequency(freq);
    setActiveFrequency("recurring");
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleProductChange = (freq) => (e) => {
    setActiveFrequency(freq);
    let newAmount;

    if (e.target.type === "number" && currency() !== "JPY") {
      // text/number "custom" input convert to cents
      newAmount = e.target.value * 100;
    } else {
      newAmount = Number(e.target.value);
    }

    const frequency = getFrequency();

    if ((frequency === "once" || frequency === "yearly") && newAmount < 500) {
      setErrorMessage(adblock.strings[`appeal-form__error--${frequency}`]);
      return;
    }

    if (newAmount < 199) {
      setErrorMessage(adblock.strings["appeal-form__error--monthly"]);
      return;
    }

    setErrorMessage(null);
    setAmount(newAmount);
  };

  return (
    <>
      <header class="appeal-form-header">
        <h2
          class="appeal-form-header__heading"
          data-testid="appeal-form-header__heading"
        >
          {translations["appeal-form-header__heading"]}
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
      <form class="appeal-form" onSubmit={handleSubmit}>
        <div class="appeal-form-frequencies">
          <Frequency
            frequency="once"
            products={paddleConfig.products[currency()]["once"]}
            legendText={translations["appeal-form-frequency__heading--once"]}
            currency={currency()}
            checkedProduct={
              getFrequency() === "once" &&
              paddleConfig.products[currency()]["once"][amount()]
            }
            active={activeFrequency() === "once"}
            onChange={handleProductChange("once")}
          />
          <Frequency
            frequency={recurringFrequency()}
            products={paddleConfig.products[currency()][recurringFrequency()]}
            legendText={
              translations[
                `appeal-form-frequency__heading--${recurringFrequency()}`
              ]
            }
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
        <Show when={!errorMessage()}>
          <PremiumUpsellBanner
            products={paddleConfig.products[currency()]}
            currency={currency()}
            amount={amount()}
            frequency={getFrequency()}
          />
        </Show>
        <Show when={errorMessage()}>
          <div
            class="appeal-form__error"
            data-testid="appeal-form__error"
            innerHTML={errorMessage()}
          />
        </Show>
        <div class="appeal-form-checkout">
          <input
            class="appeal-form-checkout__submit"
            data-testid="appeal-form-checkout__submit"
            type="submit"
            value={translations["appeal-form-checkout__submit"]}
            disabled={buttonDisabled() || errorMessage()}
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

customElement("appeal-form", () => <AppealForm />);
