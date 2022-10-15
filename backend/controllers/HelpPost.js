import HelpPost from "../models/HelpPost.js";

const HelpPostController = {
  getOneHelpPost: async (req, res) => {
    const id = req.params.id;
    try {
      const post = await HelpPost.findOne({ _id: id });
      res.json({ message: "Help post fetch success", data: post });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getHelpPosts: async (req, res) => {
    try {
      const posts = await HelpPost.find();
      res.json({ message: "Help posts fetch success", data: posts });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createHelpPost: async (req, res) => {
    try {
      const { userID, name, age, gender, disorder, description } = req.body;
      const newHelpPost = new HelpPost({
        userID,
        name,
        age,
        gender,
        disorder,
        description,
      });
      await newHelpPost.save();
      res.json({ message: "Help post create success", data: newHelpPost });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateHelpPost: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, age, gender, disorder, description } = req.body;

      await HelpPost.findOneAndUpdate(
        { _id: id },
        { name, age, gender, disorder, description }
      );
      res.json({
        message: "Help post update success",
        data: { name, age, gender, disorder, description },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteHelpPost: async (req, res) => {
    try {
      const id = req.params.id;

      await HelpPost.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getMyHelpPosts: async (req, res) => {
    const userID = req.params.id;
    try {
      const posts = await HelpPost.find({ userID: userID });
      res.json({ message: "Help posts fetch success", data: posts });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default HelpPostController;
