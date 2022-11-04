<script>
  import { productStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";
  import Thumbnail from "../slideshow/Thumbnail.svelte";
  import CycleBtn from "../slideshow/CycleBtn.svelte";

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });
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

  const select = (i) => {
    imgNo = i;
    const thumbnail = document.getElementsByClassName("thumbnail");

    for (let x = 0; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
    }
    thumbnail[i].style.border = "solid";
    thumbnail[i].style.borderColor = "hsl(26, 100%, 55%)";
  };
</script>

{#if $productStore}
  <section class="gallery">
    <CycleBtn direction="previous" on:cycle={() => cycleImgs("previous")} />
    <img
      on:keydown
      on:click
      class="gallery__img"
      src={$productStore[0].images[imgNo]}
      alt="product"
    />
    <CycleBtn direction="next" on:cycle={() => cycleImgs("next")} />
    <div class="gallery__thumbnails">
      {#each $productStore[0].thumbnails as thumbnail, i}
        <Thumbnail
          on:imgchange={() => {
            select(i);
          }}
          source={thumbnail}
        />
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
      height: auto;
    }
    &__thumbnails {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }

  }
</style>
