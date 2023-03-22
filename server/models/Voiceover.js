const mongoose = require('mongoose');

const voiceoverSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  // Additional fields for voiceover metadata
});

const Voiceover = mongoose.model('Voiceover', voiceoverSchema);

module.exports = Voiceover;
