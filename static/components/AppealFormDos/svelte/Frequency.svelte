<script>
  export let legendText;
  export let frequency;
  export let products;
</script>

<fieldset class="appeal-form-frequency">
  <legend class="appeal-form-frequency__heading">{@html legendText}</legend>
  <div class="appeal-form-frequency__options">
    <div class="appeal-form-amounts">
      {#each Object.keys(products) as productAmount}
        <label class="appeal-form-amount appeal-form-amount--fixed">
          <input
            type="radio"
            name="appeal-form-amount__radio"
            class="appeal-form-amount__radio"
            data-testid="appeal-form-amount__radio--{frequency}-1"
            data-frequency={frequency}
            value={productAmount}
            data-product={products[productAmount]}
          />
          <span class="appeal-form-amount__text">{productAmount}</span>
        </label>
      {/each}
    </div>

    <label class="appeal-form-amount appeal-form-amount--custom">
      <input
        type="radio"
        name="appeal-form-amount__radio"
        class="appeal-form-amount__radio"
        value="custom"
        data-testid="appeal-form-amount__radio--{frequency}-6"
        data-frequency={frequency}
        data-product="custom"
      />
      <input
        type="number"
        step=".01"
        class="appeal-form-amount__input"
        data-product="custom"
        data-testid="appeal-form-amount__input--{frequency}"
        data-frequency={frequency}
        placeholder="35"
        data-minimum="5"
      />
    </label>
  </div>
</fieldset>

<style>
  .appeal-form-frequency {
    flex: 0 0 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  @media (min-width: 55.125rem) {
    .appeal-form-frequency {
      flex: 1;
      padding-top: 0;
    }
  }

  .appeal-form-frequency__heading {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0.375rem;
  }

  .appeal-form-amounts {
    display: flex;
    flex-wrap: wrap;
    max-width: 16.70875rem;
    align-items: center;
  }

  :not([dir="rtl"]) .appeal-form-amounts {
    padding-right: 1rem;
  }

  .appeal-form-amount {
    line-height: 1.7;

    display: flex;

    width: 33.33333333%;
  }

  .appeal-form-amount__text {
    padding-top: 1.5px;
  }

  .appeal-form-amount__input {
    font-size: 0.875rem;
    width: 100%;
    height: 1.4rem;
    margin-top: 0.1875rem;
    padding: 0.125rem 0.25rem 0.125rem 0.25rem;
    border: 1px solid gray;
  }

  :not([dir="rtl"]) .appeal-form-amount__input {
    margin-right: 0.1875rem;
  }
</style>
