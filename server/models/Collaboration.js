const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  subtitleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subtitle',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Additional fields for collaboration metadata
});

const Collaboration = mongoose.model('Collaboration', collaborationSchema);

module.exports = Collaboration;
