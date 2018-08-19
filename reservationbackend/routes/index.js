var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');

let Reservation = mongoose.model('Reservation');
let auth = jwt({
  secret: process.env.RESERVATION_BACKEND_SECRET,
   userProperty: 'payload'
  });


module.exports = router;
