import { SEO_CONFIG } from '../config/seo.config';
import { Product } from '../models/product.model';
import { FaqItem } from '../models/faq.model';
import { JsonLdNode } from '../models/seo.model';
import { toAbsoluteUrl } from './seo.utility';

const SCHEMA_CONTEXT = 'https://schema.org';

/** Schema.org Organization for Halima */
export function buildOrganizationSchema(): JsonLdNode {
  const { contact, companyName, industry, siteUrl, defaultImage, socialProfiles } =
    SEO_CONFIG;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: companyName,
    url: siteUrl,
    logo: toAbsoluteUrl(defaultImage),
    image: toAbsoluteUrl(defaultImage),
    description: SEO_CONFIG.defaultDescription,
    email: contact.email,
    telephone: contact.phone,
    sameAs: socialProfiles,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.streetAddress,
      addressLocality: contact.address.addressLocality,
      addressCountry: contact.address.addressCountry,
    },
    knowsAbout: [industry, 'Dairy Products', 'Fruit Juice', 'Food Manufacturing'],
  };
}

/** Schema.org WebSite with publisher reference */
export function buildWebSiteSchema(): JsonLdNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': `${SEO_CONFIG.siteUrl}/#website`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    publisher: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    inLanguage: ['en', 'ar'],
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

/** Schema.org Product */
export function buildProductSchema(
  product: Product,
  name: string,
  description: string,
): JsonLdNode {
  const category = product.category === 'juice' ? 'Fruit Juice' : 'Dairy Product';

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Product',
    '@id': `${SEO_CONFIG.siteUrl}/products#${product.id}`,
    name,
    description,
    image: toAbsoluteUrl(product.image),
    brand: {
      '@type': 'Brand',
      name: SEO_CONFIG.companyName,
    },
    manufacturer: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    category,
    url: `${SEO_CONFIG.siteUrl}/products`,
  };
}

/** ItemList of products for listing pages */
export function buildProductListSchema(
  products: Product[],
  getName: (product: Product) => string,
  getDescription: (product: Product) => string,
): JsonLdNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ItemList',
    name: `${SEO_CONFIG.companyName} Products`,
    description: 'Premium dairy and juice products by Halima',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildProductSchema(product, getName(product), getDescription(product)),
    })),
  };
}

/** FAQPage schema */
export function buildFaqPageSchema(
  items: FaqItem[],
  getQuestion: (item: FaqItem) => string,
  getAnswer: (item: FaqItem) => string,
): JsonLdNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: getQuestion(item),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getAnswer(item),
      },
    })),
  };
}

/** ContactPage schema */
export function buildContactPageSchema(): JsonLdNode {
  const { contact, siteUrl, companyName } = SEO_CONFIG;

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ContactPage',
    '@id': `${siteUrl}/contact#webpage`,
    name: `Contact ${companyName}`,
    url: `${siteUrl}/contact`,
    description: 'Contact Halima for inquiries, partnerships, and customer support.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: companyName,
      email: contact.email,
      telephone: contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.address.streetAddress,
        addressLocality: contact.address.addressLocality,
        addressCountry: contact.address.addressCountry,
      },
    },
  };
}

/** AboutPage schema */
export function buildAboutPageSchema(description: string): JsonLdNode {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'AboutPage',
    '@id': `${SEO_CONFIG.siteUrl}/about#webpage`,
    name: `About ${SEO_CONFIG.companyName}`,
    url: `${SEO_CONFIG.siteUrl}/about`,
    description,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    mainEntity: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
  };
}

/** WebPage schema for generic pages */
export function buildWebPageSchema(
  path: string,
  name: string,
  description: string,
): JsonLdNode {
  const url = toAbsoluteUrl(path);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SEO_CONFIG.siteUrl}/#website` },
    about: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
  };
}

/** Flatten and dedupe JSON-LD nodes into an array */
export function collectJsonLdNodes(
  ...groups: (JsonLdNode | JsonLdNode[] | undefined)[]
): JsonLdNode[] {
  const nodes: JsonLdNode[] = [];

  for (const group of groups) {
    if (!group) {
      continue;
    }
    if (Array.isArray(group)) {
      nodes.push(...group);
    } else {
      nodes.push(group);
    }
  }

  return nodes;
}
