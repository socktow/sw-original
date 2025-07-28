'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const locale = localStorage.getItem('locale') || 'en-US';
    router.replace(`/${locale}/home-page`);
  }, []);

  return null;
}
