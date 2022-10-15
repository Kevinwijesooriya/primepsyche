import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema(
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
        date: {
            type: String,
            required: true,
            trim: true,
        },
        time: {
            type: String,
            required: true,
            trim: true,
        },
        conducted_by: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
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

export default model("event", eventSchema);
