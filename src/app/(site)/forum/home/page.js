"use client";
import ForumCategories from "../components/ForumCategories";
import useForumPosts from "../components/useForumPosts";
import ForumPostTable from "../components/ForumPostTable";

export default function ForumHome() {
  const { posts, loading } = useForumPosts();

  return (
    <div>
      <ForumCategories />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Tất cả bài viết</h2>
        {loading ? <div>Đang tải...</div> : <ForumPostTable posts={posts} />}
      </div>
    </div>
  );
}
