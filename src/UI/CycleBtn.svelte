<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let direction;
  export let mode;
</script>

<div
  class="gallery__{direction} gallery__{direction}--{mode}"
  on:keydown
  on:click={() => dispatch("cycle")}
>
  <img src={`images/icon-${direction}.svg`} alt={direction} />
</div>

<style lang="scss">
  @import "../scss/global";
  .gallery {
    &__previous,
    &__next {
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      background-color: white;
      padding: 0.5rem;

      & > img {
        position: relative;
        top: 50%;
        left: 25%;
        transform: translate(0%, -50%);
      }
    }

    &__previous {
      &--gallery,
      &--lightbox {
        cursor: pointer;
      }
      &--gallery {
        position: absolute;
        display: none;
        top: 35vh;
        left: 15vw;
      }
      &--lightbox {
        position: absolute;
        margin-top: 9rem;
        margin-left: -1rem;
      }
    }

    &__next {
      &--gallery,
      &--lightbox {
        cursor: pointer;
      }
      &--gallery {
        position: absolute;
        display: none;
        top: 35vh;
        left: 75vw;
      }
      &--lightbox {
        position: absolute;
        margin-left: 23rem;
        margin-top: -16rem;
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
