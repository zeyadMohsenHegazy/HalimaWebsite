import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEO_CONFIG } from '../config/seo.config';
import { JsonLdNode, PageSeoConfig } from '../models/seo.model';
import { buildOrganizationSchema } from '../utils/json-ld.utility';
import {
  buildCanonicalUrl,
  buildPageTitle,
  serializeJsonLd,
  toAbsoluteUrl,
  toOgLocale,
  truncateDescription,
} from '../utils/seo.utility';

const JSON_LD_ATTR = 'data-halima-seo-jsonld';
const CANONICAL_ATTR = 'data-halima-seo-canonical';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Apply full SEO configuration for a page */
  updatePage(config: PageSeoConfig, lang = 'en'): void {

    const fullTitle = buildPageTitle(config.title, config.noSuffix);
    const description = truncateDescription(config.description);
    const canonicalUrl = buildCanonicalUrl(config.path);
    const image = toAbsoluteUrl(config.image ?? SEO_CONFIG.defaultImage);
    const imageAlt = config.imageAlt ?? SEO_CONFIG.defaultImageAlt;
    const ogType = config.type ?? 'website';
    const robots = config.robots ?? 'index, follow, max-image-preview:large';
    const locale = config.locale ?? toOgLocale(lang);
    const alternateLocale = lang === 'ar' ? SEO_CONFIG.locale : SEO_CONFIG.alternateLocale;

    this.updateTitle(fullTitle);
    this.updateStandardMeta(description, config.keywords, robots);
    this.updateCanonical(canonicalUrl);
    this.updateOpenGraph({
      title: fullTitle,
      description,
      url: canonicalUrl,
      image,
      imageAlt,
      type: ogType,
      locale,
      alternateLocale,
      siteName: SEO_CONFIG.siteName,
    });
    this.updateTwitter({
      title: fullTitle,
      description,
      image,
      imageAlt,
    });

    const jsonLdNodes = this.resolveJsonLd(config);
    this.updateJsonLd(jsonLdNodes);
  }

  /** @deprecated Use updatePage instead */
  update(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
  }): void {
    this.updatePage({
      title: config.title,
      description: config.description,
      keywords: config.keywords,
      image: config.image,
      path: config.url ? new URL(config.url).pathname : '/',
    });
  }

  private resolveJsonLd(config: PageSeoConfig): JsonLdNode[] {
    const nodes: JsonLdNode[] = [];

    if (config.includeOrganization !== false) {
      nodes.push(buildOrganizationSchema());
    }

    if (config.jsonLd) {
      if (Array.isArray(config.jsonLd)) {
        nodes.push(...config.jsonLd);
      } else {
        nodes.push(config.jsonLd);
      }
    }

    return nodes;
  }

  private updateTitle(fullTitle: string): void {
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'application-name', content: SEO_CONFIG.siteName });
  }

  private updateStandardMeta(
    description: string,
    keywords: string | undefined,
    robots: string,
  ): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'keywords',
      content: keywords ?? SEO_CONFIG.defaultKeywords,
    });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'author', content: SEO_CONFIG.companyName });
    this.meta.updateTag({ name: 'publisher', content: SEO_CONFIG.companyName });
    this.meta.updateTag({ name: 'theme-color', content: '#ca202b' });
  }

  private updateCanonical(url: string): void {
    this.removeElements(`link[${CANONICAL_ATTR}]`);

    const link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    link.setAttribute(CANONICAL_ATTR, 'true');
    this.document.head.appendChild(link);
  }

  private updateOpenGraph(options: {
    title: string;
    description: string;
    url: string;
    image: string;
    imageAlt: string;
    type: string;
    locale: string;
    alternateLocale: string;
    siteName: string;
  }): void {
    const tags: { property?: string; name?: string; content: string }[] = [
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:url', content: options.url },
      { property: 'og:type', content: options.type },
      { property: 'og:site_name', content: options.siteName },
      { property: 'og:locale', content: options.locale },
      { property: 'og:locale:alternate', content: options.alternateLocale },
      { property: 'og:image', content: options.image },
      { property: 'og:image:secure_url', content: options.image },
      { property: 'og:image:alt', content: options.imageAlt },
      { property: 'og:image:type', content: 'image/png' },
    ];

    for (const tag of tags) {
      if (tag.property) {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    }
  }

  private updateTwitter(options: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }): void {
    const tags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: options.image },
      { name: 'twitter:image:alt', content: options.imageAlt },
      { name: 'twitter:site', content: SEO_CONFIG.twitterHandle },
    ];

    for (const tag of tags) {
      this.meta.updateTag({ name: tag.name, content: tag.content });
    }
  }

  private updateJsonLd(nodes: JsonLdNode[]): void {
    this.removeElements(`script[${JSON_LD_ATTR}]`);

    if (nodes.length === 0) {
      return;
    }

    const payload = nodes.length === 1 ? nodes[0] : nodes;
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(JSON_LD_ATTR, 'true');
    script.textContent = serializeJsonLd(payload);
    this.document.head.appendChild(script);
  }

  private removeElements(selector: string): void {
    const elements = this.document.head.querySelectorAll(selector);
    elements.forEach((el) => el.remove());
  }
}
