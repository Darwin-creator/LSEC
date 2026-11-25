/* ==========================================================================
   MODO OSCURO · LSEC San Agustín
   --------------------------------------------------------------------------
   Archivo independiente: no depende de app.js ni de identidad.js.
   - Se carga en <head> para aplicar el tema guardado antes de pintar la página
     (así no hay "parpadeo" blanco al recargar).
   - Conecta el botón #themeToggle de la barra superior.
   - Recuerda la elección de la persona en este navegador (localStorage).
   - Por defecto el sitio se abre en modo claro, como siempre.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "lsec-theme";
  var root = document.documentElement;
  var COLORS = { light: "#007030", dark: "#0e1511" };

  function getStored() {
    try {
      var v = window.localStorage.getItem(KEY);
      return v === "dark" || v === "light" ? v : null;
    } catch (e) { return null; }
  }
  function setStored(theme) {
    try { window.localStorage.setItem(KEY, theme); } catch (e) { /* modo privado: se ignora */ }
  }
  function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }

  function syncUI() {
    var dark = current() === "dark";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? COLORS.dark : COLORS.light);

    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var icon = btn.querySelector(".theme-toggle-icon");
    var label = btn.querySelector(".theme-toggle-label");
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
    btn.setAttribute("title", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    if (icon) icon.textContent = dark ? "☀" : "☾";
    if (label) label.textContent = dark ? "Modo claro" : "Modo oscuro";
  }

  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    syncUI();
  }

  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    // En teléfono y tablet el cambio es inmediato: animar el color de TODOS los elementos a la vez
    // saturaba el procesador y el botón tardaba segundos en responder. En computadora se mantiene el fundido.
    var fade = !(window.matchMedia && window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches);
    if (fade) root.classList.add("theme-fade");
    apply(next);
    // Guardar la elección y mostrar el aviso se hace DESPUÉS de pintar el cambio, para no retrasarlo.
    var after = function () {
      setStored(next);
      if (typeof window.showToast === "function") {
        window.showToast(next === "dark" ? "Modo oscuro activado" : "Modo claro activado");
      }
    };
    if (window.requestAnimationFrame) window.requestAnimationFrame(function () { window.setTimeout(after, 0); });
    else after();
    if (fade) window.setTimeout(function () { root.classList.remove("theme-fade"); }, 450);
  }

  // 1) Tema guardado: se aplica de inmediato (antes de que la página se dibuje)
  if (getStored() === "dark") root.setAttribute("data-theme", "dark");

  // 2) Botón
  function init() {
    var btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggle);
    syncUI();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // 3) Si se cambia el tema en otra pestaña, esta se actualiza sola
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue === "dark" ? "dark" : "light");
  });
})();
