import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HelpPostSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    disorder: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    suggests: [
      {
        suggest: { type: String },
        userId: { type: String },
        userName: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("HelpPost", HelpPostSchema);
