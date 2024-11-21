import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";

class ChromeStorage implements AsyncStringStorage {
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
  }
  setItem(key: string, newValue: string | null): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: newValue }, resolve);
    });
  }
  removeItem(key: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, resolve);
    });
  }

  subscribe(key: string, callback: (value: string | null) => void): () => void {
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes[key]) {
        callback(changes[key].newValue);
      }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }
}

class LocalStorage implements AsyncStringStorage {
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key));
  }
  setItem(key: string, newValue: string | null): Promise<void> {
    return Promise.resolve(localStorage.setItem(key, newValue || ""));
  }
  removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }

  subscribe(key: string, callback: (value: string | null) => void): () => void {
    const listener = () => {
      callback(localStorage.getItem(key));
    };
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }
}

function isRunningAsChromeExtension(): boolean {
  return typeof chrome !== "undefined" && !!chrome.runtime?.getManifest;
}

const getStorage = () => {
  const asExtension = isRunningAsChromeExtension();
  const storageProvider = asExtension
    ? () => new ChromeStorage()
    : () => new LocalStorage();
  return createJSONStorage<string | null>(storageProvider);
};

export const $storage = getStorage();

const ST_CONTENT_KEY = "st-content";


const defaultContent = {
  "type": "doc",
  "content": Array(20).fill({
    "type": "paragraph"
  })
};

export const contentAtom = atomWithStorage<string | null>(
  ST_CONTENT_KEY,
  JSON.stringify(defaultContent),
  $storage,
  {
    getOnInit: true,
  },
);