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
  let quantity = 1;
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
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    $cartStore = [...$cartStore, cartItem];
  };

  const updateQuantity = (mode) => {
    if (mode === "increase") {
      quantity++;
    }
    if (mode === "decrease") {
      quantity > 1 ? quantity-- : quantity;
    }
  };
</script>

<div class="product__order">
  <div class="quantity">
    <div
      class="quantity__decrease"
      on:keydown
      on:click={() => updateQuantity("decrease")}
    >
      <img src="images/icon-minus.svg" alt="decrease quantity" />
    </div>
    <div class="quantity__number">{quantity}</div>
    <div
      class="quantity__increase"
      on:keydown
      on:click={() => updateQuantity("increase")}
    >
      <img src="images/icon-plus.svg" alt="increase quantity" />
    </div>
  </div>
  <button on:click={() => toCart()}>
    <img src="images/icon-cart.svg" alt="cart-icon" />Add to cart</button
  >
</div>
