<script>
    import { createEventDispatcher } from "svelte"

    export let mode

    const dispatch = createEventDispatcher()
</script>

<div
class="quantity__update"
on:keydown
on:click={()=>dispatch("qtyChange")}
>
<img src="images/icon-{mode}.svg" alt="{mode}" />
</div>