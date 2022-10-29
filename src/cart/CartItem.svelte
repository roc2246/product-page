<script>
    export let image
export let name
export let price
export let quantity
export let total
</script>

<div class="cart__item">
    <img class="cart__item--image" src={image} alt="Product">
    <p class="cart__item--name">{name}</p>
    <p class="cart__item--price">${price}</p>
    <p class="cart__item--quantity">X{quantity}</p>
    <p class="cart__item--total">${total}</p>
</div>