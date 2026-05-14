const DB_NAME = 'DCSPrepOffline';
const STORE_NAME = 'modules';
const DB_VERSION = 1;
const MAX_STORAGE_RETRIES = 3;

export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(new Error('Failed to open IndexedDB. It may be disabled or blocked.'));
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    } catch (e) {
      reject(new Error('IndexedDB is not supported in this environment.'));
    }
  });
}

export async function saveModuleOffline(moduleData: any) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    transaction.onabort = () => {
      const error = transaction.error;
      if (error && error.name === 'QuotaExceededError') {
        reject(new Error('Storage quota exceeded. Please clear space or delete other offline modules.'));
      } else {
        reject(new Error('Transaction aborted: ' + (error?.message || 'Unknown error')));
      }
    };

    const request = store.put(moduleData);
    request.onerror = () => reject(new Error('Failed to save module data to local storage.'));
    request.onsuccess = () => resolve();
  });
}

export async function getModuleOffline(moduleId: string) {
  const db = await openDB();
  return new Promise<any>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(moduleId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function removeModuleOffline(moduleId: string) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(moduleId);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
