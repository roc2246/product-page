<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let source;
</script>

<img
  on:keydown
  on:click={() => dispatch("imgchange")}
  on:focus
  on:mouseover = {() => dispatch("hover")}
  on:mouseleave = {() => dispatch("leave")}
  class="thumbnail"
  src={source}
  alt="thumbnail"
/>

<style lang="scss">
  @import "../scss/global";
  .thumbnail {
    cursor: pointer;
    border-radius: $gallery-radius;
    width: 5rem;
    height: auto;
  }
</style>
