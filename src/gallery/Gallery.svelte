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

  let image;
  let imgNo
  $: if ($productStore !== null) {
    imgNo = 0
  }
</script>

{#if $productStore}
  <section class="gallery">
    <img class="gallery__img" src={$productStore[0].images[imgNo]} alt="product" />
    <div class="gallery__thumbnails">
      {#each $productStore[0].thumbnails as thumbnail, i}
      <Thumbnail on:click={()=> imgNo=i} source={thumbnail} />
    {/each}
    </div>
    
  </section>
{/if}

<style lang="scss">
  .gallery{
    display: flex;
    flex-direction: column;
    &__img{
      max-width: 25rem;
    }
    &__thumbnails{
      display: flex;
      flex-direction: row;
    }
  }
  
</style>
