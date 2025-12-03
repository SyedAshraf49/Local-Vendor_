
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../lib/translations';

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
