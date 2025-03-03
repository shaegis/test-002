import { drNoteState } from "$lib/stores/drNoteState";
import type { DrNoteState } from "$lib/stores/drNoteState";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "my-secrete-key-must-change-to-LuciaAuth-hased-userID";

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

export function saveToLocalStorage(name: string, state: DrNoteState) {
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
        const encryptedData = CryptoJS.AES.encrypt(jsonData, ENCRYPTION_KEY).toString();
        //localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(key, encryptedData);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

export function openFromLocalStorage(key: string) {
    if (!isLocalStorageAvailable()) {
        console.error("localStorage is not available.");
        return;
    }
    if (!key) return;
    //const data = localStorage.getItem(key);
    const encryptedData = localStorage.getItem(key);
    //if (data) {
    if (encryptedData) {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            //const parsedData = JSON.parse(data);
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
