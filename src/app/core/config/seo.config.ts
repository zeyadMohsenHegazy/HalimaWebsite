import seoRoutes from './seo-routes.json';
import { environment } from '../../../environments/environment';

export const SEO_CONFIG = {
  siteUrl: environment.siteUrl || seoRoutes.siteUrl,
  siteName: 'Halima',
  companyName: 'Halima',
  industry: 'Milk & Juice Manufacturing',
  defaultTitle: 'Halima | Premium Dairy & Juice Products',
  defaultDescription:
    'Halima offers premium dairy and fresh juice products made with the highest quality standards for families across Egypt.',
  defaultKeywords:
    'Halima, dairy, juice, milk, fresh juice, Egypt, milk manufacturing, juice manufacturing',
  defaultImage: '/assets/images/logo/HalimaLogo.png',
  defaultImageAlt: 'Halima - Premium Dairy & Juice Products',
  locale: 'en_US',
  alternateLocale: 'ar_EG',
  twitterHandle: '@Halima',
  contact: {
    phone: '+20-100-000-0000',
    email: 'info@halima.com',
    address: {
      streetAddress: 'Industrial Zone',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
  },
  socialProfiles: [] as string[],
  routes: seoRoutes.routes,
} as const;

export type SeoRouteConfig = (typeof SEO_CONFIG.routes)[number];
