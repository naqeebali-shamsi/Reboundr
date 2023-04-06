const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full time', 'Part time', 'Contract'],
    required: true
  },
  location: {
    type: String,
    enum: ['Remote', 'In-Office'],
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyUrl: {
    type: String,
    required: true
  },
  skills: {
    type: Array,
    ref: 'skills',
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  postedOn: {
    type: Date,
    default: Date.now
  }
});

jobSchema.plugin(passportLocalMongoose);

const job = mongoose.model('job', jobSchema);

module.exports = job;
