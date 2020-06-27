"use strict";

var express = require('express');

var _require = require("../controllers/auth"),
    isLoggedIn = _require.isLoggedIn,
    isNotLoggedIn = _require.isNotLoggedIn;

var router = express.Router();

var passport = require('passport');

router.get('/signup', isNotLoggedIn, function (req, res) {
  res.send('Welcome to abc, Sign Up to start win points');
});
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: false
}));
router.get('/profile', isLoggedIn, function (req, res) {
  res.send('This is your abc Profile');
});
router.get("/logout", isLoggedIn, function (req, res) {
  req.logOut();
  res.redirect("/signin");
});
router.get('/signin', isNotLoggedIn, function (req, res) {
  res.send('Welcome to abc, Sign In to start win points');
});
module.exports = router;