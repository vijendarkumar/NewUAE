const express = require("express");
const router = express.Router();
const Home = require("../Moduls/Home");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "vijendar",      // replace with your cloud name
  api_key: "YOUR",            // replace with your API key
  api_secret: "vijendar",      // replace with your API secret
});

// Setup Cloudinary Storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",                // optional: folder in Cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "gif", "mp4", "mov", "avi", "mp3", "wav"],
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|mp3|wav/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Error: Unsupported file type!"));
    }
  },
});

function getMediaType(mimetype) {
  if (mimetype.startsWith("image")) return "image";
  if (mimetype.startsWith("video")) return "video";
  if (mimetype.startsWith("audio")) return "audio";
  return "unknown";
}

router.post("/Story", upload.single("media"), async (req, res) => {
  try {
    // req.file contains info returned by Cloudinary storage
    const media = new Home({
      title: req.body.title,
      snippet: req.body.snippet,
      filename: req.file.filename || req.file.originalname,
      path: req.file.path || req.file.url,     // Cloudinary URL is in req.file.path or req.file.url
      mimetype: req.file.mimetype,
      type: getMediaType(req.file.mimetype),
    });
    await media.save();
    res.json({ message: "Media uploaded successfully", media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

router.get("/Story", async (req, res) => {
  try {
    const data = await Home.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/Story/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Home.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
