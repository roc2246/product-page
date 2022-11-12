<script>
  import Nav from "./components/Nav.svelte";
  import Cart from "./cart/Cart.svelte";
  import Details from "./components/Details.svelte";
  import Gallery from "./components/Gallery.svelte";
  import Lightbox from "./components/Lightbox.svelte";

  let showLightbox = false;

  const toggle = () => {
    if(showLightbox === false){
      showLightbox = true
    } else if (showLightbox === true){
      showLightbox = false
    }
  }
</script>

<main>
  <section id="top-row">
    <Nav />
    <Cart />
  </section>
  <hr />
  <section id="product-info">
    <Gallery on:open={() => toggle()} />
    <Details />
  </section>
  {#if showLightbox === true}
    <Lightbox on:close={() => toggle()}/>
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
  #top-row {
    justify-content: space-between;
  }
  hr {
    margin: 0;
  }
  #product-info {
    flex-wrap: wrap;
    margin-top: 5rem;
    justify-content: space-evenly;
  }
  @media (max-width: $mobile) {
    main {
      margin: 0;
    }
    #product-info {
    margin-top: 0;
  }
  }
</style>
