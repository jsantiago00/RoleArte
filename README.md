# RoleArte — Fichas de D&D 5ª edición

PWA (app web instalable) para llevar tus personajes de D&D 5e. Se adapta a cualquier clase y
subclase (los campos de clase, subclase, ataques, conjuros y rasgos son libres, no están
atados a una lista fija), permite gestionar varios personajes, subir una foto/arte de cada uno,
y guarda todo localmente en el dispositivo por defecto. Opcionalmente se puede crear una cuenta
para sincronizar los personajes entre dispositivos (ver "Sincronización en la nube" más abajo).

No incluye inspiración, puntos de experiencia, ni rasgos de personalidad/ideales/vínculos/defectos,
tal como se pidió. Sí incluye trasfondo, con su beneficio y las competencias/idiomas que otorga.

## ¿Por qué no puedo simplemente abrir index.html haciendo doble clic?

Los navegadores restringen el almacenamiento local (IndexedDB) y los Service Workers (necesarios
para que funcione offline y sea instalable) cuando el sitio se abre como archivo (`file://`).
Por eso hay que servirlo con un pequeño servidor web, aunque sea local. Opciones:

### Opción A — Probarlo en tu PC (rápido, sin instalar nada extra si tenés Node o Python)

Con Node.js instalado, desde esta carpeta:
```
npx serve .
```
Con Python instalado:
```
python -m http.server 8080
```
Y después abrí `http://localhost:8080` (o el puerto que indique) en el navegador.

### Opción B — Publicarlo gratis para usarlo desde el celular (recomendado)

Para instalarlo como app en tu celular necesitás que esté en una URL real (https). Alguna de estas
opciones gratuitas sirve, arrastrando esta carpeta:

- **Netlify Drop**: https://app.netlify.com/drop — arrastrás la carpeta del proyecto y te da un link al instante.
- **Cloudflare Pages** o **GitHub Pages**: ideales si querés un link permanente y versionar los cambios con git.

Pedime si querés que te ayude a dejarlo publicado en alguna de estas.

### Instalar como app

Una vez que lo abrís desde una URL http(s) (local o publicada):
- **Android/Chrome**: menú ⋮ → "Instalar app" o "Agregar a pantalla de inicio".
- **iPhone/Safari**: botón compartir → "Agregar a pantalla de inicio".
- **PC (Chrome/Edge)**: ícono de instalación en la barra de direcciones.

Después de instalarla, funciona sin conexión (el service worker cachea la app).

## Uso

- **Pantalla principal**: lista de tus personajes. Botón **+** para crear uno nuevo.
- Cada tarjeta permite **duplicar** o **eliminar** un personaje; tocándola la abrís.
- Menú ⋮ (arriba a la derecha):
  - En la lista: **importar** personajes desde un archivo `.json`, o **exportar todos**.
  - Dentro de una ficha: **duplicar**, **exportar** (backup individual) o **eliminar** ese personaje.
- Todo se guarda automáticamente mientras escribís (IndexedDB en tu navegador).
- Los campos con "Auto (...)" (bono de competencia, CD de salvación, bono de ataque de conjuro)
  se calculan solos a partir del nivel y las características; si necesitás forzar un valor
  distinto, escribilo ahí y dejará de ser automático (borrá el campo para volver a automático).

### Pestañas

La ficha está dividida en pestañas (Personaje, Combate, Conjuros, Rasgos, Equipo, Notas) para no
tener que scrollear una pantalla gigante. Cada pestaña guarda sus tarjetas colapsables propias.

### Vida como corazón, habilidades agrupadas, listas plegables

- Los puntos de golpe se muestran como un corazón que se va llenando según tu PG actual/máximo
  (y late cuando estás por debajo del 25%), con la insignia dorada de PG temporales arriba.
- Las habilidades están agrupadas por característica (Fuerza, Destreza, Inteligencia, Sabiduría,
  Carisma) y ordenadas alfabéticamente dentro de cada grupo.
- Los conjuros y los objetos de equipo se ven como una lista compacta (nombre + nivel/cantidad);
  tocá cualquiera para desplegar sus notas, si está preparado, etc. Los trucos se muestran como
  chips chiquitos en una fila.
- El Equipo ahora tiene una lista de **objetos** individuales (cantidad, nombre, notas) además de
  las monedas; el cuadro de texto libre quedó como "Otras notas" para lo que no quieras itemizar.

### Botón "⚔️ Atacar"

En Combate, el botón **⚔️ Atacar** abre un selector con tus armas, tus trucos y los conjuros que
tenés **con al menos un espacio disponible** (contando espacios de nivel superior para potenciar).
Elegir un arma o truco muestra su información; elegir un conjuro te deja elegir con qué nivel de
espacio lanzarlo y lo gasta automáticamente al confirmar. Si el conjuro tiene un efecto cargado en
el compendio (como Escudo), también podés aplicarlo directo como efecto activo desde ahí.

### Razas y clases con beneficios automáticos

Al escribir una Clase o Raza que coincida con las del compendio (basado en el contenido abierto/SRD
de D&D 5e — los 12 clases básicas + Artífice, y las razas del SRD con sus subrazas), aparece un
botón **✨ Aplicar beneficios** que:
- **Clase**: fija el dado de golpe y marca competencia en las salvaciones correspondientes (se puede
  aplicar de nuevo sin problema si cambiás de nivel).
- **Raza**: suma los bonos de característica, fija la velocidad y agrega los rasgos raciales a
  "Rasgos y dotes" — como esto SUMA a tus puntuaciones, el botón se reemplaza por **↩️ Quitar
  beneficios** para no aplicarlo dos veces por error.

También hay un compendio de **arquetipos/subclases base** (Dominios de clérigo, Patrones y Dones de
Pacto de brujo —incluido Pacto del Filo—, Escuelas de mago, Caminos, Colegios, Círculos, Juramentos,
etc.). El campo Subclase se autocompleta según la Clase que hayas puesto, y **✨ Agregar rasgos**
suma su descripción principal a "Rasgos y dotes" (no la progresión completa nivel por nivel).

Si tu clase/raza/subclase no está en el compendio (por ejemplo, algo homebrew), el campo sigue
siendo texto libre normal, simplemente no aparece el botón de auto-aplicar.

### Conjuros: compendio, info y efectos automáticos

En la pestaña Conjuros podés escribir el nombre libremente (con autocompletado) o tocar
**📖 Elegir del compendio** para buscar y agregar un conjuro con sus datos ya cargados. El botón
**ℹ️** junto a cada conjuro muestra escuela, tiempo de lanzamiento, alcance, duración y una
descripción resumida. Algunos conjuros (Escudo, Bendición, Presteza, etc.) tienen un botón
**⚡ Aplicar como efecto activo** que los agrega directamente a Efectos activos con sus
modificadores ya cargados.

### Efectos activos que modifican tus stats

En Combate, cada efecto (buff, debuff, condición) puede tener uno o más **modificadores de stat**
(CA, iniciativa, velocidad, una característica, una salvación, una habilidad, CD/bono de conjuros).
Mientras el efecto esté en la lista, esos bonos o penalizaciones se suman automáticamente a los
cálculos de la ficha; al borrar el efecto (o cuando termina su duración en rondas) dejan de aplicarse.

## Respaldo de tus personajes

Como los datos viven solo en el navegador donde los cargaste (a menos que uses una cuenta, ver
abajo), usá **Exportar** cada tanto para guardar un `.json` de respaldo, y **Importar** para
pasarlos a otro dispositivo o navegador.

## Sincronización en la nube (opcional)

Desde el menú ⋮ de la lista de personajes, **"Iniciar sesión / Crear cuenta…"** te deja crear una
cuenta (correo + contraseña) para que tus personajes se guarden en la nube y aparezcan solos en
cualquier dispositivo donde inicies sesión con la misma cuenta. Sin cuenta, todo sigue funcionando
igual que siempre en modo local (invitado). La primera vez que iniciás sesión, si tenías personajes
guardados localmente en ese dispositivo, te ofrece copiarlos a la cuenta.

Para que esto funcione en tu propia copia del proyecto hace falta un proyecto gratuito de Firebase
(plan Spark, sin tarjeta):

1. Entrá a [Firebase console](https://console.firebase.google.com/) y creá un proyecto.
2. **Compilación → Authentication → Comenzar** → activá el proveedor **Correo electrónico/contraseña**.
3. **Compilación → Firestore Database → Crear base de datos** (cualquier región).
4. En Firestore, pestaña **Reglas**, pegá el contenido de [`firestore.rules`](firestore.rules) de
   este proyecto y publicá (restringe cada cuenta a ver solo sus propios personajes).
5. **Configuración del proyecto** (ícono de tuerca) → "Tus apps" → ícono `</>` (Web) → registrá una
   app → copiá el objeto `firebaseConfig` que te muestra.
6. Pegá esos valores en [`js/firebase-config.js`](js/firebase-config.js), reemplazando los
   placeholders (`TU_API_KEY`, etc.).

Mientras `js/firebase-config.js` tenga los valores de ejemplo, el botón de cuenta simplemente
avisa que la nube no está configurada y la app sigue funcionando 100% local.

## Estructura del proyecto

```
index.html              Punto de entrada
css/styles.css          Estilos
js/app.js               Lógica de la interfaz y navegación
js/sheet-data.js        Modelo de datos de la ficha y cálculos (modificadores, bonos, efectos, etc.)
js/compendium.js        Compendio editable de razas, clases y conjuros (basado en SRD)
js/db.js                Fachada de almacenamiento: elige entre local-db.js y cloud-db.js
js/local-db.js          Acceso a IndexedDB (con respaldo en localStorage si no está disponible)
js/cloud-db.js          Acceso a Firestore (personajes por usuario, cuando hay sesión iniciada)
js/auth.js              Login/registro y conexión con Firebase (carga diferida)
js/firebase-config.js   Config de tu proyecto de Firebase (ver "Sincronización en la nube")
firestore.rules         Reglas de seguridad para pegar en Firebase → Firestore → Reglas
manifest.webmanifest    Metadatos de la PWA
sw.js                   Service worker (funcionamiento offline)
icons/                  Íconos de la app
```

Para cambiar colores o el ícono, editá `css/styles.css` (variables al principio del archivo) y
los archivos dentro de `icons/`. Si actualizás los archivos de la app, subí el número de
`CACHE_VERSION` en `sw.js` para que los usuarios reciban la actualización.
