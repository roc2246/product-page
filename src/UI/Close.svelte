<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let mode;
</script>

<div class="close close--{mode}">
  <img
    on:keydown
    on:click={() => dispatch("close")}
    src="images/icon-close.svg"
    alt="Close"
  />
</div>

<style lang="scss">
  @import "../scss/global";
  .close {
    cursor: pointer;
    &--lightbox {
      width: 100%;
      margin-bottom: 1.5rem;
      & > img {
        float: right;
        &:hover {
          filter: invert(52%) sepia(96%) saturate(1563%) hue-rotate(347deg) brightness(101%) contrast(101%);
        }
      }
    }
  }
</style>
