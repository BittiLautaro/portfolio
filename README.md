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

Ahora hay capturas provisorias con un rayado. Para poner las reales, **se
reemplaza el archivo con el mismo nombre** en `assets/img/` y no hay que tocar
el HTML.

| Proyecto | Archivo | Recorte sugerido |
|---|---|---|
| DQV Turismo | `dqv-turismo.webp` | listado de pasajeros de un viaje |
| Bomberos · contable | `bomberos-contable.webp` | balance de bancos, cajas y mutuales |
| Bomberos · carga horaria | `bomberos-carga-horaria.webp` | quién está de guardia y hace cuánto |
| Lavadero de autos | `lavadero.webp` | dashboard del mes (autos, cobrado, ganancia) |
| Mecheros LP | `mecheros-lp.webp` | portada con los productos |
| Simplemente Momentos PH | `simplemente-momentos.webp` | galería por categorías |

- **1440 × 900 px** (16:10), recortando la mitad de la pantalla (≈ 720 × 450 de
  interfaz) capturada a 2×. No el dashboard entero en miniatura.
- **WebP de menos de 200 KB**, sin las barras del navegador (el marco lo dibuja el CSS).
- En los sistemas privados, con datos de prueba.

Después de cambiar una captura, actualizá también el `alt` de esa imagen en
`index.html` si el recorte es distinto del sugerido.

## Dominio

`https://tu-dominio.com.ar/` es un marcador en `index.html`, `robots.txt` y
`sitemap.xml`. Cuando esté el dominio, desde la carpeta del proyecto en
PowerShell:

```powershell
$nuevo = 'https://midominio.com.ar/'
'index.html','robots.txt','sitemap.xml' | ForEach-Object {
  (Get-Content $_ -Raw -Encoding UTF8).Replace('https://tu-dominio.com.ar/', $nuevo) |
    Set-Content $_ -Encoding UTF8 -NoNewline
}
```

Después, probar la vista previa en <https://www.opengraph.xyz/> o pegando el
link en un chat de WhatsApp.

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
