import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  Product,
  ProductCategoryFilter,
} from '../../core/models/product.model';
import { LanguageService } from '../../core/services/language.service';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import { ProductService } from '../../core/services/product.service';
import {
  filterProductsByCategory,
  getProductDescription,
  getProductName,
  productMatchesSearch,
} from '../../core/utils/product.utility';
import {
  buildBreadcrumbSchema,
  buildProductListSchema,
  buildWebPageSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '../../shared/components/product-detail-modal/product-detail-modal.component';
import { ProductSkeletonComponent } from '../../shared/components/product-skeleton/product-skeleton.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
    PageHeroComponent,
    ProductCardComponent,
    ProductDetailModalComponent,
    ProductSkeletonComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pageSize = PAGE_SIZE;
  readonly categories: ProductCategoryFilter[] = ['all', 'milk', 'juice'];

  readonly activeCategory = signal<ProductCategoryFilter>('all');
  readonly searchQuery = signal('');
  readonly currentPage = signal(1);
  readonly selectedProduct = signal<Product | null>(null);

  readonly allProducts = this.productService.products;
  readonly loading = this.productService.loading;

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().trim();
    const category = this.activeCategory();
    const lang = this.language.currentLanguage();

    return filterProductsByCategory(this.allProducts(), category).filter(
      (product) => productMatchesSearch(product, query, lang),
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / PAGE_SIZE)),
  );

  readonly paginatedProducts = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredProducts().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  ngOnInit(): void {
    this.productService.loadProducts();
    this.pageSeo.bind(() => this.buildSeoConfig(), this.destroyRef);
  }

  setCategory(category: ProductCategoryFilter): void {
    this.activeCategory.set(category);
    this.currentPage.set(1);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openProduct(product: Product): void {
    this.selectedProduct.set(product);
  }

  closeModal(): void {
    this.selectedProduct.set(null);
  }

  getCategoryLabel(category: ProductCategoryFilter): string {
    const key =
      category === 'all'
        ? 'PRODUCTS.FILTER_ALL'
        : category === 'juice'
          ? 'PRODUCTS.FILTER_JUICE'
          : 'PRODUCTS.FILTER_MILK';
    return this.translate.instant(key);
  }

  private buildSeoConfig() {
    const products = this.allProducts();
    const title = this.translate.instant('PRODUCTS.META_TITLE');
    const description = this.translate.instant('PRODUCTS.META_DESCRIPTION');

    return {
      path: '/products',
      title,
      description,
      keywords: this.translate.instant('PRODUCTS.META_KEYWORDS'),
      type: 'product' as const,
      image: products[0]?.image,
      imageAlt: products[0]
        ? getProductName(products[0], this.language.currentLanguage())
        : title,
      jsonLd: collectJsonLdNodes(
        buildWebPageSchema('/products', title, description),
        buildBreadcrumbSchema([
          { name: this.translate.instant('NAV.HOME'), path: '/' },
          { name: this.translate.instant('NAV.PRODUCTS'), path: '/products' },
        ]),
        products.length > 0
          ? buildProductListSchema(
              products,
              (p) => getProductName(p, this.language.currentLanguage()),
              (p) => getProductDescription(p, this.language.currentLanguage()),
            )
          : undefined,
      ),
    };
  }
}
