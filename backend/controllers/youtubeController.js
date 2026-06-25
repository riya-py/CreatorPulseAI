const User = require("../models/User");
const Channel = require("../models/Channel");
const Analytics = require("../models/Analytics");
const youtubeService = require("../services/youtubeService");
const asyncHandler = require("../utils/asyncHandler");

// @desc   Fetch and store the user's YouTube channel
// @route  GET /api/youtube/channel
// @access Private
const getChannel = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user.googleAccessToken) {
    return res.status(400).json({ success: false, message: "No connected YouTube account" });
  }

  const channelData = await youtubeService.getMyChannel(user.googleAccessToken);

  let channel = await Channel.findOne({ youtubeChannelId: channelData.youtubeChannelId });

  if (!channel) {
    channel = await Channel.create({
      user: user._id,
      youtubeChannelId: channelData.youtubeChannelId,
      title: channelData.title,
      description: channelData.description,
      thumbnail: channelData.thumbnail,
      subscriberCount: channelData.subscriberCount,
      viewCount: channelData.viewCount,
      videoCount: channelData.videoCount,
      lastSyncedAt: new Date(),
    });

    user.channelId = channel._id;
    await user.save();
  } else {
    channel.subscriberCount = channelData.subscriberCount;
    channel.viewCount = channelData.viewCount;
    channel.videoCount = channelData.videoCount;
    channel.lastSyncedAt = new Date();
    await channel.save();
  }

  res.json({ success: true, channel, uploadsPlaylistId: channelData.uploadsPlaylistId });
});

// @desc   Fetch analytics for recent videos and store in MongoDB
// @route  GET /api/youtube/analytics
// @access Private
const getAnalytics = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const channel = await Channel.findOne({ user: user._id });

  if (!channel) {
    return res.status(400).json({ success: false, message: "No channel synced yet. Call /youtube/channel first." });
  }

  const channelData = await youtubeService.getMyChannel(user.googleAccessToken);
  const recentVideos = await youtubeService.getRecentVideos(
    user.googleAccessToken,
    channelData.uploadsPlaylistId,
    Number(req.query.limit) || 10
  );

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const results = [];

  for (const video of recentVideos) {
    try {
      const stats = await youtubeService.getVideoAnalytics(
        user.googleAccessToken,
        video.videoId,
        startDate,
        endDate
      );

      const analyticsDoc = await Analytics.findOneAndUpdate(
        { channel: channel._id, videoId: video.videoId },
        {
          user: user._id,
          channel: channel._id,
          videoId: video.videoId,
          videoTitle: video.title,
          publishedAt: video.publishedAt,
          views: stats.views,
          likes: stats.likes,
          comments: stats.comments,
          subscribersGained: stats.subscribersGained,
          estimatedMinutesWatched: stats.estimatedMinutesWatched,
          averageViewDuration: stats.averageViewDuration,
          averageViewPercentage: stats.averageViewPercentage,
          impressions: stats.impressions,
          ctr: stats.ctr,
          periodStart: startDate,
          periodEnd: endDate,
        },
        { upsert: true, new: true }
      );

      results.push(analyticsDoc);
    } catch (err) {
      console.error(`Failed to fetch analytics for video ${video.videoId}:`, err.message);
    }
  }

  res.json({ success: true, count: results.length, analytics: results });
});

module.exports = { getChannel, getAnalytics };