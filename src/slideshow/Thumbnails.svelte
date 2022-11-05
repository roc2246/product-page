<script>
  import { productStore, getData, imgNo } from "../js/stores.js";
  import { onMount } from "svelte";
  import Thumbnail from "../slideshow/Thumbnail.svelte";


  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });
//   https://stackoverflow.com/questions/61960147/how-to-pass-data-from-child-to-parent-with-2-svelte-components-in-html-parent-ch

  const select = (img) => {
    $imgNo = img
    console.log($imgNo)
    const thumbnail = document.getElementsByClassName("thumbnail");

    for (let x = 0; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
    }
    thumbnail[img].style.border = "solid";
    thumbnail[img].style.borderColor = "hsl(26, 100%, 55%)";
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
