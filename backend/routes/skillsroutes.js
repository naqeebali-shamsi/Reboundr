const Skill = require("../Models/Skill")
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Getting all
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find()
        res.json(skills)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Creating one
router.post('/skills', async (req, res) => {
    const skills = new Skill({
        skills: req.body.skills})
    try {
        await skills.save()
        res.status(201).json(skills)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Get skill By ID
router.get('/skills/:id', async (req, res) => {
    try{
        const skill = await Skill.findById(req.params.id)
        res.status(201).json(skill)
    } catch (err) {
        console.log({message: err.message})
    }
})

// Updating a skill
router.patch('/skills/:id', async (req, res) => {
    try {
        const updatedskill = await Skill.findByIdAndUpdate(req.params.id, req.body);
        const freshSkill = await updatedskill.save();
        res.json(freshSkill)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting a skill
router.delete('/skills/:id', async (req, res) => {
    try {
    await Skill.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted skill' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})  

module.exports = router