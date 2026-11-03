# Halima Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/9a0fa0cb-b583-4744-bada-7c6c6a9bb8e7/deploy-status)](https://app.netlify.com/projects/halima-website/deploys)

Premium bilingual (English / Arabic) corporate website for **Halima** — a dairy and juice manufacturing brand. Built with **Angular 18**, standalone components, SSR + prerendering, and production-ready SEO.

**Live:** [https://halima-website.netlify.app](https://halima-website.netlify.app)

## Features

- **Pages:** Home, About, Products, FAQ, Contact, 404
- **i18n:** English & Arabic with RTL/LTR, `localStorage` persistence
- **SEO:** Meta tags, Open Graph, Twitter Cards, canonical URLs, JSON-LD, sitemap
- **UX:** Scroll animations, lazy images, skeleton loaders, view transitions
- **Contact:** Validated form with EmailJS (swappable backend API)
- **Accessibility:** Skip link, ARIA labels, focus trap in modals, reduced motion

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Angular 18 (standalone, signals) |
| Styling | SCSS, responsive design system |
| i18n | `@ngx-translate` |
| SSR/SSG | `@angular/ssr` + Express |
| Email | EmailJS (client) / HTTP API (ready) |

## Requirements

- **Node.js** 18.19+ or 20 LTS
- **npm** 9+

## Quick Start

```bash
# Install dependencies
npm ci

# Development server (http://localhost:4200)
npm start

# Development with SSR
npm run start:ssr
```

## Production Build

```bash
# Set production site URL for sitemap (optional)
set SITE_URL=https://www.halima.com   # Windows
export SITE_URL=https://www.halima.com # macOS/Linux

# Build (generates sitemap + prerendered pages)
npm run build
```

**Output:**

```
dist/halima-website/
├── browser/          ← Deploy this for static hosting
│   ├── index.html
│   ├── about/
│   ├── products/
│   └── assets/
└── server/           ← Node.js SSR entry (optional)
    └── server.mjs
```

### Run production SSR locally

```bash
npm run build
npm run serve:prod
```

Open [http://localhost:4000](http://localhost:4000)

## Configuration

### Environment

Copy `src/environments/environment.example.ts` values into:

- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

| Key | Description |
|-----|-------------|
| `siteUrl` | Canonical domain (e.g. `https://www.halima.com`) |
| `emailjs.*` | EmailJS credentials for contact form |
| `apiUrl` | Backend API base (for `HttpContactSender`) |

### EmailJS setup

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Add email service + template with variables: `from_name`, `reply_to`, `phone`, `subject`, `message`
3. Set recipient in template or use `to_email` from `contact.config.ts`
4. Update `environment.prod.ts` before deploy

### Switch to backend contact API

In `src/app/app.config.ts`, replace:

```typescript
{ provide: CONTACT_EMAIL_SENDER, useClass: EmailJsContactSender }
```

with:

```typescript
{ provide: CONTACT_EMAIL_SENDER, useClass: HttpContactSender }
```

## Project Structure

```
src/app/
├── core/           # Services, models, config, validators, utils
├── shared/         # Navbar, footer, product-card, lazy-image, directives
├── features/       # Page components (home, about, products, faq, contact)
├── layout/         # Main layout shell
└── app.routes.ts   # Lazy-loaded routes

src/assets/
├── i18n/           # en.json, ar.json
└── products/       # Product catalogs (JSON + images)

deploy/             # IIS, Nginx, Azure, Hostinger configs
public/             # robots.txt, sitemap.xml (generated)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm run build` | Production build + sitemap |
| `npm run serve:prod` | Serve SSR build |
| `npm run generate:sitemap` | Regenerate `public/sitemap.xml` |
| `npm test` | Unit tests (Karma/Jasmine) |

## Deployment

### Netlify (primary)

Config is in `netlify.toml` (build → `dist/halima-website/browser`).

1. In [Netlify](https://app.netlify.com/projects/halima-website): **Site configuration → Build & deploy → Continuous deployment** → link this GitHub repo (`zeyadMohsenHegazy/HalimaWebsite`), branch `main`.
2. Push to `main` — Netlify builds and publishes automatically.
3. Site URL: [https://halima-website.netlify.app](https://halima-website.netlify.app)

Manual deploy (optional):

```bash
npm run build
npx netlify deploy --prod --dir=dist/halima-website/browser
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for other hosts:

- IIS (Windows Server)
- Nginx (Linux VPS)
- Azure Static Web Apps / App Service
- Hostinger (shared hosting & VPS)

## Lighthouse Targets

| Category | Target |
|----------|--------|
| Performance | > 90 |
| Accessibility | > 95 |
| SEO | 100 |
| Best Practices | > 95 |

Run Lighthouse against the production build (`npm run build` → serve `browser/` folder).

## Security Notes

- No secrets in git — use `environment.prod.ts` locally or CI injection
- Security headers configured in `server.ts` (SSR) and deploy configs (static)
- CSP allows EmailJS API (`connect-src https://api.emailjs.com`)
- External links use `rel="noopener noreferrer"`

## License

Private — © Halima. All rights reserved.
