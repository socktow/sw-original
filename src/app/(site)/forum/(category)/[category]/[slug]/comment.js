'use client';
import { useState, useEffect } from 'react';

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Comment ảo để test giao diện
  const mockComments = [
    {
      _id: '1',
      content: 'Bài viết rất hay! Tôi đã học được nhiều điều từ bài viết này. Cảm ơn tác giả đã chia sẻ những thông tin hữu ích.',
      author: { username: 'SoulMaster', role: 'admin' },
      authorId: 'user1',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
      likes: 5,
      isLiked: false
    },
    {
      _id: '2',
      content: 'Tôi cũng đã thử cách này và nó hoạt động rất tốt. Mọi người nên thử áp dụng vào game của mình.',
      author: { username: 'GamePlayer2024', role: 'user' },
      authorId: 'user2',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 giờ trước
      likes: 3,
      isLiked: true
    },
    {
      _id: '3',
      content: 'Có ai biết cách tối ưu hóa thêm không? Tôi muốn cải thiện hiệu suất game của mình.',
      author: { username: 'TechGamer', role: 'user' },
      authorId: 'user3',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 giờ trước
      likes: 1,
      isLiked: false
    },
    {
      _id: '4',
      content: 'Tuyệt vời! Đây chính xác là những gì tôi đang tìm kiếm. Cảm ơn bạn đã chia sẻ kinh nghiệm.',
      author: { username: 'NewbiePlayer', role: 'user' },
      authorId: 'user4',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 giờ trước
      likes: 2,
      isLiked: false
    }
  ];

  useEffect(() => {
    // Fetch comments
    fetch(`/api/public/forum/comments/${postId}`)
      .then(res => res.json())
      .then(data => {
        // Sử dụng mock comments nếu API chưa có data
        setComments(data.comments?.length > 0 ? data.comments : mockComments);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to mock comments
        setComments(mockComments);
        setLoading(false);
      });

    // Check if user is logged in
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          // Mock user for testing
          setUser({
            username: 'TestUser',
            role: 'user'
          });
        }
      })
      .catch(() => {
        // Mock user for testing
        setUser({
          username: 'TestUser',
          role: 'user'
        });
      });
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/public/forum/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment('');
      } else {
        // Mock thêm comment nếu API chưa sẵn sàng
        const mockNewComment = {
          _id: Date.now().toString(),
          content: newComment,
          author: { username: user.username, role: user.role },
          authorId: user.id || 'currentUser',
          createdAt: new Date(),
          likes: 0,
          isLiked: false
        };
        setComments([mockNewComment, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      // Mock thêm comment nếu có lỗi
      const mockNewComment = {
        _id: Date.now().toString(),
        content: newComment,
        author: { username: user.username, role: user.role },
        authorId: user.id || 'currentUser',
        createdAt: new Date(),
        likes: 0,
        isLiked: false
      };
      setComments([mockNewComment, ...comments]);
      setNewComment('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await fetch(`/api/public/forum/comment/like/${commentId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setComments(comments.map(comment => 
          comment._id === commentId 
            ? { ...comment, likes: comment.likes + 1, isLiked: true }
            : comment
        ));
      } else {
        // Mock like nếu API chưa sẵn sàng
        setComments(comments.map(comment => 
          comment._id === commentId 
            ? { ...comment, likes: comment.likes + 1, isLiked: true }
            : comment
        ));
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      // Mock like nếu có lỗi
      setComments(comments.map(comment => 
        comment._id === commentId 
          ? { ...comment, likes: comment.likes + 1, isLiked: true }
          : comment
      ));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Comment Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">
          Bình luận ({comments.length})
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fas fa-sort text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fas fa-filter text-gray-600" />
          </button>
        </div>
      </div>

      {/* Comment Form */}
      {user ? (
        <div className="bg-gray-50 rounded-2xl p-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  disabled={submitting}
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <i className="fas fa-smile" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <i className="fas fa-image" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <i className="fas fa-link" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!newComment.trim() || submitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">💬</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Đăng nhập để bình luận
          </h3>
          <p className="text-gray-600 mb-4">
            Tham gia thảo luận với cộng đồng SoulWorker
          </p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
            Đăng nhập ngay
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💭</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Chưa có bình luận nào
            </h3>
            <p className="text-gray-600">
              Hãy là người đầu tiên bình luận về bài viết này!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {comment.author?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-800">
                      {comment.author?.username || `User_${comment.authorId?.toString().slice(-5)}`}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {comment.author?.role === 'admin' && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        Admin
                      </span>
                    )}
                  </div>
                  
                  <div className="text-gray-700 mb-4 leading-relaxed">
                    {comment.content}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      onClick={() => handleLikeComment(comment._id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                        comment.isLiked
                          ? 'bg-red-100 text-red-600'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`fas fa-heart ${comment.isLiked ? 'text-red-500' : ''}`} />
                      <span>{comment.likes || 0}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                      <i className="fas fa-reply" />
                      <span>Trả lời</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                      <i className="fas fa-flag" />
                      <span>Báo cáo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Comments */}
      {comments.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Xem thêm bình luận
          </button>
        </div>
      )}
    </div>
  );
} 