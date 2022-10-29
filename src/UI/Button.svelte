<script>

</script>

<button on:click><slot /></button>

<style lang="scss">
    @import "../scss/global";
button {
  color: white;
  background-color: $orange;
  outline: none;
  font-weight: 700;
  &:hover{
    background-color: $pale-orange;

  }
}

</style>
