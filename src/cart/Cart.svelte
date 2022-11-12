<script>
  import CartItem from "./CartItem.svelte";
  import { getData, cartStore } from "../js/stores.js";
  import { onMount } from "svelte";

  let showCart = false;

  onMount(async () => {
    let items = await getData("/cart");

    cartStore.update((data) => items);
  });
</script>

<section class="cart">
  <div
    class="cart__icon"
    on:keydown
    on:click={() => (!showCart ? (showCart = true) : (showCart = false))}
  >
    <img src="images/icon-cart.svg" alt="cart-icon" />
  </div>
  {#if $cartStore && $cartStore.length !== 0}
  <div class="cart__badge">
    <span class="cart__badge--number">{$cartStore.length}</span>
  </div>
  {/if}
  <div class="user-avatar">
    <img src="images/image-avatar.png" alt="user" />
  </div>

  {#if showCart === true}
    <div class="cart__items">
      <h4 class="cart__items--heading">Cart</h4>
      <hr class="cart__items--divider">
  {#if  $cartStore && $cartStore.length !== 0}
      {#each $cartStore as item}
        <CartItem
          cartID={item.id}
          image={item.image}
          name={item.name}
          price={item.price.toFixed(2)}
          quantity={item.quantity}
          total={item.totalprice.toFixed(2)}
        />
      {/each}
    <button>Checkout</button>
      {:else}
      <p class="cart__items--empty">Your cart is empty</p>
  {/if}
    </div>
    {/if}
</section>

<style lang="scss">
  @import "../scss/global";
  .cart {
    display: flex;
    flex-direction: row;

    &__icon{
      cursor: pointer;
     
    }

    .user-avatar {
      cursor: pointer;
      margin-left: 2rem;
      margin-top: -1rem;
      & > img {
        width: 2.5rem;
        height: auto;
      }
      &:hover{
        border: solid;
        border-radius: 50%;
        border-color: $orange;

        height: 2.5rem;
      }
    }

    &__badge{
      position: absolute;
      background-color: $orange;
      margin-left: 1rem;
      margin-top: -1rem;
    }

    &__items{
      padding: 1rem;
      border-radius: .5rem;

      display: flex;
      flex-direction: column;

      position: absolute;
      background-color: white;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      top: 10vh;
      right: 10vw;
      &--heading{
        margin-top: 0;
      }
    }
  }
</style>
