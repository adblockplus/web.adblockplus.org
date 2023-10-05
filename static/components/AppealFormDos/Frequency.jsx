import { formatAmount } from "../utils";

export default function Frequency(props) {
  return (
    <fieldset
      class="appeal-form-frequency"
      style={`border-color: ${props.active ? "#2196f3" : "#e0e0e0"}`}
      onClick={props.onClick}
    >
      <legend
        class="appeal-form-frequency__heading"
        innerHTML={props.legendText}
      />
      <div class="appeal-form-frequency__options">
        <div class="appeal-form-amounts">
          <For each={Object.keys(props.products)}>
            {(productAmount) => {
              // TODO: handle this case
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
                    }-${0}`}
                    data-frequency={props.frequency}
                    value={productAmount}
                    data-product={props.products[productAmount]}
                    checked={productAmount === props.defaultProduct}
                  />
                  <span class="appeal-form-amount__text">
                    {formatAmount(productAmount, props.currency)}
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
            />
            <input
              type="number"
              step=".01"
              class="appeal-form-amount__input"
              data-product="custom"
              data-testid={`appeal-form-amount__input--${props.frequency}`}
              data-frequency={props.frequency}
              placeholder="35"
              data-minimum="5"
            />
          </label>
        </div>
      </div>
      {props.children}
    </fieldset>
  );
}
