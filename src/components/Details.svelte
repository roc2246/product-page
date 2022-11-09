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
  {/if}
</section>

<!-- https://www.youtube.com/results?search_query=css+grid -->
<style lang="scss">
  @import "../scss/global";
//   .product {
   
//   }

//   @media (max-width: $mobile) {
//     .product {
    
//   }
// }
</style>
