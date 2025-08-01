"use client";
import Link from "next/link";

export default function ForumPostTable({ posts, category }) {
  if (!posts.length) return <div className="text-center text-gray-500">Chưa có bài viết nào.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-white flex flex-col justify-between"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
              {post.mainCategory?.replace("-", " ") || "Unknown"}
            </span>
            {post.subCategory && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                {post.subCategory}
              </span>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/forum/${category || post.mainCategory}/${post._id}`}
            className="text-lg font-bold text-gray-900 hover:text-green-700 transition line-clamp-2"
          >
            {post.title}
          </Link>

          {/* Meta Info */}
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <i className="fas fa-user-circle text-green-600" />
              {post.authorId?.toString?.().slice(-5)}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-calendar-alt text-yellow-600" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Stats + Link */}
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="flex gap-4 text-gray-500">
              <span className="flex items-center gap-1 text-red-500">
                <i className="fas fa-heart" />
                {post.likes?.length || 0}
              </span>
              <span className="flex items-center gap-1 text-blue-500">
                <i className="fas fa-comments" />
                {post.commentCount || 0}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <i className="fas fa-eye" />
                0
              </span>
            </div>

            <Link
              href={`/forum/${category || post.mainCategory}/${post._id}`}
              className="text-green-600 font-medium hover:underline"
            >
              Xem <i className="fas fa-arrow-right text-xs" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
