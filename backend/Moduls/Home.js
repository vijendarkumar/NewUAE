// models/Story.js
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video', 'audio'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Home = mongoose.model('Home', HomeSchema);

module.exports = Home;
