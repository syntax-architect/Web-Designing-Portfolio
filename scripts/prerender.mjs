import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
const ssrDir = path.join(rootDir, 'dist-ssr');
const ssrEntryPath = path.join(ssrDir, 'entry-server.js');

const template = fs.readFileSync(distHtmlPath, 'utf-8');
const { render } = await import(pathToFileURL(ssrEntryPath).href);
const appHtml = render();

if (!template.includes('<!--app-html-->')) {
  throw new Error('SSR prerender failed: <!--app-html--> placeholder missing from dist/index.html');
}

const finalHtml = template.replace('<!--app-html-->', () => appHtml);
fs.writeFileSync(distHtmlPath, finalHtml, 'utf-8');
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`SSR prerendered dist/index.html (${Buffer.byteLength(finalHtml, 'utf-8')} bytes)`);

