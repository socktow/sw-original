"use client";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "General Discussion", href: "/forum/discussion" },
  { name: "Game Tips", href: "/forum/game-tips" },
  { name: "Q & A", href: "/forum/qa" },
  { name: "Art & Media", href: "/forum/art-media" },
];

export default function ForumCategories() {
  return (
    <div className="w-full bg-white">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-64 mb-6">
        <Image
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Forum
          </h1>
        </div>
      </div>

      {/* Policy & Categories cùng 1 hàng */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 px-4 pb-6">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href}>
              <div
                className="btn-corner px-6 py-3 font-semibold cursor-pointer transition-all"
                style={{
                  backgroundColor: "#FFDB16",
                  color: "rgb(255, 255, 255)",
                }}
              >
                {cat.name} <span className="ml-1">›</span>
              </div>
            </Link>
          ))}
          <div
            className="btn-corner px-6 py-3 font-semibold cursor-pointer transition-all"
            style={{
              border: "2px solid rgb(102, 102, 102)",
              color: "rgb(255, 255, 255)",
              backgroundColor: "transparent",
            }}
          >
            Forum Policy
          </div>
        </div>
      </div>
    </div>
  );
}
