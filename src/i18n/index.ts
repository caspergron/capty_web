import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translations using http (default public/locales)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    supportedLngs: ['en', 'da', 'sv', 'no', 'fi', 'et', 'de', 'fr', 'nl', 'es'],
    
    // Configuration options for language detection
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'localStorage'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Default namespace
    defaultNS: 'translation',
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;