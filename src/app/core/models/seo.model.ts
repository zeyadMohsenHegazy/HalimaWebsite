export type OpenGraphType = 'website' | 'article' | 'product';

export type JsonLdNode = Record<string, unknown>;

export interface PageSeoConfig {
  /** Page title (site name is appended unless noSuffix is true) */
  title: string;
  description: string;
  /** Route path e.g. `/about` — used for canonical URL */
  path: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: OpenGraphType;
  robots?: string;
  locale?: string;
  /** Additional Schema.org JSON-LD nodes for this page */
  jsonLd?: JsonLdNode | JsonLdNode[];
  /** Skip appending `| Halima` to the title */
  noSuffix?: boolean;
  /** Include global Organization schema (default: true) */
  includeOrganization?: boolean;
}

export interface TranslationSeoKeys {
  path: string;
  titleKey: string;
  descriptionKey: string;
  keywordsKey?: string;
  image?: string;
  imageAlt?: string;
  type?: OpenGraphType;
  jsonLd?: JsonLdNode | JsonLdNode[];
  includeOrganization?: boolean;
}
