"use client";
import { useEffect, useState } from "react";

export default function useForumPosts(filterCategory = null) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/public/forum/allpost")
      .then((res) => res.json())
      .then((data) => {
        let filtered = data.posts || [];
        if (filterCategory) {
          filtered = filtered.filter(
            (post) => post.mainCategory === filterCategory
          );
        }
        setPosts(filtered);
        setLoading(false);
      });
  }, [filterCategory]);

  return { posts, loading };
}
