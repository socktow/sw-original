'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t, changeLanguage, currentLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border p-2 mt-4"
      >
        <option value="en-US">English</option>
        <option value="ko-KR">한국어</option>
        <option value="zh-CN">中文</option>
      </select>
    </div>
  );
}
