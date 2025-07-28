'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import en from '@/language/en-US.json';
import ko from '@/language/ko-KR.json';
import zh from '@/language/zh-CN.json';
const translations = {
  'en-US': en,
  'ko-KR': ko,
  'zh-CN': zh,
};
const getNestedValue = (obj, key) => {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState('en-US');

  useEffect(() => {
    const segments = pathname.split('/');
    const langFromURL = segments[1];

    if (langFromURL && langFromURL !== currentLanguage) {
      setCurrentLanguage(langFromURL);
      localStorage.setItem('locale', langFromURL);
    }
  }, [pathname]);

  const changeLanguage = (lang) => {
    localStorage.setItem('locale', lang);
    setCurrentLanguage(lang);

    const segments = pathname.split('/');
    if (segments.length >= 3) {
      segments[1] = lang;
      router.push(segments.join('/'));
    } else {
      router.push(`/${lang}/home-page`);
    }
  };

  const t = (key) => {
    const value = getNestedValue(translations[currentLanguage], key);
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
