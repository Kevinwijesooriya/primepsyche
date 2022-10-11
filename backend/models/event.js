import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema(
    {
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
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("event", eventSchema);
