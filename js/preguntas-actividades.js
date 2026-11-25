/* ==========================================================================
   PREGUNTAS ADICIONALES · Actividades (Verdadero o falso y Opción múltiple)
   --------------------------------------------------------------------------
   Se suman a las 30 preguntas que ya existían en cada modalidad, para llegar
   a 100 y 100. Las partidas siguen igual: se sortean 10 al azar en cada
   entrada y las respuestas se mezclan (eso lo hace app.js, no este archivo).

   Para agregar o cambiar preguntas edita SOLO este archivo:
   · Verdadero o falso:  ["afirmación", true | false, "explicación"]
   · Opción múltiple:    ["pregunta", ["correcta", "incorrecta", ...], "explicación"]
                         (la PRIMERA opción es la correcta; app.js las mezcla)
   ========================================================================== */
(function () {
  "use strict";

  var VF = [
    // --- Fundamentos de LSEC ---
    ["Las lenguas de señas son lenguas naturales, igual que las lenguas orales.", true, "Surgen y se transmiten en comunidades y tienen estructura propia."],
    ["La LSEC es una mímica improvisada que no tiene reglas.", false, "La LSEC es una lengua natural con vocabulario, gramática y convenciones compartidas."],
    ["Las lenguas de señas pueden expresar ideas abstractas, emociones y opiniones.", true, "Como cualquier lengua natural, permiten narrar, preguntar, opinar y explicar ideas complejas."],
    ["La LSEC solo sirve para hablar de temas básicos y cotidianos.", false, "Se usa en la educación, la participación social, el acceso a información y la expresión cultural."],
    ["Llamar «lenguaje de gestos» a la LSEC describe bien a una lengua con gramática propia.", false, "Lo adecuado es decir «Lengua de Señas Ecuatoriana (LSEC)», porque es una lengua y no solo gestos."],
    ["La LSEC se desarrolla mediante la interacción de las personas sordas y sus comunidades.", true, "Las lenguas naturales se forman y transforman con el uso compartido de sus comunidades."],
    ["Existe evidencia histórica que permite señalar a una sola persona como fundadora de la LSEC.", false, "No existe tal evidencia: la LSEC es una creación colectiva de la comunidad."],
    ["Gabriel Román inventó la LSEC.", false, "El diccionario lleva su nombre como homenaje a su trayectoria; ninguna persona creó la lengua."],
    ["Aprender LSEC ayuda a reducir barreras comunicativas.", true, "Aprenderla contribuye a construir espacios más accesibles y a mejorar la participación."],

    // --- Elementos de las señas y alfabeto ---
    ["Un cambio pequeño en la configuración de la mano o en el movimiento puede cambiar el significado de una seña.", true, "Los parámetros trabajan en conjunto y una variación mínima puede distinguir una seña de otra."],
    ["Los componentes no manuales, como la expresión facial, son solo adornos que pueden ignorarse.", false, "Pueden cumplir funciones gramaticales y deben observarse al aprender una seña."],
    ["Para aprender una seña basta con copiar una fotografía estática.", false, "Los videos permiten observar el movimiento, la orientación y las expresiones que una foto no muestra."],
    ["Los videos ayudan a observar el movimiento y la expresión de una seña.", true, "Por eso conviene ver el video completo y no quedarse con una imagen aislada."],
    ["El alfabeto manual permite traducir cualquier oración letra por letra y reemplaza la gramática de la LSEC.", false, "La dactilología solo representa letras y no sustituye el vocabulario ni la gramática."],
    ["La dactilología es útil para deletrear nombres propios y siglas.", true, "Es un recurso complementario para precisar nombres, siglas o términos que no se conocen."],
    ["El abecedario manual de esta plataforma incluye fichas para CH, LL y RR.", true, "Tiene 30 fichas: las letras del abecedario y las combinaciones CH, LL y RR."],
    ["Al practicar la dactilología, hacerlo muy rápido y sin claridad es lo mejor para que te entiendan.", false, "La mano debe estar visible y las configuraciones, claras, sin acelerar innecesariamente."],
    ["Las flechas de las ilustraciones del glosario indican el movimiento de la seña.", true, "Muestran la dirección o trayectoria que sigue la mano al realizar la seña."],

    // --- Gramática, espacio y escritura ---
    ["El orden de las palabras del español es siempre idéntico al orden de los elementos en LSEC.", false, "La LSEC tiene gramática propia y no calca el orden del español."],
    ["El espacio frente al cuerpo puede usarse para establecer referencias a personas o lugares.", true, "El uso del espacio es un recurso gramatical para organizar el discurso."],
    ["La mirada puede ayudar a organizar la atención y el espacio compartido en una conversación en señas.", true, "La mirada forma parte de la comunicación visual y cumple funciones lingüísticas."],
    ["Una glosa es una transcripción completa de una seña.", false, "Es solo una etiqueta aproximada que no reproduce la forma visual ni toda la gramática."],
    ["Una glosa suele escribirse con una palabra del español en mayúsculas.", true, "Se usa para referirse de manera práctica a una seña durante la enseñanza y el análisis."],
    ["La LSEC tiene una ortografía alfabética estándar igual a la del español.", false, "Es una lengua visual-gestual y no cuenta con una ortografía alfabética equivalente."],
    ["Muchas personas sordas leen y escriben español, con trayectorias diversas.", true, "El español escrito puede ser segunda lengua o lengua adicional, con experiencias individuales distintas."],
    ["Los números y las fechas en LSEC se deducen siempre de la forma escrita del número.", false, "Se expresan con convenciones visuales que deben aprenderse en contexto y con fuentes confiables."],

    // --- Historia y recursos ---
    ["FENASEC ha impulsado el reconocimiento, la difusión y la enseñanza de la LSEC.", true, "FENASEC y otras organizaciones de la comunidad sorda han sido protagonistas de ese proceso."],
    ["El Diccionario Oficial de LSEC publicado en 2012 incluyó un CD interactivo como material complementario.", true, "Se publicó en dos tomos y con material complementario, según el Atlas Sordo."],
    ["El proyecto Mano a Mano buscó registrar señas utilizadas localmente en Ecuador.", true, "Lo inició la Asociación Ponce de León en Quito a comienzos de los años ochenta."],
    ["Los diccionarios y materiales audiovisuales reemplazan la interacción con la comunidad sorda.", false, "Son herramientas de consulta, no sustitutos del contacto con la comunidad lingüística."],
    ["Las fechas históricas pueden variar entre cronologías y publicaciones, por eso conviene contrastar fuentes.", true, "Diferenciar hechos documentados de interpretaciones evita difundir errores."],
    ["Las primeras iniciativas educativas para niños sordos marcan la fecha exacta del nacimiento de la LSEC.", false, "La historia educativa no debe confundirse con el nacimiento de la LSEC."],
    ["Existen variaciones regionales de la LSEC, por ejemplo entre zonas costeras y de montaña.", true, "El Atlas Sordo describe diferencias entre regiones, como ocurre en otras lenguas."],
    ["Si alguien usa una seña distinta a la que conoces, debes decirle automáticamente que está equivocado.", false, "Puede tratarse de una variante regional o comunitaria; conviene consultar el contexto."],
    ["La variación lingüística es normal en cualquier lengua.", true, "Puede relacionarse con la región, la edad, la educación, las redes sociales y las preferencias."],
    ["Una plataforma educativa debe diferenciar entre hechos documentados e interpretaciones.", true, "Así se evita presentar como seguro lo que todavía requiere investigación."],
    ["Para aprender vocabulario conviene inventar señas parecidas a las que ya conoces.", false, "Inventar señas difunde errores; es mejor consultar recursos confiables y personas competentes."],
    ["Para aprender vocabulario conviene observar el video completo y repetir con retroalimentación.", true, "Así se observan todos los parámetros y se corrige la práctica."],

    // --- Comunicación respetuosa ---
    ["Antes de iniciar una conversación conviene buscar la atención de la persona sorda de manera respetuosa.", true, "Hacerlo sin sorprenderla ni interrumpirla bruscamente facilita la comunicación."],
    ["Para llamar la atención de una persona sorda es adecuado sorprenderla bruscamente.", false, "Lo respetuoso es buscar su atención de forma que no la asuste."],
    ["Es correcto suponer que todas las personas sordas usan audífonos.", false, "No todas los usan; no debe darse por supuesto ningún apoyo."],
    ["Conviene preguntar antes de ofrecer ayuda, porque no todas las personas desean recibirla.", true, "Preguntar respeta la autonomía y evita suposiciones."],
    ["Cuando hay un intérprete, debes dirigirte a la persona sorda con quien conversas.", true, "El intérprete facilita la comunicación; la conversación es entre las personas."],
    ["La persona intérprete decide por la persona sorda lo que ella quiere decir.", false, "Interpretar es facilitar la comunicación fielmente, no decidir por nadie."],
    ["Exagerar los movimientos de la boca siempre mejora la comprensión.", false, "Hablar con naturalidad es mejor; exagerar puede dificultar la lectura labial."],
    ["Una iluminación adecuada ayuda a la comunicación visual.", true, "Permite ver con claridad el rostro y las manos."],
    ["En una conversación grupal, que varias personas hablen a la vez facilita que todos entiendan.", false, "Hablar en simultáneo dificulta seguir la conversación; conviene respetar turnos."],
    ["Respetar los turnos de participación ayuda a que un grupo sea más accesible.", true, "Permite seguir quién habla y participar en igualdad."],
    ["Hablar de una persona sorda delante de ella, como si no estuviera, es una conducta respetuosa.", false, "Debe incluirse a la persona en la conversación y dirigirse directamente a ella."],
    ["Es respetuoso dirigirse directamente a la persona sorda y no a quien la acompaña.", true, "Reconoce a la persona como protagonista de su propia comunicación."],
    ["Imponer una forma de comunicación a una persona sorda respeta su autonomía.", false, "Cada persona tiene preferencias; lo adecuado es preguntar y acordar."],
    ["Cada persona sorda puede preferir apoyos distintos: LSEC, escritura, lectura labial u otros.", true, "Las preferencias son individuales y deben consultarse."],
    ["La lectura labial permite entender todo lo que se dice.", false, "Muchas palabras se ven igual en los labios; no es un método completo ni igual para todos."],
    ["Reconocer un error al comunicarte y pedir aclaración permite continuar con respeto.", true, "Reparar el error y escuchar fortalece la convivencia."],

    // --- Inclusión, derechos y escuela ---
    ["La Constitución del Ecuador reconoce el acceso a formas alternativas de comunicación, incluida la lengua de señas.", true, "Es un reconocimiento vinculado a los derechos y a la participación."],
    ["La accesibilidad depende solo de la buena voluntad de las personas.", false, "Requiere intérpretes cualificados, información visual y participación de personas sordas."],
    ["Los subtítulos y los materiales visuales pueden contribuir a la accesibilidad comunicativa.", true, "Amplían las formas de acceder a la información."],
    ["Una escuela inclusiva se limita a enseñar algunas señas en una actividad aislada.", false, "Requiere oportunidades sostenidas, docentes preparados y comunicación accesible en clases y eventos."],
    ["Consultar a personas sordas al diseñar proyectos ayuda a responder a necesidades reales.", true, "Su participación evita decisiones basadas en suposiciones."],
    ["Los compañeros oyentes pueden aprender vocabulario básico de LSEC para acercarse y respetar a sus compañeros.", true, "Es un buen comienzo, aunque no sustituye intérpretes ni docentes especializados."],
    ["Aprender vocabulario básico reemplaza la enseñanza formal de la LSEC.", false, "Es un acercamiento inicial; la enseñanza formal requiere personas y recursos especializados."],
    ["Compartir los materiales con anticipación puede ayudar a que más estudiantes participen.", true, "Permite prepararse y reduce barreras de acceso a la información."],
    ["Las instrucciones visuales dificultan la participación de todos en una exposición.", false, "Las instrucciones visuales y escritas facilitan la participación de muchas personas."],
    ["La comunidad sorda es homogénea: todas sus integrantes piensan y se identifican igual.", false, "Sus integrantes tienen experiencias, identidades y preferencias distintas."],
    ["Las asociaciones, el arte y el deporte pueden ser espacios de pertenencia para la comunidad sorda.", true, "Son espacios importantes de participación y de transmisión de la cultura."],
    ["La identidad sorda puede relacionarse con la lengua, la comunidad y la historia compartida.", true, "No todas las personas la viven igual: conviene escuchar cómo cada una habla de sí misma."],
    ["Las decisiones sobre accesibilidad deben incluir la participación de las personas involucradas.", true, "Nada sobre las personas sordas debería decidirse sin ellas."],
    ["Burlarse de cómo se comunica una persona es una falta de respeto.", true, "Toda forma de comunicación merece respeto y sin burlas."],
    ["Un compañero oyente que conoce algunas señas puede sustituir a un intérprete.", false, "Saber algunas señas no sustituye a intérpretes ni a docentes especializados."],
    ["Si un material no es accesible para una persona, lo mejor es pedirle que se adapte sin cambiar nada.", false, "Lo adecuado es consultarle qué formato ayudaría y buscar una alternativa."]
  ];

  var MC = [
    // --- Fundamentos ---
    ["¿Qué tipo de lengua es la LSEC?", ["Una lengua natural visual-gestual", "Un código universal para todos los países", "Español representado con las manos"], "Es una lengua natural con recursos lingüísticos propios."],
    ["¿Qué significa que la LSEC sea una lengua visual-gestual?", ["Que la información se recibe por la vista y se produce con manos, rostro y cuerpo", "Que solo se usa con las manos, sin el rostro", "Que se transmite únicamente por escrito"], "La modalidad visual-gestual involucra manos, rostro y cuerpo."],
    ["¿Para qué se utiliza la LSEC?", ["Para la comunicación, la participación social, la educación y la expresión cultural", "Solo para celebraciones especiales", "Solo para deletrear nombres"], "Es una lengua completa que se usa en la vida cotidiana y en la escuela."],
    ["¿Qué barreras puede ayudar a reducir el aprendizaje de la LSEC?", ["Las barreras comunicativas", "Las barreras del clima", "Las barreras geográficas entre ciudades"], "Aprenderla contribuye a construir espacios más accesibles."],
    ["¿Por qué no se puede atribuir la LSEC a una sola persona?", ["Porque las lenguas naturales surgen del uso compartido de sus comunidades", "Porque nadie la utiliza", "Porque es una lengua muy reciente"], "La LSEC se desarrolla en la interacción de las personas sordas y sus comunidades."],

    // --- Elementos de una seña ---
    ["¿Cuál de estos es un componente no manual de una seña?", ["La expresión facial", "La orientación de la palma", "La forma de los dedos"], "La expresión facial y corporal son componentes no manuales."],
    ["¿Qué describe la «configuración» de una seña?", ["La forma que adoptan los dedos y la mano", "El lugar del cuerpo donde se hace", "La emoción de quien señala"], "La configuración es la forma de la mano al realizar la seña."],
    ["¿Qué describe la «ubicación» de una seña?", ["La zona del cuerpo o del espacio donde se realiza", "La forma de los dedos", "La velocidad de la conversación"], "La ubicación indica dónde se articula la seña."],
    ["¿Qué describe el «movimiento» de una seña?", ["La trayectoria, dirección o repetición del gesto", "La palabra en español que se usa", "El color de la ropa de quien señala"], "El movimiento es uno de los parámetros que distinguen unas señas de otras."],
    ["¿Qué puede pasar si cambias la orientación de la palma en una seña?", ["Puede cambiar el significado", "Nunca pasa nada", "La seña se convierte en dactilología"], "Un cambio pequeño en un parámetro puede modificar el significado."],
    ["¿Qué conviene observar al estudiar una seña en video?", ["Configuración, orientación, ubicación, movimiento y expresión facial", "Solo la ropa de quien señala", "Solo el fondo del video"], "Los parámetros funcionan en conjunto y los videos permiten verlos."],
    ["¿Por qué no basta con memorizar una imagen aislada de una seña?", ["Porque puede no mostrar el movimiento ni el contexto", "Porque las imágenes están prohibidas", "Porque las imágenes siempre son incorrectas"], "Una imagen estática es un apoyo, no una seña completa."],
    ["¿Qué función puede cumplir la expresión facial en una lengua de señas?", ["Aportar información gramatical y emocional", "Ninguna, es solo decoración", "Reemplazar siempre las manos"], "Los componentes no manuales forman parte de la lengua."],
    ["¿Cómo puede usarse el espacio en una lengua de señas?", ["Para establecer referentes, como personas o lugares", "Solo para decorar la conversación", "Para evitar moverse"], "El espacio visual ayuda a organizar el discurso."],

    // --- Alfabeto y escritura ---
    ["¿Qué es la dactilología?", ["Representar letras mediante configuraciones manuales", "Traducir oraciones completas automáticamente", "Un tipo de dibujo de las señas"], "Es el alfabeto manual, útil para deletrear."],
    ["¿Cuántas fichas tiene el abecedario manual de esta plataforma, incluyendo CH, LL y RR?", ["30", "27", "24"], "Son 30 fichas visuales."],
    ["¿Cuándo es especialmente útil la dactilología?", ["Para deletrear nombres propios, siglas o términos que requieren precisión", "Para reemplazar todo el vocabulario de la LSEC", "Para evitar aprender señas"], "Es un recurso complementario y no reemplaza el vocabulario."],
    ["¿Qué indican las flechas en fichas como la J o la LL?", ["Que la seña incluye movimiento", "Que la letra es mayúscula", "Que la imagen está incorrecta"], "Las flechas muestran la dirección del movimiento."],
    ["¿Qué es una glosa?", ["Una etiqueta escrita, a menudo en mayúsculas, para referirse a una seña", "Una seña completa", "Un tipo de diccionario en video"], "Es una referencia aproximada que no reproduce toda la seña."],
    ["¿Por qué la LSEC no tiene una ortografía igual a la del español?", ["Porque es una lengua visual-gestual sin escritura alfabética estándar", "Porque las personas sordas no pueden escribir", "Porque no es una lengua"], "Eso no significa que las personas sordas no escriban español."],
    ["¿Cómo conviene escribir el nombre de la lengua en un texto formal?", ["Lengua de Señas Ecuatoriana (LSEC) en la primera mención", "Lenguaje de gestos ecuatoriano", "Mímica ecuatoriana"], "Se usa el nombre completo y después la sigla."],
    ["¿Qué requiere aprender los números y las fechas en LSEC?", ["Aprenderlos en contexto con recursos confiables", "Copiar siempre la forma escrita del número", "Inventar las señas"], "Dependen del contexto y de la variante."],

    // --- Historia y recursos ---
    ["¿Quién impulsó en Quito actividades docentes con niños sordos desde 1940, según el Atlas Sordo?", ["Enriqueta Santillán", "Gabriel Román", "El Colegio Espejo"], "Son una de las primeras iniciativas educativas documentadas."],
    ["¿Qué proyecto, iniciado por la Asociación Ponce de León en Quito, buscó registrar señas locales?", ["Mano a Mano", "Atlas Sordo", "Diccionario Oficial"], "Mano a Mano comenzó a comienzos de los años ochenta."],
    ["¿Qué publicación de 1988 reunió fotografías y dibujos con glosas en español?", ["Lenguaje de Señas: Guía Básica sobre una Comunicación Especial", "El Diccionario Oficial de 2012", "El Atlas Sordo de Ecuador"], "Incluyó vocabulario de Quito y Guayaquil."],
    ["¿En qué año se publicó el Diccionario Oficial de Lengua de Señas Ecuatoriana?", ["2012", "1988", "1940"], "Se publicó en dos tomos con material complementario."],
    ["¿Cuántas entradas tiene el Diccionario Oficial, según el Atlas Sordo?", ["4.363", "1.200", "10.000"], "Es un dato registrado por el Atlas Sordo."],
    ["¿Qué entidad impulsó el diccionario web Gabriel Román?", ["CONADIS, con apoyo de FENASEC y la Universidad Tecnológica Indoamérica", "Un club deportivo", "Una editorial extranjera"], "Es un recurso web con gráficos y videos explicativos."],
    ["¿Por qué un diccionario ecuatoriano lleva el nombre de Gabriel Román?", ["Como homenaje a su trayectoria en el movimiento asociativo sordo", "Porque inventó la LSEC", "Porque fue su único autor"], "El homenaje no significa que haya creado la lengua."],
    ["¿Qué recurso se cita en la plataforma para documentar la historia y la variación de la LSEC?", ["El Atlas Sordo de Ecuador", "Una red social", "Un videojuego"], "Se recomienda contrastarlo con otras fuentes."],
    ["¿Qué diferencia describe el Atlas Sordo en la LSEC?", ["Diferencias entre zonas costeras y de montaña", "Ninguna, la LSEC es idéntica en todo el país", "Diferencias solo entre hombres y mujeres"], "Es un ejemplo de variación regional."],
    ["Dos personas usan señas distintas para un mismo concepto. ¿Qué conviene pensar?", ["Que puede ser variación regional o comunitaria", "Que una está equivocada", "Que ninguna usa LSEC"], "Una variante no debe calificarse automáticamente como incorrecta."],
    ["¿De qué puede depender la variación lingüística?", ["De la región, la edad, la educación y las redes sociales", "Solo del clima", "Solo de la ropa que se usa"], "Es normal en cualquier lengua."],
    ["¿Qué fuentes conviene consultar para ampliar la historia de la LSEC?", ["FENASEC, CONADIS, el Atlas Sordo y estudios académicos", "Rumores sin fuente", "Videos sin autoría"], "Conviene contrastar las fuentes."],
    ["¿Qué debe diferenciar una plataforma educativa al presentar historia?", ["Hechos documentados, interpretaciones y asuntos por investigar", "Solo leyendas populares", "Fechas inventadas para que sean exactas"], "Así se evita difundir errores."],
    ["¿Qué pueden hacer las asociaciones de personas sordas además de representar a la comunidad?", ["Fortalecer redes, promover la lengua y transmitir conocimientos entre generaciones", "Reemplazar a las escuelas", "Decidir cómo debe comunicarse cada persona"], "Son espacios comunitarios de encuentro y transmisión."],
    ["Ves dos videos con señas distintas para una misma idea. ¿Qué haces?", ["Contrastar las variantes, revisar el contexto y registrar la fuente", "Elegir una al azar", "Descartar las dos"], "Contrastar evita aprender solo una variante sin conocerla."],

    // --- Comunicación respetuosa ---
    ["Antes de iniciar una conversación con una persona sorda, ¿qué conviene?", ["Buscar su atención con respeto y colocarte de frente", "Tocarla bruscamente por detrás", "Gritar desde lejos"], "Busca atención sin sorprender y mantén visibles rostro y manos."],
    ["¿Qué ayuda a la comunicación visual?", ["Una iluminación que permita ver rostro y manos", "Hablar a contraluz", "Conversar en la oscuridad"], "La luz adecuada facilita ver rostro y manos."],
    ["Si una persona no comprende lo que dices, ¿qué es mejor?", ["Reformular, escribir o preguntar qué apoyo prefiere", "Repetir lo mismo más fuerte", "Rendirte y dejar de comunicarte"], "Ofrecer alternativas y preguntar respeta sus preferencias."],
    ["¿Cuál de estas afirmaciones es una suposición incorrecta?", ["Que todas las personas sordas leen los labios o usan audífonos", "Que cada persona puede tener preferencias distintas", "Que conviene preguntar cómo comunicarse"], "Las suposiciones pueden generar barreras."],
    ["¿Qué función cumple una persona intérprete?", ["Facilitar la comunicación entre personas que usan lenguas distintas", "Decidir por la persona sorda", "Hablar en lugar de ella cuando quiera"], "Interpretar es un trabajo especializado."],
    ["¿Qué se requiere para interpretar?", ["Preparación y competencia específicas", "Saber unas pocas señas", "Solo buena voluntad"], "Saber algunas señas no convierte automáticamente en intérprete."],
    ["¿Qué ayuda a que un grupo se comunique mejor?", ["Turnos claros y señalar quién va a hablar", "Que todos hablen en simultáneo", "Cambiar de tema rápidamente"], "Respetar los turnos facilita seguir la conversación."],
    ["¿Qué actitud es respetuosa al hablar de una persona sorda?", ["Referirte a ella con respeto, sin burlas ni lástima", "Hablar de ella como si no estuviera presente", "Imitar su forma de señar"], "Debe incluirse a la persona y reconocer su dignidad."],
    ["No conoces la seña de una palabra que quieres comunicar. ¿Qué es adecuado?", ["Deletrear si corresponde y consultar un recurso confiable o preguntar", "Inventar una seña", "Dejar de comunicarte"], "La dactilología puede ayudar y la consulta evita errores."],
    ["¿Por qué es mejor preguntar «¿cómo prefieres comunicarte?» que suponerlo?", ["Porque reconoce la autonomía de la persona", "Porque es más rápido", "Porque evita hablar con ella"], "Preguntar evita imponer una forma de comunicación."],
    ["Un estudiante sordo llega nuevo al curso. ¿Cuál es una buena primera acción?", ["Presentarte, preguntarle cómo prefiere comunicarse y acordar apoyos", "Evitar acercarte", "Hablarle muy fuerte"], "La participación comienza con el respeto y la consulta."],
    ["Un docente explica de espaldas mientras escribe en la pizarra. ¿Qué es adecuado?", ["Pedir con respeto que se coloque de frente al hablar o que repita la explicación", "Quedarte callado", "Interrumpir con gritos"], "Mantener visible el rostro facilita la comunicación visual."],
    ["¿Qué haces si cometes un error al comunicarte con una persona sorda?", ["Reconocerlo y pedir aclaración", "Cambiar de tema sin decir nada", "Culpar a la otra persona"], "Reconocer el error permite continuar con respeto."],

    // --- Accesibilidad, derechos, escuela y cultura ---
    ["¿Qué reconoce la Constitución ecuatoriana, según esta plataforma?", ["El acceso a formas alternativas de comunicación, incluida la lengua de señas", "Que solo debe usarse el español", "Nada sobre comunicación"], "Está vinculado a los derechos y la participación."],
    ["¿Qué requiere la accesibilidad más allá de la buena voluntad?", ["Intérpretes cualificados, información visual y participación de personas sordas", "Ayuda improvisada", "Solo carteles"], "Es una condición para ejercer derechos."],
    ["¿Cuál es un ejemplo de accesibilidad visual?", ["Subtítulos y materiales visuales", "Instrucciones solo orales", "Audio sin ningún apoyo"], "Amplían las formas de acceder a la información."],
    ["Un video de clase no tiene subtítulos y un compañero lo necesita. ¿Qué haces?", ["Buscar una versión subtitulada o un apoyo alternativo, consultándole", "Continuar sin hacer nada", "Pedirle que no participe"], "Consultar a la persona ayuda a encontrar un formato adecuado."],
    ["¿Cómo se puede hacer más accesible una exposición escolar?", ["Usar apoyos visuales, compartir materiales con anticipación y acordar apoyos", "Hablar rápido sin materiales", "Evitar las preguntas del público"], "Los apoyos visuales y la anticipación favorecen la participación."],
    ["¿Qué puede hacer una escuela para ser realmente inclusiva?", ["Crear oportunidades sostenidas, consultar a personas sordas y preparar a los docentes", "Enseñar señas un solo día", "Evitar el tema"], "La inclusión requiere acciones continuas."],
    ["¿Qué pueden hacer los compañeros oyentes para ayudar a la inclusión?", ["Aprender vocabulario básico con recursos confiables y respetar a quienes usan LSEC", "Fingir que interpretan", "Evitar a sus compañeros sordos"], "Aprender vocabulario ayuda, pero no sustituye a intérpretes ni docentes especializados."],
    ["¿Qué significa que las decisiones incluyan a las personas involucradas?", ["Que ellas participan y opinan sobre lo que las afecta", "Que solo opinan quienes organizan", "Que se decide sin consultar"], "La participación evita decisiones basadas en suposiciones."],
    ["¿Qué puede hacer un docente para que todos puedan seguir la clase?", ["Mantenerse visible de frente, apoyar con material visual y verificar la comprensión", "Dar la espalda al grupo al explicar", "Evitar las preguntas"], "La comunicación visual se favorece con rostro visible y apoyos."],
    ["¿Qué papel deben tener las personas sordas en proyectos sobre la LSEC?", ["Ser consultadas y reconocidas como referentes", "Observar sin opinar", "No participar"], "Son quienes conocen y desarrollan la lengua."],
    ["¿Por qué decimos que la comunidad sorda no es homogénea?", ["Porque sus integrantes tienen experiencias, identidades y preferencias distintas", "Porque todos piensan igual", "Porque no existen asociaciones"], "Es importante escuchar cómo cada persona habla de sí misma."],
    ["¿Qué puede formar parte de la cultura de la comunidad sorda?", ["La lengua, las asociaciones, el arte, el deporte y los encuentros comunitarios", "Solo ceremonias oficiales", "Nada, porque no tiene cultura propia"], "Son espacios de pertenencia y participación."],
    ["¿Cuál de estas afirmaciones es un mito sobre las lenguas de señas?", ["Que la lengua de señas es mímica", "Que existen distintas lenguas de señas y variantes", "Que tienen gramática propia"], "La LSEC es una lengua natural con estructura."],
    ["¿Cuál de estas afirmaciones es una realidad sobre las lenguas de señas?", ["Existen distintas lenguas y variantes en diferentes países y comunidades", "Todas son iguales en el mundo", "Son una mímica improvisada"], "Cada lengua tiene su historia y convenciones."],
    ["¿Qué ayuda una agenda visual en una clase?", ["Anticipar y comprender las actividades de la jornada", "Reemplazar al docente", "Evitar que se hagan preguntas"], "Es un apoyo visual que favorece la participación."],
    ["¿Qué buen hábito conviene al practicar señas?", ["Practicar sin forzar posturas y comparar con el modelo", "Practicar aunque duela", "No compararte nunca con el modelo"], "Cuidar el cuerpo y recibir retroalimentación mejora el aprendizaje."],
    ["¿Qué uso de la tecnología ayuda a aprender LSEC?", ["Ver videos de modelos competentes y practicar con retroalimentación", "Memorizar capturas sin contexto", "Confiar en traducciones automáticas sin verificar"], "Los videos y la retroalimentación ayudan a observar el movimiento."],
    ["Una seña que ves difiere del diccionario. ¿Qué haces?", ["Considerar la variación y el contexto y consultar a personas competentes", "Corregir a quien señala con burla", "Ignorar a la persona"], "Puede tratarse de una variante legítima."],
    ["¿Por qué es importante mantener visibles el rostro y las manos al comunicarte?", ["Porque son parte esencial de la comunicación visual", "Porque así se ve mejor la ropa", "Porque no tiene ninguna importancia"], "El rostro y las manos aportan información lingüística."],
    ["¿De qué asociación actual es antecedente la Sociedad de Sordos Adultos Fray Luis Ponce de León, consolidada en 1978?", ["La Asociación de Personas Sordas de Pichincha", "Una editorial escolar", "Un club deportivo extranjero"], "Es un antecedente de la organización de personas sordas en Quito."]
  ];

  function toVF(item) {
    return {
      category: "Banco ampliado",
      type: "Verdadero o falso",
      q: item[0],
      a: ["Verdadero", "Falso"],
      correct: item[1] ? 0 : 1,
      why: item[2]
    };
  }

  function toMC(item) {
    return {
      category: "Banco ampliado",
      type: "Opción múltiple",
      q: item[0],
      a: item[1].slice(),
      correct: 0,
      why: item[2]
    };
  }

  window.extraActivityQuestions = { vf: VF.map(toVF), mc: MC.map(toMC) };
})();
