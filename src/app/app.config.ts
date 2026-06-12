import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { CONTACT_EMAIL_SENDER } from './core/services/contact/contact-email-sender';
import { EmailJsContactSender } from './core/services/contact/emailjs-contact-sender.service';
import { I18N_DEFAULT_LANGUAGE } from './core/config/i18n.config';
import { LanguageService } from './core/services/language.service';
import { ProductService } from './core/services/product.service';

function initializeApp(): () => Promise<void> {
  const languageService = inject(LanguageService);
  const productService = inject(ProductService);
  return async () => {
    await languageService.init();
    productService.loadProducts();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: false }),
    ),
    provideHttpClient(withFetch()),
    provideTranslateService({
      fallbackLang: I18N_DEFAULT_LANGUAGE,
      lang: I18N_DEFAULT_LANGUAGE,
    }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
    {
      provide: CONTACT_EMAIL_SENDER,
      useClass: EmailJsContactSender,
    },
  ],
};
