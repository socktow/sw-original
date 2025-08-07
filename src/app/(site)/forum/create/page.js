"use client"
import React, { useState } from "react";

const categories = [
  { value: "discussion", label: "Thảo luận" },
  { value: "game-tips", label: "Mẹo chơi" },
  { value: "qa", label: "Hỏi đáp" },
  { value: "art-media", label: "Art & Media" },
];

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    mainCategory: categories[0].value,
    subCategory: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Giả lập authorId, thực tế lấy từ user context hoặc redux
  const authorId = "64e8f8e2c7b2f9a1b2c3d4e5"; // Thay bằng id thật

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/forum/post-articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, authorId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Đăng bài thành công!");
        setForm({
          title: "",
          content: "",
          mainCategory: categories[0].value,
          subCategory: "",
          imageUrl: "",
        });
      } else {
        setMessage(data.error || "Có lỗi xảy ra.");
      }
    } catch {
      setMessage("Không thể kết nối máy chủ.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Tạo bài viết diễn đàn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={300}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Danh mục chính:</label>
          <select
            name="mainCategory"
            value={form.mainCategory}
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sub-category:</label>
          <input
            type="text"
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Ảnh (URL):</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng..." : "Đăng bài"}
        </button>
      </form>
      {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default Page;
