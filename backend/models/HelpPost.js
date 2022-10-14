import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HelpPostSchema = new Schema(
  {
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
    response: [
      {
        comment: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("HelpPost", HelpPostSchema);
