const DB_NAME = 'DCSPrepOffline';
const STORE_NAME = 'modules';
const SCENARIO_STORE_NAME = 'scenarios';
const JOURNAL_STORE_NAME = 'journal';
const ASSET_STORE_NAME = 'assets';
const SYNC_QUEUE_STORE_NAME = 'syncQueue';
const DB_VERSION = 3;

export type OfflineAsset = {
  id: string;
  url: string;
  contentType: string;
  body: Blob;
  cachedAtIso: string;
};

export type JournalEntry = {
  id: string;
  scenarioId: string;
  content: string;
  emotions: string[];
  createdAtIso: string;
};

export type OfflineSyncQueueItem = {
  id: string;
  type: 'pd-log' | 'scenario-run' | 'assessment-attempt' | 'progress-backup';
  payload: unknown;
  createdAtIso: string;
};

function createStoreIfMissing(db: IDBDatabase, storeName: string, options?: IDBObjectStoreParameters) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, options);
  }
}

export async function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(new Error('Failed to open IndexedDB. It may be disabled or blocked.'));
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        createStoreIfMissing(db, STORE_NAME, { keyPath: 'id' });
        createStoreIfMissing(db, SCENARIO_STORE_NAME, { keyPath: 'id' });
        createStoreIfMissing(db, JOURNAL_STORE_NAME, { keyPath: 'id' });
        createStoreIfMissing(db, ASSET_STORE_NAME, { keyPath: 'id' });
        createStoreIfMissing(db, SYNC_QUEUE_STORE_NAME, { keyPath: 'id' });
      };
    } catch (e) {
      reject(new Error('IndexedDB is not supported in this environment.'));
    }
  });
}

function putRecord<T>(storeName: string, record: T) {
  return openDB().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        transaction.onabort = () => {
          const error = transaction.error;
          if (error && error.name === 'QuotaExceededError') {
            reject(new Error('Storage quota exceeded. Please clear space or delete other offline packs.'));
          } else {
            reject(new Error('Transaction aborted: ' + (error?.message || 'Unknown error')));
          }
        };

        const request = store.put(record);
        request.onerror = () => reject(new Error(`Failed to save record in ${storeName}.`));
        request.onsuccess = () => resolve();
      })
  );
}

function getRecord<T>(storeName: string, id: string) {
  return openDB().then(
    (db) =>
      new Promise<T | undefined>((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(id);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as T | undefined);
      })
  );
}

function deleteRecord(storeName: string, id: string) {
  return openDB().then(
    (db) =>
      new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      })
  );
}

export async function saveModuleOffline(moduleData: any) {
  return putRecord(STORE_NAME, moduleData);
}

export async function getModuleOffline(moduleId: string) {
  return getRecord<any>(STORE_NAME, moduleId);
}

export async function removeModuleOffline(moduleId: string) {
  return deleteRecord(STORE_NAME, moduleId);
}

export async function saveScenarioPackOffline(scenarioData: any) {
  return putRecord(SCENARIO_STORE_NAME, scenarioData);
}

export async function getScenarioPackOffline(scenarioId: string) {
  return getRecord<any>(SCENARIO_STORE_NAME, scenarioId);
}

export async function removeScenarioPackOffline(scenarioId: string) {
  return deleteRecord(SCENARIO_STORE_NAME, scenarioId);
}

export async function saveJournalEntry(entry: JournalEntry) {
  return putRecord(JOURNAL_STORE_NAME, entry);
}

export async function getAllJournalEntries() {
  return openDB().then(
    (db) =>
      new Promise<JournalEntry[]>((resolve, reject) => {
        const transaction = db.transaction(JOURNAL_STORE_NAME, 'readonly');
        const store = transaction.objectStore(JOURNAL_STORE_NAME);
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as JournalEntry[]);
      })
  );
}

export async function saveOfflineAsset(asset: OfflineAsset) {
  return putRecord(ASSET_STORE_NAME, asset);
}

export async function getOfflineAsset(assetId: string) {
  return getRecord<OfflineAsset>(ASSET_STORE_NAME, assetId);
}

export async function queueOfflineSync(item: Omit<OfflineSyncQueueItem, 'id' | 'createdAtIso'>) {
  return putRecord(SYNC_QUEUE_STORE_NAME, {
    ...item,
    id: `${item.type}:${Date.now()}`,
    createdAtIso: new Date().toISOString()
  });
}
