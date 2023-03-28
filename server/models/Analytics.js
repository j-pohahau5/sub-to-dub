const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subtitleDownloads: {
      type: Number,
      required: true,
    },
    voiceoverDownloads: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // Additional fields for analytics metadata
  });
  
  const Analytics = mongoose.model('Analytics', analyticsSchema);
  
  module.exports = Analytics;
  