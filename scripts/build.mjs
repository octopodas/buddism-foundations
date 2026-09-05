import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
const html = readFileSync('index.html', 'utf8');
const languages = [...html.matchAll(/<option value="([a-z]{2})">/g)].map(match => match[1]);
if (!languages.includes('en')) throw new Error('English is required as the default language.');

// Only these public files are published. Never copy the workspace or .env.
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
copyFileSync('styles.css', 'dist/styles.css');
for (const file of ['favicon.ico', 'favicon.png', 'apple-touch-icon.png']) {
    copyFileSync(file, `dist/${file}`);
}
for (const lang of languages) {
    mkdirSync(`dist/${lang}`);
    writeFileSync(`dist/${lang}/index.html`, html.replace('<html lang="en">', `<html lang="${lang}">`));
}
writeFileSync('dist/_redirects', '/ /en/ 302\n');
// A real 404 disables Cloudflare Pages' automatic SPA fallback for unknown paths.
writeFileSync('dist/404.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found</title><h1>Page not found</h1><p><a href="/en/">Return to The Buddhist Path</a></p></html>\n');
console.log(`Built ${languages.map(lang => `/${lang}/`).join(', ')} in dist/`);
