const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: String,
  value: String,
  count: [Number],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Records = mongoose.model('Records', recordsSchema);

module.exports = { Records };
