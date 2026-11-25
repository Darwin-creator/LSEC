/* ==========================================================================
   MODO SIN CONEXIÓN · LSEC San Agustín
   --------------------------------------------------------------------------
   Guarda la plataforma en el teléfono para que abra al instante y funcione sin internet.
   · No cambia nada de lo que ves ni de cómo funciona: solo decide de dónde se leen los archivos.
   · Solo trabaja en https:// o localhost (con doble clic sobre index.html no se activa, y no pasa nada).
   · Si cambias algún archivo del proyecto, sube el número de VERSION para que los teléfonos
     descarguen la versión nueva.
   Estrategias:
   · HTML, CSS y JS → primero la red (versión más nueva); si no responde en ~3 s o no hay internet, la guardada.
   · Imágenes, íconos y tipografías → primero lo guardado (instantáneo); las páginas del glosario se guardan al verlas.
   · Videos de YouTube y otros sitios externos → no se tocan.
   ========================================================================== */
const VERSION = "lsec-v2";
const CACHE_CORE = VERSION + "-core";
const CACHE_RUNTIME = VERSION + "-runtime";

const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "css/movil.css",
  "js/tema.js",
  "js/datos.js",
  "js/preguntas-actividades.js",
  "js/app.js",
  "js/visor-letras.js",
  "js/visor-glosario.js",
  "js/identidad.js",
  "assets/images/logo-san-agustin-256.png",
  "assets/images/hero-illustration.svg",
  "assets/images/inclusion-illustration.svg",
  "assets/images/icon-192.png",
  "assets/images/icon-512.png",
  "assets/fondos/adorno-seccion.svg",
  "assets/fondos/ilustracion-actividades.svg",
  "assets/fondos/ilustracion-alfabeto.svg",
  "assets/fondos/ilustracion-cultura.svg",
  "assets/fondos/ilustracion-glosario.svg",
  "assets/fondos/ilustracion-inicio.svg",
  "assets/fondos/ilustracion-proyecto.svg",
  "assets/fondos/ilustracion-teoria.svg",
  "assets/fondos/ilustracion-videoteca.svg",
  "assets/fondos/lateral-oscuro.svg",
  "assets/fondos/lateral.svg",
  "assets/fondos/trama-actividades.svg",
  "assets/fondos/trama-alfabeto.svg",
  "assets/fondos/trama-cultura.svg",
  "assets/fondos/trama-glosario.svg",
  "assets/fondos/trama-inicio.svg",
  "assets/fondos/trama-proyecto.svg",
  "assets/fondos/trama-teoria.svg",
  "assets/fondos/trama-videoteca.svg",
  "assets/images/alfabeto/a.png",
  "assets/images/alfabeto/b.png",
  "assets/images/alfabeto/c.png",
  "assets/images/alfabeto/ch.png",
  "assets/images/alfabeto/d.png",
  "assets/images/alfabeto/e.png",
  "assets/images/alfabeto/f.png",
  "assets/images/alfabeto/g.png",
  "assets/images/alfabeto/h.png",
  "assets/images/alfabeto/i.png",
  "assets/images/alfabeto/j.png",
  "assets/images/alfabeto/k.png",
  "assets/images/alfabeto/l.png",
  "assets/images/alfabeto/ll.png",
  "assets/images/alfabeto/m.png",
  "assets/images/alfabeto/n.png",
  "assets/images/alfabeto/o.png",
  "assets/images/alfabeto/p.png",
  "assets/images/alfabeto/q.png",
  "assets/images/alfabeto/r.png",
  "assets/images/alfabeto/rr.png",
  "assets/images/alfabeto/s.png",
  "assets/images/alfabeto/t.png",
  "assets/images/alfabeto/u.png",
  "assets/images/alfabeto/v.png",
  "assets/images/alfabeto/w.png",
  "assets/images/alfabeto/x.png",
  "assets/images/alfabeto/y.png",
  "assets/images/alfabeto/z.png",
  "assets/images/alfabeto/%C3%B1.png",
  "assets/images/alfabeto/mini/a.png",
  "assets/images/alfabeto/mini/b.png",
  "assets/images/alfabeto/mini/c.png",
  "assets/images/alfabeto/mini/ch.png",
  "assets/images/alfabeto/mini/d.png",
  "assets/images/alfabeto/mini/e.png",
  "assets/images/alfabeto/mini/f.png",
  "assets/images/alfabeto/mini/g.png",
  "assets/images/alfabeto/mini/h.png",
  "assets/images/alfabeto/mini/i.png",
  "assets/images/alfabeto/mini/j.png",
  "assets/images/alfabeto/mini/k.png",
  "assets/images/alfabeto/mini/l.png",
  "assets/images/alfabeto/mini/ll.png",
  "assets/images/alfabeto/mini/m.png",
  "assets/images/alfabeto/mini/n.png",
  "assets/images/alfabeto/mini/o.png",
  "assets/images/alfabeto/mini/p.png",
  "assets/images/alfabeto/mini/q.png",
  "assets/images/alfabeto/mini/r.png",
  "assets/images/alfabeto/mini/rr.png",
  "assets/images/alfabeto/mini/s.png",
  "assets/images/alfabeto/mini/t.png",
  "assets/images/alfabeto/mini/u.png",
  "assets/images/alfabeto/mini/v.png",
  "assets/images/alfabeto/mini/w.png",
  "assets/images/alfabeto/mini/x.png",
  "assets/images/alfabeto/mini/y.png",
  "assets/images/alfabeto/mini/z.png",
  "assets/images/alfabeto/mini/%C3%B1.png",
  "assets/documentos/paginas/t01.webp",
  "assets/documentos/paginas/t02.webp",
  "assets/documentos/paginas/t03.webp",
  "assets/documentos/paginas/t04.webp",
  "assets/documentos/paginas/t05.webp",
  "assets/documentos/paginas/t06.webp",
  "assets/documentos/paginas/t07.webp",
  "assets/documentos/paginas/t08.webp",
  "assets/documentos/paginas/t09.webp",
  "assets/documentos/paginas/t10.webp",
  "assets/documentos/paginas/t11.webp",
  "assets/documentos/paginas/t12.webp",
  "assets/documentos/paginas/t13.webp",
  "assets/documentos/paginas/t14.webp",
  "assets/documentos/paginas/t15.webp",
  "assets/documentos/paginas/t16.webp",
  "assets/documentos/paginas/t17.webp",
  "assets/documentos/paginas/t18.webp",
  "assets/documentos/paginas/t19.webp",
  "assets/documentos/paginas/t20.webp",
  "assets/documentos/paginas/t21.webp",
  "assets/documentos/paginas/t22.webp",
  "assets/documentos/paginas/t23.webp",
  "assets/documentos/paginas/t24.webp",
  "assets/documentos/paginas/t25.webp",
  "assets/documentos/paginas/t26.webp",
  "assets/documentos/paginas/t27.webp",
  "assets/documentos/paginas/t28.webp",
  "assets/documentos/paginas/t29.webp",
  "assets/documentos/paginas/t30.webp",
  "assets/documentos/paginas/t31.webp",
  "assets/documentos/paginas/t32.webp",
  "assets/documentos/paginas/t33.webp",
  "assets/documentos/paginas/t34.webp",
  "assets/documentos/paginas/t35.webp",
  "assets/documentos/paginas/t36.webp",
  "assets/documentos/paginas/t37.webp",
  "assets/documentos/paginas/t38.webp",
  "assets/documentos/paginas/t39.webp",
  "assets/documentos/paginas/t40.webp",
  "assets/documentos/paginas/t41.webp",
  "assets/documentos/paginas/t42.webp",
  "assets/documentos/paginas/t43.webp",
  "assets/documentos/paginas/t44.webp",
  "assets/documentos/paginas/t45.webp",
  "assets/documentos/paginas/t46.webp",
  "assets/documentos/paginas/t47.webp",
  "assets/documentos/paginas/t48.webp",
  "assets/documentos/paginas/t49.webp",
  "assets/documentos/paginas/t50.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_CORE);
    // Uno por uno: si algún archivo fallara, los demás se guardan igual y la instalación no se cae.
    await Promise.all(PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

function networkFirst(request, timeoutMs) {
  return new Promise((resolve) => {
    let settled = false;
    const fromCache = async () => (await caches.match(request, { ignoreSearch: true })) ||
      (request.mode === "navigate" ? (await caches.match("index.html")) || (await caches.match("./")) : undefined);
    const timer = setTimeout(async () => {
      const hit = await fromCache();
      if (hit && !settled) { settled = true; resolve(hit); }
    }, timeoutMs);
    fetch(request).then(async (res) => {
      clearTimeout(timer);
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_CORE).then((c) => c.put(request, copy)).catch(() => {});
      }
      if (!settled) { settled = true; resolve(res); }
    }).catch(async () => {
      clearTimeout(timer);
      const hit = await fromCache();
      if (!settled) { settled = true; resolve(hit || Response.error()); }
    });
  });
}

async function cacheFirst(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === "opaque")) {
      const copy = res.clone();
      caches.open(CACHE_RUNTIME).then((c) => c.put(request, copy)).catch(() => {});
    }
    return res;
  } catch (e) {
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return;   // YouTube, miniaturas externas, etc.
  if (req.headers.has("range")) return;                            // videos/archivos por partes

  if (!sameOrigin) { event.respondWith(cacheFirst(req)); return; }

  if (req.mode === "navigate" || /\.(html|css|js|webmanifest)$/i.test(url.pathname) || url.pathname.endsWith("/")) {
    event.respondWith(networkFirst(req, 3000));
    return;
  }
  event.respondWith(cacheFirst(req));
});
