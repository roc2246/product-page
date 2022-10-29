<script>
  import { productStore, cartStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";

  import Button from "../UI/Button.svelte";

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

  let quantity = 0;
  const generateID = (store) => {
    let id = store.length + 1;
    return id;
  };

  const toCart = () => {
    const totalPrice = $productStore[0].totalprice * quantity
    const cartItem = {
      id: generateID($cartStore),
      image: $productStore[0].images[0],
      name: $productStore[0].name,
      price: $productStore[0].totalprice,
      quantity: quantity,
      totalprice: totalPrice,
    };
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    $cartStore = [...$cartStore, cartItem]
  };

  const updateQuantity = (mode) => {
    if(mode ==="increase"){
      quantity++
    }
    if(mode ==="decrease"){
      quantity--
    }
  }
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
      <div class="quantity_increase" on:keydown on:click={()=> updateQuantity("increase")}>
        <img src="images/icon-plus.svg" alt="increase quantity" />
      </div>
      <div class="quantity__number">{quantity}</div>
      <div class="quantity__decrease"  on:keydown on:click={()=> updateQuantity("decrease")}>
        <img src="images/icon-minus.svg" alt="decrease quantity" />
      </div>
    </div>
    <Button on:click={() => toCart()}
      ><img src="images/icon-cart.svg" alt="cart-icon" />Add to cart</Button
    >
  </div>
</section>

<style lang="scss">
  .product {
    max-width: 20rem;
  }
</style>
