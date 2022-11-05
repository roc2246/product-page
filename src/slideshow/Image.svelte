<script>
  import { productStore, getData } from "../js/stores.js";
  import { onMount, createEventDispatcher } from "svelte";

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });

  const dispatch = createEventDispatcher();

  export let imgNo;
</script>

<img
  on:keydown
  on:click={() => dispatch("open")}
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
