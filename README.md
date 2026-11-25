# LSEC San Agustín

Plataforma educativa de la Unidad Educativa San Agustín para acercarse a la Lengua de Señas Ecuatoriana (LSEC). Está hecha con HTML, CSS y JavaScript puro: no requiere React, Node.js, npm, cuentas ni base de datos.

## Abrir la web
1. Extrae la carpeta del proyecto.
2. Ábrela en Visual Studio Code.
3. Abre `index.html` en el navegador o usa Live Server.
4. Para reproducir los videos y cargar las tipografías necesitas conexión a internet.

## Estructura del proyecto

```
index.html              Estructura de la página (única página; el contenido se dibuja con JavaScript)
css/
  styles.css            Estilos generales (secciones 0 a 8; el orden importa)
  movil.css             Ajustes para teléfono y tablet, vertical y horizontal (se carga después de styles.css)
js/
  tema.js               Modo claro/oscuro (se carga primero para evitar el parpadeo blanco)
  datos.js              TODO el contenido: videos, alfabeto, módulos de teoría, preguntas
  app.js                Lógica principal: navegación, páginas, cuestionario, buscador, modo clase
  visor-letras.js       Visor ampliado del abecedario (teclado, deslizar, pantalla completa)
  visor-glosario.js     Lector por secciones del Glosario LSEC (zoom, pantalla completa)
  identidad.js          Elementos institucionales: frases de San Agustín y lema del colegio
assets/
  images/               Escudo, ilustraciones y recortes del abecedario (alfabeto/ y alfabeto/mini/)
  fondos/               Fondos decorativos SVG por sección
  documentos/paginas/   Las 50 páginas del glosario como imágenes (pNN grande, tNN miniatura)
```

Los scripts usan `defer` y deben cargarse en este orden: `datos.js` → `app.js` → `visor-letras.js` → `visor-glosario.js` → `identidad.js`.

## Cómo editar el contenido
- **Textos, videos, módulos de «Aprende LSEC» y preguntas:** edita solo `js/datos.js`.
- **Secciones del glosario:** lista `SECTIONS` al inicio de `js/visor-glosario.js`.
- **Colores y estilos:** `css/styles.css`. Cada sección puede ajustar a la anterior; los ajustes de teléfono y tablet están en `css/movil.css`, que debe cargarse después de `styles.css`.
- **Imagen de una letra:** reemplaza el archivo en `assets/images/alfabeto/` conservando el nombre exacto (`a.png`, `ch.png`, `ñ.png`, `ll.png`, `rr.png`…). Si existe `assets/images/alfabeto/hd/<letra>.png`, el visor la usa automáticamente.
- **Escudo:** `logo-san-agustin.png` es el original en alta resolución (980 × 1090, fondo transparente). La página usa `logo-san-agustin-256.png`, una copia liviana para los tamaños reales en pantalla. Si cambias el escudo, genera de nuevo la copia de 256 px de ancho.

## Funciones
- Navegación entre secciones desde el menú lateral y las tarjetas de inicio.
- Abecedario con 30 fichas (incluye CH, LL y RR), selección, vista ampliada y botones anterior/siguiente.
- Videoteca con miniaturas, reproductores bajo demanda, buscador por tema y enlace alternativo a YouTube.
- 30 módulos en «Aprende LSEC» que se abren en ventanas de lectura, con «Para conversar en clase» (3 preguntas propias por lectura, en `theoryPrompts` de `js/datos.js`) y actividad breve.
- Actividades: tres juegos con ícono propio (Verdadero o falso, Opción múltiple y Adivina la seña). Cada partida sortea 10 al azar de un banco de 100 en Verdadero o falso y en Opción múltiple (en Adivina la seña, 10 de las 30 letras; las preguntas adicionales están en `js/preguntas-actividades.js`), mezcla las respuestas y evita repetir las de la partida anterior. Para cambiar el tamaño de la partida, edita `ACTIVITY_ROUND_SIZE` en `js/app.js`.
- Cultura e inclusión (seis temas) y «El proyecto» (propósito, objetivos, dedicatoria y agradecimientos).
- Glosario LSEC: las 50 páginas del PDF por secciones, con zoom y pantalla completa.
- Buscador general, modo oscuro, modo clase, menú adaptable a celular e impresión.

## Rendimiento
- No hay mensaje de «Cargando» visible: el marcador solo aparece si la carga tarda más de ~1,2 s.
- Se eliminaron ~570 declaraciones de CSS que otras reglas posteriores ya sobrescribían (el CSS pasó de 152 KB a 123 KB sin cambiar el aspecto).
- Se eliminó CSS y JavaScript que ya no se usaban (reglas de clases inexistentes y el cuestionario anterior).
- Se usa la altura dinámica del navegador móvil (`dvh`), zonas seguras (notch) y se evita el zoom automático de texto al girar el dispositivo.
- Solo dos hojas de estilo y scripts diferidos (menos peticiones y nada bloquea la primera pintura).
- Las tipografías de Google se cargan sin bloquear la página.
- El escudo se sirve en una copia de 256 px (≈ 18 KB en lugar de ≈ 240 KB).
- Las imágenes grandes del abecedario están recomprimidas sin pérdida (mismos píxeles, la mitad de peso).
- En el glosario, las páginas vecinas se precargan después de que la actual termine de cargar.

## Precisión de LSEC
Los recortes representan la lámina aportada por el equipo; no se presentan como validación oficial. Las palabras del diccionario son etiquetas de vocabulario en español y no incluyen señas inventadas. Para confirmar formas, movimientos, variantes y equivalencias, consulta el Diccionario de Lengua de Señas Ecuatoriano «Gabriel Román» y valida el material con docentes de LSEC o personas sordas de Ecuador.

No reemplaces las ilustraciones de categoría por fotos descargadas sin comprobar su procedencia. Para añadir una imagen real de una seña, usa material autorizado y validado por docentes de LSEC o personas sordas ecuatorianas.

## Fuentes externas
- CONADIS, Diccionario de Lengua de Señas Ecuatoriano «Gabriel Román»: https://www.consejodiscapacidades.gob.ec/diccionario-de-lengua-de-senas-ecuatoriano-gabriel-roman/
- WikiInclusion, Videos Lengua de Señas Ecuatoriana: https://www.wikinclusion.org/index.php/VIDEOS_LENGUA_DE_SE%C3%91AS_ECUATORIANA
- FENASEC: https://fenasec-ecu.wixsite.com/fenasec/bienvenido-a-web
- FENASEC, Nuestra Historia: https://fenasec-ecu.wixsite.com/fenasec/historia
- MILSEC: https://milsecoficial.org/produccion/
- Cultura Sorda, Ecuador – Atlas Sordo: https://www.cultura-sorda.org/ecuador-atlas-sordo/
- Banet y Matts (2024), «La enseñanza de la lengua de señas ecuatoriana y su adaptación al Marco Común de Referencia Europeo en Ecuador», SciELO: https://www.scielo.org.pe/scielo.php?pid=S2413-26592024000100025&script=sci_arttext
- Unidad Educativa San Agustín: https://www.sanagustin.edu.ec/

## Si aparece la interfaz sin contenido
El contenido se genera con JavaScript. Si ves el menú pero el centro vacío:
1. Abre el `index.html` de la carpeta recién extraída, no un acceso directo antiguo.
2. Comprueba que `index.html`, `css/`, `js/` y `assets/` estén en la misma carpeta.
3. Recarga con `Ctrl + F5`.
4. Si un script falla, la página muestra un panel de diagnóstico; también puedes abrir F12 → Console.
