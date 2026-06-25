const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },
    analytics: { type: mongoose.Schema.Types.ObjectId, ref: "Analytics" },

    videoId: { type: String },
    videoTitle: { type: String },

    // snapshot of metrics used for this analysis
    inputMetrics: {
      views: Number,
      ctr: Number,
      retention: Number,
      engagementRate: Number,
      subscribersGained: Number,
      likes: Number,
      comments: Number,
    },

    // output from rule engine
    triggeredRules: [
      {
        rule: String,
        message: String,
        category: String, // thumbnail, retention, engagement, upload-time, etc
        severity: String, // low, medium, high
      },
    ],

    // output from LLM
    diagnosis: { type: String },
    possibleReasons: [{ type: String }],
    recommendations: [{ type: String }],
    nextBestActions: [{ type: String }],

    confidenceScore: { type: Number, default: 0 },

    rawLLMResponse: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);