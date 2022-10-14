import ForumComment from "../models/forumComment.js";

const forumCommentController = {
  getOneForumComment: async (req, res) => {
    const id = req.params.id;
    try {
      const comment = await ForumComment.findOne({ _id: id });
      res.json({ message: "Forum comment fetch success", data: comment });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getForumComments: async (req, res) => {
    try {
      const comments = await ForumComment.find();
      res.json({ message: "Forum comments fetch success", data: comments });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createForumComment: async (req, res) => {
    try {
      const { userId, userName, comment } = req.body;

      if (!comment || !userId)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const newForumComment = new ForumComment({
        userId,
        userName,
        comment,
      });
      await newForumComment.save();
      res.json({
        message: "Forum comment create success",
        data: newForumComment,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateForumComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { comment } = req.body;

      await ForumComment.findOneAndUpdate({ _id: id }, { comment });
      res.json({
        message: "Forum comment update success",
        data: { comment },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteForumComment: async (req, res) => {
    try {
      const id = req.params.id;

      await ForumComment.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default forumCommentController;
