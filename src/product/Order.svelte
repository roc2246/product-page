<script>
  import { productStore, cartStore, getData } from "../js/stores.js";
  import { onMount } from "svelte";
  import QtyBtn from "../UI/QtyBtn.svelte";

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
  let error = false;

  const generateID = (store) => {
    let id = store.length + 1;
    return id;
  };

  const toCart = () => {
    const totalPrice = $productStore[0].totalprice * quantity;
    const cartItem = {
      id: generateID($cartStore),
      image: $productStore[0].images[0],
      name: $productStore[0].name,
      price: $productStore[0].totalprice,
      quantity: quantity,
      totalprice: totalPrice,
    };
    if (quantity !== 0) {
      error = false;
      fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      $cartStore = [...$cartStore, cartItem];
    } else {
      error = true;
    }
  };

  const updateQuantity = (mode) => {
    if (mode === "plus") {
      quantity++;
    }
    if (mode === "minus") {
      quantity > 0 ? quantity-- : quantity;
    }
  };
</script>

<div class="product__order">
  {#if error === true}
    <h4 class="product__order--error">Please enter a quantity other than 0.</h4>
  {/if}
  <div class="product__order--quantity">
    <QtyBtn mode="minus" on:qtyChange={() => updateQuantity("minus")} />
    <div class="quantity-no"><h5>{quantity}</h5></div>
    <QtyBtn mode="plus" on:qtyChange={() => updateQuantity("plus")} />
  </div>
  <button class="product__order--add" on:click={() => toCart()}>
    <img src="images/icon-cart.svg" alt="cart-icon" /> Add to cart</button
  >
</div>

<style lang="scss">
  @import "../scss/global";
  .product__order {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &--quantity {
      background-color: $light-grayish-blue;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.5rem;
      width: 6rem;
      height: 2rem;
      .quantity-no {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &--add {
      width: 12rem;
      margin-left: auto;

      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 2.5rem;
      padding-right: 2.5rem;

      & > img{
        filter: brightness(0) invert(1);
        transform: scale(75%);
      }
    }
  }

  @media (max-width: $mobile) {
    .product__order {
      &--quantity {
        width: 100%;
      }

      &--add {
      width: 100%;
      margin-top: .05rem;
      padding-left: 6.5rem;
      padding-right: 6.5rem;
    }
    }
  }
</style>
