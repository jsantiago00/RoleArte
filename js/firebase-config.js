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
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID',
};

export const FIREBASE_CONFIGURED = firebaseConfig.apiKey !== 'TU_API_KEY';
