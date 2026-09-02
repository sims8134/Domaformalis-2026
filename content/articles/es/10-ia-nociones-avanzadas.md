---
title: "IA: bajo el capó — 5 nociones avanzadas que cambian tu uso"
description: "Cómo aprende un modelo, por qué «olvida», de dónde vienen sus sesgos, por qué dos respuestas difieren: cinco nociones divulgadas que explican los comportamientos que constatas — y cómo sacarles partido."
date: "2026-08-21"
category: "ia"
level: "debutant"
draft: false
image: "/img/articles/ia-notions-avancees.jpg"
imageCredit: "Ilustración generada por IA (Midjourney)"
fiche: "/fiches/domaformalis-fiche-10-ia-sous-le-capot-ES.pdf"
slug: "ia-nociones-avanzadas"
tags: ["inteligencia artificial", "IA generativa", "funcionamiento de la IA", "cultura digital"]
---

# IA: bajo el capó — 5 nociones avanzadas que cambian tu uso

## Objetivo de aprendizaje

Después de leer este artículo, entenderás cinco nociones del funcionamiento de los asistentes de IA (el aprendizaje por ajuste de miles de millones de parámetros, los tokens, el papel de los datos de entrenamiento, la ventana de contexto y la generación probabilística), sin una línea de código, y sabrás exactamente qué cambia cada una en tu forma de usarlos.

---

## Una situación que quizá reconozcas

Usas un asistente de IA desde hace unos meses. Has integrado [los reflejos básicos](/es/articles/ia-fundamentos): verificar los hechos, proteger tus datos, formular con precisión. Pero algunos comportamientos siguen intrigándote: ¿por qué da dos respuestas distintas a la misma pregunta? ¿Por qué «olvida» lo que dijiste veinte mensajes antes? ¿Por qué es brillante en un tema y extrañamente malo en otro, a veces más sencillo?

Estos comportamientos no son fallos: son consecuencias directas de cómo están construidos estos sistemas. Entenderlos (sin hacerse informático) transforma tu uso: dejas de sufrir las rarezas, las anticipas.

---

## Las 5 nociones

### Noción 1 — El modelo no es una base de datos: es un ajuste de miles de millones de botones

Un modelo de IA es, en el fondo, una inmensa función matemática llena de **parámetros**: imagina miles de millones de pequeños botones de ajuste. Durante el entrenamiento se le muestran enormes cantidades de texto, y un mecanismo de ajuste gira millones de veces: el modelo produce una salida, se mide la distancia con lo esperado, y cada botón se gira ligeramente en la dirección que reduce el error. Repetido a gran escala, este proceso hace emerger una capacidad general de producir lenguaje coherente.

**Qué cambia para ti:** no hay **ningún archivo** en alguna parte donde tu pregunta vaya a buscar «la» respuesta. El modelo no consulta nada: genera, a partir de regularidades memorizadas en sus ajustes. Por eso puede restituir mal un hecho conocido, mezclar dos temas vecinos o inventar un detalle plausible: reconstruye, no recopia. La verificación de los hechos importantes ([el reflejo n.º 1 de los fundamentos](/es/articles/ia-fundamentos)) deriva directamente de esta arquitectura.

---

### Noción 2 — No lee palabras: lee tokens

Antes de procesar tu texto, el modelo lo trocea en **tokens**: fragmentos que a veces corresponden a una palabra entera, a veces a un trozo de palabra, a veces a un signo de puntuación. «Hola» puede ser un token; una palabra rara o inventada se cortará en varios.

**Qué cambia para ti:** explica una familia entera de debilidades sorprendentes. Contar las letras de una palabra, manipular anagramas, jugar con la ortografía: el modelo no «ve» las letras individuales, ve fragmentos, de ahí errores en tareas que un niño resuelve. Lo mismo con las palabras muy raras, los nombres propios inusuales o el vocabulario técnico estrecho: mal troceados, mal dominados. El reflejo práctico: cuando una respuesta descarrila sobre un término preciso, **reformula con palabras más corrientes**, cambias el troceado, y a menudo el resultado.

---

### Noción 3 — Los datos de entrenamiento fijan el techo — y los sesgos

«Datos mediocres, resultados mediocres» no es un eslogan: es una restricción estructural. Todo lo que el modelo sabe hacer viene de sus datos de entrenamiento, y hereda de ellos tres propiedades:

- **Lo abundante en los datos se domina bien**; lo raro, mal. De ahí la paradoja que has constatado: excelente en un tema de gran público, frágil en tu nicho profesional. Es precisamente en los temas raros donde las alucinaciones se multiplican, con el mismo aplomo.
- **Lo reciente falta**: los datos se detienen en una fecha ([la noción de corte vista en los fundamentos](/es/articles/ia-fundamentos)).
- **Los sesgos de los textos humanos se convierten en los del modelo.** Estereotipos, puntos de vista dominantes, desequilibrios de representación presentes en los textos de origen se encuentran, atenuados o no, en las respuestas.

**Qué cambia para ti:** calibra tu confianza según la rareza del tema. Cuanto más específica tu pregunta, más se impone la verificación. Y ten presente que la respuesta «estándar» de la IA refleja el punto de vista mayoritario de sus datos, no una verdad neutra: en los temas de sociedad, pide explícitamente las otras perspectivas.

---

### Noción 4 — La ventana de contexto: por qué «olvida»

Un modelo no tiene memoria en el sentido humano. En cada mensaje, relee el conjunto de la conversación (tu historial completo le es reenviado), y genera la continuación. Pero esta relectura tiene un tamaño máximo: la **ventana de contexto**. Cuando la conversación se alarga mucho, el principio acaba saliendo de la ventana, o pesando menos en la generación.

**Qué cambia para ti:** tres hábitos concretos. **Una conversación = un tema**: empieza una conversación nueva cuando cambies de tarea, en lugar de apilar. **Vuelve a dar el contexto esencial** cuando un intercambio se alarga («recuerda: trabajamos sobre X con la restricción Y»). Y para los documentos largos, no pidas todo de golpe: trabaja por secciones. Lo que parecía distracción es un límite mecánico, y se sortea muy bien una vez conocido.

---

### Noción 5 — Una máquina de probabilidades: por qué dos respuestas difieren

El modelo genera su respuesta trozo a trozo, eligiendo en cada paso entre las continuaciones más probables, con una parte de azar voluntaria, regulada por lo que los diseñadores llaman la «temperatura». Dos consecuencias directas: la misma pregunta puede producir dos respuestas distintas, y la formulación de tu petición desplaza las probabilidades. Y por tanto el resultado.

Hay una lección más profunda detrás: un sistema de IA optimiza **la medida que se le ha dado**, no tu intención. El ejemplo clásico en aprendizaje automático: con datos donde el 95 % de los casos son «positivos», un modelo que responde siempre «positivo» alcanza el 95 % de acierto, puntuación excelente, sistema perfectamente inútil. Los diseñadores se pasan la vida eligiendo las buenas medidas; tú, como usuario, ves su efecto: el modelo apunta a lo *plausible y satisfactorio en promedio*, no a lo verdadero-para-ti.

**Qué cambia para ti:** volver a plantear una pregunta importante, o reformularla desde dos ángulos, no es un capricho. Es una estrategia legítima de muestreo. Si dos formulaciones dan respuestas incompatibles, acabas de localizar una zona de incertidumbre del modelo: exactamente ahí es donde hay que verificar en otra parte.

---

## Lo que de verdad importa

**1. Un generador entrenado, no una enciclopedia.** Todos los comportamientos extraños (alucinaciones, olvidos, variación) derivan de esta sola idea. Sustituye con ventaja a decenas de reglas aprendidas de memoria.

**2. El contexto es tu palanca n.º 1.** Ventana de contexto, formulación, troceado: lo que pones en la conversación moldea lo que sale, mucho más que cualquier ajuste.

**3. La variación es información.** Respuestas que cambian de una formulación a otra señalan la incertidumbre del modelo. Úsala como detector: donde varía, se verifica.

---

## Un método sencillo: 3 experimentos, sin una línea de código

La mejor forma de anclar estas nociones es constatarlas tú mismo, el equivalente para usuarios del «rómpelo deliberadamente» de los ingenieros:

**Experimento 1 — La ventana.** En una conversación ya larga, pide: «Recuérdame con precisión mi primera pregunta.» Observa lo que vuelve, y lo que se ha diluido. Verás el límite de contexto en acción.

**Experimento 2 — La variación.** Haz tres veces la misma pregunta factual no trivial (conversaciones nuevas), y una cuarta vez reformulada. Compara: lo estable es probablemente sólido; lo que varía, a verificar.

**Experimento 3 — El techo de los datos.** Haz una pregunta sobre un tema muy general, y luego una de igual dificultad sobre tu nicho profesional. Verifica ambas respuestas: constatarás que el aplomo del tono, en cambio, no cambia, la demostración definitiva de que «el aplomo no es una prueba».

**Qué significa «suficientemente bien»:**

- **Principiante**: sabes explicar con tus palabras por qué la IA no es una base de datos, y empiezas una conversación nueva con cada tema nuevo
- **Intermedio**: reformulas cuando un término bloquea, calibras tu confianza según la rareza del tema, y usas la variación como detector de incertidumbre
- **Avanzado** (sabes explicar a otra persona las cinco nociones y sus consecuencias prácticas) la verdadera prueba de comprensión

---

## Una nota honesta

Este artículo asume sus simplificaciones: el funcionamiento real de estos sistemas es objeto de investigación activa, y los propios especialistas siguen debatiendo qué significa «entender» para un modelo. Pero las cinco nociones presentadas aquí son estructurales: seguirán siendo válidas sean cuales sean los modelos futuros, porque describen la familia de arquitectura, no un producto.

Y si este viaje bajo el capó te ha dado ganas de llegar hasta el código (construir una pequeña red tú mismo, entrenar un primer modelo) es un excelente proyecto de aprendizaje. Simplemente no es un requisito: todo lo anterior basta para hacer de ti un usuario claramente más lúcido que la media.

---

## Para ir más lejos

📄 **[Descarga la ficha «IA: bajo el capó»](/fiches/domaformalis-fiche-10-ia-sous-le-capot-ES.pdf)** — las 5 nociones, sus consecuencias prácticas y los 3 experimentos, en una página A4.

📘 **[Recibe nuestra guía de IA cuando salga](/es/membres)** — inscríbete y sé avisado en cuanto se publique.

Este artículo es el segundo del itinerario **Inteligencia artificial**. Anterior: [entender la IA — los fundamentos](/es/articles/ia-fundamentos). La serie se enriquecerá [el equilibrio digital](/es/articles/equilibrio-digital-recuperar-el-control).
