<script>

</script>

<div class="lightbox">
 
  <slot />
</div>

<style lang="scss">
  @import "../scss/global";
  .lightbox {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
     width: 100%; /* Full width */
  height: 100%; /* Full height */
  }

  @media (max-width: $mobile) {
    .lightbox {
    display: none;
  }
  }
</style>
