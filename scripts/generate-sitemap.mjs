import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = join(__dirname, '../src/app/core/config/seo-routes.json');
const outputPath = join(__dirname, '../public/sitemap.xml');

const config = JSON.parse(readFileSync(configPath, 'utf-8'));
const siteUrl = (process.env.SITE_URL || config.siteUrl).replace(/\/$/, '');
const lastmod = new Date().toISOString().split('T')[0];

const urls = config.routes
  .map((route) => {
    const loc = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(outputPath, xml, 'utf-8');
console.log(`Sitemap generated: ${outputPath}`);
