---
title: "Proteger tus datos en línea: filtraciones, cuentas comprometidas y copias de seguridad"
description: "Comprobar si tus datos se han filtrado, reconocer una cuenta comprometida, recuperar el control en el orden correcto, y salvaguardar lo que no puede perderse."
date: "2026-08-15"
category: "securite-en-ligne"
level: "debutant"
draft: false
image: "/img/articles/proteger-ses-donnees-en-ligne.jpg"
imageCredit: "Ilustración generada por IA (Midjourney)"
fiche: "/fiches/domaformalis-fiche-04-compte-compromis-ES.pdf"
slug: "proteger-tus-datos-en-linea"
tags: ["ciberseguridad", "filtración de datos", "cuenta comprometida", "copia de seguridad"]
---

# Proteger tus datos en línea: filtraciones, cuentas comprometidas y copias de seguridad

## Objetivo de aprendizaje

Después de leer este artículo, sabrás comprobar si tus datos han aparecido en una filtración, reconocer las señales de una cuenta comprometida, recuperar el control en el orden correcto, y montar la copia de seguridad que hace recuperable un ataque, desde hoy mismo.

---

## Una situación que quizá reconozcas

Recibes una notificación: un dispositivo desconocido acaba de conectarse a una de tus cuentas. No sabes cuándo ocurrió, ni cómo, ni a qué tiene ahora acceso esa persona. Cambias tu contraseña, pero ¿es suficiente? ¿Ha descargado ya tus archivos? ¿Leído tus mensajes? ¿Usado lo que encontró en esa primera cuenta para abrir otra?

Los tres primeros artículos de este itinerario te enseñaron a prevenir: [los buenos reflejos](/es/articles/evitar-estafas-en-linea), [la detección del phishing](/es/articles/reconocer-un-correo-de-phishing), [la reducción de tu exposición](/es/articles/proteger-tu-vida-privada-en-linea). Este cubre lo que ninguna prevención elimina del todo: **el día en que ocurre de todos modos.** Reaccionar rápido y en el orden correcto marca la diferencia entre un incidente y una catástrofe.

---

## Primero, entender: la filtración (casi) nunca viene de ti

Cuando tus credenciales circulan, rara vez es porque te hayan «hackeado» personalmente. Es porque una empresa donde tenías una cuenta ha sufrido una **violación de datos**: y ocurre con regularidad, también a las más grandes. Las combinaciones de correo + contraseña robadas se revenden y se prueban automáticamente en cientos de otros servicios: banco, correo, redes sociales. Es el **credential stuffing** (relleno de credenciales).

Dos consecuencias prácticas:

**1.** No puedes impedir las filtraciones: ocurren en casa de otros. Solo puedes conseguir que una filtración comprometa una única cuenta: eso es exactamente lo que hacen las contraseñas únicas ([artículo 1](/es/articles/evitar-estafas-en-linea)).

**2.** Puedes saber si estás afectado, es la sección siguiente.

---

## Comprobar si tus datos se han filtrado — 5 minutos

**[haveibeenpwned.com](https://haveibeenpwned.com)** es un servicio gratuito y reconocido que recopila las violaciones de datos públicas. Introduce tu dirección de correo: te dice en qué filtraciones aparece, en qué fecha, y qué datos estaban afectados (contraseñas, teléfono, dirección…).

**Cómo leer el resultado:** aparecer en una filtración de 2019 no es una urgencia en sí. Es una información. La pregunta es: *¿la contraseña de ese servicio sigue en uso en algún sitio?* Si es así, cámbiala en todas partes donde sirva, inmediatamente.

**Automatiza después:** tu gestor de contraseñas (Bitwarden: «Informes»; navegadores Chrome/Firefox: comprobación integrada) te avisa cuando una de tus contraseñas aparece en una filtración conocida. Activa esa comprobación una vez, y trabaja para ti en continuo.

---

## Reconocer una cuenta comprometida: las 4 señales

1. **Una conexión desde un dispositivo o lugar desconocido**. Las notificaciones de «nuevo inicio de sesión» no son ruido: léelas.
2. **Correos de restablecimiento que no has pedido**: alguien está probando tus puertas.
3. **Mensajes enviados que no has escrito**: tus contactos reciben enlaces «de tu parte».
4. **La señal que casi nadie comprueba: reglas creadas en tu buzón.** Un atacante que accede a tu correo suele instalar una **regla de reenvío automático** (copia de tus correos hacia su dirección) o filtros que borran las alertas de seguridad, para conservar el acceso incluso después de tu cambio de contraseña. Ajustes → Filtros y reenvío: si no configuraste nada, esa lista debe estar vacía.

---

## El protocolo de recuperación — en este orden

El orden importa: asegurar la cuenta 4 antes que la cuenta 1 deja la puerta principal abierta.

**Paso 1 — El correo primero, siempre.** Es la llave maestra: quien lo controla puede restablecer todo lo demás. Aunque parezca afectada otra cuenta, empieza por comprobar el correo.

**Paso 2 — Cambia la contraseña Y cierra todas las sesiones.** Cambiar la contraseña no basta: las sesiones ya abiertas del atacante siguen siendo válidas. Busca «Cerrar sesión en todos los dispositivos» (todos los grandes servicios lo ofrecen en sus ajustes de seguridad).

**Paso 3 — Inspecciona las opciones de recuperación y las reglas.** Correo de respaldo, número de teléfono: ¿son realmente los tuyos? Reglas de reenvío y filtros: ¿nada desconocido? Aquí es donde el atacante se instala para durar.

**Paso 4 — Activa la 2FA y trata las cuentas vinculadas.** Verificación en dos pasos en la cuenta recuperada, y después cambia la contraseña de todas las cuentas que compartían la misma. Y de las accesibles desde el correo comprometido.

**Paso 5 — Avisa a quien haga falta.** Datos bancarios expuestos: bloqueo inmediato. Mensajes enviados en tu nombre: avisa a tus contactos (no hagáis clic en mis últimos mensajes). Y pide ayuda: en España, la línea gratuita **017** de INCIBE te orienta según tu situación, todos los días del año.

---

## La última línea de defensa: la copia de seguridad

Todo lo anterior protege tus cuentas. Quedan tus **datos** (fotos, documentos, trabajo) que un ransomware, un robo o una simple avería puede hacer desaparecer. La regla simplificada, llamada **3-2-1**:

- **Dos copias además del original**: una en una nube de confianza (sincronización automática), otra en un disco externo.
- **El disco externo permanece desconectado** fuera de las copias: un disco siempre enchufado es cifrado por el ransomware al mismo tiempo que el ordenador.
- **Prueba una restauración una vez al año.** Una copia nunca probada es una esperanza, no una copia de seguridad.

Un archivo con copia no puede ser tomado como rehén ni perderse. Es la medida que convierte el peor escenario en un mal recuerdo.

---

## Lo que de verdad importa

**1. Sabe si te has filtrado.** haveibeenpwned una vez, después las alertas automáticas de tu gestor. No se reacciona a lo que se ignora.

**2. En caso de compromiso: correo primero, sesiones cerradas, reglas comprobadas.** Los tres gestos que el atacante espera que olvides.

**3. Copia en 3-2-1.** La única protección que sigue funcionando cuando todo lo demás ha fallado.

---

## Un método sencillo para empezar

**Esta semana:** pasa tu dirección principal (y la secundaria) por haveibeenpwned. Cambia toda contraseña filtrada que siga en servicio. Activa las alertas de filtración de tu gestor.

**La semana que viene:** abre los ajustes de seguridad de tu correo: dispositivos conectados (elimina el desconocido), opciones de recuperación (verifícalas), reglas de reenvío (lista vacía o conocida).

**Este mes:** monta la copia 3-2-1: sincronización en la nube + primera exportación a disco externo, disco guardado desenchufado.

**Qué significa «suficientemente bien»:**

- **Principiante**: comprobación en haveibeenpwned hecha, contraseñas filtradas cambiadas, dispositivos conectados al correo revisados
- **Intermedio**: alertas de filtración automáticas activas, protocolo de recuperación conocido (la ficha está impresa en algún sitio), copia en la nube en marcha
- **Avanzado**: copia 3-2-1 completa con prueba de restauración anual, revisión periódica de los registros de acceso de tus cuentas críticas

---

## Una nota honesta

Hay algo desagradable en descubrir tu dirección en seis filtraciones de datos. Y sin embargo es el caso de la mayoría de los internautas veteranos, y no es culpa de ninguno de ellos. La seguridad digital no es un estado que se alcanza: es la capacidad de encajar un incidente sin que se convierta en catástrofe.

Con contraseñas únicas, un correo blindado y una copia probada, una filtración de datos se convierte en lo que debería ser: un correo informativo, no una crisis.

---

## Para ir más lejos

📄 **[Descarga la ficha «Cuenta comprometida: el protocolo»](/fiches/domaformalis-fiche-04-compte-compromis-ES.pdf)** — los 5 pasos en el orden correcto, para imprimir antes de necesitarlos.

📘 **[Recibe la guía completa «Internet y estafas»](/es/membres)** — nuestra guía detallada, gratuita, enviada por correo con una simple inscripción.

Este artículo cierra el itinerario **Seguridad en Internet**: [1. Evitar estafas](/es/articles/evitar-estafas-en-linea) · [2. Reconocer el phishing](/es/articles/reconocer-un-correo-de-phishing) · [3. Reducir tu exposición](/es/articles/proteger-tu-vida-privada-en-linea) · 4. Reaccionar a las filtraciones — estás aquí.
