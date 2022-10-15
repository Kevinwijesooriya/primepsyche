import Event from "../models/event.js";

const eventController = {
    getOneEvent: async (req, res) => {
        const id = req.params.id;
        try {
            const event = await Event.findOne({ _id: id });
            res.json({ message: "Event fetch success", data: event });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getEvent: async (req, res) => {
        try {
            const events = await Event.find();
            res.json({ message: "Events fetch success", data: events });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    createEvent: async (req, res) => {
        try {
            const { userId, userName, title, date, time, conducted_by, description, image } = req.body;
            const ExistingPost = await Event.findOne({ title });
            if (ExistingPost)
                return res.status(400).json({
                    message:
                        "Someone has a event with the same title. Please use another title.",
                });

            if (!title || !date || !time || !conducted_by || !description || !image)
                return res.status(400).json({ msg: "Please fill in all fields." });

            const newEvent = new Event({
                userId,
                userName,
                title,
                date,
                time,
                conducted_by,
                description,
                image,
            });
            await newEvent.save();
            res.json({ message: "Forum event create success", data: newEvent });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, conducted_by, description, image } = req.body;

            await Event.findOneAndUpdate(
                { _id: id },
                { title, conducted_by, description, image }
            );
            res.json({
                message: "Forum event update success",
                data: { title, conducted_by, description, image },
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const id = req.params.id;

            await Event.findByIdAndDelete({ _id: id });
            res.json({ message: "delete success !" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getMyEvents: async (req, res) => {
        const userId = req.params.id;
        try {
            const event = await Event.find({ userId: userId });
            res.json({ message: "My Events fetch success", data: event });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

export default eventController;
