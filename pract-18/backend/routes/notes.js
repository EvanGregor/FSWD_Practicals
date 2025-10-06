const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Create Note
router.post("/", async (req, res) => {
    try {
        const note = new Note(req.body);
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ timestamp: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Note
router.put("/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Note
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
