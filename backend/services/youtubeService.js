const axios = require("axios");

const YOUTUBE_DATA_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_ANALYTICS_BASE = "https://youtubeanalytics.googleapis.com/v2";

// Fetch the authenticated user's own channel info
const getMyChannel = async (accessToken) => {
  const res = await axios.get(`${YOUTUBE_DATA_BASE}/channels`, {
    params: {
      part: "snippet,statistics,contentDetails",
      mine: true,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const channel = res.data.items?.[0];
  if (!channel) throw new Error("No YouTube channel found for this account");

  return {
    youtubeChannelId: channel.id,
    title: channel.snippet.title,
    description: channel.snippet.description,
    thumbnail: channel.snippet.thumbnails?.default?.url,
    subscriberCount: Number(channel.statistics.subscriberCount || 0),
    viewCount: Number(channel.statistics.viewCount || 0),
    videoCount: Number(channel.statistics.videoCount || 0),
    uploadsPlaylistId: channel.contentDetails.relatedPlaylists.uploads,
  };
};

// Fetch latest videos from the channel's uploads playlist
const getRecentVideos = async (accessToken, uploadsPlaylistId, maxResults = 10) => {
  const res = await axios.get(`${YOUTUBE_DATA_BASE}/playlistItems`, {
    params: {
      part: "snippet,contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data.items.map((item) => ({
    videoId: item.contentDetails.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails?.medium?.url,
  }));
};

// Fetch video-level stats (views, likes, comments) from Data API
const getVideoStats = async (accessToken, videoIds = []) => {
  if (!videoIds.length) return [];

  const res = await axios.get(`${YOUTUBE_DATA_BASE}/videos`, {
    params: {
      part: "statistics,snippet",
      id: videoIds.join(","),
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data.items.map((v) => ({
    videoId: v.id,
    title: v.snippet.title,
    publishedAt: v.snippet.publishedAt,
    views: Number(v.statistics.viewCount || 0),
    likes: Number(v.statistics.likeCount || 0),
    comments: Number(v.statistics.commentCount || 0),
  }));
};

// Fetch deeper analytics (watch time, retention, CTR, subs gained) via YouTube Analytics API
const getVideoAnalytics = async (accessToken, videoId, startDate, endDate) => {
  const res = await axios.get(`${YOUTUBE_ANALYTICS_BASE}/reports`, {
    params: {
      ids: "channel==MINE",
      startDate,
      endDate,
      metrics:
        "views,likes,comments,subscribersGained,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,impressions,impressionsClickThroughRate",
      filters: `video==${videoId}`,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const headers = res.data.columnHeaders.map((h) => h.name);
  const row = res.data.rows?.[0] || [];

  const data = {};
  headers.forEach((h, i) => {
    data[h] = row[i] ?? 0;
  });

  return {
    views: data.views || 0,
    likes: data.likes || 0,
    comments: data.comments || 0,
    subscribersGained: data.subscribersGained || 0,
    estimatedMinutesWatched: data.estimatedMinutesWatched || 0,
    averageViewDuration: data.averageViewDuration || 0,
    averageViewPercentage: data.averageViewPercentage || 0,
    impressions: data.impressions || 0,
    ctr: data.impressionsClickThroughRate || 0,
  };
};

module.exports = {
  getMyChannel,
  getRecentVideos,
  getVideoStats,
  getVideoAnalytics,
};