# Diego Ariel — Portafolio web

Portfolio de diseño y desarrollo web hecho con React, Vite, GSAP y Lenis.

## Desarrollo local

```sh
npm ci
npm run dev
```

## Despliegue en Netlify

Importá este repositorio desde GitHub. Netlify toma la configuración de `netlify.toml`, compila con `npm run build` y publica `dist/`. El build genera una entrada directa para `/proyectos/`.

Después del primer despliegue, agregá tu dominio en **Domain management**, marcá el dominio principal y hacé un nuevo despliegue. El build usa la URL principal que informa Netlify para generar `sitemap.xml`, `robots.txt` y las URL canónicas. Podés fijarla explícitamente con `SITE_URL` en las variables de producción. Las vistas previas no se incluyen en el sitemap.

Netlify sirve `public/404.html` con estado 404 para las rutas desconocidas. No agregues una redirección global a `index.html`, porque ocultaría esos errores.

Los textos de privacidad y términos están en `scripts/pages/`. Antes de lanzar el dominio, confirmá el nombre legal y el domicilio del responsable y si corresponde publicar otros datos comerciales. Si aceptás contrataciones a distancia, activás analítica o agregás formularios, revisá los avisos y las obligaciones aplicables a ese flujo.

Los enlaces y el orden de los proyectos se editan en `src/projects.js`. Las capturas se guardan en `public/projects/`.
