export const I18N_STORAGE_KEY = 'halima-lang';

export const I18N_DEFAULT_LANGUAGE = 'en' as const;

export const I18N_SUPPORTED_LANGUAGES = ['en', 'ar'] as const;

export type SupportedLanguage = (typeof I18N_SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return value === 'en' || value === 'ar';
}

export function getDirectionForLanguage(lang: SupportedLanguage): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
