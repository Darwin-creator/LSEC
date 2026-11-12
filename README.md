# LSEC San Agustín

Plataforma educativa construida con HTML, CSS y JavaScript puro. No requiere React, Node.js, npm, cuentas ni base de datos.

## Abrir la web
1. Extrae la carpeta `LSEC-San-Agustin`.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` en tu navegador o utiliza Live Server.
4. Para reproducir los videos necesitas conexión a internet.

## Funciones implementadas
- Navegación entre las secciones disponibles desde el menú lateral y las tarjetas de inicio.
- Abecedario con 30 fichas (incluye CH, LL y RR), recortes de la imagen compartida, selección, vista ampliada y botones anterior/siguiente.
- Videoteca con miniaturas de vista previa, reproductores bajo demanda, buscador por tema y enlace alternativo para abrir el video en YouTube.
- Módulos de teoría que se abren en ventanas de lectura.
- Cuestionario interactivo con respuestas, retroalimentación, puntaje y reinicio.
- Cultura e inclusión, fuentes de referencia y enlaces externos.
- Buscador general, modo clase, menú adaptable a celular e impresión.

## Imágenes del abecedario
Los 30 recortes se encuentran en `assets/images/alfabeto/`. Para sustituir uno, conserva el nombre exacto del archivo (por ejemplo `a.png`, `ch.png`, `ñ.png`, `ll.png` o `rr.png`). Las imágenes proceden de la lámina compartida por el usuario.

## Precisión de LSEC
Los recortes representan la lámina aportada por el usuario; no se presentan como validación oficial. Las palabras del diccionario son etiquetas de vocabulario en español y no incluyen señas inventadas. Para confirmar formas, movimientos, variantes y equivalencias, consulta el Diccionario de Lengua de Señas Ecuatoriana “Gabriel Román” y valida el material con docentes de LSEC o personas sordas de Ecuador.

## Fuentes externas
- CONADIS, Diccionario de Lengua de Señas Ecuatoriano “Gabriel Román”: https://www.consejodiscapacidades.gob.ec/diccionario-de-lengua-de-senas-ecuatoriano-gabriel-roman/
- WikiInclusion, Videos Lengua de Señas Ecuatoriana: https://www.wikinclusion.org/index.php/VIDEOS_LENGUA_DE_SE%C3%91AS_ECUATORIANA
- FENASEC: https://fenasec-ecu.wixsite.com/fenasec/bienvenido-a-web
- MILSEC: https://milsecoficial.org/produccion/

## Archivos principales
- `index.html`: estructura de la web.
- `styles.css`: identidad visual, distribución y estilos adaptables.
- `script.js`: navegación, contenido, filtros, fichas, cuestionario y demás interacciones.
- `assets/images/`: ilustraciones y recortes del abecedario.


## Solución si aparece la interfaz sin contenido
El contenido de las secciones se genera desde `script.js`. Por eso, si ves el menú pero el centro queda vacío:
1. Asegúrate de abrir `index.html` de la carpeta recién extraída, no un acceso directo antiguo.
2. Comprueba que `script.js` y `styles.css` estén al mismo nivel que `index.html`.
3. Comprueba que `assets/` esté en esa misma carpeta.
4. Recarga con `Ctrl + F5`.
5. Si el script falla, la página ahora mostrará un panel de diagnóstico. También puedes abrir F12 → Console.


## Ampliación de contenido (noviembre de 2026)
Esta versión conserva las 11 fichas de video individuales que ya existían y añade 7 accesos adicionales a recursos/colecciones audiovisuales ecuatorianas. Los accesos a colecciones están identificados como tales; no se presentan como videos individuales nuevos.

### Aprende LSEC
Se conservaron los 8 módulos iniciales y se añadieron 22 módulos:
- historia y comunidad sorda en Ecuador;
- escuelas e iniciativas educativas documentadas;
- FENASEC y el papel de Gabriel Román;
- proyecto Mano a Mano y publicaciones de 1988;
- diccionario oficial de 2012 y diccionario web Gabriel Román;
- glosas, ortografía del español, gramática, parámetros lingüísticos, expresión facial y uso del espacio;
- variación regional, dactilología, números, estrategias de aprendizaje, materiales didácticos, derechos e inclusión.

Cada ficha conserva una sección **Para conversar en clase** y una actividad breve. La cronología advierte cuando las fuentes difieren en fechas.

### Fuentes históricas y educativas incorporadas
- FENASEC, Nuestra Historia: https://fenasec-ecu.wixsite.com/fenasec/historia
- Cultura Sorda, Ecuador – Atlas Sordo: https://www.cultura-sorda.org/ecuador-atlas-sordo/
- CONADIS, Diccionario de Lengua de Señas Ecuatoriano “Gabriel Román”: https://www.consejodiscapacidades.gob.ec/diccionario-de-lengua-de-senas-ecuatoriano-gabriel-roman/
- Banet y Matts (2024), “La enseñanza de la lengua de señas ecuatoriana y su adaptación al Marco Común de Referencia Europeo en Ecuador”, SciELO: https://www.scielo.org.pe/scielo.php?pid=S2413-26592024000100025&script=sci_arttext

### Reemplazar o agregar imágenes auténticas de señas
No reemplaces las ilustraciones de categoría por fotos descargadas sin comprobar su procedencia. Para añadir una imagen real de una seña, usa material autorizado y validado por docentes de LSEC/personas sordas ecuatorianas. La estructura actual evita etiquetar una ilustración decorativa como seña auténtica.


## Cambios de esta versión
- Se retiraron por completo las secciones Diccionario y Conversaciones de la navegación y de las tarjetas de inicio.
- Se eliminaron los datos, funciones, eventos y las ilustraciones exclusivas de la antigua sección Diccionario.
- La videoteca ahora muestra una miniatura de vista previa antes de cargar cada reproductor. Si YouTube bloquea la inserción, queda disponible el enlace para abrir el video directamente.


Actualización del escudo: `assets/images/logo-san-agustin.png` es ahora un PNG RGBA de alta resolución (980 × 1090) con fondo exterior transparente. El logotipo del encabezado usa el archivo directamente, sin borde ni fondo añadido.


## Ampliación educativa (noviembre de 2026)
- Se ampliaron las descripciones de los 30 módulos de Aprende LSEC.
- Se conservaron sin cambios los apartados “Para conversar en clase” y “Actividad breve” de cada módulo.
- Se amplió “El proyecto” con propósito institucional, destinatarios, objetivos, metodología, alcance, dedicatoria y agradecimientos a 2.º Técnico, 3.º Informática, docentes, familias y comunidad sorda.
- Se añadió un enlace al sitio institucional de la Unidad Educativa San Agustín: https://www.sanagustin.edu.ec/

## Actualización: Cultura e inclusión y Actividades

- Cultura e inclusión se organiza en seis temas ampliables: cultura e identidad sorda, derechos e igualdad, comunicación respetuosa, inclusión en San Agustín, historias y referentes, y compromiso con la inclusión. Cada tema incorpora explicaciones y preguntas para conversar en clase.
- Actividades conserva el cuestionario original y añade retos interactivos de mitos y realidades, situaciones cotidianas, conceptos, reflexión y compromisos personales.
- No se añadieron nuevas secciones al menú ni se modificaron los módulos de Aprende LSEC, el proyecto, el abecedario o la videoteca.
