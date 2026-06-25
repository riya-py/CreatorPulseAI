const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },

    videoId: { type: String, required: true },
    videoTitle: { type: String },
    publishedAt: { type: Date },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    subscribersGained: { type: Number, default: 0 },

    // Watch time in minutes
    estimatedMinutesWatched: { type: Number, default: 0 },
    averageViewDuration: { type: Number, default: 0 }, // seconds
    averageViewPercentage: { type: Number, default: 0 }, // retention %

    impressions: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 }, // click-through rate %

    // Period this analytics snapshot covers
    periodStart: { type: Date },
    periodEnd: { type: Date },
  },
  { timestamps: true }
);

analyticsSchema.index({ channel: 1, videoId: 1, periodEnd: -1 });

module.exports = mongoose.model("Analytics", analyticsSchema);