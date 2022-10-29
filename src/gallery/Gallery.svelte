<script>
  import { productStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";
  import Thumbnail from "./Thumbnail.svelte";

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });

  export let mode;
  let imgNo = 0;

  const cycleImgs = (cycle) => {
    if (cycle === "next") {
      imgNo++;
      if (imgNo > $productStore[0].images.length - 1) imgNo = 0;
    }

    if (cycle === "previous") {
      imgNo--;
      if (imgNo < 0) imgNo = $productStore[0].images.length - 1;
    }
  };
</script>

{#if $productStore}
  <section class="gallery">
    {#if mode === "lightbox"}
      <div
        class="gallery__prev-img"
        on:keydown
        on:click={() => cycleImgs("previous")}
      >
        <img src="images/icon-previous.svg" alt="" />
      </div>
    {/if}
    <div
      class="gallery__prev-img--mobile"
      on:keydown
      on:click={() => cycleImgs("previous")}
    >
      <img src="images/icon-previous.svg" alt="" />
    </div>
    <img
      on:keydown
      on:click
      class="gallery__img"
      src={$productStore[0].images[imgNo]}
      alt="product"
    />
    {#if mode === "lightbox"}
      <div
        class="gallery__next-img"
        on:keydown
        on:click={() => cycleImgs("next")}
      >
        <img src="images/icon-next.svg" alt="" />
      </div>
    {/if}
    <div
      class="gallery__next-img--mobile"
      on:keydown
      on:click={() => cycleImgs("next")}
    >
      <img src="images/icon-next.svg" alt="" />
    </div>

    <div class="gallery__thumbnails">
      {#each $productStore[0].thumbnails as thumbnail, i}
        <Thumbnail on:imgchange={() => (imgNo = i)} source={thumbnail} />
      {/each}
    </div>
  </section>
{/if}

<style lang="scss">
  @import "../scss/global";
  .gallery {
    display: flex;
    flex-direction: column;
    &__img {
      border-radius: $gallery-radius;
      max-width: 25rem;
    }
    &__thumbnails {
      display: flex;
      flex-direction: row;
    }

    &__prev-img {
      &--mobile {
        display: none;
      }
    }
    &__next-img {
      &--mobile {
        display: none;
      }
    }
  }

  @media (max-width: $mobile) {
    .gallery {
      &__prev-img {
        &--mobile {
          display: inline-block;
        }
      }
      &__next-img {
        &--mobile {
          display: inline-block;
        }
      }
    }
  }
</style>
