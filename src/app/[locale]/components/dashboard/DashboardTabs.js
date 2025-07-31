"use client";
import { usePathname, useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { useLanguage } from "@/app/hooks/useLanguage";

const tabs = [
  { labelKey: 'Overview', path: '/dashboard/main' },
  { labelKey: 'N-Coin History', path: '/dashboard/coin-purchase' },
  { labelKey: 'My Inquiry', path: '/dashboard/inquiry' },
  { labelKey: 'Forum Activities', path: '/dashboard/forum-activity' },
];

export default function DashboardTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, currentLanguage: locale } = useLanguage();

  const isActiveTab = (path) =>
    pathname === `/${locale}${path}` || (path === '/dashboard/main' && pathname === `/${locale}/dashboard`);

  return (
    <div className="w-full max-w-full mx-auto flex justify-center mt-4 mb-10">
      <div className="relative flex bg-white rounded-lg shadow border border-gray-200 px-2 py-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.path);

          return (
            <button
              key={tab.path}
              onClick={() => router.push(`/${locale}${tab.path}`)}
              className={`relative px-5 py-3 mx-1 font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 ease-in-out
                ${isActive ? 'text-black font-bold' : 'text-gray-500 hover:text-yellow-500'}
              `}
              style={{
                minWidth: 120,
              }}
            >
              {tab.labelKey}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute left-0 bottom-0 h-1 w-full rounded bg-yellow-400"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
