import { writable } from 'svelte/store';

export const encryptionKey = writable<string | null>(null);
