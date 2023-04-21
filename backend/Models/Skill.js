const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const config = require('../config');

mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const skillSchema = new mongoose.Schema({
  skills: {
    type: Array,
    required: true
  }
});

skillSchema.plugin(passportLocalMongoose);

const skill = mongoose.model('skills', skillSchema);

module.exports = skill;
