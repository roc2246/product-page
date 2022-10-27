<script>
  import Nav from "./components/Nav.svelte";
  import Cart from "./components/Cart.svelte";
</script>

<main>
  <section id="top-row">
    <Nav />
	<Cart/>
  </section>
</main>

<style>
	main{
		margin: 2rem;
	}
	#top-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
