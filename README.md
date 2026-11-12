# Portfolio · Lautaro Bitti

Sitio de una sola página: HTML, CSS y JavaScript, sin frameworks ni build.
Se publica en Railway con Caddy.

## Estructura

```
index.html              página completa
assets/css/style.css    estilos (tokens del kit en :root)
assets/js/main.js       menú, selector de proyectos, botón flotante
assets/fonts/           Space Grotesk 700, Inter variable, JetBrains Mono 400 (subset latin)
assets/img/             capturas, isotipo en SVG e imagen de preview
favicon.svg / .ico      sello con fondo Ink (versión de trazo grueso)
apple-touch-icon.png    ícono para iPhone (180 × 180)
Dockerfile, Caddyfile   configuración de Railway
```

## Capturas de los proyectos

Para cambiar una, **se reemplaza el archivo con el mismo nombre** en
`assets/img/` y no hay que tocar el HTML (salvo el `alt`, si la imagen muestra
otra cosa).

| Proyecto | Archivo | Qué muestra hoy |
|---|---|---|
| PaxControl | `paxcontrol.webp` | menú de módulos y lista de pasajeros de un contrato |
| Bomberos · contable | `bomberos-contable.webp` | saldos y cuentas del dashboard |
| Bomberos · carga horaria | `bomberos-carga-horaria.webp` | quién está de guardia y hace cuánto |
| Lavadero de autos | `lavadero.webp` | números del mes y próximos turnos |
| Mecheros LP | `mecheros-lp.webp` | portada |
| Simplemente Momentos PH | `simplemente-momentos.webp` | portada |

- **1440 × 900 px** (16:10), recortando la zona que importa (más o menos la
  mitad de la pantalla) de una captura a 2×. No la pantalla entera en miniatura.
- **WebP de menos de 200 KB**, sin las barras del navegador (el marco lo dibuja el CSS).
- En los sistemas privados, con datos de prueba. Datos editados sobre la
  captura original: en el lavadero, los nombres de los clientes; en carga
  horaria, los horarios; en el contable, los nombres y saldos de las cuentas
  y el usuario ("Tesorería").

## Dominio

Mientras no haya dominio propio, el sitio usa la URL de Railway
(`https://lautarobitti.up.railway.app/`) en `index.html`, `robots.txt` y
`sitemap.xml`. Cuando esté el dominio:

1. En Railway: **Settings → Networking → Custom Domain** y cargar en el
   proveedor del dominio el registro CNAME que indica Railway.
2. Reemplazar la URL en los tres archivos, desde la carpeta del proyecto en
   PowerShell:

   ```powershell
   $nuevo = 'https://midominio.com.ar/'
   'index.html','robots.txt','sitemap.xml' | ForEach-Object {
     (Get-Content $_ -Raw -Encoding UTF8).Replace('https://lautarobitti.up.railway.app/', $nuevo) |
       Set-Content $_ -Encoding UTF8 -NoNewline
   }
   ```

3. Commit y push.
4. Probar la vista previa en <https://www.opengraph.xyz/> o pegando el link en
   un chat de WhatsApp. Si WhatsApp sigue mostrando la vista vieja, es caché
   suya: se actualiza sola en unos días.

## Ver el sitio en la compu

```powershell
python -m http.server 4173
```

y abrir <http://localhost:4173>.

## Publicar en Railway

1. En Railway: **New Project → Deploy from GitHub repo** y elegir este repo.
2. Railway detecta el `Dockerfile` y lo usa (no hace falta configurar nada más).
3. En **Settings → Networking → Generate Domain** para tener una URL pública.
   Para el dominio propio: **Custom Domain** y cargar el CNAME que indica Railway.

Cada push a `main` vuelve a publicar.

**Por qué Dockerfile + Caddy y no la detección automática:** Railway puede
servir un `index.html` sin configuración, pero publica todo el repo (incluido
`CLAUDE.md` y las carpetas de configuración). El `Dockerfile` copia solo los
archivos del sitio, y el `Caddyfile` define el puerto, la compresión, la caché
y unos encabezados de seguridad básicos.
