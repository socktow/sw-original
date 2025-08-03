"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const TABS = [
  { type: "0", label: "Latest News" },
  { type: "1", label: "Announcement" },
  { type: "2", label: "Maintenance" },
  { type: "3", label: "Updates" },
  { type: "4", label: "Event" },
];

const POSTS = [
  {
    id: "abc123",
    title: "Big Update Coming Soon!",
    desc: "We are excited to announce a major update with new features and improvements. Stay tuned!",
    date: "2024-06-01",
    type: "3",
  },
  {
    id: "xyz999",
    title: "Maintenance Notice",
    desc: "Scheduled maintenance will take place on June 5th. Please be aware of possible downtime.",
    date: "2024-06-03",
    type: "2",
  },
  {
    id: "def456",
    title: "Shop Sale Event",
    desc: "Don't miss our limited-time shop sale with exclusive items and discounts!",
    date: "2024-06-02",
    type: "4",
  },
];

export default function NewsList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type") || "0";
  const search = searchParams.get("q") || "";
  const [input, setInput] = useState(search);

  const currentTab = TABS.find((tab) => tab.type === type);

  const handleTabClick = (tabType) => {
    const params = new URLSearchParams(searchParams);
    if (tabType === "0") {
      params.delete("type");
    } else {
      params.set("type", tabType);
    }
    router.push(`/news?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (input.trim()) {
      params.set("q", input.trim());
    } else {
      params.delete("q");
    }
    router.push(`/news?${params.toString()}`);
  };

  const filteredPosts = POSTS.filter(
    (post) =>
      (type === "0" || post.type === type) &&
      (!search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative w-full h-32 md:h-40 flex items-center justify-center mb-8 rounded-lg overflow-hidden shadow">
        <Image
          src="/static/img/News-10e7e.jpg"
          alt="News Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {currentTab?.label ?? "News"}
          </h1>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <form
          className="search flex w-full max-w-xl md:w-2/3 lg:w-1/2"
          onSubmit={handleSearch}
        >
          <input
            name="search"
            type="text"
            className="input flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search news..."
            style={{ borderRight: "none" }}
          />
          <button
            className="search-button w-14 flex items-center justify-center bg-black text-white rounded-r-none"
            type="submit"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%)",
              borderTopRightRadius: "0.25rem",
              borderBottomRightRadius: "0.25rem",
              border: "1px solid #000",
              borderLeft: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {TABS.map((tab) => {
          const isActive = type === tab.type;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => handleTabClick(tab.type)}
              className={`tab-item flex-1 text-center px-4 py-3 transition-all duration-200 font-medium relative
                ${
                  isActive
                    ? "active font-bold bg-yellow-400 text-black"
                    : "bg-white text-black hover:bg-yellow-400 hover:font-bold"
                }
              `}
            >
              <span
                className={`absolute left-0 bottom-0 w-full h-1 transition-all duration-200
                  ${
                    isActive
                      ? "bg-yellow-400"
                      : "bg-transparent group-hover:bg-yellow-400"
                  }`}
              ></span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      <div className="space-y-6">
        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-500 py-10">No news found.</div>
        )}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg transition"
          >
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-2 line-clamp-2">{post.desc}</p>
              <div className="text-xs text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
            <Link
              href={`/news/${post.id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .tab-item {
          border-right: 1px solid #e5e7eb;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          overflow: hidden;
        }
        .tab-item:last-child {
          border-right: none;
        }
        .tab-item.active,
        .tab-item:hover {
          background: #facc15 !important;
          color: #000 !important;
        }
        .tab-item.active span,
        .tab-item:hover span {
          background: #facc15 !important;
        }
      `}</style>
    </div>
  );
}
