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

<section class="product">
  {#if $productStore}
    <h4 class="product__company">{$productStore[0].company}</h4>
    <h1 class="product__name">{$productStore[0].name}</h1>
    <p class="product__description">
      {$productStore[0].description}
    </p>
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
  {/if}
  <div class="product__order">
    <div class="quantity">
      <div
        class="quantity__decrease quantity__container"
        on:keydown
        on:click={() => updateQuantity("decrease")}
      >
        <img src="images/icon-minus.svg" alt="decrease quantity" />
      </div>
      <div class="quantity__number quantity__container">{quantity}</div>
      <div
        class="quantity__increase quantity__container"
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
</section>

<!-- https://www.youtube.com/results?search_query=css+grid -->
<style lang="scss">
  @import "../scss/global";
  .product {
    max-width: 30rem;
    &__company {
      color: $orange;
    }
    &__name {
      font-weight: bolder;
      font-size: 1.5rem;
    }
    &__description {
      line-height: 1.5rem;
    }
    &__price {
      &--sale {
        .top-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 6rem;
          .sale-price,
          .discount {
            margin-top: 0.75rem;
          }
          .sale-price {
            margin-top: 1rem;
            margin-bottom: 0;
          }
          .discount {
            padding: 0.25rem;
            background-color: $pale-orange;
            color: $orange;
            font-weight: 700;
            border-radius: 0.25rem;
          }
        }
        .original-price {
          margin-top: 0.5rem;
          font-weight: 700;
          text-decoration: line-through;
          color: $grayish-blue;
        }
      }
    }
    &__order {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 1rem;
      .quantity {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // width: 25%;
        border-radius: $gallery-radius;
        background-color: $light-grayish-blue;
        &__container {
          margin: 0;
          padding: 1rem;
        }
        &__number {
          font-weight: 700;
        }
        &__increase {
          padding-top: 1rem;
        }
      }
    }
  }

  @media (max-width: $mobile) {
    .product {
      &__price {
        &--sale {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .original-price {
            margin-top: 1rem;
            font-weight: 700;
            text-decoration: line-through;
            color: $grayish-blue;
          }
        }
      }
      &__order {
        .quantity {
          width: 100%;
        }
      }
    }
  }
</style>
