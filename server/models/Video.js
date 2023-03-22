const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  // will use url to grab the video
  url: {
    type: String,
    required: true,
  },
  // title to set the heading for video
  title: {
    type: String,
    required: true,
  },
  // to set the text of the video to have reference of what it is about
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String
  },
  lengthSeconds: {
    type: Number
  },
  resolution: {
    type: String
  },
  format: {
    type: String
  },
  tags: {
    type: [String]
  },
  publishedDate: {
    type: Date,
    required: true
  }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
