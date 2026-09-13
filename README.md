# Rolearte — Fichas de D&D 5ª edición

PWA (app web instalable) para llevar tus personajes de D&D 5e. Se adapta a cualquier clase y
subclase (los campos de clase, subclase, ataques, conjuros y rasgos son libres, no están
atados a una lista fija), permite gestionar varios personajes, subir una foto/arte de cada uno,
y guarda todo localmente en el dispositivo (no depende de internet ni de un servidor).

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

## Respaldo de tus personajes

Como los datos viven solo en el navegador donde los cargaste, usá **Exportar** cada tanto para
guardar un `.json` de respaldo, y **Importar** para pasarlos a otro dispositivo o navegador.

## Estructura del proyecto

```
index.html              Punto de entrada
css/styles.css          Estilos
js/app.js               Lógica de la interfaz y navegación
js/sheet-data.js        Modelo de datos de la ficha y cálculos (modificadores, bonos, etc.)
js/db.js                Acceso a IndexedDB (con respaldo en localStorage si no está disponible)
manifest.webmanifest    Metadatos de la PWA
sw.js                   Service worker (funcionamiento offline)
icons/                  Íconos de la app
```

Para cambiar colores o el ícono, editá `css/styles.css` (variables al principio del archivo) y
los archivos dentro de `icons/`. Si actualizás los archivos de la app, subí el número de
`CACHE_VERSION` en `sw.js` para que los usuarios reciban la actualización.
