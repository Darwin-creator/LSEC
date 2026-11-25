/* ==========================================================================
   VISOR DEL GLOSARIO · LSEC San Agustín
   --------------------------------------------------------------------------
   Muestra el PDF original (50 páginas) como imágenes, organizado por
   secciones. Funciona igual en PC, tablet y celular (no depende del visor
   de PDF del navegador).

   · Las páginas se numeran como en el PDF: 1 a 50.
   · Cada sección abre solo sus páginas, con botón «Siguiente sección» al
     terminar y botón «Menú principal» para salir.
   · Pantalla completa (PC y celular) y zoom.
   · Debajo siempre queda la vista previa de todo el documento.

   Imágenes: assets/documentos/paginas/pNN.webp (grande) y tNN.webp (miniatura)
   ========================================================================== */
(function () {
  "use strict";

  var BASE = "assets/documentos/paginas/";
  var PDF = "https://www.vicepresidencia.gob.ec/wp-content/uploads/downloads/2013/04/Compilacion-Final-Interactivo.pdf";
  var TOTAL = 50;
  var ZOOMS = [1, 1.5, 2, 2.5, 3];

  // Páginas = número de página del PDF (1–50).
  var SECTIONS = [
    { id: "indice",    icon: "☰", title: "Índice general",           from: 5,  to: 5,  desc: "Contenido del documento y página de cada apartado." },
    { id: "intro",     icon: "✎", title: "Introducción",             from: 6,  to: 6,  desc: "Presentación del glosario y su propósito." },
    { id: "lectura",   icon: "◎", title: "Lectura de ilustraciones", from: 7,  to: 9,  desc: "Cómo leer las ilustraciones y los símbolos de movimiento." },
    { id: "cuerpo",    icon: "✋", title: "Referencias corporales",   from: 10, to: 11, desc: "Manos, cuerpo, rostro y orientación del movimiento." },
    { id: "alfabeto",  icon: "A", title: "Alfabeto dactilográfico",  from: 12, to: 12, desc: "El abecedario manual: a–z, ch, ll, rr." },
    { id: "glosario",  icon: "▧", title: "Glosario alfabético",      from: 13, to: 40, desc: "Vocabulario organizado por letras, de la A a la V." },
    { id: "expresiones", icon: "❝", title: "Expresiones",            from: 41, to: 41, desc: "Expresiones de uso frecuente." },
    { id: "dias",      icon: "▦", title: "Días y meses",             from: 42, to: 44, desc: "Días de la semana y meses del año (Sierra y Costa)." },
    { id: "numeros",   icon: "№", title: "Números naturales",        from: 44, to: 44, desc: "Los números en LSEC (comparte página con los últimos meses)." },
    { id: "indicealfa", icon: "⌕", title: "Índice alfabético",       from: 45, to: 47, desc: "Para ubicar una palabra y su página.",
      note: "Los números «pág.» de este índice son los del libro impreso. Para hallar la página en este visor: divide entre 2 (hacia abajo) y suma 1. Ejemplo: pág. 72 → página 37." }
  ];
  var FULL = { id: "todo", icon: "▤", title: "Documento completo", from: 1, to: TOTAL, desc: "" };

  var MAXZ = 4;
  var ICON_ENTER = '<svg class="glo-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  var ICON_EXIT = '<svg class="glo-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';

  // zoom = nivel de los botones (0 = ajustado) · z = factor real (1 a MAXZ), también lo mueve el gesto de pellizco
  var state = { sec: null, page: 0, zoom: 0, z: 1, pseudo: false };
  var el = {};

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function big(n) { return BASE + "p" + pad(n) + ".webp"; }
  function thumb(n) { return BASE + "t" + pad(n) + ".webp"; }
  function range(s) { return s.from === s.to ? "Página " + s.from : "Páginas " + s.from + "–" + s.to; }
  function count(s) { var c = s.to - s.from + 1; return c + (c === 1 ? " página" : " páginas"); }
  function secIndex(s) { return SECTIONS.indexOf(s); }
  function fsEl() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function $(sel, root) { return (root || document).querySelector(sel); }

  /* ---------- Construcción ---------- */
  function html() {
    var cards = SECTIONS.map(function (s) {
      return '<button type="button" class="feature-card glo-card" data-glo="open" data-sec="' + s.id + '">' +
        '<div class="feature-icon" aria-hidden="true">' + s.icon + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.desc + '</p>' +
        '<span class="glo-card-meta">' + range(s) + (s.to > s.from ? " · " + count(s) : "") + '</span>' +
        '<span class="glo-card-go">Abrir sección →</span></button>';
    }).join("");

    var thumbs = "";
    for (var n = 1; n <= TOTAL; n++) {
      thumbs += '<button type="button" class="glo-thumb" data-glo="page" data-gpage="' + n + '" aria-label="Ver la página ' + n + ' de ' + TOTAL + '">' +
        '<img src="' + thumb(n) + '" alt="" loading="lazy" decoding="async"><span>' + n + '</span></button>';
    }

    return '' +
      '<section class="panel glo-panel" id="gloPanel">' +
        '<div id="gloMenu">' +
          '<div class="section-head" style="margin-top:0"><div><h2>Secciones del documento</h2>' +
          '<p>Elige una sección: se abrirá aquí mismo y solo verás sus páginas, con el número de página del PDF (1 a ' + TOTAL + ').</p></div></div>' +
          '<div class="feature-grid glo-grid">' + cards + '</div>' +
          '<p class="glo-hint">Abajo puedes ver una vista previa de todo el documento. Toca cualquier página para abrirla.</p>' +
        '</div>' +
        '<div id="gloReader" class="glo-reader" hidden role="region" aria-label="Lector del glosario">' +
          '<div class="glo-bar">' +
            '<button type="button" class="btn btn-light glo-menu-btn" data-glo="menu">← <span>Menú principal</span></button>' +
            '<div class="glo-title"><strong id="gloTitle"></strong><span id="gloCount"></span></div>' +
            '<div class="glo-tools">' +
              '<button type="button" class="glo-tool" data-glo="zoomout" aria-label="Alejar" title="Alejar">−</button>' +
              '<span class="glo-zoom" id="gloZoom">100%</span>' +
              '<button type="button" class="glo-tool" data-glo="zoomin" aria-label="Acercar" title="Acercar">+</button>' +
              '<button type="button" class="glo-tool glo-fs" data-glo="fs" id="gloFs" aria-label="Pantalla completa" title="Pantalla completa (F)">' + ICON_ENTER + ' <span>Pantalla completa</span></button>' +
            '</div>' +
          '</div>' +
          '<div class="glo-stage">' +
            '<button type="button" class="glo-arrow glo-arrow-prev" data-glo="prev" aria-label="Página anterior">‹</button>' +
            '<div class="glo-scroll" id="gloScroll"><img id="gloImg" alt="" draggable="false" decoding="async"></div>' +
            '<button type="button" class="glo-arrow glo-arrow-next" data-glo="next" aria-label="Página siguiente">›</button>' +
          '</div>' +
          '<div class="glo-strip" id="gloStrip" aria-label="Páginas de esta sección"></div>' +
          '<p class="glo-note" id="gloNote" hidden></p>' +
          '<div class="glo-foot">' +
            '<button type="button" class="btn btn-light" data-glo="prev" id="gloPrev">← Anterior</button>' +
            '<span class="glo-foot-info" id="gloFoot"></span>' +
            '<button type="button" class="btn btn-primary" data-glo="next" id="gloNext">Siguiente →</button>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="panel glo-preview" style="margin-top:22px">' +
        '<div class="section-head" style="margin-top:0"><div><h2>Vista previa de todo el documento</h2>' +
        '<p>Las <strong>' + TOTAL + ' páginas</strong> del PDF original. Las de la sección abierta aparecen resaltadas.</p></div>' +
        '<a class="text-link" href="' + PDF + '" target="_blank" rel="noopener">Abrir documento original ↗</a></div>' +
        '<div class="glo-thumbs" id="gloThumbs">' + thumbs + '</div>' +
      '</section>';
  }

  function mount() {
    var root = document.getElementById("gloRoot");
    if (!root) return;
    root.innerHTML = html();
    el = {
      menu: $("#gloMenu", root), reader: $("#gloReader", root), title: $("#gloTitle", root),
      count: $("#gloCount", root), img: $("#gloImg", root), scroll: $("#gloScroll", root),
      strip: $("#gloStrip", root), note: $("#gloNote", root), foot: $("#gloFoot", root),
      prev: $("#gloPrev", root), next: $("#gloNext", root), zoom: $("#gloZoom", root),
      fs: $("#gloFs", root), thumbs: $("#gloThumbs", root), stage: $(".glo-stage", root),
      arrowPrev: $(".glo-arrow-prev", root), arrowNext: $(".glo-arrow-next", root)
    };
    state.pseudo = false;
    document.body.classList.remove("glo-lock");
    if (state.sec) paint(); else paintThumbs();
    bindSwipe();
    bindPinch();
    state.autohide = false;
    syncAutoHide();
  }

  /* ---------- Vista previa que se oculta (cuando hay zoom del navegador) ---------- */
  // Con zoom en el navegador el visor queda más alto que la ventana y la tira de
  // miniaturas estorba. En ese caso (y solo con mouse) la tira pasa a ser una capa
  // dentro del visor: queda oculta abajo y sube cuando el puntero baja.
  var hoverCapable = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : { matches: true };

  function browserZoom() {
    var ratio = window.outerWidth && window.innerWidth ? window.outerWidth / window.innerWidth : 1;
    return ratio > 0 ? ratio : 1;
  }

  function wantsAutoHide() {
    var h = window.innerHeight, dpr = window.devicePixelRatio || 1;
    // Zoom del navegador (≈125 % o más), o ventana baja por zoom: la tira se oculta sola.
    return !!hoverCapable.matches && (browserZoom() >= 1.25 || (dpr >= 1.45 && h < 900) || h <= 800);
  }

  function syncAutoHide() {
    if (!el.reader || !el.stage || !el.strip) return;
    var on = wantsAutoHide();
    if (on === !!state.autohide) return;
    state.autohide = on;
    el.reader.classList.toggle("glo-autohide", on);
    if (on) el.stage.appendChild(el.strip);
    else el.reader.insertBefore(el.strip, el.note);
    showStrip(false);
  }

  // Deja libres las barras de desplazamiento (abajo y a la derecha) para que la persona
  // pueda seguir moviendo la página con zoom aunque la tira esté visible.
  function syncScrollGap() {
    if (!el.stage || !el.scroll) return;
    var sbh = Math.max(0, el.scroll.offsetHeight - el.scroll.clientHeight);
    var sbw = Math.max(0, el.scroll.offsetWidth - el.scroll.clientWidth);
    el.stage.style.setProperty("--glo-sbh", sbh + "px");
    el.stage.style.setProperty("--glo-sbw", sbw + "px");
  }

  function showStrip(on) {
    if (!el.reader) return;
    el.reader.classList.toggle("glo-strip-show", !!on && !!state.autohide);
  }

  function onPointerMove(e) {
    if (!state.autohide || !state.sec || !el.reader || el.reader.hidden) return;
    var r = el.stage.getBoundingClientRect();
    var zone = Math.max(96, (el.strip.offsetHeight || 0) + 24);
    // «Abajo» = la franja inferior del visor o cualquier punto por debajo de él (botones Anterior/Siguiente).
    var inside = e.clientX >= r.left && e.clientX <= r.right;
    var low = e.clientY >= r.bottom - zone && (inside || e.clientY > r.bottom);
    var inBand = e.clientY >= r.top && e.clientY <= r.bottom + 90;
    if (low && inBand) syncScrollGap();
    showStrip(low && inBand);
  }

  document.addEventListener("mousemove", onPointerMove, { passive: true });
  document.addEventListener("mouseleave", function () { showStrip(false); });
  window.addEventListener("resize", syncAutoHide);

  /* ---------- Pintado ---------- */
  function paintThumbs() {
    var s = state.sec;
    var items = el.thumbs ? el.thumbs.children : [];
    for (var i = 0; i < items.length; i++) {
      var n = i + 1;
      items[i].classList.toggle("in-sec", !!s && s !== FULL && n >= s.from && n <= s.to);
      items[i].classList.toggle("is-current", !!s && n === state.page);
    }
  }

  function paint() {
    var s = state.sec;
    el.menu.hidden = true;
    el.reader.hidden = false;
    el.title.textContent = s.title;
    el.count.textContent = "Página " + state.page + " de " + TOTAL + " del documento";
    preload(state.page);   // pide la página ya (y la deja guardada) antes de asignarla al visor
    el.img.src = big(state.page);
    el.img.alt = s.title + ", página " + state.page + " de " + TOTAL + " del PDF";
    applyZoom();

    var total = s.to - s.from + 1, pos = state.page - s.from + 1;
    var isFirst = state.page === s.from, isLast = state.page === s.to;
    el.foot.textContent = total > 1 ? "Página " + pos + " de " + total + " de esta sección" : "Esta sección tiene 1 página";
    var prevSec = prevSection();
    var backSection = isFirst && !!prevSec;
    el.prev.disabled = isFirst && !prevSec; el.arrowPrev.disabled = isFirst && !prevSec;
    var prevLbl = backSection ? "Sección anterior: " + prevSec.title : "Anterior";
    el.prev.innerHTML = '<span class="glo-arr" aria-hidden="true">←</span><span class="glo-lbl"> ' + prevLbl + '</span>';
    el.prev.title = prevLbl;
    el.prev.classList.toggle("is-section", backSection);
    el.arrowPrev.setAttribute("aria-label", backSection ? "Sección anterior" : "Página anterior");

    var nextSec = nextSection();
    var label;
    if (!isLast) label = "Siguiente";
    else if (nextSec) label = "Siguiente sección: " + nextSec.title;
    else label = "Terminar y volver al menú";
    var nextArr = (isLast && !nextSec) ? "✓" : "→";
    el.next.innerHTML = '<span class="glo-lbl">' + label + ' </span><span class="glo-arr" aria-hidden="true">' + nextArr + '</span>';
    el.next.title = label;
    el.next.classList.toggle("is-section", isLast);
    el.arrowNext.disabled = false;
    el.arrowNext.setAttribute("aria-label", isLast ? (nextSec ? "Siguiente sección" : "Volver al menú") : "Página siguiente");

    // Tira de miniaturas (solo si la sección tiene más de una página)
    el.strip.hidden = total <= 1;
    el.reader.classList.toggle("glo-no-strip", total <= 1);
    if (total > 1) {
      // La tira solo se vuelve a construir si cambió la sección; si no, solo se mueve la marca «active».
      var key = s.id + ":" + s.from + "-" + s.to;
      if (el.strip.getAttribute("data-built") !== key) {
        var h = "";
        for (var n = s.from; n <= s.to; n++) {
          h += '<button type="button" class="glo-strip-item' + (n === state.page ? " active" : "") + '" data-glo="page" data-gpage="' + n + '" aria-label="Página ' + n + '">' +
            '<img src="' + thumb(n) + '" alt="" loading="lazy" decoding="async"><span>' + n + '</span></button>';
        }
        var prevLeft = el.strip.scrollLeft;
        el.strip.innerHTML = h;
        el.strip.scrollLeft = prevLeft;
        el.strip.setAttribute("data-built", key);
      } else {
        var cur = el.strip.querySelector(".active");
        if (cur && Number(cur.dataset.gpage) !== state.page) cur.classList.remove("active");
        var nxt = el.strip.querySelector('[data-gpage="' + state.page + '"]');
        if (nxt) nxt.classList.add("active");
      }
      var act = el.strip.querySelector(".active");
      if (act && el.strip.scrollTo) {
        el.strip.scrollTo({ left: act.offsetLeft - el.strip.clientWidth / 2 + act.clientWidth / 2, behavior: "smooth" });
      }
    }
    el.note.hidden = !s.note;
    el.note.textContent = s.note || "";

    paintThumbs();
    preloadNeighbours(state.page);
  }

  // Páginas precargadas, guardadas en memoria (solo las cercanas, para no gastar la memoria del celular).
  // Al pasar páginas con clics rápidos la imagen ya está lista y se ve al instante.
  var cache = {}, cacheOrder = [], CACHE_MAX = 7;
  function preload(n) {
    if (n < 1 || n > TOTAL || cache[n]) return;
    var i = new Image();
    i.src = big(n);
    cache[n] = i; cacheOrder.push(n);
    if (cacheOrder.length > CACHE_MAX) {
      // Se descartan las más lejanas a la página que se está viendo
      cacheOrder.sort(function (a, b) { return Math.abs(a - n) - Math.abs(b - n); });
      delete cache[cacheOrder.pop()];
    }
  }

  // La página actual se pide primero (también queda guardada, así su descarga no se cancela si cambias
  // de página rápido). Las vecinas se precargan DESPUÉS de que la actual termine de cargar, o
  // cuando dejas de hacer clic un momento: no compiten por la conexión ni se decodifican a la vez.
  var preloadTimer = 0;
  function preloadNeighbours(page) {
    preload(page);
    clearTimeout(preloadTimer);
    var run = function () {
      if (state.sec && state.page === page) { preload(page + 1); preload(page - 1); preload(page + 2); }
    };
    if (el.img.complete) run();
    else {
      el.img.addEventListener("load", run, { once: true });
      el.img.addEventListener("error", run, { once: true });
      preloadTimer = setTimeout(run, 160);
    }
  }

  function nextSection() {
    var i = secIndex(state.sec);
    return i >= 0 && i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null;
  }

  function prevSection() {
    var i = secIndex(state.sec);
    return i > 0 ? SECTIONS[i - 1] : null;
  }

  // El zoom se calcula sobre el tamaño «ajustado» de la página: 100% = página completa
  // visible; cada paso agranda de forma proporcional y visible.
  function fitWidth() {
    var nw = el.img.naturalWidth, nh = el.img.naturalHeight;
    if (!nw || !nh) return 0;
    return Math.min(el.scroll.clientWidth, el.scroll.clientHeight * nw / nh);
  }

  // focal = {fx, fy, cx, cy}: punto de la imagen (en proporción) que debe quedar bajo los dedos.
  function applyZoom(keep, focal) {
    var z = state.z, sc = el.scroll, rx = 0.5, ry = 0.5, cx = sc.clientWidth / 2, cy = sc.clientHeight / 2;
    if (focal) { rx = focal.fx; ry = focal.fy; cx = focal.cx; cy = focal.cy; }
    else if (keep && sc.scrollWidth > 0) {
      rx = (sc.scrollLeft + sc.clientWidth / 2) / sc.scrollWidth;
      ry = (sc.scrollTop + sc.clientHeight / 2) / sc.scrollHeight;
    }
    el.reader.classList.toggle("is-zoomed", z > 1);
    var f = z > 1 ? fitWidth() : 0;
    el.img.style.width = f ? Math.round(f * z) + "px" : "";
    el.zoom.textContent = Math.round(z * 100) + "%";
    if ((keep || focal) && z > 1) {
      sc.scrollLeft = rx * sc.scrollWidth - cx;
      sc.scrollTop = ry * sc.scrollHeight - cy;
    } else { sc.scrollLeft = 0; sc.scrollTop = 0; }
    syncScrollGap();
  }

  function resetZoom() { state.zoom = 0; state.z = 1; }

  /* ---------- Acciones ---------- */
  function openSection(s, page) {
    state.sec = s; state.page = page || s.from; resetZoom();
    paint();
    if (!fsEl() && !state.pseudo) {
      el.reader.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function backToMenu() {
    exitFull();
    state.sec = null;
    el.reader.hidden = true;
    el.menu.hidden = false;
    paintThumbs();
    var p = document.getElementById("gloPanel");
    if (p) p.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function step(dir) {
    var s = state.sec; if (!s) return;
    if (dir < 0) {
      if (state.page > s.from) { state.page--; resetZoom(); paint(); }
      else {
        var ps = prevSection();
        if (ps) { state.sec = ps; state.page = ps.from; resetZoom(); paint(); toast("Sección: " + ps.title); }
      }
    } else {
      if (state.page < s.to) { state.page++; resetZoom(); paint(); }
      else {
        var ns = nextSection();
        if (ns) { state.sec = ns; state.page = ns.from; resetZoom(); paint(); toast("Sección: " + ns.title); }
        else backToMenu();
      }
    }
  }

  function goPage(n) {
    var s = state.sec;
    if (s && n >= s.from && n <= s.to) { state.page = n; resetZoom(); paint(); return; }
    var found = null;
    for (var i = 0; i < SECTIONS.length; i++) if (n >= SECTIONS[i].from && n <= SECTIONS[i].to) { found = SECTIONS[i]; break; }
    openSection(found || FULL, n);
  }

  // Botones + y −: saltan al siguiente nivel (100, 150, 200, 250, 300 %) a partir del zoom actual.
  function zoom(d) {
    var cur = state.z, target = cur, i;
    if (d > 0) { for (i = 0; i < ZOOMS.length; i++) if (ZOOMS[i] > cur + 0.01) { target = ZOOMS[i]; break; } }
    else { for (i = ZOOMS.length - 1; i >= 0; i--) if (ZOOMS[i] < cur - 0.01) { target = ZOOMS[i]; break; } }
    if (Math.abs(target - cur) < 0.01) return;
    state.z = target; state.zoom = Math.max(0, ZOOMS.indexOf(target));
    applyZoom(true);
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* ---------- Pantalla completa (nativa con respaldo para iPhone/iPad) ---------- */
  function isFull() { return state.pseudo || (fsEl() === el.reader); }

  // Pantalla completa nativa (oculta también las barras del navegador). Si el navegador no la permite, cae al modo alterno.
  function enterFull() {
    var r = el.reader, req = r.requestFullscreen || r.webkitRequestFullscreen;
    if (req) {
      try {
        var p = req.call(r);
        if (p && p.catch) p.catch(function () { setPseudo(true); });
        return;
      } catch (e) { /* cae al modo alterno */ }
    }
    setPseudo(true);
  }

  function setPseudo(on) {
    state.pseudo = on;
    el.reader.classList.toggle("glo-pseudo", on);
    document.body.classList.toggle("glo-lock", on);
    syncFull();
  }

  function exitFull() {
    if (!el.reader) return;
    if (fsEl()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
    if (state.pseudo) setPseudo(false);
    syncFull();
  }

  function toggleFull() { if (isFull()) exitFull(); else enterFull(); }

  function syncFull() {
    if (!el.reader) return;
    var on = isFull();
    el.reader.classList.toggle("is-full", on);
    syncAutoHide();
    el.fs.innerHTML = on ? ICON_EXIT + " <span>Salir de pantalla completa</span>" : ICON_ENTER + " <span>Pantalla completa</span>";
    el.fs.setAttribute("aria-label", on ? "Salir de pantalla completa" : "Pantalla completa");
    el.fs.title = on ? "Salir de pantalla completa (Esc)" : "Pantalla completa (F)";
    if (!on) document.body.classList.remove("glo-lock");
    setTimeout(function () { if (state.sec && state.z > 1) applyZoom(true); }, 80);
    if (on && !syncFull._told && window.innerWidth < 760 && window.innerHeight > window.innerWidth) {
      syncFull._told = true; toast("Gira tu celular para ver la página más grande");
    }
  }

  window.addEventListener("resize", function () { if (el.reader && state.sec && state.z > 1) applyZoom(true); });
  document.addEventListener("fullscreenchange", syncFull);
  document.addEventListener("webkitfullscreenchange", syncFull);

  /* ---------- Zoom con los dedos (pellizcar para acercar o alejar) ---------- */
  function bindPinch() {
    var sc = el.scroll, p = null;
    function dist(t) { var dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
    function start(e) {
      if (e.touches.length !== 2) return;
      var r = sc.getBoundingClientRect(), t = e.touches;
      var cx = (t[0].clientX + t[1].clientX) / 2 - r.left, cy = (t[0].clientY + t[1].clientY) / 2 - r.top;
      p = { d0: dist(t) || 1, z0: state.z };
      if (!el.img.naturalWidth) { p = null; return; }
      e.preventDefault();
    }
    function move(e) {
      if (!p || e.touches.length !== 2) return;
      e.preventDefault();
      var r = sc.getBoundingClientRect(), t = e.touches;
      var cx = (t[0].clientX + t[1].clientX) / 2 - r.left, cy = (t[0].clientY + t[1].clientY) / 2 - r.top;
      var nz = Math.max(1, Math.min(MAXZ, p.z0 * dist(t) / p.d0));
      if (Math.abs(nz - state.z) < 0.005) return;
      var fx = sc.scrollWidth > 0 ? (sc.scrollLeft + cx) / sc.scrollWidth : 0.5;
      var fy = sc.scrollHeight > 0 ? (sc.scrollTop + cy) / sc.scrollHeight : 0.5;
      state.z = nz;
      state.zoom = 0; for (var i = 0; i < ZOOMS.length; i++) if (ZOOMS[i] <= nz + 0.01) state.zoom = i;
      applyZoom(true, { fx: fx, fy: fy, cx: cx, cy: cy });
    }
    function end(e) {
      if (!p) return;
      if (e.touches.length < 2) {
        p = null;
        if (state.z < 1.05) { resetZoom(); applyZoom(false); }
      }
    }
    sc.addEventListener("touchstart", start, { passive: false });
    sc.addEventListener("touchmove", move, { passive: false });
    sc.addEventListener("touchend", end, { passive: true });
    sc.addEventListener("touchcancel", end, { passive: true });
    // Safari de iPhone/iPad: evita que el pellizco amplíe toda la página
    ["gesturestart", "gesturechange"].forEach(function (n) { sc.addEventListener(n, function (e) { e.preventDefault(); }); });
  }

  /* ---------- Gestos táctiles: deslizar para cambiar de página ---------- */
  function bindSwipe() {
    var x0 = null, y0 = null, t0 = 0;
    el.scroll.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || state.z > 1) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    }, { passive: true });
    el.scroll.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Date.now() - t0 < 700 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    }, { passive: true });
    el.img.addEventListener("dblclick", function () { if (state.z > 1) resetZoom(); else { state.zoom = 2; state.z = ZOOMS[2]; } applyZoom(true); });
    el.img.addEventListener("load", function () { if (state.z > 1) applyZoom(true); });
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-glo]");
    if (!b || !document.getElementById("gloRoot")) return;
    var a = b.dataset.glo;
    if (a === "open") { var s = SECTIONS.filter(function (x) { return x.id === b.dataset.sec; })[0]; if (s) openSection(s); }
    else if (a === "menu") backToMenu();
    else if (a === "prev") step(-1);
    else if (a === "next") step(1);
    else if (a === "page") goPage(Number(b.dataset.gpage));
    else if (a === "zoomin") zoom(1);
    else if (a === "zoomout") zoom(-1);
    else if (a === "fs") toggleFull();
  });

  document.addEventListener("keydown", function (e) {
    if (!state.sec || !el.reader || el.reader.hidden || !document.body.contains(el.reader)) return;
    var lv = document.querySelector(".letter-viewer:not([hidden])");
    if (lv || e.target.closest("input,textarea,select") || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); step(-1); }
    else if (e.key === "+" || e.key === "=") { zoom(1); }
    else if (e.key === "-") { zoom(-1); }
    else if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFull(); }
    else if (e.key === "Escape" && state.pseudo) { setPseudo(false); }
  });

  window.LSECGlosario = { html: html, mount: mount };
})();
