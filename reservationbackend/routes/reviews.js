var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Review = mongoose.model('Review');
let User = mongoose.model('User');
let jwt = require('express-jwt');

let auth = jwt({
    secret: process.env.RESERVATION_BACKEND_SECRET,
    userProperty: 'payload'
});

//zoek alle reviews (order by popularity = aantal votes)
router.get("/", function (req, res, next) {
    var mysort = { popularity: -1 };
    let query = Review.find().sort(mysort).limit(10);
    query.exec(function (err, reviews) {
        if (err) return next(err);
        res.json(reviews);
    });
});

//meest recente
router.get("/mostrecent", function (req, res, next) {
    var mysort = { time: -1 };
    let query = Review.find().sort(mysort).limit(10);
    query.exec(function (err, reviews) {
        if (err) return next(err);
        res.json(reviews);
    });
});

//zoek meest positieve reviews(likes <-> dislikes)
router.get("/mostpositive", function (req, res, next) {
    var mysort = { positivity: -1 };
    let query = Review.find().sort(mysort).limit(10);
    query.exec(function (err, reviews) {
        if (err) return next(err);
        res.json(reviews);
    });
});

//zoek meest negatieve reviews(likes <-> dislikes)
router.get("/mostnegative", function (req, res, next) {
    var mysort = { positivity: 1 };
    let query = Review.find().sort(mysort).limit(10);
    query.exec(function (err, reviews) {
        if (err) return next(err);
        res.json(reviews);
    });
});

//zoek alle reviews van userId
router.get('/user/:userId', auth, function (req, res, next) {
    //User.findById(req.params.userId, function (err, user) {
    //    if (err) return next(err);
    //    res.json(user.reservations);
    //}).populate("reservations");
    res.json(req.user.reviews);
});

//post een review
router.post('/:userId/review', auth, function (req, res, next) {

    let review = new Review({
        likes: 0,
        dislikes: 0,
        popularity: 0,
        positivity: 0,
        review: [req.body.review],
        username: req.body.username
    });
    review.save(function (err, rev) {
        if (err) { return next(err); }
        req.user.reviews.push(rev._id);
        req.user.save(function (err, rec) {
            if (err) return next(err);
            res.json(rev);
        });
    });
});

//zoek een review
router.get('/:review',auth, function (req, res) {
    res.json(req.review);
});

//like review
router.put('/like/:review/:userId', auth, function (req, res, next) {
    if (req.user.votes.has(String(req.review._id))) {
        if ((req.user.votes.get(String(req.review._id)) === "-")) {
            req.review.likes++;
            req.review.dislikes--;
            req.review.positivity++;
            req.review.positivity++;
        }
    }else{
        req.review.likes++;
        req.review.popularity++;
        req.review.positivity++;
    }

    req.review.save(function (err, updatedRev) {
        if (err) return handleError(err);
        req.user.votes.set(String(updatedRev._id), "+");
        req.user.save(function (err, updatedUsr) {
            if (err) return handleError(err);
            res.json(updatedRev);
        });
    });
});
//dislike review
router.put('/dislike/:review/:userId',auth, function (req, res, next) {
    if (req.user.votes.has(String(req.review._id))) {
        if ((req.user.votes.get(String(req.review._id)) === "+")) {
            req.review.dislikes++;
            req.review.likes--;
            req.review.positivity--;
            req.review.positivity--;
        }
    }else{
        req.review.dislikes++;
        req.review.popularity++;
        req.review.positivity--;
    }
    req.review.save(function (err, updatedRev) {
        if (err) return handleError(err);
        req.user.votes.set(String(updatedRev._id), "-");
        req.user.save(function (err, updatedUsr) {
            if (err) return handleError(err);
            res.json(updatedRev);
        });
    });
});

router.delete("/:userId/:review", function(req, res, next) {
    if(!req.review.username === userId) return next(new Error("Not the review of this user " + id));
    req.review.remove(function(err) {
      if (err) {
        return next(err);
      }
      res.json(req.review);
    });
  });

router.param("review", function (req, res, next, id) {
    let query = Review.findById(id);
    query.exec(function (err, rev) {
        if (err) {
            return next(err);
        }
        if (!rev) {
            return next(new Error("review not found " + id));
        }
        req.review = rev;
        return next();
    });
});

router.param("userId", function (req, res, next, id) {
    let query = User.findOne({username: String(id)});
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