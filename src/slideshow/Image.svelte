<script>
  import { productStore, getData } from "../js/stores.js";
  import { onMount} from "svelte";

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });


  export let imgNo;
</script>

<img
  on:keydown
  on:click
  class="gallery__img"
  src={$productStore[0].images[imgNo]}
  alt="product"
/>

<style lang="scss">
  @import "../scss/global";

  .gallery {
    &__img {
      border-radius: $gallery-radius;
      max-width: 25rem;
      height: auto;
    }
  }
</style>
