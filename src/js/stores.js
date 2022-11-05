import { writable } from "svelte/store";

export const productStore = writable(null);
export const cartStore = writable(null)
export const imgNo = writable(0)

export const getData = async (path) => {
  let response = await fetch(path);
  return response.ok ? await response.json() : null;
};
