const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topics: {
    type: Array,
    required: true,
    unique: true,
  },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;