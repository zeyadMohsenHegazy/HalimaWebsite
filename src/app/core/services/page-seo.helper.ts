import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { PageSeoConfig, TranslationSeoKeys } from '../models/seo.model';
import { SeoService } from './seo.service';

/**
 * Reusable helper that binds translated SEO metadata to a page
 * and refreshes on language change.
 */
@Injectable({ providedIn: 'root' })
export class PageSeoHelper {
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);

  /** Bind a dynamic SEO config factory; re-applies on language change */
  bind(configFactory: () => PageSeoConfig, destroyRef?: DestroyRef): void {
    const ref = destroyRef ?? inject(DestroyRef);
    const apply = () =>
      this.seo.updatePage(configFactory(), this.language.currentLanguage());

    apply();
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(ref))
      .subscribe(() => apply());
  }

  /** Bind SEO from ngx-translate keys with optional JSON-LD */
  bindFromKeys(options: TranslationSeoKeys, destroyRef?: DestroyRef): void {
    this.bind(() => {
      const config: PageSeoConfig = {
        path: options.path,
        title: this.translate.instant(options.titleKey),
        description: this.translate.instant(options.descriptionKey),
        keywords: options.keywordsKey
          ? this.translate.instant(options.keywordsKey)
          : undefined,
        image: options.image,
        imageAlt: options.imageAlt,
        type: options.type,
        jsonLd: options.jsonLd,
        includeOrganization: options.includeOrganization,
      };
      return config;
    }, destroyRef);
  }
}
