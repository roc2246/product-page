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

<div class="product__info">
    <h4 class="product__info--company">{$productStore[0].company}</h4>
    <h1 class="product__info--name">{$productStore[0].name}</h1>
    <p class="product__info--description">
      {$productStore[0].description}
    </p>
  </div>