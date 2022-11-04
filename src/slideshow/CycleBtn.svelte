<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let direction
</script>

<div
  class="gallery__{direction}"
  on:keydown
  on:click={() => dispatch("cycle")}
>
  <img src={`images/icon-${direction}.svg`} alt={direction} />
</div>
