'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/cookies';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const locale = getCookie('mi18nLang') || 'en-US';
    router.replace(`/${locale}/home-page`);
  }, []);

  return null;
}
