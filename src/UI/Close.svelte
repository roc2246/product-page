<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

</script>

<div class="close">
    <img
      on:keydown
      on:click={() => dispatch("close")}
      src="images/icon-close.svg"
      alt="Close"
    />
  </div>

  <style lang="scss">
    .close{
        cursor: pointer;
    }
  </style>