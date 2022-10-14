import ReadableMaterials from "../models/readableMaterials.js";

const readableMaterialsController = {
  getOneReadableMaterial: async (req, res) => {
    const id = req.params.id;
    try {
      const material = await ReadableMaterials.findOne({ _id: id });
      res.json({ message: "Readable file fetch success", data: material });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getReadableMaterials: async (req, res) => {
    try {
      const materials = await ReadableMaterials.find();
      res.json({ message: "Readable file fetch success", data: materials });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createReadableMaterials: async (req, res) => {
    try {
      const { userId, title, author, readableFile, image } = req.body;
      const ExistingMaterial = await ReadableMaterials.findOne({ title });
      if (ExistingMaterial)
        return res.status(400).json({
          message: "This Readable file already exists.",
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
        message: "Readable file create success",
        data: newReadableMaterials,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateReadableMaterial: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, author, readableFile, image } = req.body;

      await ReadableMaterials.findOneAndUpdate(
        { _id: id },
        { title, author, readableFile, image }
      );
      res.json({
        message: "Readable file update success",
        data: { title, author, readableFile, image },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteReadableMaterial: async (req, res) => {
    try {
      const id = req.params.id;

      await ReadableMaterials.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  approveReadableMaterial: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, author, readableFile, image, approve } = req.body;

      await ReadableMaterials.findOneAndUpdate(
        { _id: id },
        { title, author, readableFile, image, approve }
      );
      if (approve == true) {
        res.json({
          message: "Readable file approved",
          data: { title, author, readableFile, image, approve },
        });
      } else {
        res.json({
          message: "Readable file not approved",
          data: { title, author, readableFile, image, approve },
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getApproveReadableMaterial: async (req, res) => {
    try {
      const { approve } = req.body;
      const materials = await ReadableMaterials.find({ approve: approve });
      if (approve == true) {
        res.json({
          message: "Approve readable file",
          data: materials,
        });
      } else {
        res.json({
          message: " Not approve readable file",
          data: materials,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default readableMaterialsController;
