<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let source;
  export let i;


  const selected = (i) => {
    
  const thumbnail = document.getElementsByClassName("thumbnail");
  for (let x = 0; x < thumbnail.length; x++) {
    thumbnail[x].style.border = "none";
  }
    thumbnail[i].style.border = "solid";
    thumbnail[i].style.borderColor = "hsl(26, 100%, 55%)";
  };
</script>

<img
  on:keydown
  on:click={() => dispatch("imgchange")}
  on:click={() => selected(i)}
  class="thumbnail"
  src={source}
  alt="thumbnail"
/>

<style lang="scss">
  @import "../scss/global";
  .thumbnail {
    border-radius: $gallery-radius;
    width: 5rem;
    height: auto;
  }
</style>
