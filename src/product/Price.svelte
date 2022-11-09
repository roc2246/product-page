<script>
    import { productStore, cartStore, getData } from "../js/stores.js";
    import { onMount } from "svelte";
  
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

{#if $productStore[0].sale === true}
<span class="product__sale">
  <h3 class="product__sale--total-price">
    ${$productStore[0].totalprice}
  </h3>
  <p class="product__sale--discount">
    {$productStore[0].discount * 100}%
  </p>
  <p class="product__sale--price">${$productStore[0].price}</p>
</span>
{:else}
<h3 class="product__price">${$productStore[0].price}</h3>
{/if}
