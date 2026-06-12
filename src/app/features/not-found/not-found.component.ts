import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent implements OnInit {
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.pageSeo.bind(() => {
      const title = this.translate.instant('NOT_FOUND.META_TITLE');
      const description = this.translate.instant('NOT_FOUND.META_DESCRIPTION');

      return {
        path: '/404',
        title,
        description,
        robots: 'noindex, follow',
        jsonLd: collectJsonLdNodes(
          buildWebPageSchema('/404', title, description),
          buildBreadcrumbSchema([
            { name: this.translate.instant('NAV.HOME'), path: '/' },
            { name: title, path: '/404' },
          ]),
        ),
      };
    }, this.destroyRef);
  }
}
