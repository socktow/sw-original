'use client';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SignIn = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{t('signin.title')}</h1>
      <p className="mb-6">{t('signin.description')}</p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1">{t('signin.email')}</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">{t('signin.password')}</label>
          <input
            type="password"
            placeholder="********"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {t('signin.button')}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
