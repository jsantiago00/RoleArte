// Autenticación con Firebase (correo/contraseña). Todo se carga de forma diferida: si el
// proyecto no está configurado (ver firebase-config.js) o no hay conexión, la app sigue
// funcionando en modo invitado (guardado local) sin romperse.

import { firebaseConfig, FIREBASE_CONFIGURED } from './firebase-config.js';

const SDK_VERSION = '11.6.0';
const BASE = `https://www.gstatic.com/firebasejs/${SDK_VERSION}`;

let authInstance = null;
let firestoreInstance = null;
let initPromise = null;
const listeners = new Set();
let currentUser = null;
let lastAuthError = null;

function notify() {
  listeners.forEach((cb) => cb(currentUser));
}

// Se resuelve con { auth, db, authModule } o null si Firebase no está disponible.
function init() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    if (!FIREBASE_CONFIGURED) return null;
    try {
      const [{ initializeApp }, authModule, firestoreModule] = await Promise.all([
        import(`${BASE}/firebase-app.js`),
        import(`${BASE}/firebase-auth.js`),
        import(`${BASE}/firebase-firestore.js`),
      ]);
      const app = initializeApp(firebaseConfig);
      const auth = authModule.getAuth(app);
      let db;
      try {
        db = firestoreModule.initializeFirestore(app, {
          localCache: firestoreModule.persistentLocalCache({
            tabManager: firestoreModule.persistentMultipleTabManager(),
          }),
        });
      } catch (err) {
        // Si falla la caché persistente (ej. modo privado), seguimos sin ella.
        db = firestoreModule.getFirestore(app);
      }
      authModule.onAuthStateChanged(auth, (user) => {
        currentUser = user;
        notify();
      });
      return { auth, db, authModule, firestoreModule };
    } catch (err) {
      console.warn('No se pudo inicializar Firebase, se sigue en modo local.', err);
      return null;
    }
  })();
  return initPromise;
}

export function isCloudAvailable() {
  return FIREBASE_CONFIGURED;
}

export function getCurrentUser() {
  return currentUser;
}

// Llama a callback ahora mismo con el estado actual y de nuevo cada vez que cambie.
export async function onAuthChange(callback) {
  listeners.add(callback);
  const ctx = await init();
  callback(currentUser);
  return () => listeners.delete(callback);
}

function friendlyAuthError(code) {
  const map = {
    'auth/email-already-in-use': 'Ese correo ya tiene una cuenta creada.',
    'auth/invalid-email': 'El correo no es válido.',
    'auth/weak-password': 'La contraseña necesita al menos 6 caracteres.',
    'auth/user-not-found': 'No hay ninguna cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/too-many-requests': 'Demasiados intentos. Probá de nuevo en un rato.',
    'auth/network-request-failed': 'Sin conexión a internet.',
  };
  return map[code] || 'No se pudo completar la operación.';
}

export async function signUp(email, password) {
  const ctx = await init();
  if (!ctx) throw new Error('La sincronización en la nube todavía no está configurada.');
  try {
    const cred = await ctx.authModule.createUserWithEmailAndPassword(ctx.auth, email, password);
    return cred.user;
  } catch (err) {
    throw new Error(friendlyAuthError(err.code));
  }
}

export async function signIn(email, password) {
  const ctx = await init();
  if (!ctx) throw new Error('La sincronización en la nube todavía no está configurada.');
  try {
    const cred = await ctx.authModule.signInWithEmailAndPassword(ctx.auth, email, password);
    return cred.user;
  } catch (err) {
    throw new Error(friendlyAuthError(err.code));
  }
}

export async function signOutUser() {
  const ctx = await init();
  if (!ctx) return;
  await ctx.authModule.signOut(ctx.auth);
}

export async function getFirestoreContext() {
  return init();
}
