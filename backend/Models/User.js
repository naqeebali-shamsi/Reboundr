const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const config = require('../config');

mongoose.connect(config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['employer', 'jobseeker'],
    default: 'jobseeker',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  }, 
  image: {
    type: String,
    default: "http://cliparts.co/cliparts/Bcg/rng/Bcgrngy7i.png"
  },
  employment:[{
          eid: String,
          companyName: String,
          start_date: String,
          end_date: String,
          description: String,
  }],
  project:[{
          pid: String,
          companyName: String,
          start_date: String,
          end_date: String,
          description: String,
  }],
  cv: {
      type: String,
  }
},
  { strict: false },
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);