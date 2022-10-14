import EventComment from "../models/eventComment.js";
import Event from "../models/event.js";

const EventCommentController = {
    getOneEventComment: async (req, res) => {
        const id = req.params.id;
        try {
            const comments = await Event.findOne({ _id: id });
            res.json({ message: "Event comment fetch success", data: comments });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getEventComments: async (req, res) => {
        try {
            const response = await Event.findOne({ _id: id });
            res.json({
                message: "Event comments fetch success",
                data: response.comments,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    createEventComment: async (req, res) => {
        try {
            const { eventId, userId, userName, comment } = req.body;
            const payload = { userId, userName, comment };

            const response = await Event.findOneAndUpdate(
                { _id: eventId },
                { $push: { comments: payload } }
            );
            res.json({
                message: "Event comment add success",
                data: comment,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateEventComment: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(
                "🚀 ~ file: EventComment.js ~ line 47 ~ updateEventComment: ~ id",
                id
            );
            const { eventId, comment } = req.body;
            console.log(
                "🚀 ~ file: EventComment.js ~ line 48 ~ updateEventComment: ~ comment",
                comment
            );

            const response = await Event.findOneAndUpdate(
                { _id: eventId, "comments._id": id },
                {
                    $set: {
                        "comments.$.comment": comment,
                    },
                }
            );
            console.log(
                "🚀 ~ file: EventComment.js ~ line 54 ~ updateEventComment: ~ response",
                response
            );
            res.json({
                message: "Event comment update success",
                data: { comment },
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    deleteEventComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { eventId } = req.body;
            console.log(
                "🚀 ~ file: DeleteComment.jsx ~ line 24 ~ handleOpen ~ deleteId, eventId",
                commentId,
                eventId
            );
            await Event.findOneAndUpdate(
                { _id: eventId },
                { $pull: { comments: { _id: commentId } } }
            );
            res.json({ message: "delete success !" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

export default EventCommentController;
