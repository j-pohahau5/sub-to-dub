const mongoose = require('mongoose');

const subtitleSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
});

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

module.exports = Subtitle;
