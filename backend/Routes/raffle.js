const express = require("express");
const router = express.Router();
const RaffleEntry = require("../Moduls/RaffleEntry");

// GET raffle status for user
router.get("/raffle-status", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const entry = await RaffleEntry.findOne({ userId });
    const tickets = entry ? entry.tickets : 0;
    res.json({ tickets });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST to join raffle
router.post("/raffle-entry", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    let entry = await RaffleEntry.findOne({ userId });

    if (entry) {
      entry.tickets += 1;
    } else {
      entry = new RaffleEntry({ userId, tickets: 1 });
    }

    await entry.save();
    res.json({ tickets: entry.tickets });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
