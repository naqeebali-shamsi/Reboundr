//test

const mongoose = require('mongoose');


const UserDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    primaryKey: true,
  },
  image: {
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
  designation: {
    type: String,
    required: true,
  },
  conctionCount: {
    type: String,
    required: true,
  },
  experience: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  education: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

},
);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);