// Configuración de tu proyecto de Firebase.
//
// Cómo conseguirla:
// 1. Entrá a https://console.firebase.google.com/ y creá un proyecto gratis (plan Spark).
// 2. Compilación → Authentication → Comenzar → activá el proveedor "Correo electrónico/contraseña".
// 3. Compilación → Firestore Database → Crear base de datos (cualquier región).
// 4. Configuración del proyecto (ícono de tuerca) → "Tus apps" → ícono </> (Web) → registrá una app.
//    Ahí te va a mostrar un objeto "firebaseConfig" — pegalo reemplazando el de abajo.
// 5. En Firestore, pestaña "Reglas", pegá el contenido de firestore.rules (en la raíz del proyecto)
//    y publicá.
//
// Mientras estos valores sigan siendo los de ejemplo, la app funciona igual pero sin sincronización
// en la nube: cada personaje se guarda solo en el dispositivo (modo invitado).
export const firebaseConfig = {
  apiKey: 'AIzaSyDhtshce4PBpYjkzKKIzysxQKQYB9QJwfk',
  authDomain: 'rolearte-ec478.firebaseapp.com',
  projectId: 'rolearte-ec478',
  storageBucket: 'rolearte-ec478.firebasestorage.app',
  messagingSenderId: '278349556358',
  appId: '1:278349556358:web:599cc5ef73317cec0c3f07',
};

export const FIREBASE_CONFIGURED = firebaseConfig.apiKey !== 'TU_API_KEY';
