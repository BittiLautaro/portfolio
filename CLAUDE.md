# Contexto del proyecto — Portfolio

## Qué es este proyecto

Página web personal de portfolio para Lautaro, desarrollador freelance de Las Parejas,
Santa Fe (Argentina). El objetivo es conseguir clientes nuevos **fuera** de su ciudad,
donde no lo conocen. Se va a promocionar desde una cuenta de Instagram (con pauta paga),
así que la mayoría del tráfico va a llegar desde el celular.

Público objetivo: dueños de negocios chicos y medianos que necesitan un sistema de
gestión a medida o una página web.

## Decisiones ya tomadas (no reabrir sin motivo)

- **Sitio estático**: solo HTML + CSS + JS. Sin backend, sin base de datos.
  El motivo: la página se actualiza muy poco (cuando se suma un proyecto nuevo),
  así que un panel de administración no se amortiza. Además la velocidad de carga
  es crítica porque va a recibir tráfico pago desde celular.
- **Una sola página larga** con navegación por anclas (`#inicio`, `#servicios`,
  `#proyectos`, `#sobre-mi`, `#contacto`). No hay páginas separadas.
- **Mobile-first**: el diseño se piensa primero para celular y después se adapta
  a desktop, no al revés.
- **Formulario de contacto**: por ahora links directos a WhatsApp e Instagram.
  Si más adelante se quiere un formulario, se usa un servicio externo
  (Formspree / Web3Forms), nunca backend propio.

## Pendiente de definir

- **Nombre de marca**: todavía sin definir. En el código va como `[Marca]`.
  No inventar uno.
- Número de WhatsApp y usuario de Instagram: placeholders por ahora.
- Paleta de colores y tipografía.
- Capturas de pantalla de los proyectos (van en `assets/img/`).

## Estructura de archivos

```
portfolio/
├── index.html
├── README.md
├── .gitignore
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/
```

## Convenciones de código

- HTML semántico (`<section>`, `<article>`, `<nav>`, `<header>`), no `<div>` para todo.
  Importa para SEO y accesibilidad.
- Jerarquía de títulos sin saltear niveles: `h1` → `h2` → `h3` → `h4`.
- Clases con convención **BEM**: `bloque`, `bloque__elemento`, `bloque--modificador`.
  Ejemplo: `nav`, `nav__menu`, `btn--secundario`.
- CSS con variables en `:root` para colores y tipografías.
- Sin frameworks (nada de Bootstrap ni Tailwind). CSS propio.
- Comentarios en español.

## Secciones de la página (en este orden)

1. **Hero** — título, subtítulo de una línea, botón "Pedir presupuesto".
2. **Servicios** — dos bloques: "Sistemas de gestión a medida" y "Páginas web".
3. **Proyectos** — dividido en las mismas dos categorías.
4. **Sobre mí** — formación y forma de trabajar.
5. **Contacto** — links a WhatsApp e Instagram.

## Proyectos que van en el portfolio

### Sistemas de gestión

| Proyecto | Detalle | Stack |
|---|---|---|
| **DQV Turismo** | Plataforma de gestión para una empresa de turismo. Cliente real, en producción. | Flask, PostgreSQL, Railway |
| **Gestión — Cuartel de Bomberos de Las Parejas** | Sistema de gestión para el cuartel. Cliente real. | Flask, PostgreSQL |
| **Control de carga horaria — Cuartel de Bomberos** | Control de horas del personal. Cliente real. | Flask, PostgreSQL |
| **Gestión de lavadero** | Sistema para administrar un lavadero de autos. Uso propio, en funcionamiento. | Flask, PostgreSQL |
| **Sistema de venta de pizzas** | Gestión de pedidos. **En uso real**, corre por terminal. Se está migrando a web. | Python |

### Páginas web

| Proyecto | Detalle | Stack |
|---|---|---|
| **Mecheros LP** | Página institucional para un negocio de mecheros de aluminio. | HTML, CSS, JS |
| **Simplemente Momentos PH** | Página para un emprendimiento de fotografía. | HTML, CSS, JS |

### Qué NO va

- **Estudio Propezzi**: quedó a medio hacer, fue solo una prueba y el estudio nunca
  lo pidió. Un trabajo inconcluso en el portfolio juega en contra. Queda afuera.

### Cómo presentar el sistema de pizzas

No describirlo como "en desarrollo" ni "inconcluso" — es un sistema que funciona y
se usa todos los días. La interfaz es de terminal, eso es todo. Se puede agregar una
línea tipo "actualmente migrándose a plataforma web", que suena a evolución y no a
deuda pendiente.

## Sobre Lautaro (para la sección "Sobre mí")

- Estudiante de primer año de Analista en Sistemas, con intención de seguir a
  Ingeniería en Sistemas.
- Desarrollador freelance, trabaja principalmente con Flask + PostgreSQL + Railway.
- Tiene clientes reales en producción.
- Forma de trabajar: entiende el problema del negocio antes de escribir código.

## Cómo trabajar con Lautaro

Esto es importante y aplica a **todas** las respuestas:

- **De a un paso o un archivo por vez**, confirmando antes de seguir. No entregar
  todo junto ni avanzar varios pasos sin preguntar.
- **Siempre explicar el "por qué"** de cada decisión, no solo el "cómo".
  Quiere entender, no copiar y pegar.
- Explicaciones **estructuradas**, de lo fundamental a lo avanzado, sin saltear pasos.
- Código **claro y ordenado**, explicado línea por línea cuando haga falta.
- Si algo se puede hacer de forma más profesional u optimizada, **decírselo**.
- Hablar en **español rioplatense informal** (vos, tenés, querés).
- Está en **Windows con PowerShell**, no en bash. Los comandos de terminal tienen que
  ser sintaxis PowerShell (`New-Item` en vez de `mkdir -p`, rutas con `\`).

## Estado actual

Repositorio creado y vinculado a GitHub (`BittiLautaro/portfolio`).
Estructura de carpetas y archivos creada, todos vacíos.
El siguiente paso es escribir el esqueleto de `index.html`.
