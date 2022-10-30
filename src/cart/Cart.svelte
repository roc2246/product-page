<script>
  import CartItem from "./CartItem.svelte";
  import Button from "../UI/Button.svelte";
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

  {#if showCart === true && $cartStore}
    <div class="cart__items">
      <h4 class="cart__items--heading">Cart</h4>
      <hr>
      {#each $cartStore as item}
        <CartItem
          cartID={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          total={item.totalprice}
        />
      {/each}
    <Button>Checkout</Button>
    </div>
  {/if}
</section>

<style lang="scss">
  @import "../scss/global";
  .cart {
    display: flex;
    flex-direction: row;

    .user-avatar {
      margin-left: 2rem;
      margin-top: -1rem;
      & > img {
        width: 3.5rem;
        height: auto;
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
      border: solid;
      display: flex;
      flex-direction: column;

      position: absolute;
      background-color: white;
      top: 10vh;
    }
  }
</style>
