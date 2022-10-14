import ForumComment from "../models/forumComment.js";
import ForumPost from "../models/forumPost.js";

const forumCommentController = {
  getOneForumComment: async (req, res) => {
    const id = req.params.id;
    try {
      const comments = await ForumPost.findOne({ _id: id });
      res.json({ message: "Forum comment fetch success", data: comments });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getForumComments: async (req, res) => {
    try {
      const response = await ForumPost.findOne({ _id: id });
      res.json({
        message: "Forum comments fetch success",
        data: response.comments,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createForumComment: async (req, res) => {
    try {
      const { postId, userId, userName, comment } = req.body;
      const payload = { userId, userName, comment };

      const response = await ForumPost.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: payload } }
      );
      res.json({
        message: "Forum comment add success",
        data: comment,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateForumComment: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(
        "🚀 ~ file: forumComment.js ~ line 47 ~ updateForumComment: ~ id",
        id
      );
      const { postId, comment } = req.body;
      console.log(
        "🚀 ~ file: forumComment.js ~ line 48 ~ updateForumComment: ~ comment",
        comment
      );

      const response = await ForumPost.findOneAndUpdate(
        { _id: postId, "comments._id": id },
        {
          $set: {
            "comments.$.comment": comment,
          },
        }
      );
      console.log(
        "🚀 ~ file: forumComment.js ~ line 54 ~ updateForumComment: ~ response",
        response
      );
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
      const commentId = req.params.id;
      const { postId } = req.body;
      console.log(
        "🚀 ~ file: DeleteComment.jsx ~ line 24 ~ handleOpen ~ deleteId, postId",
        commentId,
        postId
      );
      await ForumPost.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } }
      );
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default forumCommentController;
