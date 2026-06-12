import { SEO_CONFIG } from '../config/seo.config';

/** Build a full page title with optional site name suffix */
export function buildPageTitle(title: string, noSuffix = false): string {
  if (noSuffix || title.includes(SEO_CONFIG.siteName)) {
    return title;
  }
  return `${title} | ${SEO_CONFIG.siteName}`;
}

/** Convert a relative asset path to an absolute URL for meta tags */
export function toAbsoluteUrl(path: string, baseUrl = SEO_CONFIG.siteUrl): string {
  if (!path) {
    return baseUrl;
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

/** Build canonical URL from a route path */
export function buildCanonicalUrl(path: string, baseUrl = SEO_CONFIG.siteUrl): string {
  if (path === '/' || path === '') {
    return `${baseUrl.replace(/\/$/, '')}/`;
  }
  return toAbsoluteUrl(path, baseUrl);
}

/** Normalize route path */
export function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }
  return path.startsWith('/') ? path : `/${path}`;
}

/** Map app language code to Open Graph locale */
export function toOgLocale(lang: string): string {
  return lang === 'ar' ? SEO_CONFIG.alternateLocale : SEO_CONFIG.locale;
}

/** Truncate description for meta tags */
export function truncateDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3).trim()}...`;
}

/** Serialize JSON-LD safely for script injection */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
