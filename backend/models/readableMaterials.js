import mongoose from "mongoose";
const { Schema, model } = mongoose;

const readableMaterialsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    readableFile: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    approve: {
      type: Boolean,

      required: true,

      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("ReadableMaterials", readableMaterialsSchema);
