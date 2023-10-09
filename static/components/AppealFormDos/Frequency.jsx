import { toDollarString } from "../currency";

export default function Frequency(props) {
  let customAmountRadio;
  let customAmountInput;

  return (
    <fieldset
      class="appeal-form-frequency"
      style={`border-color: ${props.active ? "#2196f3" : "#e0e0e0"}`}
      onClick={props.onClick}
    >
      <legend
        class="appeal-form-frequency__heading"
        innerHTML={props.legendText}
        onClick={(e) => e.stopPropagation()}
      />
      <div class="appeal-form-frequency__options">
        <div class="appeal-form-amounts">
          <For each={Object.keys(props.products)}>
            {(productAmount, index) => {
              if (productAmount === "custom") {
                return;
              }

              return (
                <label class="appeal-form-amount appeal-form-amount--fixed">
                  <input
                    type="radio"
                    name="appeal-form-amount__radio"
                    class="appeal-form-amount__radio"
                    data-testid={`appeal-form-amount__radio--${
                      props.frequency
                    }-${index()}`}
                    data-frequency={props.frequency}
                    value={productAmount}
                    data-product={props.products[productAmount]}
                    checked={props.products[productAmount] === props.checkedProduct}
                    onChange={props.onChange}
                  />
                  <span class="appeal-form-amount__text">
                    {toDollarString(props.currency, productAmount)}
                  </span>
                </label>
              );
            }}
          </For>
          <label class="appeal-form-amount appeal-form-amount--custom">
            <input
              type="radio"
              name="appeal-form-amount__radio"
              class="appeal-form-amount__radio"
              value="custom"
              data-testid={`appeal-form-amount__radio--${props.frequency}-6`}
              data-frequency={props.frequency}
              data-product="custom"
              ref={customAmountRadio}
              onClick={() => customAmountInput.focus()}
            />
            <input
              type="number"
              step=".01"
              class="appeal-form-amount__input"
              name="appeal-form-amount__input"
              data-product="custom"
              data-testid={`appeal-form-amount__input--${props.frequency}`}
              data-frequency={props.frequency}
              placeholder="35"
              data-minimum="5"
              ref={customAmountInput}
              onFocus={() => customAmountRadio.click()}
              onInput={props.onChange}
            />
          </label>
        </div>
      </div>
      {props.children}
    </fieldset>
  );
}
