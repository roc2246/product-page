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

  let image
  $: if($productStore !==null) {
    image = $productStore[0].images[0]
  }
</script>

{#if $productStore}
<section class="gallery">
    <img src="{image}" alt="product">
    {#each $productStore[0].thumbnails as thumbnail}
    <Thumbnail source={thumbnail}/>
    {/each}
</section>
  
{/if}
