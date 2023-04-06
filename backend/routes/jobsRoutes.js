const Job = require("../Models/Job");
const Skill = require("../Models/Skill")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Getting all
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find()
        res.json(jobs)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Creating one
router.post('/jobs', async (req, res) => {
    const job = new Job({
        title: req.body.title,
        type: req.body.type,
        location: req.body.location,
        companyName: req.body.companyName,
        companyUrl: req.body.companyUrl,
        skills: req.body.skills,
        link: req.body.link,
        description: req.body.description
    })
    try {
        await job.save()
        res.status(201).json(job)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Get Job By ID
router.get('/jobs/:id', async (req, res) => {
    try{
        const job = await Job.findById(req.params.id)
        res.status(201).json(job)
    } catch (err) {
        console.log({message: err.message})
    }
})

// Updating a job
router.patch('/jobs/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body);
        await updatedJob.save();
        res.json(updatedJob)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting a Job
router.delete('/jobs/:id', async (req, res) => {
    try {
    await Job.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted Job' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})  

module.exports = router