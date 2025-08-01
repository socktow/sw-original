"use client";
import { useParams } from "next/navigation";
import ForumCategories from "../../components/ForumCategories";
import useForumPosts from "../../components/useForumPosts";
import ForumPostTable from "../../components/ForumPostTable";

export default function CategoryPage() {
  const { category } = useParams();
  const { posts, loading } = useForumPosts(category);

  return (
    <div>
      <ForumCategories />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold capitalize mb-6">{category.replace("-", " ")}</h2>
        {loading ? <div>Đang tải...</div> : <ForumPostTable posts={posts} category={category} />}
      </div>
    </div>
  );
}
