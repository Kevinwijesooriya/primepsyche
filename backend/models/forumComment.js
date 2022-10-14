import mongoose from "mongoose";
const { Schema, model } = mongoose;

const forumCommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("ForumComment", forumCommentSchema);
