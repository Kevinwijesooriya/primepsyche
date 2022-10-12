import ReadableMaterials from "../models/readableMaterials.js";

const readableMaterialsController = {
  getReadableMaterials: async (req, res) => {
    try {
      const posts = await ReadableMaterials.find();
      res.json({ message: "Readable file fetch success", data: posts });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createReadableMaterials: async (req, res) => {
    try {
      const { userId, title, author, readableFile, image } = req.body;
      const ExistingPost = await ReadableMaterials.findOne({ title });
      if (ExistingPost)
        return res.status(400).json({
          message: "This Readable File already exists.",
        });

      if (!title || !author || !readableFile || !image || !userId)
        return res.status(400).json({
          msg: "Please fill in all fields.",
        });

      const newReadableMaterials = new ReadableMaterials({
        userId,
        title,
        author,
        readableFile,
        image,
      });
      await newReadableMaterials.save();
      res.json({
        message: "Readable Material create success",
        data: newReadableMaterials,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default readableMaterialsController;
