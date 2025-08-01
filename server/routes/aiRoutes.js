const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const aiController = require("../controllers/aiController");
const { analyzeResume } = require("../controllers/aiController");

// POST /api/ai/analyze
router.post("/analyze", upload.single("resume"), aiController.analyzeResume);

module.exports = router;
