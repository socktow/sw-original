'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import enUS from '../language/en-US.json';
import koKR from '../language/ko-KR.json';
import zhCN from '../language/zh-CN.json';

const languages = {
  'en-US': enUS,
  'ko-KR': koKR,
  'zh-CN': zhCN
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const [translations, setTranslations] = useState(languages['en-US']);

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language;
    const initialLanguage = savedLanguage || browserLanguage || 'en-US';
    
    setCurrentLanguage(initialLanguage);
    setTranslations(languages[initialLanguage] || languages['en-US']);
  }, []);

  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode);
      setTranslations(languages[languageCode]);
      localStorage.setItem('language', languageCode);
      document.cookie = `locale=${languageCode}; path=/`;
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 