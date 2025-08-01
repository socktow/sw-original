'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PostDetailPage() {
  const { category, slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/forum/allpost/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data.post);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-8 text-center text-lg">Đang tải bài viết...</div>;
  if (!post) return <div className="p-8 text-center text-red-500">Không tìm thấy bài viết.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2 sm:px-4">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
        <Link href="/forum" className="hover:underline flex items-center gap-1 text-blue-600">
          <i className="fas fa-home" /> Forum
        </Link>
        <span>/</span>
        <Link href={`/forum/${category}`} className="hover:underline text-blue-600">
          {category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-800 truncate max-w-[120px] sm:max-w-[200px]">{post.title.slice(0, 40)}...</span>
      </div>

      {/* Header với nền nổi bật */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6 bg-gradient-to-r from-yellow-100 via-white to-green-100">
        <div className="absolute inset-0 bg-[url('/static/img/forum/forum-banner.png')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-lg">{post.title}</h1>
          {/* Meta info */}
          <div className="flex flex-wrap gap-4 items-center text-gray-600 text-sm mt-2">
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow">
              <i className="fas fa-user-circle text-green-600" />
              <span className="font-semibold text-black ml-1">{post.authorId?.toString().slice(-5)}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow">
              <i className="fas fa-calendar-alt text-yellow-600" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow">
              <i className="fas fa-heart text-red-500" />
              {post.likes?.length || 0}
            </div>
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow">
              <i className="fas fa-comments text-blue-500" />
              {post.commentCount || 0}
            </div>
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow">
              <i className="fas fa-eye text-gray-400" />
              0
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 prose max-w-none prose-headings:text-gray-800 prose-a:text-blue-600 prose-img:rounded-md mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Nút quay về */}
      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-gray-50 hover:bg-yellow-100 text-base text-gray-700 font-semibold shadow transition"
        >
          <i className="fas fa-arrow-left" /> Quay về
        </button>
      </div>
    </div>
  );
}
