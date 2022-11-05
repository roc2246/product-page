<script>
  import { productStore, getData, imgNo } from "../js/stores.js";
  import { onMount } from "svelte";
  import Image from "../slideshow/Image.svelte";
  import Thumbnails from "../slideshow/Thumbnails.svelte";
  import CycleBtn from "../slideshow/CycleBtn.svelte";

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });


  const cycleImgs = (cycle) => {
    if (cycle === "next") {
      $imgNo++;
      if ($imgNo > $productStore[0].images.length - 1) $imgNo = 0;
    }

    if (cycle === "previous") {
      $imgNo--;
      if ($imgNo < 0) $imgNo = $productStore[0].images.length - 1;
    }
  };
</script>

{#if $productStore}
  <section class="gallery">
    <CycleBtn direction="previous" on:cycle={() => cycleImgs("previous")} />
    <Image on:open={() => console.log("TEST")} imgNo = {$imgNo} />
    <CycleBtn direction="next" on:cycle={() => cycleImgs("next")} />
    <Thumbnails />
  </section>
{/if}

<style lang="scss">
  @import "../scss/global";
  .gallery {
    display: flex;
    flex-direction: column;
  }
</style>
