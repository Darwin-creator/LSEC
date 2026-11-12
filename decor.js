/* ==========================================================================
   DECORACIÓN INSTITUCIONAL · UNIDAD EDUCATIVA SAN AGUSTÍN
   --------------------------------------------------------------------------
   Este archivo es ADICIONAL: no modifica script.js ni ninguna función
   existente. Solo agrega elementos decorativos:
     1) Sección «Palabras de San Agustín» al final del bloque principal de Inicio.
     2) Lema «Dios, Patria y Hogar» en la portada, la barra lateral y el pie.
   Para quitarlo todo, elimina la línea <script src="decor.js"> de index.html.
   ========================================================================== */
(function () {
  "use strict";

  var LEMA = "Dios, Patria y Hogar";
  var SITIO = "https://www.sanagustin.edu.ec/";

  // Frases breves de San Agustín de Hipona (traducciones habituales al español).
  var FRASES = [
    { t: "Nos hiciste, Señor, para ti, y nuestro corazón está inquieto hasta que descanse en ti.", f: "Confesiones, I, 1" },
    { t: "Tarde te amé, hermosura tan antigua y tan nueva.", f: "Confesiones, X, 27" },
    { t: "No salgas de ti, vuelve a ti mismo: en el hombre interior habita la verdad.", f: "Sobre la verdadera religión, 39, 72" },
    { t: "Ama y haz lo que quieras.", f: "Comentario a la primera carta de san Juan, 7, 8" },
    { t: "Canta y camina.", f: "Sermón 256" },
    { t: "Cree para comprender, y comprende para creer.", f: "Sermón 43" }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- 1) Sección de frases (solo en Inicio) ---------- */
  var timer = null, current = 0;

  function show(root, idx) {
    var slides = root.querySelectorAll(".sa-quote");
    var dots = root.querySelectorAll(".sa-quote-dot");
    current = (idx + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      var on = i === current;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === current);
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  function startAuto(root) {
    stopAuto();
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () {
      if (!document.body.contains(root)) { stopAuto(); return; }
      show(root, current + 1);
    }, 9000);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

  function buildQuotes() {
    var sec = document.createElement("section");
    sec.className = "sa-quotes";
    sec.setAttribute("aria-label", "Palabras de San Agustín");
    sec.innerHTML =
      '<div class="sa-quotes-inner">' +
        '<div class="sa-quotes-side">' +
          '<div class="eyebrow">INSPIRACIÓN AGUSTINIANA</div>' +
          '<h2>Palabras de San Agustín</h2>' +
          '<p>Nuestro colegio se inspira en el carisma de San Agustín: buscar la verdad con la mente y el corazón, y vivir la comunidad desde el amor y el respeto.</p>' +
          '<div class="sa-saint"><img src="assets/images/logo-san-agustin.png" alt="">' +
            '<span>' + esc(LEMA) + '<small>UNIDAD EDUCATIVA SAN AGUSTÍN</small></span></div>' +
        '</div>' +
        '<div>' +
          '<div class="sa-quote-stage" aria-live="off">' +
            FRASES.map(function (q, i) {
              return '<figure class="sa-quote' + (i === 0 ? " is-active" : "") + '" style="margin:0" aria-hidden="' + (i === 0 ? "false" : "true") + '">' +
                '<blockquote>“' + esc(q.t) + '”</blockquote>' +
                '<figcaption>San Agustín de Hipona<small>' + esc(q.f) + '</small></figcaption></figure>';
            }).join("") +
          '</div>' +
          '<div class="sa-quote-ctrl">' +
            '<button class="sa-quote-btn" type="button" data-sa-prev aria-label="Frase anterior">‹</button>' +
            '<button class="sa-quote-btn" type="button" data-sa-next aria-label="Frase siguiente">›</button>' +
            '<div class="sa-quote-dots" role="group" aria-label="Elegir frase">' +
              FRASES.map(function (_, i) {
                return '<button class="sa-quote-dot' + (i === 0 ? " is-active" : "") + '" type="button" data-sa-dot="' + i + '" aria-label="Frase ' + (i + 1) + '"></button>';
              }).join("") +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<p class="sa-quotes-note">Frases tomadas de traducciones habituales al español; la redacción exacta puede variar según la edición.</p>';

    sec.addEventListener("click", function (e) {
      var prev = e.target.closest("[data-sa-prev]"), next = e.target.closest("[data-sa-next]"), dot = e.target.closest("[data-sa-dot]");
      if (prev) show(sec, current - 1);
      else if (next) show(sec, current + 1);
      else if (dot) show(sec, Number(dot.getAttribute("data-sa-dot")));
      else return;
      startAuto(sec);
    });
    sec.addEventListener("mouseenter", stopAuto);
    sec.addEventListener("mouseleave", function () { startAuto(sec); });
    sec.addEventListener("focusin", stopAuto);
    sec.addEventListener("focusout", function () { startAuto(sec); });
    return sec;
  }

  function decorateHome(app) {
    var hero = app.querySelector(".hero");
    if (!hero) { stopAuto(); return; }                 // no estamos en Inicio
    if (!app.querySelector(".sa-quotes")) {
      var callout = app.querySelector(".callout");
      var sec = buildQuotes();
      if (callout && callout.parentNode) callout.parentNode.insertBefore(sec, callout.nextSibling);
      else app.appendChild(sec);
      current = 0;
      startAuto(sec);
    }
    var copy = hero.querySelector(".hero-copy");
    if (copy && !copy.querySelector(".sa-hero-motto")) {
      var m = document.createElement("div");
      m.className = "sa-hero-motto";
      m.innerHTML = '<b>✦</b> ' + esc(LEMA) + ' <b>✦</b>';
      copy.appendChild(m);
    }
  }

  /* ---------- 2) Lema en barra lateral y pie ---------- */
  function decorateChrome() {
    var bottom = document.querySelector(".sidebar-bottom");
    if (bottom && !bottom.querySelector(".sa-motto")) {
      var m = document.createElement("div");
      m.className = "sa-motto";
      m.innerHTML = '<i>✦</i> ' + esc(LEMA) + ' <i>✦</i>';
      var foot = bottom.querySelector(".side-foot");
      bottom.insertBefore(m, foot || null);
    }
    var footer = document.querySelector(".footer");
    if (footer && !footer.querySelector(".sa-footer-mid")) {
      var mid = document.createElement("span");
      mid.className = "sa-footer-mid";
      mid.innerHTML = 'Unidad Educativa San Agustín · ' + esc(LEMA) + ' · <a href="' + SITIO + '" target="_blank" rel="noopener">sanagustin.edu.ec ↗</a>';
      footer.insertBefore(mid, footer.children[1] || null);
    }
  }


  /* ---------- 3) Fondo oscuro y cierre del menú en celular/tablet ---------- */
  function setupScrim() {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar || document.querySelector(".sa-scrim")) return;
    var scrim = document.createElement("div");
    scrim.className = "sa-scrim";
    scrim.setAttribute("aria-hidden", "true");
    document.body.appendChild(scrim);
    function sync() { scrim.classList.toggle("show", sidebar.classList.contains("open")); }
    new MutationObserver(sync).observe(sidebar, { attributes: true, attributeFilter: ["class"] });
    scrim.addEventListener("click", function () { sidebar.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar.classList.contains("open")) sidebar.classList.remove("open");
    });
    // Si se agranda la ventana (p. ej. girar la tablet), se cierra el panel abierto.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) sidebar.classList.remove("open");
    });
  }

  /* ---------- Arranque ---------- */
  function init() {
    var app = document.getElementById("app");
    decorateChrome();
    setupScrim();
    if (!app) return;
    decorateHome(app);
    // script.js reemplaza el contenido de #app cada vez que se navega; aquí solo se observa.
    var busy = false;
    new MutationObserver(function () {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () { decorateHome(app); busy = false; });
    }).observe(app, { childList: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
