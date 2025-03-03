import { drNoteState } from "$lib/stores/drNoteState";
import type { DrNoteState } from "$lib/stores/drNoteState"; // DrNoteState 타입이 정의되어 있다고 가정

// localStorage에 데이터를 저장하는 함수
export function saveToLocalStorage(name: string, state: DrNoteState) {
    const key = `drNote-${name}`;
    const data = {
        store: "drNoteState",
        state: state
    };
    localStorage.setItem(key, JSON.stringify(data));
}

// localStorage에서 데이터를 불러오는 함수
export function openFromLocalStorage(key: string) {
    if (!key) return;
    const data = localStorage.getItem(key);
    if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.store === "drNoteState") {
            drNoteState.set(parsedData.state);
        }
    }
}

// 기존 키를 로드하는 함수 (SaveToLocalStorageDialog用)
export function loadExistingKeys(): string[] {
    const existingKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("drNote-")) {
            existingKeys.push(key.replace("drNote-", ""));
        }
    }
    return existingKeys;
}

// 키 목록을 로드하는 함수 (OpenFromLocalStorageDialog用)
export function loadKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("drNote-")) {
            keys.push(key);
        }
    }
    return keys;
}
