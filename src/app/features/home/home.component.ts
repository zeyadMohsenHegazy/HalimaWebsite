import { Component, DestroyRef, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  HOME_CATEGORIES,
  HOME_FEATURES,
  HOME_STATS,
  HOME_TESTIMONIALS,
} from '../../core/data/home.data';
import { LanguageService } from '../../core/services/language.service';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import { ProductService } from '../../core/services/product.service';
import {
  getProductDescription,
  getProductName,
} from '../../core/utils/product.utility';
import {
  buildBreadcrumbSchema,
  buildProductListSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';
import { LazyImageComponent } from '../../shared/components/lazy-image/lazy-image.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../shared/components/product-skeleton/product-skeleton.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    SectionTitleComponent,
    ProductCardComponent,
    ProductSkeletonComponent,
    AnimatedCounterComponent,
    LazyImageComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  readonly features = HOME_FEATURES;
  readonly categories = HOME_CATEGORIES;
  readonly stats = HOME_STATS;
  readonly testimonials = HOME_TESTIMONIALS;

  readonly featuredProducts = computed(() =>
    this.productService.getFeatured(4),
  );

  readonly productsLoading = this.productService.loading;

  ngOnInit(): void {
    this.productService.loadProducts();
    this.pageSeo.bind(() => {
      const title = this.translate.instant('HOME.META_TITLE');
      const description = this.translate.instant('HOME.META_DESCRIPTION');
      const featured = this.featuredProducts();

      return {
        path: '/',
        title,
        description,
        keywords: this.translate.instant('HOME.META_KEYWORDS'),
        type: 'website',
        jsonLd: collectJsonLdNodes(
          buildWebSiteSchema(),
          buildWebPageSchema('/', title, description),
          buildBreadcrumbSchema([
            { name: this.translate.instant('NAV.HOME'), path: '/' },
          ]),
          featured.length > 0
            ? buildProductListSchema(
                featured,
                (p) => getProductName(p, this.language.currentLanguage()),
                (p) =>
                  getProductDescription(p, this.language.currentLanguage()),
              )
            : undefined,
        ),
      };
    }, this.destroyRef);
  }
}
