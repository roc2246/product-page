<script>
  import {
    productStore,
    getData,
    galleryImgNo,
    lightboxImgNo,
  } from "../js/stores.js";
  import { onMount } from "svelte";
  import Thumbnail from "../slideshow/Thumbnail.svelte";

  export let mode;

  

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }

    const thumbnail = document.getElementsByClassName("thumbnail");
    if (mode === "gallery") {
      thumbnail[0].style.border = "solid";
      thumbnail[0].style.borderColor = "hsl(26, 100%, 55%)";
    } else if (mode === "lightbox") {
      thumbnail[$lightboxImgNo + 4].style.border = "solid";
      thumbnail[$lightboxImgNo + 4].style.borderColor = "hsl(26, 100%, 55%)";
    }
  });



  const highlight = (no, img) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    for (let x = no; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
    }
    thumbnail[img + no].style.border = "solid";
    thumbnail[img + no].style.borderColor = "hsl(26, 100%, 55%)";
  };

  const select = (img) => {
    if (mode === "gallery") {
      $galleryImgNo = img;
      highlight(0, img);
    } else if (mode === "lightbox") {
      $lightboxImgNo = img;
      highlight(4, img);
    }
  };
</script>

<div class="gallery__thumbnails">
  {#each $productStore[0].thumbnails as thumbnail, i}
    <Thumbnail on:imgchange={() => select(i)} source={thumbnail} />
  {/each}
</div>

<style lang="scss">
  .gallery {
    &__thumbnails {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }
  }
</style>
