/* ==========================================================================
   APP · LSEC San Agustín
   --------------------------------------------------------------------------
   Lógica principal: navegación entre secciones, plantillas de cada página,
   ventanas de lectura (módulos), cuestionario, buscador y modo clase.
   Depende de datos.js (contenido). El visor ampliado del abecedario está en
   visor-letras.js y el visor del glosario en visor-glosario.js.
   ========================================================================== */

/* ---------- Estado de la aplicación ---------- */
const app = document.getElementById("app");
let currentPage = "inicio", selectedLetter = "A";

/* ---------- Precarga de las imágenes del abecedario ----------
   Las 30 imágenes se guardan en memoria (son ligeras, ~500 KB en total). Así, al cambiar de
   letra con clics rápidos, la imagen ya está lista y se muestra al instante en lugar de
   quedarse la anterior hasta que dejas de hacer clic. */
const letterImageCache = new Map();
function warmLetterImages() {
  alphabet.forEach((l) => {
    const url = letterImage[l];
    if (!letterImageCache.has(url)) {
      const im = new Image();
      im.src = url;
      letterImageCache.set(url, im);
    }
  });
}
function warmLetterImagesWhenIdle() {
  const run = () => warmLetterImages();
  if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 1500 });
  else setTimeout(run, 400);
}

/* ---------- Navegación y plantillas de página ---------- */
function go(page) {
  if (page === "actividades" && currentPage !== "actividades" && typeof activitiesState !== "undefined") activitiesState.view = "menu";
  currentPage = page;
  document.querySelectorAll(".nav-link").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  document.getElementById("pageCrumb").textContent = { inicio: "Inicio", alfabeto: "Abecedario", videoteca: "Videoteca", teoria: "Aprende LSEC", actividades: "Actividades", cultura: "Cultura e inclusión", proyecto: "El proyecto", glosario: "Glosario LSEC" }[page];
  document.getElementById("sidebar").classList.remove("open");
  if (page === "alfabeto") warmLetterImages();
  render();
  /* En teléfono y tablet el salto arriba es inmediato (el CSS tiene scroll suave y tardaba casi un segundo). */
  const instant = window.matchMedia("(max-width:1024px), (pointer:coarse)").matches;
  window.scrollTo({ top: 0, behavior: instant ? "instant" : "auto" });
}

function pageIntro(kicker, title, desc, tag = "") {
  return `<div class="page-intro"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p class="lead">${desc}</p></div>${tag ? `<span class="pill">${tag}</span>` : ""}</div>`;
}

function home() {
  return `
<section class="hero"><div class="hero-copy"><div class="eyebrow">UNA ESCUELA MÁS INCLUSIVA</div><h1>Aprendemos<br>con las <span>manos.</span></h1><p class="lead">Un espacio para descubrir la Lengua de Señas Ecuatoriana, acercarnos a su cultura y construir una comunicación más inclusiva en nuestra comunidad educativa.</p><div class="button-row"><button class="btn btn-primary" data-go="alfabeto">Explorar el abecedario <b>→</b></button><button class="btn btn-light" data-go="teoria">Comenzar a aprender</button></div></div><div class="hero-art"><img src="assets/images/hero-illustration.svg" alt="Ilustración de dos estudiantes comunicándose con gestos amistosos"></div></section>
<div class="stats-row"><div class="stat-card"><strong>7</strong><span>Secciones para aprender y practicar</span></div><div class="stat-card"><strong>100%</strong><span>Enfoque educativo e inclusivo</span></div><div class="stat-card"><strong>LSEC</strong><span>Contenido centrado en Ecuador</span></div></div>
<div class="section-head"><div><h2>Explora la plataforma</h2><p>Encuentra una forma divertida de acercarte a la LSEC.</p></div></div>
<div class="feature-grid">
 ${feature("A", "Abecedario", "Conoce el alfabeto manual y consulta recursos audiovisuales.", "alfabeto")}
 ${feature("▷", "Videoteca", "Observa tutoriales de LSEC recopilados en recursos educativos.", "videoteca")}
 ${feature("▤", "Aprende LSEC", "Descubre qué es la lengua, sus elementos y su uso.", "teoria")}
 ${feature("✳", "Actividades", "Comprueba lo aprendido con preguntas y retos breves.", "actividades")}
 ${feature("♡", "Cultura e inclusión", "Conoce la importancia de la comunidad y la accesibilidad.", "cultura")}
 ${feature("ⓘ", "El proyecto", "Conoce el propósito educativo de LSEC San Agustín.", "proyecto")}
</div>
<div class="callout"><div><h3>La inclusión empieza con la comunicación.</h3><p>Aprender una lengua también es acercarse a las personas y a su cultura.</p></div><button class="btn" data-go="cultura">Descubrir más →</button></div>
<div class="section-head"><div><h2>Recursos ecuatorianos</h2><p>Material externo para consultar señas y ampliar el aprendizaje.</p></div></div>
<div class="resource-list">${resource("Videos tutoriales de LSEC", "Abecedario, saludos, familia, colores, números y más.", WIKINCLUSION)}</div>`;
}

function feature(icon, title, desc, page) {
  return `<article class="feature-card" data-go="${page}"><div class="feature-icon">${icon}</div><h3>${title}</h3><p>${desc}</p></article>`;
}

function resource(title, desc, url) {
  return `<div class="resource"><div><strong>${title}</strong><small>${desc}</small></div><a href="${url}" target="_blank" rel="noopener">Abrir recurso ↗</a></div>`;
}

function alphabetPage() {
  return `${pageIntro("PRIMEROS PASOS", "El abecedario", "Selecciona cualquier ficha para ver el recorte de la lámina que compartiste. También puedes avanzar y retroceder entre letras.", "30 fichas visuales")}
<div class="alphabet-layout"><section class="panel"><div class="section-head" style="margin-top:0"><div><h3>Explora las letras</h3><p>Pulsa una tarjeta para ver la imagen ampliada.</p></div></div><div class="letter-grid">${alphabet.map((l) => `<button class="letter-btn letter-tile ${selectedLetter === l ? "selected" : ""}" data-letter="${l}" aria-label="Ver letra ${l}"><img src="assets/images/alfabeto/mini/${l.toLowerCase()}.png" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${letterImage[l]}'"><span>${l.toLowerCase()}</span></button>`).join("")}</div></section>
<section class="panel letter-detail"><span class="pill">FICHA DE LA LETRA</span><div class="big-letter">${selectedLetter.toLowerCase()}</div><h3>${["CH", "LL", "RR"].includes(selectedLetter) ? "Combinación " + selectedLetter : "Letra " + selectedLetter}</h3><div class="sign-image-wrap" data-letter-zoom title="Pulsa para ampliar"><img class="sign-image" src="${letterImage[selectedLetter]}" alt="Imagen de la seña ${selectedLetter} tomada de la lámina proporcionada" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><div class="visual-placeholder" style="display:none">No se encontró la imagen: ${letterImage[selectedLetter]}</div><span class="zoom-badge" aria-hidden="true">⤢</span></div><p class="lead" style="font-size:11px;max-width:280px">Observa la posición de la mano y las flechas de movimiento que aparecen en la lámina.</p><button class="btn btn-primary zoom-btn" data-letter-zoom><svg class="lv-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg> Ampliar y pantalla completa</button><div class="letter-controls"><button class="btn btn-light" data-letter-prev ${selectedLetter === alphabet[0] ? "disabled" : ""}>← Anterior</button><button class="btn btn-light" data-letter-next ${selectedLetter === alphabet[alphabet.length - 1] ? "disabled" : ""}>Siguiente →</button></div><div class="button-row" style="justify-content:center"><a class="btn btn-primary" href="${OFFICIAL_DICT}" target="_blank" rel="noopener">Consultar diccionario LSEC ↗</a><button class="btn btn-light" data-go="videoteca">Ver videos</button></div></section></div>`;
}

function extraVideoCard(v, i) {
  const videoId = extraVideoPreviewIds[i];
  return `<article class="video-card extra-video-card" data-video-card data-video-text="${v.join(" ").toLowerCase()}"><div class="video-frame video-preview" data-video-preview="${videoId}"><img data-video-id="${videoId}" data-thumb-step="1" src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="Vista previa de ${v[0]}" loading="lazy" decoding="async" onerror="videoThumbError(this)"><button class="video-play" type="button" data-play-video="${videoId}" data-video-title="${v[0]}">▶ <span>Reproducir video</span></button><div class="preview-fallback">Vista previa no disponible. Puedes abrir la colección ecuatoriana.</div></div><div class="video-info"><h3>${v[0]}</h3><p>${v[2]}</p><a href="${v[3]}" target="_blank" rel="noopener">Abrir recurso ecuatoriano ↗</a></div></article>`;
}

function videoPage() {
  const totalResources = videos.length + extraVideoResources.length;
  return `${pageIntro("APRENDE OBSERVANDO", "Videoteca LSEC", "Selecciona un tutorial y observa la configuración de las manos, el movimiento y la expresión. Los videos se cargan desde YouTube.", `${totalResources} recursos enlazados`)}
<div class="video-tools"><input class="search-input" id="videoSearch" type="search" placeholder="Buscar tutorial por tema..." aria-label="Buscar tutorial por tema"><a class="btn btn-light" href="${WIKINCLUSION}" target="_blank" rel="noopener">Abrir colección completa ↗</a></div>
<div class="video-grid" id="videoGrid">${videos.map((v, i) => videoCard(v, i)).join("")}${extraVideoResources.map((v, i) => extraVideoCard(v, i)).join("")}</div>
<div class="notice">Los primeros elementos son videos individuales ya existentes. Los nuevos elementos son accesos a colecciones y diccionarios audiovisuales, no videos individuales inventados. Si un reproductor está bloqueado, usa el enlace alternativo. Comprueba cada seña con docentes o miembros de la comunidad sorda ecuatoriana.</div>`;
}

function videoThumbError(img) {
  const id = img.dataset.videoId || img.closest("[data-video-preview]")?.dataset.videoPreview;
  const step = Number(img.dataset.thumbStep || 0);
  const candidates = [`https://i.ytimg.com/vi/${id}/hqdefault.jpg`, `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, `https://i.ytimg.com/vi/${id}/default.jpg`];
  if (step < candidates.length) {
    img.dataset.thumbStep = String(step + 1);
    img.src = candidates[step];
    return;
  }
  const frame = img.closest(".video-frame");
  if (frame) {
    frame.classList.add("preview-unavailable");
    img.remove();
  }
}

function videoCard(v, i) {
  return `<article class="video-card" data-video-card data-video-text="${v.join(" ").toLowerCase()}"><div class="video-frame video-preview" data-video-preview="${v[1]}"><img data-video-id="${v[1]}" data-thumb-step="1" src="https://i.ytimg.com/vi/${v[1]}/hqdefault.jpg" alt="Vista previa: ${v[0]}" loading="lazy" decoding="async" onerror="videoThumbError(this)"><button class="video-play" type="button" data-play-video="${v[1]}" data-video-title="${v[0]}">▶ <span>Reproducir video</span></button><div class="preview-fallback">Vista previa no disponible. Puedes abrir el video en YouTube.</div></div><div class="video-info"><h3>${v[0]}</h3><p>${v[2]}</p><a href="https://www.youtube.com/watch?v=${v[1]}" target="_blank" rel="noopener">Abrir video en YouTube ↗</a></div></article>`;
}

function theoryPage() {
  const all = getTheoryModules();
  return `${pageIntro("CONOCIMIENTO Y RESPETO", "Aprende sobre LSEC", "Conservamos los módulos iniciales y añadimos historia documentada, educación, gramática, ortografía, dactilología, cultura y recursos. Abre cada tema para leerlo completo.", `${all.length} módulos`)}
<div class="theory-grid">${all.map((t, i) => `<button class="theory-card theory-button" data-theory="${i}"><span class="num">${t[0]} / APRENDE</span><h3>${t[1]}</h3><p>${t[2]}</p><span class="theory-more">Leer módulo completo →</span></button>`).join("")}</div>
<div class="section-head"><div><h2>Línea histórica resumida</h2><p>Hitos documentados en publicaciones y fuentes ecuatorianas.</p></div></div>
<div class="timeline">
 <article><strong>1940</strong><p>Enriqueta Santillán inicia en Quito actividades educativas con niñas y niños sordos. Esta experiencia es uno de los antecedentes de la educación para personas sordas en Ecuador.</p></article>
 <article><strong>1952</strong><p>Se funda por iniciativa privada el Instituto Mariana de Jesús, que atendía a niños con discapacidad visual y auditiva. Su comunidad educativa también fue un espacio importante para el contacto entre estudiantes sordos.</p></article>
 <article><strong>1962</strong><p>Se funda en Quito el Instituto Nacional de Audición y Lenguaje (INAL), a partir de aulas que funcionaban en el Colegio Espejo. Con el tiempo, esta institución se convirtió en un referente de la educación de personas sordas.</p></article>
 <article><strong>1966</strong><p>Jóvenes sordos comienzan a reunirse en Quito para organizar actividades deportivas. Estos encuentros favorecieron la relación, la participación y la organización de la comunidad sorda.</p></article>
 <article><strong>1975</strong><p>Se crea en Quito la Sociedad de Sordos Adultos Fray Luis Ponce de León, que fortaleció la organización colectiva y la participación de las personas sordas.</p></article>
 <article><strong>1976</strong><p>Se forma en Guayaquil una sociedad de personas sordas similar a la de Quito. Este antecedente muestra que la organización comunitaria también se extendía a otras ciudades del país.</p></article>
 <article><strong>1982</strong><p>Comienza el proyecto Mano a Mano en la Sociedad Ponce de León. Su objetivo fue estudiar y recopilar vocabulario de la lengua de señas utilizada por la comunidad local.</p></article>
 <article><strong>1984</strong><p>Se crea la Asociación de Sordos del Guayas, ampliando la organización de la comunidad sorda y su representación en la región Costa.</p></article>
 <article><strong>1986</strong><p>El Atlas Sordo sitúa en este año la fundación de FENASEC. La historia institucional de la federación también describe que durante esos años se fueron conformando asociaciones necesarias para organizar una representación nacional.</p></article>
 <article><strong>1988</strong><p>Se publica en formato de libro una compilación de señas ecuatorianas derivada del proyecto Mano a Mano. La guía reunió ilustraciones y explicaciones en español para documentar vocabulario utilizado en el país.</p></article>
 <article><strong>1989</strong><p>Se funda la Asociación de Sordos de Chimborazo. Según la historia institucional de FENASEC, esta fue la quinta asociación que permitió avanzar en el proceso de organización de una federación nacional.</p></article>
 <article><strong>1992</strong><p>FENASEC alcanza el reconocimiento oficial que venía gestionando. Este paso fortaleció la representación nacional y la defensa de los derechos de las personas sordas en Ecuador.</p></article>
 <article><strong>2012</strong><p>Se publica el Diccionario Oficial de Lengua de Señas Ecuatoriana en dos tomos, con 4.363 entradas según el Atlas Sordo. La obra reunió vocabulario documentado y recursos complementarios para apoyar la consulta y el aprendizaje.</p></article>
 <article><strong>2014</strong><p>Se presenta el diccionario web de LSEC Gabriel Román, con miles de entradas y videos explicativos. El formato digital amplió las posibilidades de consultar vocabulario desde distintos lugares.</p></article>
 <article><strong>Actualidad</strong><p>La comunidad sorda, sus asociaciones, FENASEC y distintas instituciones continúan promoviendo la difusión, el aprendizaje y el reconocimiento de la LSEC. Los recursos impresos y digitales ayudan a acercar la lengua a más personas.</p></article>
</div>
<div class="resource-list">${resource("FENASEC · Historia de la federación", "Antecedentes, asociaciones y dirigentes del movimiento sordo ecuatoriano.", "https://fenasec-ecu.wixsite.com/fenasec/historia")}${resource("Atlas Sordo · Ecuador", "Historia educativa, publicaciones y cronología de la comunidad sorda.", "https://www.cultura-sorda.org/ecuador-atlas-sordo/")}${resource("CONADIS · Diccionario Gabriel Román", "Diccionario web con gráficos y videos explicativos.", OFFICIAL_DICT)}</div>
<div class="notice notice-history">Nota histórica: esta línea reúne hitos educativos, comunitarios y de documentación de la LSEC; no representa una fecha única de nacimiento de la lengua. Algunas fuentes presentan diferencias en la cronología institucional: el Atlas Sordo sitúa la fundación de FENASEC en 1986, mientras que la historia publicada por la propia federación describe el proceso de creación de asociaciones y señala que el reconocimiento oficial llegó en 1992. La LSEC es una lengua desarrollada por sus usuarios y comunidades a lo largo del tiempo, no creada por una sola persona.</div>`;
}


/* ---------- ACTIVIDADES: juegos independientes y retos ---------- */

const challengeBank = [
 {title:"Mitos y realidades",desc:"Reconoce ideas equivocadas sobre las lenguas de señas.",questions:[
 ["Las lenguas de señas son iguales en todos los países.",["Verdadero","Falso"],1,"Las lenguas de señas varían entre países y comunidades."],
 ["La LSEC es una lengua natural con recursos lingüísticos propios.",["Verdadero","Falso"],0,"La LSEC tiene estructura lingüística propia y no es español representado con las manos."],
 ["Todas las personas sordas prefieren comunicarse de la misma manera.",["Verdadero","Falso"],1,"Las preferencias de comunicación son individuales; es importante preguntar."],
 ["La expresión facial puede aportar información lingüística.",["Verdadero","Falso"],0,"Los componentes no manuales pueden cumplir funciones lingüísticas."],
 ["Aprender algunas señas básicas convierte automáticamente a alguien en intérprete.",["Verdadero","Falso"],1,"La interpretación requiere preparación y competencia específicas."]
 ]},
 {title:"Situaciones cotidianas",desc:"Elige respuestas respetuosas en interacciones diarias.",questions:[
 ["En un trabajo grupal participa una compañera sorda. ¿Qué haces primero?",["La excluyes para avanzar rápido","Le preguntas cómo prefiere comunicarse y acuerdas apoyos","Gritas para que entienda"],1,"Preguntar y acordar apoyos respeta su autonomía y facilita la participación."],
 ["No comprendes una seña. ¿Qué respuesta es adecuada?",["Fingir que entendiste","Cambiar de tema","Pedir respetuosamente que la repita o explique"],2,"Pedir aclaración evita malentendidos y mantiene una comunicación honesta."],
 ["Quieres iniciar una conversación con una persona sorda. ¿Qué conviene hacer?",["Llamar su atención de manera respetuosa y preguntarle cómo comunicarse","Tocar sus objetos personales","Hablar con otra persona sobre ella"],0,"Lo adecuado es dirigirse a la persona y respetar sus preferencias."],
 ["En una reunión varias personas hablan a la vez. ¿Qué ayuda?",["Hablar más rápido","Organizar turnos y mantener visibilidad entre participantes","Apagar las luces"],1,"Los turnos claros y la visibilidad facilitan seguir la conversación."],
 ["Si no sabes una seña, ¿qué haces?",["Inventar una seña","Preguntar o consultar un recurso confiable de LSEC","Afirmar que todas las señas son iguales"],1,"Consultar a personas competentes y recursos confiables evita difundir errores."]
 ]},
 {title:"Comunicación respetuosa",desc:"Practica actitudes que favorecen una comunicación accesible.",questions:[
 ["¿A quién debes dirigir tu mensaje cuando participa un intérprete?",["Únicamente al intérprete","A la persona con quien conversas","A cualquier persona menos al interlocutor"],1,"El intérprete facilita la comunicación; el mensaje se dirige a la persona interlocutora."],
 ["Gritar siempre ayuda a que una persona sorda comprenda mejor.",["Verdadero","Falso"],1,"Gritar no garantiza comprensión; pregunta qué forma de comunicación prefiere."],
 ["¿Qué actitud favorece la comunicación visual?",["Tapar las manos","Mirar el teléfono mientras la persona se comunica","Mantener atención visual y respetar el ritmo"],2,"La atención visual y el respeto al ritmo ayudan a mantener el intercambio."],
 ["Todas las personas sordas leen los labios con la misma facilidad.",["Verdadero","Falso"],1,"La lectura labial no es igual para todas las personas y no debe darse por supuesta."],
 ["¿Qué debes hacer si no conoces la preferencia comunicativa de alguien?",["Suponerla","Preguntarle con respeto","Decidir por esa persona"],1,"Preguntar evita imponer una forma de comunicación."]
 ]},
 {title:"Accesibilidad en el aula",desc:"Identifica barreras y apoyos para aprender en igualdad.",questions:[
 ["Las instrucciones de clase se entregan solo oralmente. ¿Qué apoyo puede ayudar?",["Agenda visual e instrucciones escritas","Eliminar las instrucciones","Pedir que alguien adivine"],0,"Los apoyos visuales complementan la información y facilitan el acceso."],
 ["La accesibilidad comunicacional significa…",["Que todos reciban solo información oral","Que la información esté disponible en formatos accesibles","Que no se realicen ajustes"],1,"La accesibilidad reduce barreras mediante formatos y apoyos adecuados."],
 ["La inclusión consiste solamente en estar presente en el aula.",["Verdadero","Falso"],1,"La inclusión requiere participación real y eliminación de barreras."],
 ["¿Quién debe participar al decidir ajustes de accesibilidad?",["Solo quien organiza","Las personas involucradas, consultando sus preferencias","Nadie"],1,"Las soluciones deben construirse con las personas involucradas."],
 ["¿Cuál es un ejemplo de apoyo visual?",["Un esquema claro junto con la explicación","Hablar de espaldas","Retirar materiales"],0,"Los esquemas y las instrucciones visuales complementan la explicación."]
 ]},
 {title:"Cultura y comunidad sorda",desc:"Comprende la importancia de la comunidad y su participación.",questions:[
 ["Las lenguas de señas forman parte de la diversidad lingüística y cultural.",["Verdadero","Falso"],0,"Las lenguas de señas son lenguas naturales y expresan experiencias culturales."],
 ["¿Cómo se desarrollan las lenguas naturales?",["Por una sola persona que las inventa","En comunidades a lo largo del tiempo","Mediante una traducción automática"],1,"Las lenguas se desarrollan y transforman mediante el uso comunitario."],
 ["¿Qué puede hacer una asociación de personas sordas?",["Impulsar participación y defensa de derechos","Decidir cómo debe comunicarse cada persona","Sustituir todas las instituciones educativas"],0,"Las organizaciones pueden representar intereses y fortalecer la vida comunitaria."],
 ["¿Qué significa respetar la identidad sorda?",["Tratarla como una enfermedad","Reconocer experiencias, lengua y cultura de cada persona","Suponer que todas las personas tienen la misma experiencia"],1,"La identidad y las experiencias son diversas y deben reconocerse sin estereotipos."],
 ["¿Qué actitud es adecuada al aprender sobre la comunidad sorda?",["Escuchar a personas sordas y consultar fuentes confiables","Difundir estereotipos","Hablar en nombre de toda la comunidad"],0,"Aprender directamente de la comunidad evita generalizaciones."]
 ]},
 {title:"Historia de la LSEC",desc:"Repasa cómo investigar la historia de la lengua y su comunidad.",questions:[
 ["Es correcto atribuir la creación de la LSEC a una sola persona.",["Verdadero","Falso"],1,"La LSEC se desarrolla en la interacción de personas sordas y sus comunidades."],
 ["¿Qué conviene hacer cuando distintas fuentes registran fechas diferentes?",["Elegir una sin revisar","Comparar las fuentes y explicar las diferencias","Eliminar todas las referencias"],1,"La investigación responsable contrasta documentos y reconoce discrepancias."],
 ["¿Qué organización está vinculada al movimiento asociativo de personas sordas en Ecuador?",["FENASEC","Una academia extranjera de idiomas","Una editorial comercial"],0,"FENASEC es la Federación Nacional de Personas Sordas del Ecuador."],
 ["Al presentar la historia de una persona referente, es importante…",["Verificar datos y reconocer los procesos colectivos","Atribuirle todos los avances","Compartir rumores"],0,"Las biografías deben basarse en información comprobable y contexto."],
 ["¿Por qué son importantes los testimonios de personas sordas?",["Porque aportan experiencias y perspectivas de la comunidad","Porque reemplazan cualquier otra fuente","Porque todos los testimonios son idénticos"],0,"Los testimonios aportan perspectivas valiosas y deben considerarse junto con otras fuentes."]
 ]},
 {title:"Vocabulario y aprendizaje",desc:"Reconoce cómo aprender vocabulario de manera responsable.",questions:[
 ["¿Para qué sirve principalmente el alfabeto dactilológico?",["Para deletrear letras, por ejemplo nombres propios","Para reemplazar todas las señas","Para traducir automáticamente frases"],0,"El alfabeto manual representa letras; no sustituye el vocabulario ni la gramática."],
 ["¿Qué fuente conviene consultar para aprender vocabulario de LSEC?",["Cualquier lista sin autor","Un recurso ecuatoriano confiable y revisado por personas competentes","Una traducción automática"],1,"Conviene usar recursos contextualizados y contrastados."],
 ["¿Una imagen de una seña siempre permite conocer todo su significado?",["Verdadero","Falso"],1,"Una imagen aislada puede no mostrar movimiento, contexto ni componentes no manuales."],
 ["¿Qué puede complementar una imagen al aprender una seña?",["Video o explicación contextual revisada","Una suposición","Una traducción sin comprobar"],0,"El video y el contexto pueden mostrar movimiento y otros rasgos importantes."],
 ["¿Qué haces si una imagen del material no tiene identificación segura?",["Inventar la respuesta","Excluirla hasta verificarla","Usarla con cualquier etiqueta"],1,"Es mejor no enseñar una correspondencia dudosa."]
 ]},
 {title:"Participación e igualdad",desc:"Distingue igualdad, apoyos y participación efectiva.",questions:[
 ["La igualdad de oportunidades puede requerir apoyos diferentes.",["Verdadero","Falso"],0,"Los apoyos pertinentes ayudan a que cada persona participe en condiciones equitativas."],
 ["¿Qué significa participación real?",["Estar presente sin intervenir","Poder acceder, aportar y tomar parte en la actividad","Recibir información incompleta"],1,"La participación implica acceso y oportunidades de contribuir."],
 ["¿Qué debe hacerse ante una barrera de comunicación?",["Ignorarla","Consultar a las personas involucradas y proponer ajustes","Responsabilizar a quien encuentra la barrera"],1,"La solución debe abordar la barrera y considerar las preferencias de las personas."],
 ["¿Cuál es una práctica inclusiva en una exposición?",["Compartir materiales accesibles con anticipación","Ocultar el contenido hasta el final","Hablar de espaldas"],0,"Compartir materiales y mantener condiciones visuales adecuadas favorece el acceso."],
 ["La accesibilidad es un favor y no tiene relación con los derechos.",["Verdadero","Falso"],1,"La accesibilidad se relaciona con la igualdad, la participación y los derechos."]
 ]},
 {title:"Trabajo en equipo",desc:"Toma decisiones colaborativas para que todos participen.",questions:[
 ["Al planificar una actividad accesible, ¿qué es mejor?",["Decidir sin consultar","Consultar a quienes participarán y acordar apoyos","Suponer las necesidades"],1,"La consulta permite diseñar apoyos útiles y respetuosos."],
 ["En una conversación grupal, ¿qué ayuda a seguir los turnos?",["Un moderador y turnos visibles","Varias personas hablando al mismo tiempo","Dar la espalda al grupo"],0,"Los turnos organizados ayudan a que todos sigan el intercambio."],
 ["¿Qué haces si un material no es accesible para un compañero?",["Lo ignoras","Preguntas qué formato ayudaría y buscas una alternativa","Le dices que no participe"],1,"Consultar a la persona permite identificar una alternativa adecuada."],
 ["¿Qué debe hacer un equipo si no conoce una seña?",["Inventar y presentarla como correcta","Consultar un recurso confiable o a una persona competente","Evitar toda comunicación"],1,"La verificación evita enseñar información incorrecta."],
 ["La inclusión es responsabilidad de una sola persona.",["Verdadero","Falso"],1,"La accesibilidad y la inclusión requieren colaboración y compromiso colectivo."]
 ]},
 {title:"Respeto y convivencia",desc:"Identifica conductas respetuosas y evita estereotipos.",questions:[
 ["¿Es correcto burlarse de la forma de comunicación de alguien?",["Sí","No"],1,"Las burlas desvalorizan a la persona y crean barreras para participar."],
 ["¿Qué es mejor que asumir lo que necesita una persona?",["Preguntarle con respeto","Decidir por ella","Ignorarla"],0,"Preguntar reconoce su autonomía y evita generalizaciones."],
 ["Todas las personas sordas comparten las mismas experiencias.",["Verdadero","Falso"],1,"Las experiencias, identidades y preferencias son diversas."],
 ["¿Cómo puedes apoyar una convivencia respetuosa?",["Escuchar, consultar y respetar las preferencias","Imponer una forma de comunicación","Hacer suposiciones"],0,"El respeto se demuestra en acciones concretas y escucha."],
 ["¿Qué hacer si cometes un error al comunicarte?",["Negarlo","Reconocerlo, disculparte si corresponde y buscar aclaración","Culpar a la otra persona"],1,"Reconocer el error permite reparar y continuar con respeto."]
 ]}
];

// Conserva una referencia del banco original antes de integrar las preguntas de los antiguos retos.
const originalActivityQuestionBank = activityQuestionBank.slice();

// Integra las preguntas de los antiguos retos en los dos bancos generales.
// Se conserva el texto, las opciones y la explicación originales; solo se adapta el formato.
(function mergeFormerChallengesIntoActivityBanks() {
  const seen = new Set(activityQuestionBank.map(q => q.q.trim().toLocaleLowerCase()));
  challengeBank.forEach(challenge => {
    challenge.questions.forEach(([question, originalOptions, correctIndex, explanation]) => {
      const key = question.trim().toLocaleLowerCase();
      if (seen.has(key)) return;
      const normalized = originalOptions.map(value => String(value).trim().toLocaleLowerCase());
      const isBinary = normalized.length === 2 && (
        (normalized.includes("verdadero") && normalized.includes("falso")) ||
        (normalized.includes("sí") && normalized.includes("no"))
      );
      if (isBinary) {
        const correctValue = normalized[correctIndex];
        const correct = (correctValue === "verdadero" || correctValue === "sí") ? 0 : 1;
        activityQuestionBank.push({ category: challenge.title, type: "Verdadero o falso", q: question, a: ["Verdadero", "Falso"], correct, why: explanation });
      } else {
        activityQuestionBank.push({ category: challenge.title, type: "Opción múltiple", q: question, a: [...originalOptions], correct: correctIndex, why: explanation });
      }
      seen.add(key);
    });
  });
})();

// Bancos exclusivos de las actividades: 30 preguntas originales por modalidad + las adicionales (100 en total).
// Se conservan las preguntas originales y se seleccionan preguntas de los antiguos retos
// de forma repartida entre sus categorías para completar las 30 de opción múltiple.
const activitiesQuestionBanks = (() => {
  const vf = activityQuestionBank.filter(q => q.type === "Verdadero o falso").slice(0, 30);
  const baseMc = originalActivityQuestionBank.filter(q => q.type === "Opción múltiple");
  const challengeGroups = challengeBank.map(challenge =>
    activityQuestionBank.filter(q =>
      q.type === "Opción múltiple" && q.category === challenge.title &&
      !originalActivityQuestionBank.some(original => original.q === q.q)
    )
  );
  const selectedChallengeMc = [];
  for (let round = 0; selectedChallengeMc.length < 16; round++) {
    let added = false;
    for (const group of challengeGroups) {
      if (group[round] && selectedChallengeMc.length < 16) {
        selectedChallengeMc.push(group[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  const baseBanks = {
    vf,
    mc: [...baseMc, ...selectedChallengeMc].slice(0, 30)
  };

  // Preguntas adicionales (js/preguntas-actividades.js): se suman a las 30 originales
  // de cada modalidad para llegar a 100. Si ese archivo no cargara, todo sigue con las 30.
  const extra = (typeof extraActivityQuestions !== "undefined" && extraActivityQuestions) || { vf: [], mc: [] };
  const merge = (base, more) => {
    const seenText = new Set(base.map(item => item.q.trim().toLocaleLowerCase()));
    const out = [...base];
    more.forEach(item => {
      const key = item.q.trim().toLocaleLowerCase();
      if (!seenText.has(key)) { seenText.add(key); out.push(item); }
    });
    return out;
  };
  return {
    vf: merge(baseBanks.vf, extra.vf),
    mc: merge(baseBanks.mc, extra.mc)
  };
})();

const ACTIVITY_ROUND_SIZE = 10;

/* Iconos SVG de las actividades (trazo uniforme, heredan el color con currentColor). */
const ACTIVITY_ICONS = {
  vf: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="m16.5 24.5 5.5 5.5 10-11.5"/></svg>',
  mc: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="9" width="8" height="8" rx="2.5"/><rect x="7" y="31" width="8" height="8" rx="2.5"/><path d="m8.7 13.2 1.8 1.8 2.9-3.4M21 13h20M21 35h20M21 24h13"/><circle cx="11" cy="24" r="4"/></svg>',
  guess: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 26V12.5a2.5 2.5 0 0 1 5 0V24m0-12.5v-2a2.5 2.5 0 0 1 5 0V24m0-12a2.5 2.5 0 0 1 5 0V26m0-8.5a2.5 2.5 0 0 1 5 0V30c0 8.3-6 13-13 13-5 0-8.2-2.4-11-6.4l-6.2-9.2a2.6 2.6 0 0 1 4-3.2L17 29"/></svg>'
};

const ACTIVITY_TONES = { vf: "green", mc: "red", guess: "gold" };

let activitiesState = { view: "menu", mode: "", questions: [], index: 0, score: 0, answered: false, lastPicked: {} };

function activityShuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* Elige `count` elementos al azar. Da prioridad a los que NO salieron en la partida anterior,
   para que al volver a jugar casi siempre aparezcan preguntas nuevas. */
function pickRandom(pool, count, previous = []) {
  const fresh = activityShuffle(pool.filter(item => !previous.includes(item)));
  const seen = activityShuffle(pool.filter(item => previous.includes(item)));
  return [...fresh, ...seen].slice(0, count);
}

function beginActivity(mode) {
  const previous = activitiesState.lastPicked[mode] || [];
  let questions = [];

  if (mode === "vf" || mode === "mc") {
    const picked = pickRandom(activitiesQuestionBanks[mode], ACTIVITY_ROUND_SIZE, previous);
    activitiesState.lastPicked[mode] = picked;
    questions = picked.map(q => ({
      q: q.q,
      why: q.why,
      options: activityShuffle(q.a.map((text, i) => ({ text, correct: i === q.correct })))
    }));
  } else if (mode === "guess") {
    const picked = pickRandom(alphabet, ACTIVITY_ROUND_SIZE, previous);
    activitiesState.lastPicked[mode] = picked;
    questions = picked.map(letter => {
      const distractors = activityShuffle(alphabet.filter(x => x !== letter)).slice(0, 3);
      return {
        q: "¿Qué letra representa esta imagen?",
        image: letterImage[letter],
        alt: `Seña de la letra ${letter}`,
        why: `La imagen corresponde a la letra ${letter} del abecedario manual.`,
        options: activityShuffle([letter, ...distractors]).map(text => ({ text, correct: text === letter }))
      };
    });
  }

  activitiesState = { ...activitiesState, view: "play", mode, questions, index: 0, score: 0, answered: false };
  render();
  window.scrollTo({ top: 0 });
}

function activityResults(title, total, score, backAction) {
  const percent = Math.round(score / total * 100);
  return `${pageIntro("RESULTADOS", title, "Has completado esta actividad. Revisa tu resultado y sigue aprendiendo.", "Actividad completada")}
    <section class="activity-box activity-results"><div class="activity-result-score">${score}<span> / ${total}</span></div>
    <h2>${percent >= 80 ? "¡Excelente trabajo!" : percent >= 60 ? "¡Vas avanzando!" : "¡Sigue practicando!"}</h2>
    <p>Respuestas correctas: <strong>${score}</strong> · Incorrectas: <strong>${total - score}</strong> · Aciertos: <strong>${percent}%</strong></p>
    <div class="progress"><span style="width:100%"></span></div>
    <div class="button-row"><button class="btn btn-primary" data-activity-replay="${backAction}">Volver a jugar</button><button class="btn btn-light" data-activity-menu>Volver a Actividades</button></div></section>`;
}

function activityCard({ mode, tone, kicker, title, text }) {
  return `<article class="activity-hub-card" data-tone="${tone}">
      <span class="activity-hub-icon" aria-hidden="true">${ACTIVITY_ICONS[mode]}</span>
      <span class="activity-kicker">${kicker}</span>
      <h2>${title}</h2>
      <p>${text}</p>
      <button class="btn btn-primary" data-activity-start="${mode}">Comenzar →</button>
    </article>`;
}

function activityMenu() {
  const cards = [
    { mode: "vf", tone: "green", kicker: "100 PREGUNTAS · 10 POR PARTIDA", title: "Verdadero o falso", text: "Practica con preguntas sobre LSEC, cultura sorda, comunicación, convivencia y accesibilidad." },
    { mode: "mc", tone: "red", kicker: "100 PREGUNTAS · 10 POR PARTIDA", title: "Opción múltiple", text: "Responde preguntas con opciones que cambian de posición en cada partida." },
    { mode: "guess", tone: "gold", kicker: "10 IMÁGENES ALEATORIAS", title: "Adivina la seña", text: "Observa diez imágenes del abecedario manual y elige entre cuatro respuestas mezcladas." }
  ];
  return `${pageIntro("PRACTICA LO APRENDIDO", "Actividades", "Elige una actividad y aprende mientras practicas. Cada partida presenta diez preguntas aleatorias y respuestas mezcladas.", "3 actividades")}
  <div class="activity-hub-grid">${cards.map(activityCard).join("")}</div>`;
}

function activityQuestionView(question, index, total, mode, score, answered) {
  const image = question.image ? `<div class="activity-sign-image"><img src="${question.image}" alt="${question.alt}" decoding="async"></div>` : "";
  return `${pageIntro(mode === "guess" ? "OBSERVA Y ELIGE" : "PON A PRUEBA LO APRENDIDO", mode === "vf" ? "Verdadero o falso" : mode === "mc" ? "Opción múltiple" : "Adivina la seña", "Selecciona una respuesta. Recibirás una explicación al instante.", `${index + 1} de ${total}`)}
  <section class="activity-box activity-game-box">
    <div class="activity-game-head"><span class="activity-mode-icon" data-tone="${ACTIVITY_TONES[mode]}" aria-hidden="true">${ACTIVITY_ICONS[mode]}</span><div class="question-count">PREGUNTA ${index + 1} DE ${total} · PUNTAJE ${score}</div></div>
    <div class="progress"><span style="width:${index / total * 100}%"></span></div>
    ${image}<div class="question-text">${question.q}</div>
    <div class="answer-list">${question.options.map((option, i) => `<button class="answer-btn activity-option" data-activity-answer="${i}" ${answered ? "disabled" : ""}>${mode === "guess" ? i + 1 : String.fromCharCode(65 + i)}. ${option.text}</button>`).join("")}</div>
    <div class="feedback activity-feedback" id="activityFeedback" aria-live="polite">${answered ? question.why : "Elige una respuesta para continuar."}</div>
    <div class="button-row"><button class="btn btn-primary" data-activity-next ${answered ? "" : "disabled"}>${index === total - 1 ? "Ver resultado" : "Siguiente pregunta →"}</button><button class="btn btn-light" data-activity-menu>Salir de la actividad</button></div>
  </section>`;
}


function activities() {
  if (activitiesState.view === "menu") return activityMenu();
  if (activitiesState.index >= activitiesState.questions.length) {
    const title = activitiesState.mode === "vf" ? "Resultado: Verdadero o falso" : activitiesState.mode === "mc" ? "Resultado: Opción múltiple" : "Resultado: Adivina la seña";
    return activityResults(title, activitiesState.questions.length, activitiesState.score, activitiesState.mode);
  }
  return activityQuestionView(activitiesState.questions[activitiesState.index], activitiesState.index, activitiesState.questions.length, activitiesState.mode, activitiesState.score, activitiesState.answered);
}

function cultura() {
  return `${pageIntro("PERSONAS, LENGUA Y COMUNIDAD", "Cultura e inclusión", "Conoce la cultura, la identidad, los derechos y las experiencias de la comunidad sorda. Esta sección propone comprender la inclusión desde el respeto y la participación, con especial atención al contexto ecuatoriano.", "Comprender para incluir")}
<div class="culture-banner"><div><div class="eyebrow" style="color:#e7c77e">COMUNICACIÓN PARA TODOS</div><h2>La inclusión se construye en comunidad.</h2><p>Reconocer la lengua y cultura de las personas sordas significa respetar sus formas de comunicación, promover su participación y escuchar sus propias experiencias. La LSEC es una lengua viva y su comunidad debe tener un papel central en su enseñanza y difusión.</p><a class="btn btn-light" href="https://fenasec-ecu.wixsite.com/fenasec/bienvenido-a-web" target="_blank" rel="noopener">Conocer FENASEC ↗</a></div><img src="assets/images/inclusion-illustration.svg" alt="Ilustración decorativa de personas diversas compartiendo y comunicándose"></div>
<div class="section-head"><div><h2>Explora los temas</h2><p>Abre cada tema para conocer sus ideas principales y conversar sobre cómo aplicarlas en la vida diaria.</p></div></div>
<div class="culture-topic-grid">
<article class="culture-topic"><div class="culture-topic-icon">◉</div><span class="activity-kicker">IDENTIDAD Y COMUNIDAD</span><h3>Cultura e identidad sorda</h3><p>La cultura sorda reúne experiencias, formas de encuentro, expresiones artísticas, asociaciones y prácticas compartidas por personas sordas. No es idéntica para todos: cada persona construye su identidad de manera propia.</p><details><summary>Leer contenido completo</summary><p>Para muchas personas sordas, la lengua de señas es un elemento central de comunicación, pertenencia y transmisión cultural. Los encuentros comunitarios, las organizaciones, el arte visual, el teatro, el deporte y las redes de apoyo crean espacios donde se comparten experiencias y conocimientos. Es importante evitar pensar en la comunidad sorda como un grupo homogéneo: existen diferencias de edad, región, trayectoria educativa, preferencias lingüísticas y experiencias personales. La mejor manera de conocer esta cultura es acercarse a sus integrantes, reconocer sus voces y respetar cómo cada persona se identifica.</p><h4>Para conversar en clase</h4><ul><li>¿Por qué una lengua también puede ser parte de una identidad cultural?</li><li>¿Cómo podemos conocer la cultura sorda sin recurrir a estereotipos?</li><li>¿Por qué es importante que las personas sordas cuenten sus propias experiencias?</li></ul></details></article>
<article class="culture-topic"><div class="culture-topic-icon">⚖</div><span class="activity-kicker">DERECHOS Y PARTICIPACIÓN</span><h3>Derechos e igualdad</h3><p>La igualdad no consiste en ofrecer exactamente lo mismo a todos, sino en eliminar barreras y proporcionar los apoyos necesarios para que cada persona pueda ejercer sus derechos.</p><details><summary>Leer contenido completo</summary><p>Las personas sordas tienen derecho a la educación, la información, la participación social, la cultura y la comunicación accesible. La Convención sobre los Derechos de las Personas con Discapacidad reconoce la importancia de las lenguas de señas, la identidad lingüística de las personas sordas y los ajustes que permiten la participación. En Ecuador, la Constitución, la Ley Orgánica de Discapacidades y otras normas contienen disposiciones relacionadas con igualdad, accesibilidad y educación. La aplicación concreta de estos derechos requiere planificación, recursos, formación y consulta a las personas involucradas. La accesibilidad no es un favor: forma parte del respeto a la dignidad y a los derechos humanos.</p><h4>Para conversar en clase</h4><ul><li>¿Qué diferencia existe entre igualdad y equidad?</li><li>¿Qué información escolar debería estar disponible en formatos accesibles?</li><li>¿Qué barreras pueden impedir que una persona participe en igualdad de condiciones?</li></ul></details></article>
<article class="culture-topic"><div class="culture-topic-icon">◎</div><span class="activity-kicker">CONVIVENCIA</span><h3>Comunicación respetuosa</h3><p>La comunicación inclusiva comienza por reconocer las preferencias de cada persona y evitar suposiciones sobre cómo debe comunicarse.</p><details><summary>Leer contenido completo</summary><p>Cuando quieras iniciar una conversación, procura que la persona note tu presencia sin asustarla, colócate frente a ella y mantén visibles el rostro y las manos. Si no conoces LSEC, puedes preguntar de manera respetuosa qué recurso prefiere: escritura, lectura labial, interpretación u otra alternativa. No todas las personas sordas utilizan los mismos apoyos. Habla con naturalidad, no grites ni exageres los movimientos de la boca. Si no comprendes algo, dilo con respeto y pide que lo repita o lo explique de otra manera. En una conversación grupal, facilita los turnos y evita que varias personas hablen al mismo tiempo. Cuando haya una persona intérprete, dirige la comunicación a la persona sorda y no al intérprete.</p><h4>Para conversar en clase</h4><ul><li>¿Por qué es mejor preguntar antes de asumir cómo comunicarse?</li><li>¿Qué cambios sencillos mejorarían una conversación grupal?</li><li>¿Qué actitudes pueden hacer que alguien se sienta excluido?</li></ul></details></article>
<article class="culture-topic"><div class="culture-topic-icon">⌂</div><span class="activity-kicker">COMUNIDAD EDUCATIVA</span><h3>Inclusión en San Agustín</h3><p>Una institución inclusiva promueve que estudiantes, docentes y familias comprendan la diversidad y participen en la construcción de entornos accesibles.</p><details><summary>Leer contenido completo</summary><p>En la Unidad Educativa San Agustín, fomentar el conocimiento de la LSEC puede ser un punto de partida para conversar sobre accesibilidad y respeto. La inclusión se construye con acciones concretas: organizar actividades con instrucciones visuales, compartir materiales con anticipación, cuidar la iluminación, respetar los turnos de participación y consultar qué apoyos se necesitan. Aprender vocabulario básico puede abrir oportunidades de acercamiento, pero no convierte automáticamente a alguien en intérprete ni reemplaza la enseñanza formal. Los docentes pueden incorporar recursos ecuatorianos verificados y promover proyectos donde las personas sordas y sus organizaciones sean consultadas y reconocidas como referentes.</p><h4>Para conversar en clase</h4><ul><li>¿Qué podría hacer nuestro curso para promover el respeto por la LSEC?</li><li>¿Qué cambios harían más accesible una exposición o acto escolar?</li><li>¿Cómo podemos asegurarnos de que las propuestas respondan a necesidades reales?</li></ul></details></article>
<article class="culture-topic"><div class="culture-topic-icon">✦</div><span class="activity-kicker">REFERENTES Y MEMORIA</span><h3>Personas e historias inspiradoras</h3><p>Las historias de personas sordas permiten reconocer aportes en educación, cultura, deporte, arte, liderazgo y defensa de derechos.</p><details><summary>Leer contenido completo</summary><p>La historia de la comunidad sorda no debe contarse únicamente desde instituciones oyentes. Es importante investigar testimonios, publicaciones, asociaciones y referentes que hayan contribuido a la organización comunitaria, la educación y la difusión de la LSEC. En Ecuador, FENASEC y las asociaciones afiliadas son fuentes relevantes para conocer procesos colectivos y liderazgos. Al presentar una biografía, verifica el nombre, los aportes, las fechas y la fuente; evita atribuir a una sola persona la creación de una lengua que se desarrolla en comunidad. También se pueden incluir historias locales de estudiantes, docentes, artistas y profesionales sordos, siempre con su consentimiento y respetando cómo desean ser presentados.</p><h4>Para conversar en clase</h4><ul><li>¿Por qué es importante escuchar las historias contadas por personas sordas?</li><li>¿Qué datos debemos comprobar antes de publicar una biografía?</li><li>¿Cómo reconocer aportes colectivos y no solo individuales?</li></ul></details></article>
<article class="culture-topic"><div class="culture-topic-icon">♡</div><span class="activity-kicker">RESPONSABILIDAD COMPARTIDA</span><h3>Nuestro compromiso con la inclusión</h3><p>La inclusión se demuestra en decisiones cotidianas: escuchar, consultar, facilitar la participación y corregir prácticas que generan barreras.</p><details><summary>Leer contenido completo</summary><p>El compromiso con la inclusión no se limita a una fecha conmemorativa ni a aprender unas cuantas señas. Implica reconocer la diversidad, evitar burlas y prejuicios, compartir información accesible y dar espacio a las personas sordas para expresar sus preferencias y participar en decisiones. También supone aprender de fuentes ecuatorianas confiables, reconocer los límites de nuestro conocimiento y no enseñar como correcta una seña que no haya sido verificada. En el colegio, cada curso puede identificar una barrera, proponer una mejora realista y revisar si esa acción ayudó. Los cambios sostenibles nacen del respeto, la colaboración y la continuidad.</p><h4>Para conversar en clase</h4><ul><li>¿Qué compromiso concreto podemos asumir como curso?</li><li>¿Cómo sabremos si una acción realmente mejora la participación?</li><li>¿Por qué la inclusión debe mantenerse durante todo el año?</li></ul></details></article>
</div>
<div class="culture-resources"><div class="section-head"><div><h2>Fuentes para seguir aprendiendo</h2><p>Consulta organizaciones y materiales que permiten conocer la realidad ecuatoriana desde fuentes cercanas a la comunidad.</p></div></div><div class="resource-list">${resource("FENASEC · Federación Nacional de Personas Sordas del Ecuador", "Organización y participación de la comunidad sorda ecuatoriana.", "https://fenasec-ecu.wixsite.com/fenasec/bienvenido-a-web")}${resource("Atlas Sordo · Ecuador", "Información histórica, educativa y cultural sobre la comunidad sorda.", "https://www.cultura-sorda.org/ecuador-atlas-sordo/")}${resource("CONADIS · Diccionario Gabriel Román", "Recurso ecuatoriano para consultar vocabulario y videos de LSEC.", OFFICIAL_DICT)}</div></div>`;
}

function proyecto() {
  return `${pageIntro("SOBRE ESTA INICIATIVA", "LSEC San Agustín", "Una plataforma educativa de la Unidad Educativa San Agustín para enseñar, acercar y fomentar el aprendizaje de la Lengua de Señas Ecuatoriana, promoviendo una comunidad escolar más informada, respetuosa e inclusiva.", "Proyecto educativo institucional")}
<div class="section-head"><div><h2>¿De qué trata este proyecto?</h2><p>Una iniciativa educativa para aprender, compartir y practicar LSEC dentro de la comunidad San Agustín.</p></div></div>
<div class="theory-grid">
<article class="theory-card"><span class="num">PROPÓSITO PRINCIPAL</span><h3>Enseñar y fomentar la LSEC</h3><p>El proyecto busca acercar la Lengua de Señas Ecuatoriana a estudiantes, docentes y demás integrantes de la Unidad Educativa San Agustín. Su propósito es ofrecer un espacio claro y amigable para conocer la lengua, aprender vocabulario, observar recursos audiovisuales y comprender por qué la comunicación accesible es importante en la convivencia escolar. No pretende reemplazar la enseñanza especializada ni la participación de personas sordas; quiere despertar interés, facilitar el primer acercamiento y promover el respeto por la comunidad sorda ecuatoriana.</p></article>
<article class="theory-card"><span class="num">IDENTIDAD INSTITUCIONAL</span><h3>Unidad Educativa San Agustín</h3><p>LSEC San Agustín se plantea como un recurso educativo vinculado a la identidad y a la vida escolar de la institución. La propuesta toma como referencia a la Unidad Educativa San Agustín y su comunidad educativa, y busca que el aprendizaje de la LSEC pueda integrarse en clases, proyectos, exposiciones, actividades colaborativas y acciones de sensibilización. Sitio institucional: <a href="https://www.sanagustin.edu.ec/" target="_blank" rel="noopener">sanagustin.edu.ec ↗</a>.</p></article>
<article class="theory-card"><span class="num">DESTINATARIOS</span><h3>¿A quién está dedicado?</h3><p>Está dirigido principalmente a los estudiantes de la Unidad Educativa San Agustín, así como a docentes, autoridades, familias y a toda persona de la comunidad escolar que desee aprender. Se dedica de manera especial a las personas sordas del Ecuador, cuya lengua, cultura, historia y participación inspiran esta iniciativa. También busca motivar a quienes todavía no conocen la LSEC a dar sus primeros pasos con curiosidad, humildad y respeto.</p></article>
<article class="theory-card"><span class="num">OBJETIVOS EDUCATIVOS</span><h3>¿Qué queremos conseguir?</h3><p>Facilitar el conocimiento básico de la LSEC; despertar interés por continuar aprendiendo; difundir recursos ecuatorianos; reconocer que las lenguas de señas son lenguas naturales y no gestos universales; promover actitudes de respeto; y contribuir a que la comunicación inclusiva forme parte de la cultura escolar. El proyecto también busca que los estudiantes desarrollen habilidades de investigación, selección responsable de fuentes y trabajo colaborativo.</p></article>
<article class="theory-card"><span class="num">METODOLOGÍA</span><h3>Aprender explorando</h3><p>La plataforma organiza el contenido en módulos de aprendizaje, abecedario, videoteca, actividades y recursos sobre cultura e inclusión. Los estudiantes pueden avanzar a su propio ritmo, revisar explicaciones, observar videos y conversar sobre lo aprendido en el aula. Los docentes pueden utilizarla como apoyo para introducir temas, proyectar materiales, proponer actividades y abrir espacios de reflexión. La experiencia combina lectura, observación, práctica y diálogo.</p></article>
<article class="theory-card"><span class="num">COMPROMISO</span><h3>Contenido responsable y ecuatoriano</h3><p>El enfoque del proyecto es la Lengua de Señas Ecuatoriana. Por ello, se priorizan fuentes y materiales de Ecuador y se procura distinguir los contenidos confirmados de aquellos que requieren revisión. Una imagen o una ilustración no debe presentarse como una seña auténtica si no ha sido verificada. El aprendizaje debe mantener respeto por las variantes, la identidad y las recomendaciones de personas sordas y docentes con experiencia en LSEC.</p></article>
<article class="theory-card"><span class="num">ACCESIBILIDAD</span><h3>Un recurso sencillo para la comunidad</h3><p>La web está construida para abrirse en un navegador y utilizarse en computadoras o dispositivos móviles. No exige crear cuentas ni ingresar datos personales, y puede proyectarse durante una clase. Algunas funciones y recursos audiovisuales necesitan conexión a internet. Su diseño busca que la navegación sea comprensible y que docentes y estudiantes encuentren con facilidad los contenidos principales.</p></article>
<article class="theory-card"><span class="num">ALCANCE</span><h3>Un punto de partida, no un curso certificado</h3><p>Esta plataforma es un apoyo introductorio y educativo. No otorga certificación de dominio de LSEC ni sustituye cursos impartidos por instructores cualificados, intérpretes profesionales o la interacción con la comunidad sorda. Aprender una lengua requiere práctica continua, retroalimentación y contacto con sus usuarios. El proyecto invita a continuar ese proceso más allá de la pantalla.</p></article>
</div>
<div class="section-head"><div><h2>Dedicatoria</h2><p>Un reconocimiento a quienes dan sentido a esta iniciativa.</p></div></div>
<div class="notice notice-dedication"><p><strong>Este proyecto está dedicado a las personas sordas del Ecuador</strong>, a la comunidad sorda que mantiene viva la Lengua de Señas Ecuatoriana y a quienes trabajan por una sociedad donde todas las personas puedan comunicarse, aprender y participar con dignidad. También está dedicado a los estudiantes y docentes de la Unidad Educativa San Agustín, con la esperanza de que este recurso despierte interés por aprender LSEC y contribuya a construir una escuela más consciente, cercana e inclusiva.</p></div>
<div class="section-head"><div><h2>Agradecimientos</h2><p>Reconocimiento a las personas y grupos que acompañan el proceso educativo.</p></div></div>
<div class="theory-grid">
<article class="theory-card"><span class="num">2.º TÉCNICO</span><h3>Agradecimiento al curso</h3><p>Se expresa un agradecimiento especial a los estudiantes de 2.º Técnico por formar parte de esta comunidad educativa y de esta propuesta. Su participación, curiosidad y disposición han sido un aporte valioso para el desarrollo de este proyecto, contribuyendo con nuevas ideas y apoyo para convertirlo en una herramienta útil que promueva la comunicación y la inclusión dentro y fuera del aula.</p></article>
<article class="theory-card"><span class="num">3.º INFORMÁTICA</span><h3>Agradecimiento al curso</h3><p>Un agradecimiento sincero al estudiante de 3.º de Informática por su enorme compromiso y entrega en la creación de esta iniciativa. Ha sido un excelente espacio para aplicar la programación y el diseño en favor de un hermoso fin social: acercar la LSEC a todos en el colegio.</p></article>
<article class="theory-card"><span class="num">COMUNIDAD EDUCATIVA</span><h3>Docentes, autoridades y familias</h3><p>Gracias a los docentes, autoridades y familias de la Unidad Educativa San Agustín por el acompañamiento que hace posible impulsar propuestas educativas. Su orientación y apoyo son importantes para que el aprendizaje de la LSEC pueda integrarse en actividades escolares y convertirse en una experiencia compartida.</p></article>
<article class="theory-card"><span class="num">COMUNIDAD SORDA</span><h3>Personas sordas e instructores de LSEC</h3><p>Se reconoce especialmente a las personas sordas, asociaciones, instructores y especialistas que conservan, enseñan, documentan y difunden la LSEC. Sus conocimientos y experiencias son fundamentales para que los materiales educativos sean respetuosos, pertinentes y fieles a la realidad lingüística del Ecuador.</p></article>
</div>
<div class="section-head"><div><h2>Un compromiso para seguir aprendiendo</h2><p>La inclusión se construye con acciones constantes.</p></div></div>
<div class="callout"><div><h3>Aprender una lengua también es aprender a escuchar y respetar.</h3><p>LSEC San Agustín invita a toda la comunidad educativa a explorar, preguntar, practicar y seguir aprendiendo junto a las personas que utilizan la Lengua de Señas Ecuatoriana.</p></div><a class="btn btn-primary" href="https://www.sanagustin.edu.ec/" target="_blank" rel="noopener">Visitar San Agustín ↗</a></div>
<div class="section-head"><div><h2>Fuentes y recursos</h2><p>Materiales para ampliar y verificar el contenido de aprendizaje.</p></div></div><div class="resource-list">${resource("Unidad Educativa San Agustín", "Sitio institucional del colegio al que está dirigido este proyecto.", "https://www.sanagustin.edu.ec/")}${resource("FENASEC · Federación Nacional de Personas Sordas del Ecuador", "Organización nacional de referencia de la comunidad sorda.", "https://fenasec-ecu.wixsite.com/fenasec/bienvenido-a-web")}${resource("WikiInclusion · Tutoriales LSEC", "Videos por temas: alfabeto, saludos, familia, colores y más.", WIKINCLUSION)}${resource("MILSEC · Recursos educativos y audiovisuales", "Producción de materiales educativos y multimedia en LSEC.", "https://milsecoficial.org/produccion/")}</div>`;
}

function glosarioPage() {
  return `${pageIntro("DOCUMENTO ORIGINAL", "Glosario Básico de Lengua de Señas Ecuatoriana", "Elige una sección para leer solo sus páginas. Los números de página son los del PDF original (del 1 al 50).", "50 páginas")}
 <div id="gloRoot"></div>`;
}

/* ---------- Dibujo de la página ----------
   Actualiza la página «en el sitio»: solo cambia lo que de verdad cambió
   (clases, textos, imágenes distintas). Así, al elegir una letra o responder,
   los botones NO se destruyen y vuelven a crear (eso causaba el parpadeo). */
function syncAttrs(a, b) {
  Array.from(a.attributes).forEach((t) => {
    if (!b.hasAttribute(t.name)) a.removeAttribute(t.name);
  });
  Array.from(b.attributes).forEach((t) => {
    if (a.getAttribute(t.name) !== t.value) a.setAttribute(t.name, t.value);
  });
}

function morphChildren(live, next) {
  const l = Array.from(live.childNodes), n = Array.from(next.childNodes), max = Math.max(l.length, n.length);
  for (let i = 0; i < max; i++) {
    const a = l[i], b = n[i];
    if (!b) {
      a.remove();
      continue;
    }
    if (!a) {
      live.appendChild(b);
      continue;
    }
    if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) {
      live.replaceChild(b, a);
      continue;
    }
    if (a.nodeType !== 1) {
      if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue;
      continue;
    }
    syncAttrs(a, b);
    morphChildren(a, b);
  }
}

let lastRenderedPage = null;
function render() {
  const pages = { inicio: home, alfabeto: alphabetPage, videoteca: videoPage, teoria: theoryPage, actividades: activities, cultura, proyecto, glosario: glosarioPage };
  const html = pages[currentPage]();
  const samePage = lastRenderedPage === currentPage && (currentPage === "alfabeto" || currentPage === "actividades") && app.firstElementChild;
  if (samePage) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    morphChildren(app, tmp);
  } else {
    app.innerHTML = html;
    if (lastRenderedPage !== currentPage) {
      app.classList.remove("fx-enter");
      void app.offsetWidth;
      app.classList.add("fx-enter");
    }
  }
  lastRenderedPage = currentPage;
  if (currentPage === "glosario" && window.LSECGlosario) window.LSECGlosario.mount();
  if (!samePage) app.focus({ preventScroll: true });
}

/* ---------- Ventana de lectura (módulos de teoría) ---------- */
function openModal(title, body, actions = "") {
  let modal = document.getElementById("contentModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "contentModal";
    modal.className = "modal-backdrop";
    modal.innerHTML = '<section class="content-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button class="modal-close" aria-label="Cerrar">×</button><div id="modalBody"></div></section>';
    document.body.appendChild(modal);
  }
  modal.querySelector("#modalBody").innerHTML = `<div class="eyebrow">LSEC SAN AGUSTÍN</div><h2 id="modalTitle">${title}</h2>${body}${actions}`;
  modal.classList.add("show");
}

function closeModal() {
  document.getElementById("contentModal")?.classList.remove("show");
}

function showTheory(index) {
  const all = getTheoryModules(), t = all[index];
  if (!t) return;
  // Cada lectura tiene sus propias preguntas (theoryPrompts en datos.js);
  // si faltara alguna, se usan las preguntas generales de siempre.
  const prompts = (typeof theoryPrompts !== "undefined" && theoryPrompts[index]) || [
    "¿Qué aprendiste sobre este tema? Comparte un ejemplo de cómo se relaciona con la vida escolar.",
    "¿Qué preguntas te quedan? ¿Qué fuente ecuatoriana podríamos consultar para comprobar la información?",
    "¿Cómo podemos aplicar este conocimiento para que el aula sea más accesible y respetuosa?"
  ];
  openModal(t[1], `<p class="modal-description">${t[2]}</p><div class="notice">Idea clave: la LSEC es una lengua viva de la comunidad sorda ecuatoriana. Para aprender señas concretas, utiliza recursos producidos o validados por la comunidad y docentes competentes.</div><h3>Para conversar en clase</h3><ul class="class-prompts">${prompts.map((p) => `<li>${p}</li>`).join("")}</ul><h3>Actividad breve</h3><p class="modal-description">En parejas, anoten una idea importante del módulo, una duda que quieran investigar y una acción que pueda aplicarse en la escuela.</p>`, `<div class="button-row"><button class="btn btn-primary" data-go="cultura">Ver cultura e inclusión</button><button class="btn btn-light" onclick="window.print()">Imprimir módulo</button></div>`);
}

/* ---------- Eventos ---------- */
document.addEventListener("click", (e) => {
  const mini = e.target.closest("[data-mini-choice]");
  if (mini) {
    const key = mini.dataset.miniChoice;
    const feedback = document.querySelector(`[data-mini-feedback="${key}"]`);
    if (feedback) {
      feedback.textContent = mini.dataset.feedback || "Respuesta registrada.";
      feedback.classList.toggle("is-correct", mini.dataset.correct === "true");
      feedback.classList.toggle("is-incorrect", mini.dataset.correct !== "true");
    }
    mini.parentElement.querySelectorAll("button[data-mini-choice]").forEach((b) => b.classList.toggle("selected", b === mini));
    return;
  }
  const playVideo = e.target.closest("[data-play-video]");
  if (playVideo) {
    const frame = playVideo.closest(".video-frame");
    const id = playVideo.dataset.playVideo;
    const title = playVideo.dataset.videoTitle || "Video LSEC";
    document.querySelectorAll(".video-frame iframe").forEach((iframe) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
    });
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1" title="${title} en LSEC" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><a class="video-external-fallback" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">¿No se reproduce? Abrir en YouTube ↗</a>`;
    return;
  }
  const goBtn = e.target.closest("[data-go]");
  if (goBtn) {
    go(goBtn.dataset.go);
    return;
  }
  const nav = e.target.closest("[data-page]");
  if (nav) {
    go(nav.dataset.page);
    return;
  }
  const zoom = e.target.closest("[data-letter-zoom]");
  if (zoom) {
    openLetterViewer(selectedLetter);
    return;
  }
  const letter = e.target.closest("[data-letter]");
  if (letter) {
    selectedLetter = letter.dataset.letter;
    render();
    if (window.matchMedia("(max-width:1024px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      requestAnimationFrame(() => document.querySelector(".letter-detail")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
    }
    return;
  }
  const prev = e.target.closest("[data-letter-prev]");
  if (prev) {
    selectedLetter = alphabet[Math.max(0, alphabet.indexOf(selectedLetter) - 1)];
    render();
    return;
  }
  const next = e.target.closest("[data-letter-next]");
  if (next) {
    selectedLetter = alphabet[Math.min(alphabet.length - 1, alphabet.indexOf(selectedLetter) + 1)];
    render();
    return;
  }
  const theoryBtn = e.target.closest("[data-theory]");
  if (theoryBtn) {
    showTheory(Number(theoryBtn.dataset.theory));
    return;
  }
  const videoTopic = e.target.closest("[data-video-topic]");
  if (videoTopic) {
    closeModal();
    go("videoteca");
    setTimeout(() => {
      const input = document.getElementById("videoSearch");
      if (input) {
        input.value = videoTopic.dataset.videoTopic;
        input.dispatchEvent(new Event("input"));
      }
    }, 0);
    return;
  }
  if (e.target.closest(".modal-close") || e.target.classList.contains("modal-backdrop")) {
    closeModal();
    return;
  }
});


/* Eventos exclusivos de la nueva sección ACTIVIDADES */
document.addEventListener("click", (e) => {
  const start = e.target.closest("[data-activity-start]");
  if (start) { beginActivity(start.dataset.activityStart); return; }

  if (e.target.closest("[data-activity-menu]")) {
    activitiesState.view = "menu";
    render();
    return;
  }

  const answer = e.target.closest("[data-activity-answer]");
  if (answer && activitiesState.view === "play" && !activitiesState.answered) {
    const q = activitiesState.questions[activitiesState.index];
    const selected = Number(answer.dataset.activityAnswer);
    activitiesState.answered = true;
    const correctIndex = q.options.findIndex(option => option.correct);
    if (q.options[selected]?.correct) activitiesState.score++;
    document.querySelectorAll("[data-activity-answer]").forEach((button, i) => {
      button.disabled = true;
      if (i === correctIndex) button.classList.add("correct");
      else if (i === selected) button.classList.add("wrong");
    });
    const feedback = document.getElementById("activityFeedback");
    if (feedback) feedback.textContent = (q.options[selected]?.correct ? "¡Correcto! " : "Vamos a aprender: ") + q.why;
    const next = document.querySelector("[data-activity-next]");
    if (next) next.disabled = false;
    const count = document.querySelector(".activity-game-box .question-count");
    if (count) count.textContent = `PREGUNTA ${activitiesState.index + 1} DE ${activitiesState.questions.length} · PUNTAJE ${activitiesState.score}`;
    return;
  }

  if (e.target.closest("[data-activity-next]") && activitiesState.answered) {
    activitiesState.index++;
    activitiesState.answered = false;
    render();
    return;
  }

  const replay = e.target.closest("[data-activity-replay]");
  if (replay) {
    beginActivity(replay.dataset.activityReplay);
    return;
  }

});

document.addEventListener("input", (e) => {
  if (e.target.id === "videoSearch") {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll("[data-video-card]").forEach((card) => {
      const text = card.dataset.videoText || card.innerText.toLowerCase();
      card.style.display = text.includes(val) ? "" : "none";
    });
  }
});

document.getElementById("mobileMenu").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("teacherMode").addEventListener("click", () => {
  document.body.classList.toggle("presentation");
  showToast(document.body.classList.contains("presentation") ? "Modo clase activado · pulsa Ctrl+P para imprimir" : "Modo clase desactivado");
});

document.getElementById("globalSearch").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    const letter = alphabet.find((x) => x.toLowerCase() === q);
    if (letter) {
      selectedLetter = letter;
      go("alfabeto");
    } else {
      go("videoteca");
      setTimeout(() => {
        const inp = document.getElementById("videoSearch");
        if (inp) {
          inp.value = e.target.value;
          inp.dispatchEvent(new Event("input"));
        }
      }, 0);
      showToast("Buscando recursos relacionados en la videoteca.");
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------- Avisos breves ---------- */
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- Arranque ---------- */
render();
window.scrollTo(0, 0);
document.getElementById("sidebar").scrollTop = 0;
warmLetterImagesWhenIdle();

/* Si el navegador recupera la página desde su memoria (botón atrás o reabrir pestaña), también empieza arriba */
window.addEventListener("pageshow", (e) => {
  if (e.persisted) window.scrollTo(0, 0);
});
