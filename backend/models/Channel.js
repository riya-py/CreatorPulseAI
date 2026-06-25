const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    youtubeChannelId: { type: String, required: true, unique: true },
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },

    subscriberCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    videoCount: { type: Number, default: 0 },

    lastSyncedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);