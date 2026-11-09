# Contexto del proyecto — Portfolio de Lautaro Bitti

## Qué es

Sitio web de captación de clientes de Lautaro Bitti, desarrollador de software
freelance de Las Parejas, Santa Fe (Argentina). Una sola página larga con
navegación por anclas.

**Público:** dueños de negocios, PyMEs e instituciones que necesitan un sistema
de gestión a medida o una página web. **No** es un portfolio para reclutadores.

**Tráfico:** llega mayormente desde Instagram, en el celular. Mobile-first.

## Fuente de verdad del diseño

La carpeta `referencia/` (fuera del control de versiones) tiene el export de
Claude Design: `Portfolio Bocetos.dc.html`, la propuesta **1A**. Es un lienzo de
diseño, no un sitio: se usa como referencia visual y como fuente de los
**textos finales** (Lautaro los editó ahí). Si un texto del diseño difiere de
otro documento, **gana el diseño**.

`referencia/uploads/Kit de marca Lautaro Bitti.pdf` es el kit de marca. Manda
sobre cualquier decisión visual.

## Kit de marca (resumen — ante dudas, ver el PDF)

### Colores
| Token | Hex | Uso |
|---|---|---|
| Ink | `#0A0F1F` | Fondo principal · texto sobre claro |
| Grafito | `#151D36` | Tarjetas y ventanas de código |
| Nube | `#F3F5FA` | Fondo claro · texto sobre oscuro |
| Niebla | `#98A2B8` | Texto secundario sobre oscuro |
| Mint | `#34F0B4` | Acento: cursor, CTA, destacados |
| Violeta | `#8B77FF` | Apoyo |
| Violeta hondo | `#5E45F2` | Acento sobre fondos claros |
| Acero | `#4A5470` | Texto secundario sobre claro |

- Texto sobre Mint o Violeta: **siempre Ink**.
- Mint nunca como texto sobre fondo claro (ahí va Violeta hondo).
- Mint se usa poco: es lo que lo hace fuerte.

### Tipografía (servidas localmente, sin Google Fonts)
- **Space Grotesk** Bold 700 — títulos · espaciado −3,5 % · interlineado 1,0
- **Inter** 400 / 500 — texto · 18/28
- **JetBrains Mono** 400 — etiquetas en MAYÚSCULA (+12 % espaciado) y código

### Logo
Isotipo **LB**: la L y la B comparten grilla y el pie de la L es un cursor en
Mint. Tiene que ser un **SVG** idéntico al del kit (el export solo trae PNG en
`referencia/assets/`). Favicon: el sello con fondo Ink.

## Secciones (en este orden)

Nav: Servicios · Proyectos · Cómo trabajo · Sobre mí · Contacto

1. **Hero** — etiqueta "Disponible para nuevos proyectos" con punto verde,
   título en dos líneas, párrafo, botones WhatsApp + Ver proyectos, línea de
   cifras. Todo alineado a la izquierda, lado derecho vacío.
2. **Servicios** — 4 tarjetas de igual peso.
3. **Proyectos** — 6 proyectos (ver abajo).
4. **Cómo trabajo** — 4 pasos numerados en tarjetas.
5. **Sobre mí** — corta.
6. **Contacto** — tarjeta de cierre con WhatsApp, Instagram y ubicación.
7. Pie con isotipo y GitHub.

Botón flotante de WhatsApp: aparece después del hero y se oculta al llegar a
Contacto.

## Proyectos (6)

1. DQV Turismo — Sistema de gestión integral
2. Cuartel de Bomberos — Sistema de gestión contable
3. Cuartel de Bomberos — Control de carga horaria
4. Lavadero de autos — Sistema de gestión
5. Mecheros LP — Sitio institucional → `https://mecheroslp.com.ar/`
6. Simplemente Momentos PH — Portfolio fotográfico → `https://simplementemomentos.com.ar/`

Los sistemas 1–4 son privados: **sin link**. El proyecto de la pizzería ya
**no existe** en el sitio: no volver a agregarlo.

- **Desktop:** selector. Lista numerada a la izquierda, ficha del elegido a la
  derecha (captura en marco de navegador, título, resumen, stack, "Ver más").
- **Celular:** lista numerada colapsada (número, nombre, subtítulo). Al tocar
  uno, la ficha se expande **en el lugar**, con el texto completo ya visible
  (sin un segundo "Ver más"). La lista sigue visible.

## Capturas

Formato 16:10, archivo de 1440 × 900, recortando la zona que importa del
sistema (no el dashboard entero en miniatura). WebP de menos de 200 KB, sin
barras del navegador (el marco lo dibuja el CSS). Van en `assets/img/`.
Mientras Lautaro no las tenga, se dejan placeholders prolijos.

## Datos de contacto

- WhatsApp: `https://wa.me/5493471670231` (con mensaje prellenado)
- Instagram: pendiente → `href="#"` hasta que Lautaro pase el usuario
- GitHub: `https://github.com/BittiLautaro`
- Ubicación: Las Parejas, Santa Fe · Trabajo remoto para todo el país

## Hosting

**Railway**, no GitHub Pages. Es un sitio estático: no hay backend, base de
datos ni formulario. Se sirve con la configuración mínima para archivos
estáticos. El dominio propio se conecta más adelante.

## Convenciones de código

- HTML semántico, jerarquía de títulos sin saltos.
- CSS puro con BEM y variables en `:root` con los nombres del kit
  (`--ink`, `--mint`, etc.). Sin frameworks ni librerías.
- JavaScript solo para lo interactivo, como mejora progresiva: sin JS, todo el
  contenido se tiene que poder leer.
- `prefers-reduced-motion`, contraste WCAG AA, `focus-visible`.
- Comentarios en español.

## Qué NO hacer

- No usar el azul del sitio anterior (`#3B82F6`, `#2563EB`) ni el fondo `#0F1115`.
- No reescribir textos.
- No agregar precios, preguntas frecuentes ni sección de tecnologías.
- Nada que se mueva solo (sin carruseles automáticos).

## Cómo trabajar con Lautaro

- De a un paso, confirmando antes de seguir.
- Explicar siempre el porqué de cada decisión.
- Español rioplatense informal.
- Está en **Windows con PowerShell**: los comandos van en sintaxis PowerShell.
- Si algo se puede hacer más profesional, decírselo.
