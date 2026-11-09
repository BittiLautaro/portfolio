// Interacciones del sitio. Todo es mejora progresiva: sin JS la página se lee
// entera (fichas abiertas, menú como fila de links, sin botón flotante).
(function () {
  'use strict';

  var desktop = window.matchMedia('(min-width: 1024px)');
  var tablet = window.matchMedia('(min-width: 768px)');

  /* ==========================================================================
     Menú de celular: botón "Menú" que abre la navegación a pantalla completa
     ========================================================================== */
  var menuBtn = document.querySelector('.header__menu-btn');
  var nav = document.getElementById('nav');
  // Lo que queda detrás del menú abierto: se vuelve inerte para que el foco
  // del teclado y el lector de pantalla no se escapen a la página de abajo.
  var behindMenu = document.querySelectorAll('main, footer, .float-wa');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Cerrar' : 'Menú';
    document.body.classList.toggle('menu-open', open);
    behindMenu.forEach(function (el) {
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    updateFloat();
  }

  function menuIsOpen() {
    return nav.classList.contains('is-open');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(!menuIsOpen());
  });

  // Tocar un link cierra el menú (el ancla hace el resto)
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a') && menuIsOpen()) setMenu(false);
  });

  // Escape cierra y devuelve el foco al botón
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuIsOpen()) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // Si se agranda la ventana con el menú abierto, se cierra solo
  tablet.addEventListener('change', function (e) {
    if (e.matches && menuIsOpen()) setMenu(false);
  });

  /* ==========================================================================
     Sección activa en el nav
     Se marca la última sección cuyo comienzo ya pasó una línea imaginaria al
     40 % de la pantalla. En el hero no se marca ninguna.
     ========================================================================== */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });

  function updateActive() {
    var line = window.innerHeight * 0.4;
    var current = -1;
    sections.forEach(function (section, i) {
      if (section && section.getBoundingClientRect().top <= line) current = i;
    });
    // Al final de la página, la última sección siempre cuenta como activa
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    navLinks.forEach(function (link, i) {
      if (i === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  /* ==========================================================================
     Proyectos
     - Desktop: selector. Siempre hay uno elegido; "Ver más" abre el detalle.
     - Celular/tablet: lista colapsada, se abre uno por vez y en el lugar,
       con el texto completo (sin segundo "Ver más").
     ========================================================================== */
  var projects = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var toggles = projects.map(function (p) { return p.querySelector('.project__toggle'); });

  function setProject(project, open) {
    project.classList.toggle('is-open', open);
    project.querySelector('.project__toggle').setAttribute('aria-expanded', String(open));
    // Al cerrar una ficha, su detalle de desktop vuelve a quedar plegado
    if (!open) setDetail(project, false);
  }

  function setDetail(project, open) {
    var more = project.querySelector('.project__more');
    var detail = project.querySelector('.project__detail');
    detail.classList.toggle('is-open', open);
    more.setAttribute('aria-expanded', String(open));
    more.textContent = open ? 'Ver menos' : 'Ver más';
  }

  function select(index) {
    projects.forEach(function (p, i) { setProject(p, i === index); });
  }

  function openIndex() {
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].classList.contains('is-open')) return i;
    }
    return -1;
  }

  toggles.forEach(function (toggle, i) {
    toggle.addEventListener('click', function () {
      if (desktop.matches) {
        select(i);
        return;
      }
      // Celular: si se cierra una ficha de más arriba, la página "salta".
      // Se compensa para que el botón tocado quede donde estaba bajo el dedo.
      var before = toggle.getBoundingClientRect().top;
      var wasOpen = projects[i].classList.contains('is-open');
      select(wasOpen ? -1 : i);
      var after = toggle.getBoundingClientRect().top;
      if (after !== before) window.scrollBy({ top: after - before, behavior: 'instant' });
    });

    // Desktop: flechas arriba/abajo recorren la lista, como un selector
    toggle.addEventListener('keydown', function (e) {
      if (!desktop.matches || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      var next = (i + (e.key === 'ArrowDown' ? 1 : -1) + toggles.length) % toggles.length;
      select(next);
      toggles[next].focus();
    });
  });

  projects.forEach(function (project) {
    var more = project.querySelector('.project__more');
    more.hidden = false;   // el botón solo existe con JS
    more.addEventListener('click', function () {
      setDetail(project, more.getAttribute('aria-expanded') !== 'true');
    });
  });

  // Estado inicial y cambio de tamaño: en desktop siempre hay uno elegido
  function syncProjects() {
    if (desktop.matches && openIndex() === -1) select(0);
  }
  desktop.addEventListener('change', syncProjects);
  syncProjects();

  /* ==========================================================================
     Botón flotante de WhatsApp
     Aparece cuando el botón de WhatsApp del hero ya quedó arriba (fuera de la
     pantalla) y se oculta cuando Contacto está a la vista: nunca hay dos
     botones de WhatsApp en pantalla a la vez.
     ========================================================================== */
  var floatBtn = document.querySelector('.float-wa');
  var heroBtn = document.getElementById('hero-whatsapp');
  var contact = document.getElementById('contacto');

  function updateFloat() {
    var heroGone = heroBtn.getBoundingClientRect().bottom < 0;
    var contactRect = contact.getBoundingClientRect();
    var contactInView = contactRect.top < window.innerHeight && contactRect.bottom > 0;
    var show = heroGone && !contactInView && !menuIsOpen();

    floatBtn.classList.toggle('is-visible', show);
    // Oculto: fuera del orden de tabulación y del lector de pantalla
    if (show) {
      floatBtn.removeAttribute('aria-hidden');
      floatBtn.removeAttribute('tabindex');
    } else {
      floatBtn.setAttribute('aria-hidden', 'true');
      floatBtn.setAttribute('tabindex', '-1');
    }
  }

  /* ---------- Un solo listener de scroll, limitado a un cálculo por cuadro ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateActive();
      updateFloat();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
