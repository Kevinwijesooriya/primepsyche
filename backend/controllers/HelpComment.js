import HelpPost from "../models/HelpPost.js";

const HelpComentController = {
  createComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { commment } = req.body;

      await HelpPost.findOneAndUpdate({ _id: id }, { commment });
      res.json({
        message: "commented",
        data: { commment },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default HelpComentController;
