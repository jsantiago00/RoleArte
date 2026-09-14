// Capa de acceso a datos en Firestore (una colección "characters" por usuario, en
// users/{uid}/characters/{id}). Misma forma que local-db.js para poder usarlas
// intercambiablemente desde db.js.

import { getFirestoreContext } from './auth.js';

async function ctxFor(uid) {
  const ctx = await getFirestoreContext();
  if (!ctx) throw new Error('La nube no está disponible.');
  return { ...ctx, colRef: ctx.firestoreModule.collection(ctx.db, 'users', uid, 'characters') };
}

export async function getAllCharacters(uid) {
  const { firestoreModule, colRef } = await ctxFor(uid);
  const snap = await firestoreModule.getDocs(colRef);
  return snap.docs.map((d) => d.data());
}

export async function getCharacter(uid, id) {
  const { firestoreModule, db } = await ctxFor(uid);
  const ref = firestoreModule.doc(db, 'users', uid, 'characters', id);
  const snap = await firestoreModule.getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveCharacter(uid, character) {
  const { firestoreModule, db } = await ctxFor(uid);
  const ref = firestoreModule.doc(db, 'users', uid, 'characters', character.id);
  await firestoreModule.setDoc(ref, character);
  return character;
}

export async function deleteCharacter(uid, id) {
  const { firestoreModule, db } = await ctxFor(uid);
  const ref = firestoreModule.doc(db, 'users', uid, 'characters', id);
  await firestoreModule.deleteDoc(ref);
}
