require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
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