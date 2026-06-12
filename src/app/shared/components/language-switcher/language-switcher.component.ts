import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);

  readonly languages = this.languageService.supportedLanguages;

  switchLanguage(lang: SupportedLanguage): void {
    this.languageService.setLanguage(lang);
  }

  labelKey(lang: SupportedLanguage): string {
    return lang === 'en' ? 'LANG.EN' : 'LANG.AR';
  }
}
