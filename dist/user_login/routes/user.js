"use strict";

var express = require('express');

var _require = require("../controllers/auth"),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

var router = express.Router();

var passport = require('passport');

router.get('/signin', isNotLoggedIn, function (req, res) {
  res.send('Welcome to abc, Sign In to continue win points');
});
router.post('/signin', isNotLoggedIn, passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: false
}));
router.get('/profile', isLoggedIn, function (req, res) {
  res.send('This is your abc Profile');
});
router.get("/logout", isLoggedIn, function (req, res) {
  req.logOut();
  res.redirect("/signin");
});
module.exports = router;