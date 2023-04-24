const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userProfileSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String
    },
    bio: {
        type: String
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
            description: String
    }]
    ,
    project:[{
            pid: String,
            companyName: String,
            start_date: String,
            end_date: String,
            description: String
    }],
    cv: {
        type: String
    }
  });

const UserProfile = mongoose.model('userprofile', userProfileSchema);

module.exports = UserProfile;