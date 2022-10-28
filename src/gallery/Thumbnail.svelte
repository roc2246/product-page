<script>
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let source


</script>

<img on:keydown on:click={() => dispatch('imgchange')} class="thumbnail" src="{source}" alt="thumbnail">

<style lang="scss">
    .thumbnail{
        width: 5rem;
        height: auto;
    }
</style>