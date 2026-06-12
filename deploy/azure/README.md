# Azure Deployment

## Option A — Azure Static Web Apps (recommended for prerendered build)

1. Build locally: `npm run build`
2. Deploy folder: `dist/halima-website/browser`
3. Copy `deploy/azure/staticwebapp.config.json` to `dist/halima-website/browser/staticwebapp.config.json` before deploy
4. Create Static Web App in Azure Portal → connect GitHub or upload artifact
5. Set build output location to `dist/halima-website/browser`

### GitHub Actions (example app location)

```yaml
app_location: "/"
output_location: "dist/halima-website/browser"
```

## Option B — Azure App Service (Node.js SSR)

1. Build: `npm run build`
2. Deploy entire `dist/halima-website` folder
3. Startup command:

```bash
node server/server.mjs
```

4. App Settings:
   - `PORT` = `8080` (App Service sets this automatically)
   - `WEBSITE_NODE_DEFAULT_VERSION` = `~20`
5. Use `deploy/nginx/halima.conf` proxy pattern if fronting with Application Gateway

## Environment variables (App Service)

Configure EmailJS via build-time replacement in `environment.prod.ts` or CI pipeline variables before `ng build`.
