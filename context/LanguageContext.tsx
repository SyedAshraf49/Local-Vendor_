
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

type Language = 'en' | 'ta' | 'hi' | 'te' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const setLanguageCallback = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageCallback }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};