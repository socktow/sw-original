'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Author({ post }) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post.authorId) {
      fetch(`/api/public/profile/${post.authorId}`)
        .then(res => res.json())
        .then(data => {
          setAuthor(data.user);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [post.authorId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Author Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <div className="relative mb-4">
            {author?.avatar ? (
              <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
                <Image
                  src={author.avatar}
                  alt={author.username || 'Avatar'}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                {author?.username?.charAt(0)?.toUpperCase() || post.authorId?.toString().slice(-2)}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {author?.username || `User_${post.authorId?.toString().slice(-5)}`}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            {author?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="text-center">
              <div className="font-bold text-blue-600">0</div>
              <div>Bài viết</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-green-600">0</div>
              <div>Bình luận</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-purple-600">0</div>
              <div>Lượt thích</div>
            </div>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors">
            <i className="fas fa-user-plus mr-2" />
            Theo dõi
          </button>
        </div>
      </div>

      {/* Author Stats */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-calendar text-blue-600 text-sm" />
              </div>
              <span className="text-gray-700">Tham gia</span>
            </div>
            <span className="text-sm text-gray-500">
              {author?.createdAt ? new Date(author.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Bài viết gần đây</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
              {post.title}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </div>
          
          <div className="text-center py-4">
            <Link 
              href={`/forum/user/${post.authorId}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Xem tất cả bài viết →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 