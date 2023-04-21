const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  Name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Posts', postSchema);