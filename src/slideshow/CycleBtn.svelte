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

<style lang="scss">
  @import "../scss/global";
    .gallery{
    &__previous {
        display: none;
    }
    &__next {
        display: none;
    }
  }

  @media (max-width: $mobile) {
    .gallery {
      &__previous {
          display: inline-block;
      }
      &__next {
          display: inline-block;
      }
      &__thumbnails {
        display: none;
      }
    }
  }
</style>