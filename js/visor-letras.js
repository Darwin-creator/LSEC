/* ==========================================================================
   VISOR AMPLIADO DEL ABECEDARIO
   - Imagen grande, flechas laterales, pantalla completa
   - Teclado: ← → cambian de letra · F pantalla completa · Esc cierra
   - Móvil: deslizar a izquierda/derecha
   - Calidad: si existe assets/images/alfabeto/hd/<letra>.png se usa
     automáticamente en el visor; si no, usa la imagen normal.
   ========================================================== */
const letterImageHD = l => `assets/images/alfabeto/hd/${l.toLowerCase()}.png`;
let letterViewer = null, viewerReturnFocus = null, hdProbe = null;

function hdAvailable(){
  if(!hdProbe) hdProbe = new Promise(resolve => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = letterImageHD("A");
  });
  return hdProbe;
}

const LV_ICON_ENTER = '<svg class="lv-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const LV_ICON_EXIT = '<svg class="lv-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
function fullscreenSupported(el){ return !!(el.requestFullscreen || el.webkitRequestFullscreen); }
function fullscreenElement(){ return document.fullscreenElement || document.webkitFullscreenElement || null; }

function buildLetterViewer(){
  const v = document.createElement("div");
  v.className = "lv";
  v.id = "letterViewer";
  v.hidden = true;
  v.setAttribute("role", "dialog");
  v.setAttribute("aria-modal", "true");
  v.setAttribute("aria-label", "Visor ampliado del abecedario");
  v.innerHTML = `
    <div class="lv-bar">
      <span class="lv-count" aria-live="polite"></span>
      <div class="lv-tools">
        <button class="lv-btn" data-lv="fs" type="button" aria-label="Pantalla completa">${LV_ICON_ENTER} <span>Pantalla completa</span></button>
        <button class="lv-btn lv-close" data-lv="close" type="button" aria-label="Cerrar visor">✕</button>
      </div>
    </div>
    <button class="lv-arrow lv-prev" data-lv="prev" type="button" aria-label="Letra anterior">‹</button>
    <figure class="lv-stage">
      <div class="lv-card"><img class="lv-img" alt="" decoding="async"></div>
      <figcaption class="lv-cap"><span class="lv-letter"></span><span class="lv-name"></span></figcaption>
    </figure>
    <button class="lv-arrow lv-next" data-lv="next" type="button" aria-label="Letra siguiente">›</button>`;
  document.body.appendChild(v);

  v.addEventListener("click", e => {
    const act = e.target.closest("[data-lv]")?.dataset.lv;
    if(act === "close") closeLetterViewer();
    else if(act === "prev") stepLetterViewer(-1);
    else if(act === "next") stepLetterViewer(1);
    else if(act === "fs") toggleViewerFullscreen();
    else if(e.target === v || e.target.classList.contains("lv-stage")) closeLetterViewer();
  });

  let x0 = null;
  v.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
  v.addEventListener("touchend", e => {
    if(x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if(Math.abs(dx) > 50) stepLetterViewer(dx < 0 ? 1 : -1);
  }, {passive:true});

  if(!fullscreenSupported(v)) v.querySelector('[data-lv="fs"]').style.display = "none";
  return v;
}

function renderLetterViewer(){
  const l = selectedLetter, i = alphabet.indexOf(l), v = letterViewer;
  const img = v.querySelector(".lv-img");
  v.querySelector(".lv-count").textContent = `${i + 1} / ${alphabet.length}`;
  v.querySelector(".lv-letter").textContent = `${l} ${l.toLowerCase()}`;
  v.querySelector(".lv-name").textContent = ["CH","LL","RR"].includes(l) ? `Combinación ${l}` : `Letra ${l}`;
  v.querySelector(".lv-prev").disabled = i === 0;
  v.querySelector(".lv-next").disabled = i === alphabet.length - 1;
  img.alt = `Seña de la letra ${l}`;
  img.onerror = null;
  img.src = letterImage[l];
  hdAvailable().then(ok => {
    if(!ok || selectedLetter !== l) return;
    img.onerror = () => { img.onerror = null; img.src = letterImage[l]; };
    img.src = letterImageHD(l);
  });
  // Precarga de vecinas para que el cambio sea instantáneo
  [alphabet[i - 1], alphabet[i + 1]].filter(Boolean).forEach(n => { new Image().src = letterImage[n]; });
}

function openLetterViewer(letter){
  if(letter) selectedLetter = letter;
  if(!letterViewer) letterViewer = buildLetterViewer();
  viewerReturnFocus = document.activeElement;
  letterViewer.hidden = false;
  document.body.style.overflow = "hidden";
  renderLetterViewer();
  letterViewer.querySelector(".lv-close").focus({preventScroll:true});
}

function stepLetterViewer(dir){
  const next = alphabet[alphabet.indexOf(selectedLetter) + dir];
  if(!next) return;
  selectedLetter = next;
  renderLetterViewer();
}

function closeLetterViewer(){
  if(!letterViewer || letterViewer.hidden) return;
  if(fullscreenElement()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  letterViewer.hidden = true;
  document.body.style.overflow = "";
  if(currentPage === "alfabeto") render();       // sincroniza la letra elegida en la cuadrícula
  if(viewerReturnFocus && document.contains(viewerReturnFocus)) viewerReturnFocus.focus({preventScroll:true});
}

function toggleViewerFullscreen(){
  if(!letterViewer) return;
  if(fullscreenElement()){
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }else if(fullscreenSupported(letterViewer)){
    const req = letterViewer.requestFullscreen || letterViewer.webkitRequestFullscreen;
    const p = req.call(letterViewer);
    if(p && p.catch) p.catch(() => showToast("El navegador no permitió la pantalla completa."));
  }else{
    showToast("Este dispositivo ya muestra el visor a pantalla completa.");
  }
}

function syncFullscreenLabel(){
  const b = letterViewer?.querySelector('[data-lv="fs"]');
  if(!b) return;
  const on = !!fullscreenElement();
  b.innerHTML = on ? LV_ICON_EXIT + " <span>Salir de pantalla completa</span>" : LV_ICON_ENTER + " <span>Pantalla completa</span>";
  b.setAttribute("aria-label", on ? "Salir de pantalla completa" : "Pantalla completa");
}
document.addEventListener("fullscreenchange", syncFullscreenLabel);
document.addEventListener("webkitfullscreenchange", syncFullscreenLabel);

document.addEventListener("keydown", e => {
  if(!letterViewer || letterViewer.hidden) return;
  if(e.key === "ArrowLeft"){ e.preventDefault(); stepLetterViewer(-1); }
  else if(e.key === "ArrowRight"){ e.preventDefault(); stepLetterViewer(1); }
  else if(e.key === "Home"){ e.preventDefault(); selectedLetter = alphabet[0]; renderLetterViewer(); }
  else if(e.key === "End"){ e.preventDefault(); selectedLetter = alphabet[alphabet.length - 1]; renderLetterViewer(); }
  else if(e.key === "Escape"){ closeLetterViewer(); }
  else if(e.key === "f" || e.key === "F"){ e.preventDefault(); toggleViewerFullscreen(); }
  else if(e.key === "Tab"){                      // mantiene el foco dentro del visor
    const f = [...letterViewer.querySelectorAll("button:not([disabled])")].filter(b => b.offsetParent !== null);
    if(!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});
