<script>
  import { galleryImgNo, lightboxImgNo, productStore } from "../js/stores.js";
  import { createEventDispatcher } from "svelte";

  import Modal from "../UI/Modal.svelte";
  import Image from "../slideshow/Image.svelte";
  import Thumbnails from "../slideshow/Thumbnails.svelte";
  import CycleBtn from "../UI/CycleBtn.svelte";
  

  const dispatch = createEventDispatcher();

  $lightboxImgNo = $galleryImgNo;

  const selectedImage = (no) => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    thumbnail[no].style.border = "solid";
    thumbnail[no].style.borderColor = "hsl(26, 100%, 55%)";
    thumbnail[no].style.opacity = 0.5;
  };

  const resetHighlight = () => {
    const thumbnail = document.getElementsByClassName("thumbnail");
    for (let x = 4; x < thumbnail.length; x++) {
      thumbnail[x].style.border = "none";
      thumbnail[x].style.opacity = 1;
    }
  };


  const cycleImgs = (cycle) => {
    resetHighlight()
    if (cycle === "next") {
      $lightboxImgNo++;
      if ($lightboxImgNo > $productStore[0].images.length - 1) $lightboxImgNo = 0;
    }

    if (cycle === "previous") {
      $lightboxImgNo--;
      if ($lightboxImgNo < 0) $lightboxImgNo = $productStore[0].images.length - 1;
    }
    selectedImage($lightboxImgNo + 4)
  };
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
    <CycleBtn mode="lightbox" direction="previous" on:cycle={() => cycleImgs("previous")} />
    <Image imgNo={$lightboxImgNo} />
    <CycleBtn mode="lightbox" direction="next" on:cycle={() => cycleImgs("next")} />
    <Thumbnails mode="lightbox" />
  </div>
</Modal>

<style lang="scss">
  .lightbox{
    &__close{
      cursor: pointer;
    }
  }
</style>