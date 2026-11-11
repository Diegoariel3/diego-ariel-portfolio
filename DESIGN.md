---
name: Diego Ariel
description: Portafolio editorial de diseño y desarrollo web
colors:
  ink: "#0e0e0e"
  paper: "#edeae3"
  muted: "#aaa69e"
  accent: "#ff6a36"
  rule: "#393835"
typography:
  display:
    fontFamily: "Sofia, 'Arial Narrow', sans-serif"
    fontSize: "clamp(100px, 22.5vw, 440px)"
    fontWeight: 900
    lineHeight: 0.76
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sofia, 'Arial Narrow', sans-serif"
    fontSize: "clamp(35px, 4vw, 66px)"
    fontWeight: 900
    lineHeight: 1
  title:
    fontFamily: "Sofia, 'Arial Narrow', sans-serif"
    fontSize: "32px"
    fontWeight: 900
    lineHeight: 1.1
  manifesto:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "clamp(32px, 5.4vw, 82px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.05em"
  nav:
    fontFamily: "Hanken, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.08em"
spacing:
  gutter: "clamp(20px, 2.7vw, 52px)"
  project-column-gap: "40px"
  project-row-gap: "80px"
  link-gap: "20px"
components:
  text-link:
    textColor: "{colors.paper}"
  text-link-accent:
    textColor: "{colors.accent}"
  navigation-link:
    textColor: "{colors.paper}"
    typography: "{typography.nav}"
    padding: "0 28px"
  navigation-link-hover:
    textColor: "{colors.accent}"
  copy-email:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "0"
  copy-email-hover:
    textColor: "{colors.paper}"
  mobile-menu:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    padding: "0 {spacing.gutter}"
  project-caption:
    textColor: "{colors.paper}"
    padding: "18px 0 0"
  service-row:
    textColor: "{colors.paper}"
    padding: "30px 0"
---

# Design System: Diego Ariel

## Overview

**Creative North Star: "El trabajo es la prueba"**

Un archivo editorial con presencia de estudio: negro tinta, marfil y una sola voz naranja. La propuesta editorial 1 aprobada por Diego se expresa con tipografía extra condensada monumental, reglas finas y capturas reales de sus webs.

La superficie es plana y rectangular; la escala tipográfica y las imágenes sostienen la jerarquía. El movimiento descubre letras, sustituye texto dentro de máscaras y desplaza imágenes con el scroll. La misma lectura permanece disponible con movimiento reducido.

**Key Characteristics:**
- Tipografía monumental condensada frente a texto de lectura sobrio.
- Capturas reales como evidencia visual, con sus colores propios.
- Superficies planas, reglas finas y alineaciones estrictas.
- Naranja para contacto, foco y respuesta interactiva.
- Movimiento de máscaras y scroll con alternativa reducida.

Este documento fija el sistema implementado en `src/styles.css` y `src/main.jsx`; sustituye el seed provisional. La composición concreta de la propuesta elegida sigue en `.impeccable/surface.md`. Los tokens del frontmatter son normativos; las excepciones responsivas y el movimiento se registran debajo y en `.impeccable/design.json`.

## Colors

Una base de tinta y marfil crea contraste editorial; el naranja dirige la atención hacia la conversación y la interacción.

### Primary

- **Naranja de contacto** (`accent`): enlaces de contacto, titular final, indicador de proyecto, selección y foco visible.

### Neutral

- **Negro tinta** (`ink`): fondo general, navegación y etiquetas superpuestas a las capturas.
- **Marfil** (`paper`): texto principal y títulos.
- **Piedra** (`muted`): descripciones, categorías, notas y controles secundarios.
- **Regla cálida** (`rule`): separadores de navegación, proyectos, servicios y secciones.

**The La voz naranja Rule.** Reservar el acento para contacto, foco y señales interactivas; las capturas conservan su propia paleta.

Los fondos de reserva de imágenes y el color transitorio del manifiesto son valores locales de implementación, no nuevos colores de marca.

## Typography

**Display Font:** Sofia Sans Extra Condensed, expuesta como `Sofia`, con `'Arial Narrow', sans-serif` de respaldo. Archivo local de peso (900).

**Body Font:** Hanken, con `Arial, sans-serif` de respaldo. Hay archivos locales de pesos (400) y (600); los roles de lectura actuales usan (400). No hay una familia monoespaciada independiente.

La tipografía de titulares es estrecha, mayúscula y de gran presencia. Hanken abre espacio para lectura, categorías y navegación; no se impone una escala modular que el código no contiene.

### Hierarchy

- **Display:** nombre monumental en el inicio; toma el token `display`. En móvil pasa a (25vw), interlínea (.92) y tracking (-.04em); desde (1800px) usa (25vw). En escritorio el contenedor interior se estira verticalmente (1.03).
- **Headline:** encabezado de proyectos; toma `headline`. En móvil usa (37px) e interlínea (.98). El encabezado de presentación tiene su propia escala (clamp(44px, 6.2vw, 100px)), interlínea (.94) y (52px) en móvil.
- **Title:** servicios; toma `title`, con tamaño (30px) en móvil. Los títulos de proyectos usan (clamp(32px, 3vw, 48px)) y (36px) en móvil.
- **Manifesto:** texto expresivo de lectura en Hanken; toma `manifesto`, con ancho máximo (22ch). En móvil usa (38px), tracking (-.03em) y ancho (19ch).
- **Body:** descripciones y servicios; toma `body`. Los proyectos limitan el párrafo a (44ch); en móvil usan (15px) e interlínea (1.55). El texto de presentación usa (19px), interlínea (1.65) y máximo (43ch).
- **Label / Nav:** categorías de procedencia en mayúsculas y enlaces de navegación. Los tokens `label` y `nav` conservan sus distintos espaciados. La etiqueta de procedencia baja a (10px) en móvil.
- **Contact display:** Sofia en naranja, tamaño (clamp(110px, 24vw, 440px)), interlínea (1) y tracking (-.03em); en móvil usa (20.5vw). La máscara interior ajusta la interlínea a (.88).

**The La doble escala Rule.** Sofia construye la presencia y los títulos; Hanken sostiene la lectura, los metadatos y la navegación.

## Layout

Las secciones comparten el gutter fluido del frontmatter. No existe un contenedor global de ancho máximo: nombre, líneas y capturas se relacionan con los bordes de la ventana. La cabecera mide (64px); en móvil, (62px).

La cuadrícula de proyectos usa columnas (1.16fr 1fr), con los dos gaps normativos del frontmatter. Los proyectos pares se desplazan hacia abajo (110px). Desde (701px), un último proyecto impar ocupa ambas columnas con ancho (62%) y se alinea a la derecha. Las áreas de presentación comparten el reparto (1.16fr 1fr); los servicios usan una composición (1fr 1.7fr).

- **Hasta 1100px:** desaparece la nota de cabecera, se reduce el gap de columnas a (24px) y se compactan texto y separaciones.
- **Hasta 700px:** la navegación se despliega desde un botón; proyectos y servicios pasan a una columna y se elimina el desplazamiento alterno. Los proyectos se separan (44px). La introducción usa dos columnas con el servicio en una fila completa. El contacto se apila.
- **Desde 1800px:** crece el nombre y se ensanchan los recortes de las imágenes.

Con movimiento activo, la imagen destacada mide clamp(400px, 72svh, 900px), o clamp(340px, 62svh, 620px) en móvil. Con movimiento reducido conserva proporción (3.5), (1.45) en móvil y (3.7) en pantallas grandes. Los proyectos usan (1.45), (1.25) en móvil y (1.6) en pantallas grandes; el último impar de escritorio usa (1.8). Se recorta con `object-fit: cover`, no se deforma la captura.

El espacio vertical cambia por sección: proyectos cierran con (120px), presentación con (110px); en móvil se reducen a (72px) y (60px). Son decisiones de composición observadas, no una escala universal adicional.

## Elevation & Depth

No hay sombras. La profundidad procede del recorte de las capturas, las etiquetas superpuestas, la escala de imagen y el desplazamiento relativo al scroll. Las reglas finas separan regiones sin convertirlas en paneles. La cabecera es fija y conserva su espacio inicial mediante padding en el contenido. Se oculta al bajar y reaparece al subir, con un umbral de (8px) para evitar oscilaciones; permanece visible en los primeros (24px), con el menú abierto o al navegar con teclado.

**The Superficie plana Rule.** La profundidad nace de escala, recorte y movimiento de imágenes, sin sombras ni vidrio.

El título del hero se mantiene sticky a (64px), o (62px) en móvil, dentro del hero y usa `mix-blend-mode: difference` para fundirse con la primera captura cuando pasa por debajo. La introducción secundaria se oculta en los primeros (120px) desde que el hero alcanza el borde superior. Con movimiento reducido, el título permanece en el flujo normal sin mezcla de color.

GSAP y ScrollTrigger ejecutan los desvelados y el desplazamiento de las imágenes; Lenis suaviza la rueda. El movimiento solo se inicializa con `prefers-reduced-motion: no-preference`. Con preferencia reducida, se desactivan transiciones, sustituciones de texto y scroll suave; el texto del manifiesto queda completamente visible. Los tiempos y recorridos exactos viven en la sidecar.

## Shapes

Predominan rectángulos sin redondeado decorativo. Las capturas y las máscaras recortan el contenido con `overflow: hidden`; las reglas son de (1px). No se define una escala de radios porque el sistema no la usa.

Las flechas son SVG de línea con extremos cuadrados, uniones en ángulo y trazo (1.5). El pequeño radio (1) del icono de copiar pertenece al dibujo del icono y no a una forma de contenedor.

## Components

### Navigation

Cabecera dividida por reglas: marca a la izquierda, nota contextual y enlaces a la derecha. Los enlaces de escritorio heredan `navigation-link`; al hover usan `navigation-link-hover` y sustituyen el texto mediante una máscara vertical. El foco añade un contorno naranja de (2px), separado (6px).

Al ocultarse, la cabecera queda `inert`, fuera del recorrido de foco. Tab vuelve a mostrarla antes de mover el foco; el menú abierto y el foco visible mantienen la navegación accesible. La transición de (300ms) se elimina con movimiento reducido.

Hasta (700px), el botón `mobile-menu` muestra dos líneas que se cruzan al abrir. El panel aparece debajo de la cabecera, con enlaces Sofia de (36px) y separadores superiores. `aria-expanded` refleja el estado; Escape cierra y devuelve el foco al botón, un clic exterior cierra y elegir un enlace también cierra.

### Text links

Enlaces de texto con flecha SVG y gap `link-gap`, altura mínima (44px). El variante naranja conduce a contacto. La sustitución vertical dura (.6s); la flecha avanza (5px) al hover durante (.5s). El foco activa la sustitución y conserva el contorno visible. En movimiento reducido permanece una sola copia legible.

### Project entries

Una captura rectangular enlazada, título, categoría, descripción y procedencia constituyen la entrada. No hay fondo de tarjeta ni sombra. El pie separa título y categoría; la información inferior comienza tras una regla. La descripción usa `body` y la procedencia `label`.

La etiqueta de visita permanece visible. En escritorio un indicador naranja cuadrado (54px) entra desde arriba con hover o foco de la captura; en móvil se oculta. En el proyecto destacado la etiqueta auxiliar entra desde abajo y se oculta en móvil. Los títulos enlazados desplazan su flecha diagonal (3px, -3px) al hover.

### Service rows

Filas editoriales con regla superior y disposición (1fr 1.2fr); la última cierra con regla inferior. Título Sofia y descripción Hanken, sin icono ni contenedor de tarjeta. En móvil se apilan, con gap (12px) y padding vertical (22px).

### Copy email

Botón secundario sin fondo ni borde, texto piedra e icono SVG de copiar. Usa altura mínima (40px), gap (8px) y texto (12px); al hover cambia a marfil. Informa “Copiado” mediante una región `aria-live` durante (2500ms). Si falla el portapapeles abre el enlace de email. No se implementaron campos de formulario, chips ni diálogos.

## Do's and Don'ts

### Do:

- Do conservar la pareja Sofia/Hanken y la jerarquía de escala establecida.
- Do alinear secciones con el gutter fluido y separar contenidos mediante reglas finas.
- Do usar capturas verificadas y conservar sus colores dentro de la imagen.
- Do mostrar foco visible y mantener texto, enlaces y proyectos legibles con movimiento reducido.
- Do mantener la secuencia de lectura al convertir la cuadrícula en una columna.

### Don't:

- Don't introducir paneles de vidrio, sombras de tarjeta ni esquinas redondeadas como lenguaje nuevo.
- Don't sumar colores de marca a partir de las paletas de las capturas.
- Don't sustituir capturas reales por imágenes decorativas que simulen trabajos.
- Don't ocultar información esencial detrás del hover o de una animación.
