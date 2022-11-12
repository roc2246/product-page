<script>
  import { cartStore } from "../js/stores";

  export let cartID;
  export let image;
  export let name;
  export let price;
  export let quantity;
  export let total;

  const deleteCartItem = (id) => {
    fetch(`/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;",
      },
    });
    const results = $cartStore.filter((item) => item.id !== id);
    $cartStore = results;
  };
</script>

<div class="cart__item">
  <div class="cart__item--image">
    <img src={image} alt="Product" />
  </div>
  <div class="cart__item--info">
    <p class="cart__item--name">{name}</p>
    <div class="cart__item--price">
      <p class="price">${price}</p>
      <p class="quantity">X{quantity}</p>
      <p class="total">${total}</p>
    </div>
  </div>

  <div
    class="cart__item--delete"
    on:keydown
    on:click={() => deleteCartItem(cartID)}
  >
    <img src="./images/icon-delete.svg" alt="Delete" />
  </div>
</div>

<style lang="scss">
  .cart__item {
    display: flex;
        flex-direction: row;
        margin-top: .5rem;
        margin-bottom: .5rem;
    &--image > img {
      width: 3rem;
      height: auto;
    }
    &--info {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    &--name{
      white-space: nowrap;
    }
    &--price {
        display: flex;
        flex-direction: row;
      }
      &--delete{
        cursor: pointer;
      }
  }
</style>
