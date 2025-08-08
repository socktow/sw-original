"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const categories = [
  { value: "discussion", label: "Thảo luận" },
  { value: "game-tips", label: "Mẹo chơi" },
  { value: "qa", label: "Hỏi đáp" },
  { value: "art-media", label: "Art & Media" },
];

const Page = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user)
  const authorId = user?.id || null;
  const [form, setForm] = useState({
    title: "",
    content: "",
    mainCategory: categories[0].value,
    subCategory: "",
    imageUrl: "",
  });
  const [imageType, setImageType] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let finalImageUrl = form.imageUrl;

    if (imageType === "upload" && imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      try {
        const res = await fetch("/api/user/upload-image", {
          method: "POST",
          body: uploadData,
        });
        const result = await res.json();

        if (!res.ok) {
          setMessage("❌ Upload ảnh thất bại: " + result.error);
          setLoading(false);
          return;
        }

        finalImageUrl = result.url;
      } catch (err) {
        setMessage("❌ Không thể kết nối máy chủ khi upload ảnh.");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/user/forum/post-articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: finalImageUrl,
          authorId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Đăng bài thành công!");
        setForm({
          title: "",
          content: "",
          mainCategory: categories[0].value,
          subCategory: "",
          imageUrl: "",
        });
        setImageFile(null);
        setImageType("url");
      } else {
        setMessage(data.error || "❌ Có lỗi xảy ra.");
      }
    } catch (err) {
      setMessage("❌ Không thể kết nối máy chủ.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Tạo bài viết diễn đàn
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tiêu đề
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={300}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nội dung
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Danh mục chính
          </label>
          <select
            name="mainCategory"
            value={form.mainCategory}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub-category
          </label>
          <input
            type="text"
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Image type toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chọn cách thêm ảnh
          </label>
          <div className="flex items-center space-x-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
              />
              <span>Dán URL ảnh</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="imageType"
                value="upload"
                checked={imageType === "upload"}
                onChange={() => setImageType("upload")}
              />
              <span>Tải ảnh từ máy</span>
            </label>
          </div>
        </div>

        {/* Image input */}
        {imageType === "url" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ảnh (URL)
            </label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng..." : "Đăng bài"}
          </button>
        </div>

        {message && (
          <p className="text-center mt-2 text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Page;
