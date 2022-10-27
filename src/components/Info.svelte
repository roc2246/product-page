<script>
  import { productStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";

  import Button from "../UI/Button.svelte"

  onMount(async () => {
    let info = await getData("/products");

    if (info) {
      productStore.update((data) => info);
    }
  });

  let quantity = 0
</script>

<section class="product">
  {#if $productStore}
    <h4 class="product__company">{$productStore[0].company}</h4>
    <h1 class="product__name">{$productStore[0].name}</h1>
    <p class="product__description">
      {$productStore[0].description}
    </p>
    <div class="product__price">
      {#if $productStore[0].sale === true}
        <span class="product__price--sale">
          <h3 class="sale-price">${$productStore[0].totalprice}</h3>
          <p class="discount">{$productStore[0].discount * 100}%</p>
          <p class="original-price">${$productStore[0].price}</p>
        </span>
      {:else}
        <h3 class="product__price--price">${$productStore[0].price}</h3>
      {/if}
    </div>
  {/if}
  <div class="product__order">
    <div class="quantity">
      <div class="quantity_increase">
        <img src="images/icon-plus.svg" alt="increase quantity" />
      </div>
      <div class="quantity__number">{quantity}</div>
      <div class="quantity__decrease">
        <img src="images/icon-minus.svg" alt="decrease quantity" />
      </div>
    </div>
    <Button><img src="images/icon-cart.svg" alt="cart-icon">Add to cart</Button>
  </div>
</section>

<style lang="scss">
  .product{
    max-width: 20rem;
  }
</style>
