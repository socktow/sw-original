'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { LanguageProvider } from '@/context/LanguageContext';

export default function ClientWrapper({ children, locale }) {
  return (
    <LanguageProvider locale={locale}>
      <Provider store={store}>{children}</Provider>
    </LanguageProvider>
  );
}
