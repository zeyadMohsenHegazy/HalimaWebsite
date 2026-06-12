import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../../core/data/faq.data';
import { FaqCategoryFilter } from '../../core/models/faq.model';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildWebPageSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';
import { FaqItemComponent } from '../../shared/components/faq-item/faq-item.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, TranslatePipe, PageHeroComponent, FaqItemComponent, ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit {
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = FAQ_CATEGORIES;
  readonly activeCategory = signal<FaqCategoryFilter>('all');
  readonly expandedId = signal<string | null>(null);

  readonly filteredItems = computed(() => {
    const category = this.activeCategory();
    return category === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === category);
  });

  ngOnInit(): void {
    this.pageSeo.bind(() => {
      const title = this.translate.instant('FAQ.META_TITLE');
      const description = this.translate.instant('FAQ.META_DESCRIPTION');

      return {
        path: '/faq',
        title,
        description,
        keywords: this.translate.instant('FAQ.META_KEYWORDS'),
        type: 'website',
        jsonLd: collectJsonLdNodes(
          buildWebPageSchema('/faq', title, description),
          buildBreadcrumbSchema([
            { name: this.translate.instant('NAV.HOME'), path: '/' },
            { name: this.translate.instant('NAV.FAQ'), path: '/faq' },
          ]),
          buildFaqPageSchema(
            FAQ_ITEMS,
            (item) => this.translate.instant(item.questionKey),
            (item) => this.translate.instant(item.answerKey),
          ),
        ),
      };
    }, this.destroyRef);
  }

  setCategory(category: FaqCategoryFilter): void {
    this.activeCategory.set(category);
    this.expandedId.set(null);
  }

  toggleItem(id: string): void {
    this.expandedId.update((current) => (current === id ? null : id));
  }

  isExpanded(id: string): boolean {
    return this.expandedId() === id;
  }
}
