<script>
  import { createEventDispatcher } from "svelte";

  export let mode;

  const dispatch = createEventDispatcher();
</script>

<div class="quantity__update" on:keydown on:click={() => dispatch("qtyChange")}>
  <img src="images/icon-{mode}.svg" alt={mode} />
</div>

<style lang="scss">
  .quantity__update {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
