const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  Name: {
    type: String,
    required: true
  },
  file: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  author: { type: String, required: true },
  postedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Posts', postSchema);