const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const Channel = require("../models/Channel");
const asyncHandler = require("../utils/asyncHandler");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const sendToken = (res, user) => {
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

// @desc   Register with email/password
// @route  POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  if (await User.findOne({ email })) {
    return res.status(400).json({ success: false, message: "Email already in use" });
  }
  const user = await User.create({
    name,
    email,
    password,
    role: role === "mentor" ? "mentor" : "mentee",
    avatar: name[0].toUpperCase(),
  });
  const token = sendToken(res, user);
  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
});

// @desc   Login with email/password
// @route  POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
  const token = sendToken(res, user);
  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
});

// @desc   Google OAuth redirect
// @route  GET /api/auth/google
const getGoogleAuthUrl = asyncHandler(async (req, res) => {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
  });
  res.redirect(url);
});

// @desc   Google OAuth callback
// @route  GET /api/auth/google/callback
const googleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { sub: googleId, name, email, picture } = payload;

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.create({
      googleId, name, email, avatar: picture,
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token,
      googleTokenExpiry: new Date(tokens.expiry_date),
    });
  } else {
    user.googleAccessToken = tokens.access_token;
    if (tokens.refresh_token) user.googleRefreshToken = tokens.refresh_token;
    user.googleTokenExpiry = new Date(tokens.expiry_date);
    await user.save();
  }

  const token = sendToken(res, user);
  res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}?token=${token}`);
});

// @desc   Login with Google ID token (from frontend)
// @route  POST /api/auth/google
const loginWithGoogleIdToken = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const { sub: googleId, name, email, picture } = ticket.getPayload();

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.create({ googleId, name, email, avatar: picture });
  }
  const token = sendToken(res, user);
  res.json({
    success: true, token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
});

// @desc   Get current user
// @route  GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -googleAccessToken -googleRefreshToken");
  res.json({ success: true, user });
});

module.exports = { register, login, getGoogleAuthUrl, googleCallback, loginWithGoogleIdToken, getMe };