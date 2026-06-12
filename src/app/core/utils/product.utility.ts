import { Product } from '../models/product.model';
import { SupportedLanguage } from '../services/language.service';

export function getProductName(product: Product, lang: SupportedLanguage): string {
  return lang === 'ar' ? product.nameAr : product.nameEn;
}

export function getProductDescription(
  product: Product,
  lang: SupportedLanguage,
): string {
  return lang === 'ar' ? product.descriptionAr : product.descriptionEn;
}

export function productMatchesSearch(
  product: Product,
  query: string,
  lang: SupportedLanguage,
): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  const haystack = [
    product.nameEn,
    product.nameAr,
    product.descriptionEn,
    product.descriptionAr,
    getProductName(product, lang),
    getProductDescription(product, lang),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalized);
}

export function filterProductsByCategory(
  products: Product[],
  category: 'all' | Product['category'],
): Product[] {
  if (category === 'all') {
    return products;
  }
  return products.filter((product) => product.category === category);
}
