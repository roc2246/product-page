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
    thumbnail[no].style.borderColor = "hsl(20, 100%, 50%)";
    thumbnail[no].style.filter = "brightness(150%)";
  };

  const hover = (no, direction) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    let selectedImgNo;
    let int;
    if (mode === "gallery") {
      selectedImgNo = $galleryImgNo;
      int = 0;
    } else if (mode === "lightbox") {
      selectedImgNo = $lightboxImgNo + 4;
      int = 4;
    }

    if (direction === "hover") {
      thumbnail[no + int].style.filter = "brightness(150%)";
    } else if (direction === "leave") {
      thumbnail[no + int].style.filter = "brightness(100%)";
    }
    selectedImage(selectedImgNo);
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
      thumbnail[x].style.filter = "brightness(100%)";;
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

<div class="thumbnails thumbnails--{mode}">
  {#each $productStore[0].thumbnails as thumbnail, i}
    <Thumbnail
      on:hover={() => hover(i, "hover")}
      on:leave={() => hover(i, "leave")}
      on:imgchange={() => select(i)}
      source={thumbnail}
    />
  {/each}
</div>

<style lang="scss">
  @import "../scss/global";
  .thumbnails {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
  }

  @media (max-width: $mobile) {
    .thumbnails{
      &--gallery{
        display: none;
      }
    }
  }
</style>
