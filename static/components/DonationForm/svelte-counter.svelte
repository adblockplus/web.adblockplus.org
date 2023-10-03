<script>
  let count = 0
  const increment = () => {
    count += 1
  }

  const decrement = () => {
    count -= 1
  }
</script>

<svelte:options customElement="svelte-counter" />

<div>
  <style>{style}</style>
  <button on:click={decrement}>-</button>
  <span>{count}</span>
  <button on:click={increment}>+</button>
</div>

<style>
  div * {
    font-size: 200%;
  }

  span {
    width: 4rem;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 10px;
    background-color: seagreen;
    color: white;
  }
</style>