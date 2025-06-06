const express = require("express");
const router = express.Router();
const User = require("../Moduls/User");

router.post("/user", async (req, res) => {
  try {
    const { name, email, title, body } = req.body;

    const newUser = new User({
      name,
      email,
      title,
      body,
    });

    const response = await newUser.save();

    res.status(200).json({ message: "Data inserted successfully", response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Data insert failed", details: err.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "enternal sarver error" });
  }
});

module.exports = router;
