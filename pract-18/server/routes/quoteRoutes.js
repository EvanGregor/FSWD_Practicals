import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

// Get all quotes
router.get("/", async (req, res) => {
  const quotes = await Quote.find();
  res.json(quotes);
});

// Add a new quote
router.post("/", async (req, res) => {
  const { text, author } = req.body;
  const newQuote = new Quote({ text, author });
  await newQuote.save();
  res.status(201).json(newQuote);
});

// Delete a quote
router.delete("/:id", async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: "Quote deleted" });
});

export default router;
