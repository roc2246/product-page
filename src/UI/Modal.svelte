<script>

</script>

<div class="lightbox">
 
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
