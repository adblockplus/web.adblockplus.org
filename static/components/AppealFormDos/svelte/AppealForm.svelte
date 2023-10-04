<svelte:options customElement="appeal-form-dos-svelte" />

<script>
  import { CONFIGURATION as config } from "../../AppealForm/configuration";
  import Frequency from "./Frequency.svelte";
  import ToggleSwitch from "./ToggleSwitch.svelte";

  let products = config.Paddle["sandbox"].products["USD"];
  let recurringFrequency = "monthly";

  function handleToggleFrequencyClick(e) {
    recurringFrequency = e.target.checked ? "yearly" : "monthly";
  }
</script>

<div>
  <form
    class="appeal-form"
    on:submit={(e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const entries = [...data.entries()];
      
      // TODO: Handle form submission
    }}
  >
    <div class="appeal-form-frequencies">
      <Frequency
        frequency="once"
        products={products.once}
        legendText="Make a <strong>one-off</strong> contribution"
      />
      <Frequency
        frequency={products[recurringFrequency]}
        products={products[recurringFrequency]}
        legendText="Make a <strong>Recurring</strong> contribution"
      />
      <ToggleSwitch on:click={handleToggleFrequencyClick} />
    </div>
    <input type="submit" value="Submit" />
  </form>
</div>

<style>
  .appeal-form {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  @-webkit-keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .appeal-form .appeal-form-frequencies {
    display: flex;
    flex-wrap: wrap;
    max-width: 53.125rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
