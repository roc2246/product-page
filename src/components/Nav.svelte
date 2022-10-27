<script>
</script>

<nav class="nav">
  <div class="nav__mobile-toggle">
    <img src="images/icon-menu.svg" alt="toggle">
  </div>
  <div class="logo">
    <img src="images/logo.svg" alt="logo" />
  </div>
  <div class="nav__links">
    <a href="blank" class="nav__links--link">Collections</a>
    <a href="blank" class="nav__links--link">Men</a>
    <a href="blank" class="nav__links--link">Women</a>
    <a href="blank" class="nav__links--link">About</a>
    <a href="blank" class="nav__links--link">Contact</a>
  </div>
</nav>

<style lang="scss">
  @import '../scss/global';
  .nav{
    display: flex;
    flex-direction: row;
    &__mobile-toggle{
      display: none;
      margin-right: 1rem;
    }
    &__links{
      display: flex;
      flex-direction: row;
      &--link{
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: $mobile){
    .nav{
      &__mobile-toggle{
        display: inline-block;
      }
      &__links{
        display: none;
        flex-direction: column;
      }
    }
  }

</style>
