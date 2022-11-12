<script>
  import { productStore, getData, galleryImgNo } from "../js/stores.js";
  import { onMount, createEventDispatcher } from "svelte";
  import Image from "../slideshow/Image.svelte";
  import Thumbnails from "../slideshow/Thumbnails.svelte";
  import CycleBtn from "../UI/CycleBtn.svelte";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });

  const selectedImage = (no) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    thumbnail[no].style.border = "solid";
    thumbnail[no].style.borderColor = "hsl(26, 100%, 55%)";
    thumbnail[no].style.opacity = 0.5;
  };

  const resetHighlight = () => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    for (let x = 0; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
      thumbnail[x].style.opacity = 1;
    }
  };


  const cycleImgs = (cycle) => {
    resetHighlight()
    if (cycle === "next") {
      $galleryImgNo++;
      if ($galleryImgNo > $productStore[0].images.length - 1) $galleryImgNo = 0;
    }

    if (cycle === "previous") {
      $galleryImgNo--;
      if ($galleryImgNo < 0) $galleryImgNo = $productStore[0].images.length - 1;
    }
    selectedImage($galleryImgNo)
  };
</script>

{#if $productStore}
  <section class="gallery">
    <CycleBtn mode="gallery" direction="previous" on:cycle={() => cycleImgs("previous")} />
    <Image on:click={() => dispatch("open")} imgNo={$galleryImgNo} />
    <CycleBtn mode="gallery" direction="next" on:cycle={() => cycleImgs("next")} />
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
