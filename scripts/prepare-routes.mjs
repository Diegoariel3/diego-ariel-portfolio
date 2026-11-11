import { copyFile, mkdir } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const projects = new URL('proyectos/', output);

await mkdir(projects, { recursive: true });
await copyFile(new URL('index.html', output), new URL('index.html', projects));
