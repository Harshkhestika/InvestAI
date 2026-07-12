const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
