import { writable } from "svelte-local-storage-store";

export const userState = writable("userState", null);
