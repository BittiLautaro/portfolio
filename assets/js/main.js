// Todo lo de acá es mejora progresiva: sin JS la página se lee entera,
// el menú queda visible y los 7 proyectos se muestran uno debajo del otro.
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.add('js');

  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú en celular ---------- */

  var boton = document.querySelector('.nav__boton');
  var nav = document.querySelector('.nav');
  // Lo que queda detrás del panel: inert para que el foco de teclado no
  // se vaya a contenido tapado
  var fondo = Array.prototype.slice.call(document.querySelectorAll('main, footer, .flotante'));

  function abrirMenu() {
    nav.classList.add('nav--abierta');
    document.body.classList.add('nav-abierta');
    boton.setAttribute('aria-expanded', 'true');
    fondo.forEach(function (el) { el.inert = true; });
  }

  function cerrarMenu() {
    nav.classList.remove('nav--abierta');
    document.body.classList.remove('nav-abierta');
    boton.setAttribute('aria-expanded', 'false');
    fondo.forEach(function (el) { el.inert = false; });
  }

  if (boton && nav) {
    boton.addEventListener('click', function () {
      if (boton.getAttribute('aria-expanded') === 'true') {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('.nav__link')) {
        cerrarMenu();
      }
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.classList.contains('nav--abierta')) {
        cerrarMenu();
        boton.focus();
      }
    });

    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) {
        cerrarMenu();
      }
    });
  }

  /* ---------- Selector de proyectos ---------- */

  // En el HTML los nombres son anclas comunes y los paneles están todos
  // visibles. Recién acá se convierten en pestañas: así el marcado nunca
  // declara roles que no funcionarían si el JS no carga.
  var lista = document.querySelector('.selector__lista');

  if (lista) {
    var opciones = Array.prototype.slice.call(lista.querySelectorAll('.selector__opcion'));
    var paneles = opciones.map(function (o) {
      return document.querySelector(o.getAttribute('href'));
    });

    lista.setAttribute('role', 'tablist');
    lista.querySelectorAll('li').forEach(function (li) {
      li.setAttribute('role', 'presentation');
    });

    paneles.forEach(function (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '0');
    });

    function activar(indice, mover, guardarEnUrl) {
      opciones.forEach(function (opcion, i) {
        var activa = i === indice;
        opcion.classList.toggle('selector__opcion--activa', activa);
        opcion.setAttribute('role', 'tab');
        opcion.setAttribute('aria-selected', activa ? 'true' : 'false');
        opcion.setAttribute('aria-controls', paneles[i].id);
        // Sólo la pestaña activa queda en el recorrido de tabulación;
        // entre pestañas se navega con las flechas
        opcion.setAttribute('tabindex', activa ? '0' : '-1');
        paneles[i].hidden = !activa;
      });

      // El proyecto elegido queda en la URL para poder compartir el link.
      // replaceState y no pushState: si no, siete clics dejan siete
      // entradas en el historial y el botón Atrás se vuelve inservible.
      if (guardarEnUrl && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + paneles[indice].id);
      }

      if (mover) {
        opciones[indice].focus();
      }
    }

    // Si el link traía un proyecto, se abre ese
    var inicial = paneles.findIndex(function (panel) {
      return '#' + panel.id === window.location.hash;
    });
    activar(inicial === -1 ? 0 : inicial, false, false);

    lista.addEventListener('click', function (evento) {
      var opcion = evento.target.closest('.selector__opcion');
      if (!opcion) return;
      // Ctrl/Cmd/Shift + clic sigue funcionando como link normal
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey) return;
      evento.preventDefault(); // sin el salto de scroll del ancla
      activar(opciones.indexOf(opcion), false, true);
    });

    lista.addEventListener('keydown', function (evento) {
      var actual = opciones.indexOf(document.activeElement);
      if (actual === -1) return;

      var siguiente = null;
      if (evento.key === 'ArrowRight' || evento.key === 'ArrowDown') {
        siguiente = (actual + 1) % opciones.length;
      } else if (evento.key === 'ArrowLeft' || evento.key === 'ArrowUp') {
        siguiente = (actual - 1 + opciones.length) % opciones.length;
      } else if (evento.key === 'Home') {
        siguiente = 0;
      } else if (evento.key === 'End') {
        siguiente = opciones.length - 1;
      }

      if (siguiente !== null) {
        evento.preventDefault();
        activar(siguiente, true, true);
      }
    });
  }

  /* ---------- Sección activa en el nav ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  var secciones = Array.prototype.slice.call(document.querySelectorAll('.bloque[id]'));

  function marcarActiva(id) {
    links.forEach(function (link) {
      var activa = link.getAttribute('href') === '#' + id;
      link.classList.toggle('nav__link--activa', activa);
      if (activa) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && secciones.length) {
    // Una franja fina en el medio del viewport: la sección que la cruza
    // es la activa
    var observadorNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          marcarActiva(entrada.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    secciones.forEach(function (seccion) {
      observadorNav.observe(seccion);
    });
  }

  /* ---------- CTA flotante ---------- */

  var flotante = document.querySelector('.flotante');
  var contacto = document.getElementById('contacto');

  if (flotante && contacto && 'IntersectionObserver' in window) {
    var observadorCta = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        flotante.classList.toggle('flotante--oculto', entrada.isIntersecting);
      });
    }, { threshold: 0.25 });

    observadorCta.observe(contacto);
  }

  /* ---------- Reveal al scrollear ---------- */

  var revelables = Array.prototype.slice.call(document.querySelectorAll('.revelar'));

  if (menosMovimiento || !('IntersectionObserver' in window)) {
    revelables.forEach(function (el) {
      el.classList.add('revelar--visible');
    });
  } else {
    var observadorReveal = new IntersectionObserver(function (entradas, observador) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelar--visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revelables.forEach(function (el) {
      observadorReveal.observe(el);
    });
  }
})();
