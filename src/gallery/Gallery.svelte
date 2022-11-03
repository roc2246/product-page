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

  const getGalleryImg = () => {
    let source;
    const galleryImg = document.querySelector(
      ".gallery__img:not(.gallery__img--lightbox)"
    );
    const lightboxImg = document.querySelector(".gallery__img--lightbox");

    if (lightboxImg && galleryImg.src !== lightboxImg.src) {
      source = galleryImg.src;
    } else {
      source = $productStore[0].images[imgNo];
    }
    return source;
  };

  const resetHighlight = (mode) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    if (mode === "lightbox") {
      for (let x = 4; x < thumbnail.length; x++) {
        thumbnail[x].style.border = "none";
      }
    } else {
      for (let x = 0; x < thumbnail.length; x++) {
        thumbnail[x].style.border = "none";
      }
    }
  };

  const tumbnailSelect = (mode, i) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    if (mode === "lightbox") {
      resetHighlight(mode);
      thumbnail[i + 4].style.border = "solid";
      thumbnail[i + 4].style.borderColor = "hsl(26, 100%, 55%)";
    } else {
      resetHighlight(mode);
      thumbnail[i].style.border = "solid";
      thumbnail[i].style.borderColor = "hsl(26, 100%, 55%)";
    }
  };

  const selected = (i, mode) => {
    imgNo = i;
    tumbnailSelect(mode, i);
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
      class="gallery__img {mode === 'lightbox' ? 'gallery__img--lightbox' : ''}"
      src={mode === "lightbox"
        ? getGalleryImg()
        : $productStore[0].images[imgNo]}
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
        <Thumbnail
          on:imgchange={() => {
            mode === "lightbox"
              ? selected(i, "lightbox")
              : selected(i, "gallery");
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
      &__thumbnails {
        display: none;
      }
    }
  }
</style>
