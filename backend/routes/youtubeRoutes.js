const express = require("express");
const router = express.Router();
const { getChannel, getAnalytics } = require("../controllers/youtubeController");
const { protect } = require("../middleware/auth");

router.get("/channel", protect, getChannel);
router.get("/analytics", protect, getAnalytics);

module.exports = router;