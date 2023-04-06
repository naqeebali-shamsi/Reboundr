const Posts = require("../Models/Posts");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../Models/User");
//multer js used for handling file uploads in node js
const multer = require('multer');

const upload = multer({dest: __dirname + "/uploads"});

router.post('/posts/add', upload.single("file"), async (req, res, next) => {

  if(req.body?.Name && req.body?.description && req.file){


    const post = new Posts({
      _id: new mongoose.Types.ObjectId(),
      Name:  req.body.Name,
      description: req.body.description,
      author: req.body.author,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
      
    })

    try {
      const savedPost = await post.save();
      res.status(201).json({
        message: "Post saved",
        post: savedPost
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).json({
      message: "Invalid request",
    });
  }
});


  router.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    Posts.findById(postId)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            message: 'Post not found'
          });
        }
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

  router.get('/posts', (req, res) => {
    Posts.find()
      .exec()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });


  // Update a post by ID
router.put('/posts/:id', (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({ message: 'Post data cannot be empty' });
  }

  Posts.findByIdAndUpdate(id, req.body, { new: true })
    .then(post => {
      if (!post) {
        return res.status(404).send({ message: `Post with ID ${id} not found` });
      }

      res.send(post);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message: `Post with ID ${id} not found` });
      }

      res.status(500).send({ message: `Error updating post with ID ${id}` });
    });
});


//Deletion of post
router.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  module.exports = router;