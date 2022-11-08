<script>
  import { galleryImgNo, lightboxImgNo } from "../js/stores.js";
  import { createEventDispatcher } from "svelte";

  import Modal from "../UI/Modal.svelte";
  import Image from "../slideshow/Image.svelte";
  import Thumbnails from "../slideshow/Thumbnails.svelte";

  const dispatch = createEventDispatcher();

  $lightboxImgNo = $galleryImgNo;
</script>

<Modal>
  <div class="lightbox">
    <div class="lightbox__close">
      <img
        on:keydown
        on:click={() => dispatch("close")}
        src="images/icon-close.svg"
        alt="Close"
      />
    </div>
    <Image imgNo={$lightboxImgNo} />
    <Thumbnails mode="lightbox" />
  </div>
</Modal>

<style lang="scss">
  // .lightbox{
  //   margin: auto;
  //   width: 25rem;

  // }
</style>