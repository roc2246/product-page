<script>
  import { productStore, getData, galleryImgNo } from "../js/stores.js";
  import { onMount, createEventDispatcher } from "svelte";
  import Image from "../slideshow/Image.svelte";
  import Thumbnails from "../slideshow/Thumbnails.svelte";
  import CycleBtn from "../slideshow/CycleBtn.svelte";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });

  const cycleImgs = (cycle) => {
    if (cycle === "next") {
      $galleryImgNo++;
      if ($galleryImgNo > $productStore[0].images.length - 1) $galleryImgNo = 0;
    }

    if (cycle === "previous") {
      $galleryImgNo--;
      if ($galleryImgNo < 0) $galleryImgNo = $productStore[0].images.length - 1;
    }
  };
</script>

{#if $productStore}
  <section class="gallery">
    <CycleBtn direction="previous" on:cycle={() => cycleImgs("previous")} />
    <Image on:click={() => dispatch("open")} imgNo={$galleryImgNo} />
    <CycleBtn direction="next" on:cycle={() => cycleImgs("next")} />
    <Thumbnails mode="gallery"/>
  </section>
{/if}

<style lang="scss">
  @import "../scss/global";
  .gallery {
    display: flex;
    flex-direction: column;
  }
</style>
