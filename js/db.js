// Fachada de almacenamiento: usa Firestore cuando hay una cuenta con sesión iniciada,
// y si no, cae al almacenamiento local (IndexedDB / localStorage) de local-db.js.
// Así el resto de la app llama siempre a las mismas funciones sin preocuparse de dónde
// vienen los datos.

import * as localDb from './local-db.js';
import * as cloudDb from './cloud-db.js';
import { getCurrentUser } from './auth.js';

export async function getAllCharacters() {
  const user = getCurrentUser();
  return user ? cloudDb.getAllCharacters(user.uid) : localDb.getAllCharacters();
}

export async function getCharacter(id) {
  const user = getCurrentUser();
  return user ? cloudDb.getCharacter(user.uid, id) : localDb.getCharacter(id);
}

export async function saveCharacter(character) {
  const user = getCurrentUser();
  return user ? cloudDb.saveCharacter(user.uid, character) : localDb.saveCharacter(character);
}

export async function deleteCharacter(id) {
  const user = getCurrentUser();
  return user ? cloudDb.deleteCharacter(user.uid, id) : localDb.deleteCharacter(id);
}

export { localDb, cloudDb };
