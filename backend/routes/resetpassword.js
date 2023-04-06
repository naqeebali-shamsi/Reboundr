const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');
router.post('/resetpassword', async(req, res) => {
    console.log(req.body);
    const { email, password}=req.body;
    try{
      const finduser = await User.findOne({email}).exec();
      if(finduser){
      const hashedPassword = await bcrypt.hash(password, 10);
        User.findOneAndUpdate({email: email}, {$set: {
          password: hashedPassword
        }},
        {returnDocument : 'after'}
      ).then((result) => {
          res.status(300).json({
            message: "Data added",
          })
        });
      }
      else{
        res.status(300).json({
          message: "email not present",
        })
      }
     
    }catch(err){
      console.log(err)
  
  }
  });
  module.exports = router;