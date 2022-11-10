<script>
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
    <a href="blank" class="nav__links--link">Collections</a>
    <a href="blank" class="nav__links--link">Men</a>
    <a href="blank" class="nav__links--link">Women</a>
    <a href="blank" class="nav__links--link">About</a>
    <a href="blank" class="nav__links--link">Contact</a>
  </div>
  <div class="mobile-container">
    <div class="nav__links--mobile">
      <div class="close">
        <img
          on:keydown
          on:click={() => toggle()}
          src="images/icon-close.svg"
          alt="Close"
        />
      </div>
      <a href="blank" class="nav__links--link">Collections</a>
      <a href="blank" class="nav__links--link">Men</a>
      <a href="blank" class="nav__links--link">Women</a>
      <a href="blank" class="nav__links--link">About</a>
      <a href="blank" class="nav__links--link">Contact</a>
    </div>
  </div>
</nav>

<style lang="scss">
  @import "../scss/global";
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
    }
    &__links {
      &--desktop {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &--mobile {
        display: none;
      }
      &--link {
        margin-left: 1rem;
        margin-right: 1rem;
        padding-bottom: 2rem;
        &:hover {
          border-bottom-style: solid;
          border-bottom-color: $orange;
        }
      }
    }
  }
  .close {
    cursor: pointer;
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
        width: 100%; /* Full width */
        height: 100%; /* Full height */
      }
      &__links {
        &--desktop {
          display: none;
        }
        &--mobile {
          display: flex;
          flex-direction: column;
          background-color: white;
          position: absolute;
        }
      }
    }
  }
</style>
