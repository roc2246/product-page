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
      ${$productStore[0].totalprice.toFixed(2)}
    </h3>
    <h5 class="product__sale--discount">
      {$productStore[0].discount * 100}%
    </h5>
    <h5 class="product__sale--price">${$productStore[0].price.toFixed(2)}</h5>
  </span>
{:else}
  <h3 class="product__price">${$productStore[0].price.toFixed(2)}</h3>
{/if}

<style lang="scss">
  @import "../scss/global";
  .product__sale {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 10rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    &--total-price{
      margin: 0;
    }
    &--discount{
      background-color: $pale-orange;
      color: $orange;

      margin-top: 0;
      margin-bottom: 0;
      margin-left: .75rem;
      padding-top: .25rem;
      padding-left: .25rem;
      padding-right: .25rem;
    }
    &--price{
      color: $dark-grayish-blue;
      text-decoration: line-through;
      margin-top: 1rem;
    }
  }

  @media (max-width: $mobile) {
    .product__sale {
      width: 100%;
      &--price{
        margin-left: auto;
      }
      &--price{
      margin-top: 0rem;
      margin-bottom: 0rem;
    }
    }
  }
</style>
