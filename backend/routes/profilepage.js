const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');

// profile add project details
router.put('/addProjectDetails/:_id', (req, res) => {
    var _id = req.params._id;
    var length;
    
    User.find({_id: _id}, 'project').then((result) => {
      length = result.length
      console.log(result)
    })
  
    User.findOneAndUpdate({_id: _id}, {$push: {
      project: req.body
    }}).then((result) => {
      res.status(300).json({
        message: "Data added",
      })
    }).catch((err) => {
      console.log(err)
    })
  });
  
  // upload profile photo
  router.put('/addProfilePhoto/:_id', (req, res) => {
    var _id = req.params._id;
  
    User.findOneAndUpdate({_id: _id}, {$set: {
      image: req.body.image
    }}).then((result) => {
      res.status(300).json({
        message: "Data added",
      })
    }).catch((err) => {
      console.log(err)
    })
  });
  
  // upload cv
  router.put('/addCV/:_id', (req, res) => {
    var _id = req.params._id;
  
    User.findOneAndUpdate({_id: _id}, {$set: {
      cv: req.body.cv
    }}).then((result) => {
      res.status(300).json({
        message: "Data added",
      })
    }).catch((err) => {
      console.log(err)
    })
  });
  
  // update bio
  router.put('/addBio/:_id', (req, res) => {
    var _id = req.params._id;
  
    User.findOneAndUpdate({_id: _id}, {$set: {
      bio: req.body.bio
    }}).then((result) => {
      res.status(300).json({
        message: "Data added",
      })
    }).catch((err) => {
      console.log(err)
    })
  });
  
  // get user profile details
  router.get('/getUserProfileDetails/:_id', (req, res) => {
      var _id = req.params._id;
      User.find({_id : _id}).then((result) => {
          res.send(result);
        }).catch((err) => {
          console.log(err);
        })
  });

  module.exports = router;