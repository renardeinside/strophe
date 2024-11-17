import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { AsyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";

// class ChromeStorage implements SyncStorage<string | null> {
// getItem(key: string): string | null {
//     console.log("Getting item from storage: ", key);
//     let value: string | null = null;
//     chrome.storage.local.get(key, (result) => {
//         console.log("Got result: ", result);
//         value = result[key];
//     });
//     console.log("Got value: ", value);
//     return value;
// }
//   setItem(key: string, newValue: string | null): void {
//     console.log("Setting item in storage: ", key, newValue);
//     chrome.storage.local.set({ [key]: newValue });
//     console.log("Set value: ", newValue);
//   }
//   removeItem(key: string): void {
//     chrome.storage.local.remove(key);
//   }
// }

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
}

function isRunningAsChromeExtension(): boolean {
  return typeof chrome !== "undefined" && !!chrome.runtime?.getManifest;
}

const getStorage = () => {
  const asExtension = isRunningAsChromeExtension();
  return asExtension
    ? createJSONStorage<string | null>(() => new ChromeStorage())
    : createJSONStorage<string | null>(() => new LocalStorage());
};

const storage = getStorage();

export const contentAtom = atomWithStorage<string | null>(
  "st-content",
  "<p></p>".repeat(20),
  storage,
  {
    getOnInit: true,
  }
);

export const cursorPositionAtom = atomWithStorage<string | null>(
  "st-cursor-position",
  null,
  storage,
  {
    getOnInit: true,
  }
);
