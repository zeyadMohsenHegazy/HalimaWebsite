import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  I18N_DEFAULT_LANGUAGE,
  I18N_STORAGE_KEY,
  I18N_SUPPORTED_LANGUAGES,
  SupportedLanguage,
  getDirectionForLanguage,
  isSupportedLanguage,
} from '../config/i18n.config';

export type { SupportedLanguage };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);

  private readonly languageSignal = signal<SupportedLanguage>(I18N_DEFAULT_LANGUAGE);

  readonly supportedLanguages = I18N_SUPPORTED_LANGUAGES;
  readonly currentLanguage = this.languageSignal.asReadonly();
  readonly direction = computed(() => getDirectionForLanguage(this.languageSignal()));
  readonly isRtl = computed(() => this.direction() === 'rtl');

  init(): Promise<void> {
    const initial = this.resolveInitialLanguage();

    return new Promise((resolve) => {
      this.translate.use(initial).subscribe({
        next: () => {
          this.applyLanguage(initial, false);
          resolve();
        },
        error: () => {
          this.applyLanguage(I18N_DEFAULT_LANGUAGE, false);
          resolve();
        },
      });
    });
  }

  setLanguage(lang: SupportedLanguage, persist = true): void {
    if (lang === this.languageSignal()) {
      return;
    }

    this.translate.use(lang).subscribe({
      next: () => this.applyLanguage(lang, persist),
      error: () => this.applyLanguage(lang, persist),
    });
  }

  toggleLanguage(): void {
    const next = this.languageSignal() === 'en' ? 'ar' : 'en';
    this.setLanguage(next);
  }

  getLogoPath(): string {
    return this.isRtl()
      ? 'assets/images/logo/HalimaLogoAr.png'
      : 'assets/images/logo/HalimaLogo.png';
  }

  private resolveInitialLanguage(): SupportedLanguage {
    const saved = this.getSavedLanguage();
    if (saved) {
      return saved;
    }

    const browserLang = this.translate.getBrowserLang();
    return browserLang === 'ar' ? 'ar' : I18N_DEFAULT_LANGUAGE;
  }

  private getSavedLanguage(): SupportedLanguage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return this.readLanguageFromDocument();
    }

    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    return isSupportedLanguage(saved) ? saved : null;
  }

  private readLanguageFromDocument(): SupportedLanguage | null {
    const lang = this.document.documentElement.lang;
    return isSupportedLanguage(lang) ? lang : null;
  }

  private applyLanguage(lang: SupportedLanguage, persist: boolean): void {
    this.languageSignal.set(lang);
    this.applyDocumentAttributes(lang);

    if (persist && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(I18N_STORAGE_KEY, lang);
    }
  }

  private applyDocumentAttributes(lang: SupportedLanguage): void {
    const html = this.document.documentElement;
    const body = this.document.body;
    const dir = getDirectionForLanguage(lang);

    html.lang = lang;
    html.dir = dir;

    if (body) {
      body.classList.remove('lang-en', 'lang-ar', 'dir-ltr', 'dir-rtl');
      body.classList.add(`lang-${lang}`, `dir-${dir}`);
    }
  }
}
