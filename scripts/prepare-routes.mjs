import { mkdir, readFile, writeFile } from 'node:fs/promises';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { services, servicePath } from '../src/services.js';

const output = new URL('../dist/', import.meta.url);
const siteUrl = process.env.SITE_URL || (process.env.NETLIFY === 'true' ? process.env.URL : '');
const origin = siteUrl ? new URL(siteUrl).origin : '';
if (origin && !/^https?:\/\//.test(origin)) {
  throw new Error('SITE_URL debe ser una URL HTTP o HTTPS.');
}

const indexable = Boolean(origin) && (!process.env.CONTEXT || process.env.CONTEXT === 'production');
const home = origin + '/';
const person = { '@type': 'Person', '@id': home + '#diego-ariel', name: 'Diego Ariel', url: home, jobTitle: 'Diseñador y desarrollador web' };
const routes = [
  ['/', 'Diseño web para negocios en Argentina | Diego Ariel', 'Diego Ariel diseña páginas web para pymes, emprendimientos y alojamientos en Argentina. Mirá sus proyectos y pedí un presupuesto.', {
    '@graph': [person, { '@type': 'WebSite', url: home, name: 'Diego Ariel', inLanguage: 'es-AR', publisher: { '@id': person['@id'] } }],
  }],
  ['/proyectos/', 'Portfolio de diseño web | Diego Ariel', 'Explorá proyectos de diseño y desarrollo web para comercios, alojamientos y profesionales.', { '@type': 'CollectionPage', name: 'Portfolio de Diego Ariel' }],
  ...services.map(service => [servicePath(service), `${service.title} | Diego Ariel`, service.description, {
    '@type': 'Service', name: service.title, description: service.description,
    areaServed: { '@type': 'Country', name: 'Argentina' }, provider: person,
  }]),
  ['/privacidad/', 'Política de privacidad — Diego Ariel', 'Cómo se usan los datos en este portfolio.'],
  ['/terminos/', 'Términos de uso — Diego Ariel', 'Condiciones de uso del portfolio de Diego Ariel.'],
  ['/arrepentimiento/', 'Botón de arrepentimiento — Diego Ariel', 'Canal para solicitar la revocación de una contratación a distancia.'],
];

const appHtml = await readFile(new URL('index.html', output), 'utf8');
const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true, watch: null, ws: false },
  ssr: { noExternal: ['gsap', 'lenis'] },
});
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

try {
  const { Portfolio } = await vite.ssrLoadModule('/src/main.jsx');
  for (const [path, title, description, schema] of routes) {
    const folder = new URL(path.slice(1), output);
    await mkdir(folder, { recursive: true });
    const url = origin + path;
    const template = schema
      ? appHtml
      : await readFile(new URL(`./pages${path.slice(0, -1)}.html`, import.meta.url), 'utf8');
    const social = schema && origin ? [
      '<meta property="og:locale" content="es_AR" />',
      `<meta property="og:url" content="${escape(url)}" />`,
      `<meta property="og:image" content="${escape(origin)}/projects/nuestro-dia-hero.png" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', url, ...schema }).replaceAll('<', '\\u003c')}</script>`,
    ] : [];
    const metadata = [
      `<title>${escape(title)}</title>`,
      `<meta name="description" content="${escape(description)}" />`,
      origin ? `<link rel="canonical" href="${escape(url)}" />` : '',
      indexable ? '' : '<meta name="robots" content="noindex" />',
      ...social,
    ].filter(Boolean).join('\n    ');
    let html = template.replace(/<meta name="description"[^>]*>\s*/, '')
      .replace(/<title>[^<]*<\/title>/, () => metadata)
      .replace(/(<meta property="og:title" content=")[^"]+/, (_, prefix) => prefix + escape(title))
      .replace(/(<meta property="og:description" content=")[^"]+/, (_, prefix) => prefix + escape(description));
    if (schema) {
      const body = renderToString(React.createElement(Portfolio, { pathname: path }));
      html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    }
    await writeFile(new URL('index.html', folder), html);
  }
} finally {
  await vite.close();
}

const sitemap = indexable
  ? 'Sitemap: ' + origin + '/sitemap.xml\n'
  : '';
await writeFile(new URL('robots.txt', output),
  `User-agent: *\n${indexable ? 'Allow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n' : 'Disallow: /'}\n${sitemap}`);
if (indexable) {
  const urls = routes.map(([path]) => `  <url><loc>${origin}${path}</loc></url>`).join('\n');
  await writeFile(new URL('sitemap.xml', output),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
