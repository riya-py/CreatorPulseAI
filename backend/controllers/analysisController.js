const Analytics = require("../models/Analytics");
const Analysis = require("../models/Analysis");
const Channel = require("../models/Channel");
const { runRecommendationEngine } = require("../services/recommendationEngine");
const { generateAIAnalysis } = require("../services/llmService");
const asyncHandler = require("../utils/asyncHandler");

// Helper to compute engagement rate
const computeEngagementRate = (likes, comments, views) => {
  if (!views) return 0;
  return Number((((likes + comments) / views) * 100).toFixed(2));
};

// @desc   Run full analysis (rule engine + LLM) for a video
// @route  POST /api/analyze
// @access Private
// body: { videoId } OR raw { metrics, videoTitle } for manual/demo testing
const analyzeVideo = asyncHandler(async (req, res) => {
  const { videoId, metrics: manualMetrics, videoTitle: manualTitle } = req.body;

  let metrics;
  let videoTitle;
  let analyticsDoc = null;
  let channel = null;

  if (videoId) {
    // Look up stored analytics for this video
    analyticsDoc = await Analytics.findOne({ videoId, user: req.user._id }).sort({ periodEnd: -1 });

    if (!analyticsDoc) {
      return res.status(404).json({ success: false, message: "No analytics found for this video. Sync analytics first." });
    }

    channel = await Channel.findById(analyticsDoc.channel);
    videoTitle = analyticsDoc.videoTitle;

    metrics = {
      views: analyticsDoc.views,
      ctr: analyticsDoc.ctr,
      retention: analyticsDoc.averageViewPercentage,
      engagementRate: computeEngagementRate(analyticsDoc.likes, analyticsDoc.comments, analyticsDoc.views),
      subscribersGained: analyticsDoc.subscribersGained,
      likes: analyticsDoc.likes,
      comments: analyticsDoc.comments,
      averageViewDuration: analyticsDoc.averageViewDuration,
      impressions: analyticsDoc.impressions,
    };
  } else if (manualMetrics) {
    // Manual/demo mode - lets frontend test without full YouTube sync
    videoTitle = manualTitle || "Untitled Video";
    metrics = {
      views: manualMetrics.views || 0,
      ctr: manualMetrics.ctr || 0,
      retention: manualMetrics.retention || 0,
      engagementRate:
        manualMetrics.engagementRate ??
        computeEngagementRate(manualMetrics.likes || 0, manualMetrics.comments || 0, manualMetrics.views || 0),
      subscribersGained: manualMetrics.subscribersGained || 0,
      likes: manualMetrics.likes || 0,
      comments: manualMetrics.comments || 0,
      averageViewDuration: manualMetrics.averageViewDuration || 0,
      impressions: manualMetrics.impressions || 0,
    };
  } else {
    return res.status(400).json({ success: false, message: "Provide either videoId or metrics object" });
  }

  // 1. Run rule-based engine
  const triggeredRules = runRecommendationEngine(metrics);

  // 2. Send to LLM for diagnosis + structured recommendations
  const { parsed, raw } = await generateAIAnalysis({ videoTitle, metrics, triggeredRules });

  // 3. Save analysis to MongoDB
  const analysis = await Analysis.create({
    user: req.user._id,
    channel: channel?._id,
    analytics: analyticsDoc?._id,
    videoId: videoId || null,
    videoTitle,
    inputMetrics: metrics,
    triggeredRules,
    diagnosis: parsed.diagnosis,
    possibleReasons: parsed.possibleReasons,
    recommendations: parsed.recommendations,
    nextBestActions: parsed.nextBestActions,
    confidenceScore: parsed.confidenceScore,
    rawLLMResponse: raw,
  });

  res.json({
    success: true,
    analysis: {
      id: analysis._id,
      videoTitle,
      metrics,
      triggeredRules,
      diagnosis: parsed.diagnosis,
      possibleReasons: parsed.possibleReasons,
      recommendations: parsed.recommendations,
      nextBestActions: parsed.nextBestActions,
      confidenceScore: parsed.confidenceScore,
      createdAt: analysis.createdAt,
    },
  });
});

// @desc   Get past analyses for the logged-in user
// @route  GET /api/analysis/history
// @access Private
const getAnalysisHistory = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit) || 20);

  res.json({ success: true, count: analyses.length, analyses });
});

module.exports = { analyzeVideo, getAnalysisHistory };