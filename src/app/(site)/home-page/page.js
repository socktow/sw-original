'use client';

import { useLanguage } from '@/app/hooks/useLanguage';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('title')}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t('description')}
        </motion.p>
        <motion.button
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t('heroButton')}
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{t('featuresTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: '⚔️', text: t('feature1') },
            { icon: '🧙‍♂️', text: t('feature2') },
            { icon: '🎉', text: t('feature3') },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <p className="text-lg font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
