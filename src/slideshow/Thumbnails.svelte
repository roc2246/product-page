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

  const selectedImage = (no) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    thumbnail[no].style.border = "solid";
    thumbnail[no].style.borderColor = "hsl(26, 100%, 55%)";
    thumbnail[no].style.opacity = 0.5;
  };

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }

    if (mode === "gallery") {
      selectedImage(0);
    } else if (mode === "lightbox") {
      selectedImage($lightboxImgNo + 4);
    }
  });

  const highlight = (no, img) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    for (let x = no; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
      thumbnail[x].style.opacity = 1;
    }
    selectedImage(img + no);
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

<div class="thumbnails">
  {#each $productStore[0].thumbnails as thumbnail, i}
    <Thumbnail on:imgchange={() => select(i)} source={thumbnail} />
  {/each}
</div>

<style lang="scss">
    .thumbnails {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }
</style>
