import { ProductCatalogConfig } from '../models/product.model';

/** Catalog JSON files — add a new entry when introducing a product category */
export const PRODUCT_CATALOGS: ProductCatalogConfig[] = [
  {
    category: 'milk',
    jsonPath: 'assets/products/milk/products.json',
  },
  {
    category: 'juice',
    jsonPath: 'assets/products/juice/products.json',
  },
];
