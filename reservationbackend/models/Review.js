var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  likes: Number,
  dislikes: Number,
  popularity: Number,
  positivity: Number,
  time: { type: Date, default: Date.now },
  review: [String],
  username: { type: String, lowercase: true }
});
mongoose.model('Review', ReviewSchema);