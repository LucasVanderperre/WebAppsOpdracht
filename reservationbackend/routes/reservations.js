var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Reservation = mongoose.model('Reservation');
let User = mongoose.model('User');
let jwt = require('express-jwt');


let auth = jwt({
    secret: process.env.RESERVATION_BACKEND_SECRET,
    userProperty: 'payload'
});

router.get("/", function (req, res, next) {
    let query = Reservation.find().sort({ time: -1 });
    query.exec(function (err, reservations) {
        if (err) return next(err);
        res.json(reservations);
    });
});

router.get('/user/:userId', auth, function (req, res, next) {
    //User.findById(req.params.userId, function (err, user) {
    //    if (err) return next(err);
    //    res.json(user.reservations);
    //}).populate("reservations");
    res.json(req.user.reservations.sort({ time: -1 }));
});

router.get('/:reservation', function (req, res) {
    res.json(req.reservation);
});

router.post("/:userId/reservation", auth, function (req, res, next) {
    let reservation = new Reservation({
        amount: req.body.amount,
        time: req.body.time,
        message: req.body.message,
        username: req.user.username
    });
    reservation.save(function (err, reserv) {
        if (err) { return next(err); }

        req.user.reservations.push(reserv._id);
        req.user.save(function (err, rec) {
            if (err) return next(err);
            res.json(reserv);
        });
    });
    //req.user.reservations.push(reservation._id);
    //req.user.save(function (err, post) {
    //    if (err) { return next(err); }
    //    res.json(reservation);
    //   });

});



router.delete('/:reservation', auth, function (req, res, next) {
    req.reservation.remove(function (err) {
        if (err) {
            return next(err);
        }
        res.json(req.reservation);
    });
});

router.param("reservation", function (req, res, next, id) {
    let query = Reservation.findById(id);
    query.exec(function (err, rsv) {
        if (err) {
            return next(err);
        }
        if (!rsv) {
            return next(new Error("reservation not found " + id));
        }
        req.reservation = rsv;
        return next();
    });
});

router.param("userId", function (req, res, next, id) {
    let query = User.findOne({ username: String(id) }).populate("reservations");
    query.exec(function (err, usr) {
        if (err) {
            return next(err);
        }
        if (!usr) {
            return next(new Error("user not found " + id));
        }
        req.user = usr;
        return next();
    });
});

module.exports = router;

