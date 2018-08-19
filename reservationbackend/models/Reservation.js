var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
  amount: Number,
  time: { type: Date, default: Date.now },
  message: [String],
  username: { type: String, lowercase: true }
});
mongoose.model('Reservation', ReservationSchema);
