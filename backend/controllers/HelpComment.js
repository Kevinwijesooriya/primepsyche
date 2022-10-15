import HelpPost from "../models/HelpPost.js";

const HelpCommentController = {
  createComment: async (req, res) => {
    try {
      const { postId, userId, userName, suggest } = req.body;
      const payload = { userId, userName, suggest };

      const resp = await HelpPost.findOneAndUpdate(
        { _id: postId },
        { $push: { suggests: payload } }
      );
      res.json({
        message: "commented",
        data: suggest,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { postId, suggest } = req.body;
      const response = await HelpPost.findOneAndUpdate(
        { _id: postId, "suggests._id": id },
        {
          $set: {
            "suggests.$.suggest": suggest,
          },
        }
      );
      response;
      res.json({
        message: "Help comment update success",
        data: { suggest },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deleteHelpComment: async (req, res) => {
    try {
      const commentId = req.params.id;
      const { postId } = req.body;
      await HelpPost.findOneAndUpdate(
        { _id: postId },
        { $pull: { suggests: { _id: commentId } } }
      );
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default HelpCommentController;
