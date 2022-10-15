import mongoose from "mongoose";
const { Schema, model } = mongoose;

const audioMaterialsSchema = new Schema(
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
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    audioFile: {
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

export default model("AudioMaterials", audioMaterialsSchema);
