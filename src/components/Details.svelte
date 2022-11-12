<script>
  import { productStore, cartStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";

  import Info from "../product/Info.svelte";
  import Price from "../product/Price.svelte";
  import Order from "../product/Order.svelte";

  onMount(async () => {
    let info = await getData("/products");
    let cart = await getData("/cart");

    if (info) {
      productStore.update((data) => info);
    }

    if (cart) {
      cartStore.update((data) => cart);
    }
  });
</script>

<section class="product">
  {#if $productStore}
    <Info />
    <Price />
    <Order />
  {:else}
    <h1 class="product__load-msg">Loading Product, Please Wait...</h1>
  {/if}
</section>

<style lang="scss">
  @import "../scss/global";
  .product {
    max-width: 25rem;
    padding-top: 2rem;
  }

  @media (max-width: $mobile) {
    .product {
      width: 100%;
      padding-top: 0;
    }
  }
</style>
