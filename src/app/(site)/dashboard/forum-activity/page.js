"use client";
import { useState } from "react";
import {
  FaRegUserCircle,
  FaRegCommentDots,
  FaThumbsUp,
  FaBookmark,
  FaPen,
} from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";

const tabs = [
  { key: "topics", label: "Created Topics", icon: <FaPen /> },
  { key: "comments", label: "Left Comments", icon: <FaRegCommentDots /> },
  { key: "likes", label: "Likes", icon: <FaThumbsUp /> },
  { key: "bookmarks", label: "Bookmarks", icon: <FaBookmark /> },
];

const sampleData = {
  topics: [
    {
      id: 1,
      title: "How to level up fast?",
      date: "2025-07-01",
      category: "Guides",
    },
    { id: 2, title: "Bug in Dungeon 3", date: "2025-06-28", category: "Bugs" },
  ],
  comments: [
    {
      id: 1,
      content: "Nice guide! Helped me a lot.",
      topic: "Leveling Tips",
      date: "2025-07-02",
    },
    {
      id: 2,
      content: "Same issue here!",
      topic: "Bug in Dungeon 3",
      date: "2025-07-01",
    },
  ],
  likes: [
    {
      id: 1,
      target: "Guide: Boss Mechanics",
      author: "User123",
      date: "2025-07-02",
    },
    {
      id: 2,
      target: "Best Build for PvE",
      author: "Knight456",
      date: "2025-06-30",
    },
  ],
  bookmarks: [
    {
      id: 1,
      title: "Advanced Combat Guide",
      date: "2025-07-03",
      category: "Tutorial",
    },
  ],
};

export default function ForumActivityPage() {
  const [activeTab, setActiveTab] = useState("topics");
  const data = sampleData[activeTab];
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white mt-8 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <FaRegUserCircle className="text-yellow-600" /> Forum Activities
      </h1>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={user?.avatar}
          alt="avatar"
          width={64}
          height={64}
          className="rounded-full border object-cover"
        />
        <div>
          <div className="font-bold">{user.username || "Anonymous"}</div>
          <div className="text-xs text-gray-500">
            Forum Sanction:{" "}
            <span className="text-blue-600">
              {user.forum?.sanction || "None"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-all ${
              activeTab === tab.key
                ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                : "border-transparent text-gray-500 hover:text-yellow-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "topics" &&
          data.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded">
              <div className="font-semibold text-yellow-700">{item.title}</div>
              <div className="text-xs text-gray-500">
                Category: {item.category} • {item.date}
              </div>
            </div>
          ))}

        {activeTab === "comments" &&
          data.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded">
              <div className="text-sm text-gray-800">“{item.content}”</div>
              <div className="text-xs text-gray-500">
                On topic: <span className="text-blue-600">{item.topic}</span> •{" "}
                {item.date}
              </div>
            </div>
          ))}

        {activeTab === "likes" &&
          data.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded">
              <div className="text-sm text-yellow-700">❤️ {item.target}</div>
              <div className="text-xs text-gray-500">
                By: {item.author} • {item.date}
              </div>
            </div>
          ))}

        {activeTab === "bookmarks" &&
          data.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border rounded">
              <div className="font-semibold text-yellow-700">{item.title}</div>
              <div className="text-xs text-gray-500">
                Category: {item.category} • {item.date}
              </div>
            </div>
          ))}

        {data.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-10">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
}
