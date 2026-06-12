# Halima — Deployment Guide

This guide covers production builds and deployment to **IIS**, **Nginx**, **Azure**, and **Hostinger**.

---

## Pre-deployment checklist

- [ ] Node.js 20 LTS installed on build machine
- [ ] `npm ci` completes without errors
- [ ] `environment.prod.ts` has real EmailJS keys (or backend API configured)
- [ ] `siteUrl` in environment matches production domain
- [ ] `SITE_URL` env var set when generating sitemap
- [ ] SSL certificate configured on hosting
- [ ] Contact form tested on production domain
- [ ] `robots.txt` and `sitemap.xml` accessible at domain root

---

## Production build instructions

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure production environment

Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  siteUrl: 'https://www.halima.com',
  apiUrl: '/api',
  emailjs: {
    publicKey: 'YOUR_KEY',
    serviceId: 'YOUR_SERVICE',
    templateId: 'YOUR_TEMPLATE',
  },
};
```

### 3. Generate sitemap with production URL

**Windows (PowerShell):**

```powershell
$env:SITE_URL = "https://www.halima.com"
npm run build
```

**Linux / macOS:**

```bash
SITE_URL=https://www.halima.com npm run build
```

### 4. Build output

| Path | Use case |
|------|----------|
| `dist/halima-website/browser/` | Static hosting (IIS, Nginx, Hostinger, Azure SWA) |
| `dist/halima-website/server/server.mjs` | Node.js SSR (Azure App Service, VPS) |

### 5. Verify build locally

**Static (prerendered):**

```bash
npx serve dist/halima-website/browser -l 8080
```

**SSR:**

```bash
npm run serve:prod
# http://localhost:4000
```

### 6. Prerendered routes

The build automatically prerenders:

- `/`
- `/about`
- `/products`
- `/faq`
- `/contact`

Unknown routes render the **404** page client-side with `noindex` meta.

---

## Deployment modes

### Mode A — Static (recommended)

Upload `dist/halima-website/browser/` only. No Node.js required. Fastest and cheapest.

### Mode B — SSR (Node.js)

Upload full `dist/halima-website/`. Run `node server/server.mjs`. Use when you need dynamic server rendering for future API routes.

---

## IIS (Windows Server)

### Prerequisites

- IIS 10+ with **URL Rewrite** module
- **Static Content** feature enabled

### Steps

1. Build: `npm run build`
2. Copy `dist/halima-website/browser/*` to `C:\inetpub\wwwroot\halima\`
3. Copy `deploy/iis/web.config` to site root
4. Create IIS site pointing to that folder
5. Bind HTTPS certificate in IIS Manager
6. Set default document: `index.html`

### URL Rewrite

`web.config` rewrites all non-file requests to `index.html` for Angular routing.

### Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on refresh | Install URL Rewrite module |
| MIME type errors | Check `staticContent` in web.config |
| Blank page | Verify `base href="/"` in index.html |

---

## Nginx (Linux VPS)

### Steps

1. Build on CI or locally
2. Upload `dist/halima-website/browser/` to `/var/www/halima/browser/`
3. Copy and edit `deploy/nginx/halima.conf`:
   - Set `server_name`
   - Configure SSL certificate paths
4. Enable site and reload:

```bash
sudo ln -s /etc/nginx/sites-available/halima.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSR with Nginx reverse proxy

1. Run Node: `pm2 start dist/halima-website/server/server.mjs --name halima`
2. Uncomment proxy block in `halima.conf`
3. Point `proxy_pass` to `http://127.0.0.1:4000`

---

## Azure

See `deploy/azure/README.md` for details.

### Static Web Apps (quick)

1. `npm run build`
2. Copy `deploy/azure/staticwebapp.config.json` → `dist/halima-website/browser/`
3. Deploy `browser/` folder via Azure Portal or GitHub Actions
4. Custom domain + managed certificate in Azure

### App Service (SSR)

1. Deploy `dist/halima-website/` via ZIP or Git
2. Startup command: `node server/server.mjs`
3. Node version: 20 LTS
4. `PORT` is injected automatically

---

## Hostinger

See `deploy/hostinger/README.md` for details.

### Shared hosting (Apache)

1. Build locally
2. Upload `browser/` contents to `public_html/`
3. Copy `deploy/hostinger/.htaccess` to `public_html/.htaccess`
4. Enable SSL in hPanel

### VPS

1. Build + upload `dist/halima-website/`
2. `pm2 start server/server.mjs`
3. Nginx reverse proxy (see Nginx section)

---

## Post-deployment verification

```bash
# Health checks
curl -I https://www.halima.com/
curl -I https://www.halima.com/robots.txt
curl -I https://www.halima.com/sitemap.xml
curl -I https://www.halima.com/about/
```

### Manual QA

- [ ] Home page loads, hero image visible
- [ ] Language switch EN ↔ AR, RTL layout correct
- [ ] Products load from JSON, modal opens
- [ ] FAQ accordion works
- [ ] Contact form submits (EmailJS)
- [ ] 404 page for invalid URL
- [ ] Lighthouse audit on production URL

---

## CI/CD (optional)

Example GitHub Actions workflow:

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: SITE_URL=https://www.halima.com npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: halima-browser
          path: dist/halima-website/browser
```

---

## Rollback

Keep previous `browser/` folder as `browser.backup/` on server. To rollback, swap folders and reload web server.

---

## Support

For build issues: `npm run build` with Node 20 LTS.  
For EmailJS: verify domain is allowed in EmailJS dashboard.
