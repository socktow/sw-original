import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "Không có ảnh nào được chọn" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: "dwcfclm8c",
    api_key: "589947587328463",
    api_secret: "g3NxiJGuq7Tl3dQqGngoS0fA2U0",
  });

  try {
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "forum-posts" }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({ url: res.secure_url });
  } catch (err) {
    return NextResponse.json({ error: "Upload thất bại", detail: err.message }, { status: 500 });
  }
}
