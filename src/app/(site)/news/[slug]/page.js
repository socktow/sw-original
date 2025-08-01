"use client";
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Sample data (nên fetch từ API thực tế)
const POSTS = [
  {
    id: "abc123",
    title: "Big Update Coming Soon!",
    desc: "We are excited to announce a major update with new features and improvements. Stay tuned!",
    date: "2024-06-01",
    type: "3",
    content: "<p>This is the full content of the big update. More details coming soon!</p>"
  },
  {
    id: "xyz999",
    title: "Maintenance Notice",
    desc: "Scheduled maintenance will take place on June 5th. Please be aware of possible downtime.",
    date: "2024-06-03",
    type: "2",
    content: "<p>Maintenance will start at 2AM and is expected to last 3 hours.</p>"
  },
  {
    id: "def456",
    title: "Shop Sale Event",
    desc: "Don't miss our limited-time shop sale with exclusive items and discounts!",
    date: "2024-06-02",
    type: "4",
    content: "<p>Enjoy up to 50% off on selected items in the shop!</p>"
  },
];

export default function NewsDetail({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const post = POSTS.find((p) => p.id === slug);

  useEffect(() => {
    if (post) {
      document.title = post.title + " | News";
    } else {
      document.title = "News";
    }
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/news">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.title}</h1>
      <div className="text-xs text-gray-400 mb-6">{new Date(post.date).toLocaleDateString()}</div>
      <div className="prose prose-blue max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content || post.desc }} />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition"
        onClick={() => router.push('/news')}
      >
        Back to News
      </button>
    </div>
  );
}
  