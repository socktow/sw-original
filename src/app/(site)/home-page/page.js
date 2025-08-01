'use client';

import { useLanguage } from '@/app/hooks/useLanguage';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-700">{t('description')}</p>
    </div>
  );
}