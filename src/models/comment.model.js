import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const commentSchema = new Schema({
  forumId: { type: Schema.Types.ObjectId, ref: "Forum", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export const ForumComment = models.ForumComment || model("ForumComment", commentSchema);
