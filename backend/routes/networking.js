const UserDetails = require("../Models/UserDetails");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/userdetails/:email', (req, res) => {
  const userEmail = req.params.email;

  UserDetails.findOne({ email: userEmail })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
  

  router.get('/userdetails', (req, res) => {
    UserDetails.find()
      .exec()
      .then(userdetails => {
        res.status(200).json(userdetails);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  module.exports = router;