<script>
  import Nav from "./components/Nav.svelte";
  import Cart from "./cart/Cart.svelte";
  import Info from "./components/Info.svelte";
  import Gallery from "./components/Gallery.svelte";
  import Modal from "./UI/Modal.svelte";

  let showLightbox = false;
</script>

<main>
  <section id="top-row">
    <Nav />
    <Cart />
  </section>
  <hr>
  <section id="product-info">
    <Gallery on:click={() => (showLightbox = true)} />
    <Info />
  </section>
  {#if showLightbox === true}
    <!-- <Modal close={() => (showLightbox = false)}><Gallery mode="lightbox" /></Modal> -->
  {/if}
</main>

<style lang="scss">
  @import "./scss/global";
  main {
    margin: 2rem;
  }
  #top-row,
  #product-info {
    display: flex;
    flex-direction: row;
  }
  #top-row{
    justify-content: space-between;
  }
  hr{
    margin: 0;
  }
  #product-info {
    flex-wrap: wrap;
    margin-top: 5rem;
    justify-content: space-evenly;
  }
  @media (max-width: $mobile) {
    main{
      margin: 0;
    }
  }
</style>
