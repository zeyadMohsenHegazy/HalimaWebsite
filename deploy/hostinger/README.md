# Hostinger Deployment

## Option A — Static hosting (Business / Premium shared hosting)

Best for the **prerendered** Angular build (no Node.js required).

1. Build locally:

```bash
npm ci
npm run build
```

2. Upload contents of `dist/halima-website/browser/` to `public_html/` via File Manager or FTP
3. Copy `deploy/iis/web.config` to `public_html/web.config` (Hostinger Windows plans)  
   **OR** create `.htaccess` for Apache (Linux plans):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

4. Enable **SSL** (free Let's Encrypt) in hPanel → SSL
5. Point domain A record to Hostinger IP

## Option B — VPS (Node.js SSR)

1. Install Node.js 20 LTS on VPS
2. Upload `dist/halima-website/` after `npm run build`
3. Run with PM2:

```bash
npm install -g pm2
cd dist/halima-website
pm2 start server/server.mjs --name halima
pm2 save
pm2 startup
```

4. Configure Nginx reverse proxy using `deploy/nginx/halima.conf`

## Pre-deploy checklist

- [ ] Update `src/environments/environment.prod.ts` with EmailJS keys
- [ ] Set `siteUrl` in environment to `https://www.halima.com`
- [ ] Run `SITE_URL=https://www.halima.com npm run generate:sitemap` before build
- [ ] Verify contact form on production domain
