// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  rating: { type: Number, default: 0 },
  comments: [{ body: String, date: Date }]
});

module.exports = mongoose.model('Item', itemSchema);
