import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  ABOUT_VALUES,
  DISTRIBUTION_REGIONS,
  QUALITY_PILLARS,
  SUSTAINABILITY_ITEMS,
  TIMELINE_EVENTS,
} from '../../core/data/about.data';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import {
  buildAboutPageSchema,
  buildBreadcrumbSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    PageHeroComponent,
    SectionTitleComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly values = ABOUT_VALUES;
  readonly qualityPillars = QUALITY_PILLARS;
  readonly timeline = TIMELINE_EVENTS;
  readonly sustainability = SUSTAINABILITY_ITEMS;
  readonly distributionRegions = DISTRIBUTION_REGIONS;

  readonly missionPoints = [
    'ABOUT.MISSION_POINT_1',
    'ABOUT.MISSION_POINT_2',
    'ABOUT.MISSION_POINT_3',
  ];

  ngOnInit(): void {
    this.pageSeo.bind(() => {
      const title = this.translate.instant('ABOUT.META_TITLE');
      const description = this.translate.instant('ABOUT.META_DESCRIPTION');

      return {
        path: '/about',
        title,
        description,
        keywords: this.translate.instant('ABOUT.META_KEYWORDS'),
        type: 'website',
        jsonLd: collectJsonLdNodes(
          buildAboutPageSchema(description),
          buildBreadcrumbSchema([
            { name: this.translate.instant('NAV.HOME'), path: '/' },
            { name: this.translate.instant('NAV.ABOUT'), path: '/about' },
          ]),
        ),
      };
    }, this.destroyRef);
  }
}
