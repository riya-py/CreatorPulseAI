const express = require("express");
const router = express.Router();
const { analyzeVideo, getAnalysisHistory } = require("../controllers/analysisController");
const { protect } = require("../middleware/auth");

router.post("/analyze", protect, analyzeVideo);
router.get("/analysis/history", protect, getAnalysisHistory);

module.exports = router;