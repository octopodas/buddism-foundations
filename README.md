# The Buddhist Path

Static HTML/CSS site with English (`/en/`), Polish (`/pl/`), and Russian (`/ru/`) URLs. The root redirects to `/en/`. The URL determines the language, and the switcher supports browser Back/Forward while keeping the current chapter open.

## Build and preview

Requires Node.js 22 or newer.

```sh
npm ci
npm run build
npx wrangler pages dev dist
```

Edit `index.html` and `styles.css`; `dist/` is generated. Translation text is applied by JavaScript using the existing dictionaries.

## Deploy to Cloudflare Pages

Project: `buddism-foundations` (production branch: `main`).

Keep `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_TOKEN` (or `CLOUDFLARE_API_TOKEN`) in the local `.env`, then run:

```sh
npm run deploy
```

The deployment command rebuilds and uploads only `dist/`. Credentials and source tooling are excluded. Add a custom domain later through this project's Cloudflare Pages **Custom domains** settings.
