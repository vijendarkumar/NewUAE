const mongoose = require("mongoose");

const raffleEntrySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tickets: { type: Number, default: 0 },
});

const RaffleEntry = mongoose.model("RaffleEntry", raffleEntrySchema);

module.exports = RaffleEntry;
