const express = require("express");
const router = express.Router();
const Home = require("../Moduls/Home");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
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

router.post("/Story", upload.single("media"), async (req, res) => {
  try {
    const media = new Home({
      title: req.body.title,
      snippet: req.body.snippet,
      filename: req.file.filename,
      path: req.file.path,
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

function getMediaType(mimetype) {
  if (mimetype.startsWith("image")) return "image";
  if (mimetype.startsWith("video")) return "video";
  if (mimetype.startsWith("audio")) return "audio";
  return "unknown";
}


router.get("/Story", async (req, res) => {
  try {
    const data = await Home.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "enternal sarver error" });
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
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
