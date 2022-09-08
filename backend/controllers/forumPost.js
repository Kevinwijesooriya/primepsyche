import ForumPost from "../models/forumPost.js";

const forumPostController = {
  getOneForumPost: async (req, res) => {
    const id = req.params.id;
    try {
      const post = await ForumPost.findOne({ _id: id });
      res.json({ message: "Forum post fetch success", data: post });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getForumPosts: async (req, res) => {
    try {
      const posts = await ForumPost.find();
      res.json({ message: "Forum posts fetch success", data: posts });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createForumPost: async (req, res) => {
    try {
      const { userId, userName, title, description, image } = req.body;
      const ExistingPost = await ForumPost.findOne({ title });
      if (ExistingPost)
        return res.status(400).json({
          message:
            "Someone has a post with the same title. Please use another title.",
        });

      if (!title || !description || !image || !userId)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newForumPost = new ForumPost({
        userId,
        userName,
        title,
        description,
        image,
      });
      await newForumPost.save();
      res.json({ message: "Forum post create success", data: newForumPost });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateForumPost: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, image } = req.body;

      await ForumPost.findOneAndUpdate(
        { _id: id },
        { title, description, image }
      );
      res.json({
        message: "Forum post update success",
        data: { title, description, image },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteForumPost: async (req, res) => {
    try {
      const id = req.params.id;

      await ForumPost.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default forumPostController;
