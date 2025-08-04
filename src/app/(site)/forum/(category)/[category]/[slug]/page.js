"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Author from "./author";
import Comment from "./comment";

export default function PostDetailPage() {
  const { category, slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/public/forum/allpost/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <div className="p-8 text-center text-lg">Đang tải bài viết...</div>;
  if (!post)
    return (
      <div className="p-8 text-center text-red-500">
        Không tìm thấy bài viết.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - 3 columns */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {/* Nút quay lại ở góc bên trái */}
                <button
                  onClick={() => router.back()}
                  className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm text-white font-medium shadow-lg transition-all duration-200 hover:bg-white/30 hover:shadow-xl"
                >
                  <i className="fas fa-arrow-left text-sm" />
                  Quay lại
                </button>
                
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                      {post.title}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        <i className="fas fa-calendar-alt mr-2" />
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        <i className="fas fa-eye mr-2" />0 lượt xem
                      </span>
                      <div className="flex items-center">
                        <i className="fas fa-chevron-right text-white/70 text-xs mx-2" />
                        <Link 
                          href={`/forum/${category}`} 
                          className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
                        >
                          <span className="text-sm font-medium capitalize">
                            {category.replace('-', ' ')}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - Di chuyển lên đây */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-xl font-bold text-blue-600">
                    {post.likes?.length || 0}
                  </div>
                  <div className="text-xs text-blue-700">Lượt thích</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-xl font-bold text-green-600">
                    {post.commentCount || 0}
                  </div>
                  <div className="text-xs text-green-700">Bình luận</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-xl font-bold text-purple-600">0</div>
                  <div className="text-xs text-purple-700">Lượt xem</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-xl font-bold text-orange-600">0</div>
                  <div className="text-xs text-orange-700">Chia sẻ</div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-blue-600 prose-img:rounded-xl prose-blockquote:border-l-4 prose-blockquote:border-blue-500">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>

            {/* Action Buttons - Di chuyển xuống cuối bài viết */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors">
                  <i className="fas fa-heart text-red-500" />
                  Thích bài viết
                </button>

                <button className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
                  <i className="fas fa-share text-green-500" />
                  Chia sẻ
                </button>

                <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors">
                  <i className="fas fa-bookmark text-purple-500" />
                  Lưu bài viết
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Comment postId={post._id} />
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Author post={post} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
