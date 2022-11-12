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

<style lang="scss">
  @import "../scss/global";
.product__info{
  &--company {
    color: $orange;
    margin-bottom: 0;
  }
  &--name{
    font-weight: 700;
    font-size: 2rem;
    margin-top: .5rem;
  }
  &--description{
    line-height: 1.5rem;
  }
}
</style>
