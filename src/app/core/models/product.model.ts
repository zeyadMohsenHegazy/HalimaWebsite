export type ProductCategory = 'milk' | 'juice';

export type ProductCategoryFilter = 'all' | ProductCategory;

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  category: ProductCategory;
}

export interface ProductCatalogConfig {
  category: ProductCategory;
  jsonPath: string;
}
