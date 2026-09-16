import express from "express";
import requests from "../data.js";
import { analyzeProblem } from "../services/aiService.js";

const router = express.Router();

// Analyze a problem using AI
router.post("/analyze", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        error: "Description is required"
      });
    }

    const result = await analyzeProblem(description);

    res.json(result);
  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error: "Failed to analyze the problem",
      details: error.message
    });
  }
});

// GET all requests
router.get("/", (req, res) => {
  res.json(requests);
});

// POST a new request
router.post("/", (req, res) => {
  const { description, category, priority } = req.body;

  if (!description || !category || !priority) {
    return res.status(400).json({
      error: "description, category and priority are required"
    });
  }

  const newRequest = {
    id: Date.now(),
    description,
    category,
    priority,
    createdAt: new Date().toISOString()
  };

  requests.push(newRequest);

  res.status(201).json(newRequest);
});

export default router;