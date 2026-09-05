import { loadEnvFile } from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('..', import.meta.url)));
loadEnvFile('.env');
const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_TOKEN;
const account = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!token || !account) throw new Error('Missing Cloudflare token or account ID in .env.');

await import('./build.mjs');
const result = spawnSync('node_modules/.bin/wrangler', [
    'pages', 'deploy', 'dist', '--project-name=buddism-foundations', '--branch=main',
], {
    stdio: 'inherit',
    env: { ...process.env, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: account },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
