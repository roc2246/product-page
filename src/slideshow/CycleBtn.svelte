<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let direction;
  export let mode;
</script>

<div
  class="gallery__{direction}--{mode}"
  on:keydown
  on:click={() => dispatch("cycle")}
>
  <img src={`images/icon-${direction}.svg`} alt={direction} />
</div>

<style lang="scss">
  @import "../scss/global";
  .gallery {
    &__previous {
      &--gallery {
        display: none;
      }
    }
    &__next {
      &--gallery {
        display: none;
      }
    }
  }

  @media (max-width: $mobile) {
    .gallery {
    &__previous {
      &--gallery {
        display: inline-block;
      }
    }
    &__next {
      &--gallery {
        display: inline-block;
      }
    }
  }
  }
</style>
