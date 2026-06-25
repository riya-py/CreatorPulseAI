const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getGoogleAuthUrl,
  googleCallback,
  loginWithGoogleIdToken,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/google", getGoogleAuthUrl);
router.get("/google/callback", googleCallback);
router.post("/google/token", loginWithGoogleIdToken);
router.get("/me", protect, getMe);

module.exports = router;