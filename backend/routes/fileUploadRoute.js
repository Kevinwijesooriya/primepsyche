import { Router } from "express";
import cloudinary from "cloudinary";
const router = Router();
import fs from "fs";

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Upload image only admin can use
router.post("/fileUpload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded." });

    const file = req.files.file;
      //console.log(file);
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ReadableFiles", resource_type: "auto" },
      async (err, result) => {
        if (err) throw err;
          removeTmp(file.tempFilePath);
        //console.log(result);
        res.json({ message: "file uploaded successfully", url: result.url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Delete image only admin can use
router.post("/fileDestroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No File Selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Deleted File" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
export default router;
