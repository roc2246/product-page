<script>
  import Nav from "./components/Nav.svelte";
  import Cart from "./components/Cart.svelte";
  import Info from "./components/Info.svelte"
  import Gallery from "./gallery/Gallery.svelte"
</script>

<main>
  <section id="top-row">
    <Nav />
	<Cart/>
  </section>
  <section id="product-info">
	<Gallery/>
	<Info/>
  </section>
</main>

<style>
	main{
		margin: 2rem;
	}
	#top-row, #product-info{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	#product-info{
		flex-wrap: wrap;
		margin-left: 10rem;
		margin-right: 10rem;
		margin-top: 10rem;
	}
</style>
