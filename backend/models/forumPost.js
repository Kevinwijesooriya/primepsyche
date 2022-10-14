import mongoose from "mongoose";
const { Schema, model } = mongoose;

const forumPostSchema = new Schema(
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    comments: [
      {
        comment: { type: String },
        userId: { type: String },
        userName: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("ForumPost", forumPostSchema);
