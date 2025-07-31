"use client";
import Image from "next/image";
import DashboardTabs from "@/app/[locale]/components/dashboard/DashboardTabs";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6 rounded-lg overflow-hidden shadow">
        <Image
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Mypage
          </h1>
        </div>
      </div>

      <DashboardTabs />
      <div className="flex justify-center items-start w-full px-2">
        <main className="w-full max-w-7xl mx-auto my-4 min-h-[700px]">
          {children}
        </main>
      </div>
    </>
  );
}
