const SPC_STORE_KEY = 'SPC_STORE';

let store: StoreData | null = null;

interface StoreData {
    server: string;
    token: string;
}

export function getStore(): StoreData | null {
    const storedData = localStorage.getItem(SPC_STORE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    return null;
}

export function setStore(data: StoreData): void {
    localStorage.setItem(SPC_STORE_KEY, JSON.stringify(data));
}

export function clearStore(): void {
    localStorage.removeItem(SPC_STORE_KEY);
}

export function getConfig() {
    if (!store) {
        store = getStore();
    }
    return store;
}

export function setConfig(data: StoreData) {
    store = data;
    setStore(data);
}
