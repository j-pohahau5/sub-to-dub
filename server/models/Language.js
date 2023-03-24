const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  languageCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
