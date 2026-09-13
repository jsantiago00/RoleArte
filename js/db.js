// Capa de acceso a datos: IndexedDB con fallback a localStorage si IndexedDB no está disponible
// (por ejemplo al abrir el archivo directamente con file:// en algunos navegadores).

const DB_NAME = 'rolearte-db';
const DB_VERSION = 1;
const STORE = 'characters';
const LS_FALLBACK_KEY = 'rolearte-characters-fallback';

let dbPromise = null;
let useFallback = false;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    if (!('indexedDB' in window)) {
      useFallback = true;
      resolve(null);
      return;
    }
    let request;
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (err) {
      useFallback = true;
      resolve(null);
      return;
    }
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => {
      useFallback = true;
      resolve(null);
    };
  });
  return dbPromise;
}

// --- Fallback en localStorage ---
function lsGetAll() {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}
function lsSaveAll(list) {
  localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(list));
}

export async function getAllCharacters() {
  const db = await openDB();
  if (useFallback || !db) return lsGetAll();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => resolve([]);
  });
}

export async function getCharacter(id) {
  const db = await openDB();
  if (useFallback || !db) {
    return lsGetAll().find((c) => c.id === id) || null;
  }
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => resolve(null);
  });
}

export async function saveCharacter(character) {
  const db = await openDB();
  if (useFallback || !db) {
    const list = lsGetAll();
    const idx = list.findIndex((c) => c.id === character.id);
    if (idx >= 0) list[idx] = character;
    else list.push(character);
    lsSaveAll(list);
    return character;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const req = store.put(character);
    req.onsuccess = () => resolve(character);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteCharacter(id) {
  const db = await openDB();
  if (useFallback || !db) {
    const list = lsGetAll().filter((c) => c.id !== id);
    lsSaveAll(list);
    return;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
