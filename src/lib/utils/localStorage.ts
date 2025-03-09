import { drNoteState } from "$lib/stores/drNoteState";
import type { DrNoteState } from "$lib/stores/drNoteState";
import { encryptionKey } from "$lib/stores/encryptionKey";
//import CryptoJS from "crypto-js";
import { get } from "svelte/store";

//const ENCRYPTION_KEY = "my-secrete-key-must-change-to-LuciaAuth-hased-userID";

function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, '1');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

async function encryptData(data: string, key: string): Promise<string> {
    const encodedData = new TextEncoder().encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key),
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        cryptoKey,
        encodedData
    );
    const encryptedArray = new Uint8Array(encrypted);
    const result = new Uint8Array(iv.length + encryptedArray.length);
    result.set(iv, 0);
    result.set(encryptedArray, iv.length);
    return btoa(String.fromCharCode(...result));
}

async function decryptData(encryptedData: string, key: string): Promise<string> {
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        cryptoKey,
        encrypted
    );
    return new TextDecoder().decode(decrypted);
}

export async function saveToLocalStorage(name: string, state: DrNoteState) {
    if (!isLocalStorageAvailable()) {
        console.error("localStorage is not available.");
        return;
    }
    const key = `drNote-${name}`;
    const data = {
        store: "drNoteState",
        state: state
    };
    try {
        const jsonData = JSON.stringify(data);
        const keyValue = get(encryptionKey);
        if (!keyValue) {
            console.error("Encryption key is not available.");
            return;
        }
        const encryptedData = await encryptData(jsonData, keyValue);
        //const encryptedData = CryptoJS.AES.encrypt(jsonData, ENCRYPTION_KEY).toString();
        localStorage.setItem(key, encryptedData);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

export async function openFromLocalStorage(key: string) {
    if (!isLocalStorageAvailable()) {
        console.error("localStorage is not available.");
        return;
    }
    if (!key) return;
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
        try {
            //const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const keyValue = get(encryptionKey);
            if (!keyValue) {
                console.error("Encryption key is not available.");
                return;
            }
            const decryptedData = await decryptData(encryptedData, keyValue);
            //const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            if (parsedData.store === "drNoteState") {
                drNoteState.set(parsedData.state);
            }
        } catch (error) {
            console.error("Error parsing data from localStorage:", error);
        }
    }
}

export function loadExistingKeys(): string[] {
    if (!isLocalStorageAvailable()) {
        return [];
    }
    const existingKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("drNote-")) {
            existingKeys.push(key.replace("drNote-", ""));
        }
    }
    return existingKeys;
}

export function loadKeys(): string[] {
    if (!isLocalStorageAvailable()) {
        return [];
    }
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("drNote-")) {
            keys.push(key);
        }
    }
    return keys;
}

export function deleteSelectedFromLocalStorage(names: string[]) {
    if (!isLocalStorageAvailable()) {
        console.error("localStorage is not available.");
        return;
    }
    try {
        names.forEach(name => {
            const key = `drNote-${name}`;
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error("Error deleting selected items from localStorage:", error);
    }
}

export function deleteAllFromLocalStorage() {
    if (!isLocalStorageAvailable()) {
        console.error("localStorage is not available.");
        return;
    }
    try {
        const keysToDelete = loadKeys();
        keysToDelete.forEach(key => localStorage.removeItem(key));
    } catch (error) {
        console.error("Error deleting all items from localStorage:", error);
    }
}
