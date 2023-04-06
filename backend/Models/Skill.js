const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const skillSchema = new mongoose.Schema({
  skills: {
    type: Array,
    required: true
  }
});

skillSchema.plugin(passportLocalMongoose);

const skill = mongoose.model('skills', skillSchema);

module.exports = skill;
