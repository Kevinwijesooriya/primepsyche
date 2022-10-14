import AudioMaterials from "../models/audioMaterials.js";

const audioMaterialsController = {
  getOneAudioMaterial: async (req, res) => {
    const id = req.params.id;
    try {
      const material = await AudioMaterials.findOne({ _id: id });
      res.json({ message: "Audio file fetch success", data: material });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAudioMaterials: async (req, res) => {
    try {
      const materials = await AudioMaterials.find();
      res.json({ message: "Audio file fetch success", data: materials });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createAudioMaterials: async (req, res) => {
    try {
      const { userId, title, genre, album, artist, audioFile, image } =
        req.body;
      const ExistingMaterial = await AudioMaterials.findOne({ title });
      if (ExistingMaterial)
        return res.status(400).json({
          message: "This Audio file already exists.",
        });

      if (
        !title ||
        !genre ||
        !album ||
        !artist ||
        !audioFile ||
        !image ||
        !userId
      )
        return res.status(400).json({
          msg: "Please fill in all fields.",
        });

      const newAudioMaterials = new AudioMaterials({
        userId,
        title,
        genre,
        album,
        artist,
        audioFile,
        image,
      });
      await newAudioMaterials.save();
      res.json({
        message: "Audio file create success",
        data: newAudioMaterials,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateAudioMaterial: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, genre, album, artist, audioFile, image } = req.body;

      await AudioMaterials.findOneAndUpdate(
        { _id: id },
        { title, genre, album, artist, audioFile, image }
      );
      res.json({
        message: "Audio file update success",
        data: { title, genre, album, artist, audioFile, image },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteAudioMaterial: async (req, res) => {
    try {
      const id = req.params.id;

      await AudioMaterials.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  approveAudioMaterial: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, genre, album, artist, audioFile, image, approve } = req.body;

      await AudioMaterials.findOneAndUpdate(
        { _id: id },
        { title, genre, album, artist, audioFile, image, approve }
      );
      if (approve == true) {
        res.json({
          message: "Audio file approved",
          data: { title, genre, album, artist, audioFile, image, approve },
        });
      } else {
        res.json({
          message: "Audio file not approved",
          data: { title, genre, album, artist, audioFile, image, approve },
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getApproveAudioMaterial: async (req, res) => {
    try {
      const { approve } = req.body;
      const materials = await AudioMaterials.find({ approve: approve });
      if (approve == true) {
        res.json({
          message: "Approve Audio file",
          data: materials,
        });
      } else {
        res.json({
          message: " Not approve Audio file",
          data: materials,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default audioMaterialsController;