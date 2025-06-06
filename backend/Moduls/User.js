const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String,},
  email: { type: String,},
  title: { type: String,},
  body: { type: String,},
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
