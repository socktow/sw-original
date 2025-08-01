"use client";

import { useLanguage } from "@/app/hooks/useLanguage";
import { FaGlobeAsia } from "react-icons/fa";

export default function Footer() {
  const { changeLanguage, currentLanguage } = useLanguage();

  return (
    <footer className="mt-10 border-t px-4 py-6 text-sm text-gray-600 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold">© 2025 SoulWorker Online</p>
          <p className="text-xs text-gray-400">All rights reserved.</p>
        </div>

        <div className="flex items-center gap-2">
          <FaGlobeAsia className="text-gray-500" />
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring"
          >
            <option value="en-US">English</option>
            <option value="ja-JP">日本語 </option>
            <option value="vi-VN">Tiếng Việt</option>
            <option value="ko-KR">한국어</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
