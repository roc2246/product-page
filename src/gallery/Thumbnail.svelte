<script>
    export let source
</script>

<img on:keydown on:click class="thumbnail" src="{source}" alt="thumbnail">

<style lang="scss">
    .thumbnail{
        width: 5rem;
        height: auto;
    }
</style>