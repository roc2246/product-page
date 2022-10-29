<script>
  export let close;
</script>

<div class="lightbox">
  <div class="lightbox__close">
    <img on:keydown on:click={close} src="images/icon-close.svg" alt="Close" />
  </div>
  <slot />
</div>

<style lang="scss">
  @import "../scss/global";
  .lightbox {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  @media (max-width: $mobile) {
    .lightbox {
    display: none;
  }
  }
</style>
