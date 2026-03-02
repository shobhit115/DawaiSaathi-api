const express = require("express");
const multer = require("multer");
const { llmAnalyzeImage, llmAnalyzeText } = require("../controllers/llmController");

const router = express.Router();
const upload = multer();

// Image route (keep)
router.post("/llm-analyze", upload.single("image"), llmAnalyzeImage);

// New text route (GET)
router.get("/llm-analyze-text", llmAnalyzeText);

module.exports = router;