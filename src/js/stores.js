import { writable } from "svelte/store";

export const productStore = writable(null);
export const cartStore = writable(null)
export const galleryImgNo = writable(0)
export const lightboxImgNo = writable(null)

export const getData = async (path) => {
  let response = await fetch(path);
  return response.ok ? await response.json() : null;
};
