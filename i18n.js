import * as RNLocalize from 'react-native-localize';
import en from './locales/en';
import es from './locales/es';

const translations = { en, es };

const fallback = { languageTag: 'en', isRTL: false };

const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(translations)) ||
  fallback;

let t = (key) => translations[languageTag][key] || key;

export { t };
