import { mkdir, readFile, writeFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const siteUrl = process.env.SITE_URL || (process.env.NETLIFY === 'true' ? process.env.URL : '');
const origin = siteUrl ? new URL(siteUrl).origin : '';
if (origin && !/^https?:\/\//.test(origin)) {
  throw new Error('SITE_URL debe ser una URL HTTP o HTTPS.');
}

const indexable = Boolean(origin) && (!process.env.CONTEXT || process.env.CONTEXT === 'production');
const routes = [
  ['/', 'Diego Ariel — Diseño & desarrollo web', 'Portfolio de diseño y desarrollo web.'],
  ['/proyectos/', 'Proyectos — Diego Ariel', 'Explorá los proyectos de diseño y desarrollo web de Diego Ariel.'],
  ['/privacidad/', 'Política de privacidad — Diego Ariel', 'Cómo se usan los datos en este portfolio.'],
  ['/terminos/', 'Términos de uso — Diego Ariel', 'Condiciones de uso del portfolio de Diego Ariel.'],
];

const appHtml = await readFile(new URL('index.html', output), 'utf8');
for (const [path, title, description] of routes) {
  const folder = new URL(path.slice(1), output);
  await mkdir(folder, { recursive: true });
  const template = path === '/' || path === '/proyectos/'
    ? appHtml
    : await readFile(new URL(`./pages${path.slice(0, -1)}.html`, import.meta.url), 'utf8');
  const metadata = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    origin ? `<link rel="canonical" href="${origin}${path}" />` : '',
    indexable ? '' : '<meta name="robots" content="noindex" />',
  ].filter(Boolean).join('\n    ');
  const html = template.replace(/<meta name="description"[^>]*>\s*/, '')
    .replace(/<title>[^<]*<\/title>/, metadata)
    .replace(/(<meta property="og:title" content=")[^"]+/, (_, prefix) => prefix + title)
    .replace(/(<meta property="og:description" content=")[^"]+/, (_, prefix) => prefix + description);
  await writeFile(new URL('index.html', folder), html);
}

const sitemap = indexable
  ? 'Sitemap: ' + origin + '/sitemap.xml\n'
  : '';
await writeFile(new URL('robots.txt', output),
  `User-agent: *\n${indexable ? 'Allow: /' : 'Disallow: /'}\n${sitemap}`);
if (indexable) {
  const urls = routes.map(([path]) => `  <url><loc>${origin}${path}</loc></url>`).join('\n');
  await writeFile(new URL('sitemap.xml', output),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
