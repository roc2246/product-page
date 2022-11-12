<script>
  import Close from "../UI/Close.svelte";

  const toggle = () => {
    const nav = document.getElementsByClassName("mobile-container")[0];
    if (nav.style.display === "" || nav.style.display === "none") {
      nav.style.display = "flex";
    } else {
      nav.style.display = "none";
    }
  };
</script>

<nav class="nav">
  <div class="nav__mobile-toggle" on:keydown on:click={() => toggle()}>
    <img src="images/icon-menu.svg" alt="toggle" />
  </div>
  <div class="logo">
    <img src="images/logo.svg" alt="logo" />
  </div>
  <div class="nav__links--desktop">
    <a href="blank" class="nav__links--desktop-link">Collections</a>
    <a href="blank" class="nav__links--desktop-link">Men</a>
    <a href="blank" class="nav__links--desktop-link">Women</a>
    <a href="blank" class="nav__links--desktop-link">About</a>
    <a href="blank" class="nav__links--desktop-link">Contact</a>
  </div>
  <div class="mobile-container">
    <div class="nav__links--mobile">
      <Close mode="mobile-nav" on:close={() => toggle()} />
      <a href="blank" class="nav__links--mobile-link">Collections</a>
      <a href="blank" class="nav__links--mobile-link">Men</a>
      <a href="blank" class="nav__links--mobile-link">Women</a>
      <a href="blank" class="nav__links--mobile-link">About</a>
      <a href="blank" class="nav__links--mobile-link">Contact</a>
    </div>
  </div>
</nav>

<style lang="scss">
  @import "../scss/global";

  .mobile-container{
    z-index: 1;
  }

  .nav {
    display: flex;
    flex-direction: row;
    .logo {
      margin-right: 2rem;
    }
    &__mobile-toggle {
      display: none;
      cursor: pointer;
      margin-right: 1rem;
      margin-top: .25rem;
    }
    &__links {
      &--desktop {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &--mobile {
        display: none;
        flex-direction: column;
        padding: 2rem;
        background-color: white;
        position: absolute;
        height: 100vh;
        width: 30vh;
        
      }
      &--desktop-link{
        margin-left: 1rem;
        margin-right: 1rem;
        padding-bottom: 2rem;
        &:hover {
          border-bottom-style: solid;
          border-bottom-color: $orange;
        }
      }
      &--mobile-link{
        &:nth-child(2){
          margin-top: 2rem;
        }
        font-weight: 700;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }
  }

  @media (max-width: $mobile) {
    .nav {
      &__mobile-toggle {
        display: inline-block;
      }
      .mobile-container {
        display: none;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      &__links {
        &--desktop {
          display: none;
        }
        &--mobile {
          display: flex;
        }
      }
    }
  }
</style>
