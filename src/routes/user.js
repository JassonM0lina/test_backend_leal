const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();

const passport = require('passport');

router.get('/signup',isNotLoggedIn,(req,res)=>{
    res.send('Welcome to abc, Sign Up to start win points')
});


router.post('/signup', isNotLoggedIn,passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true   
    }));


router.get('/profile', isLoggedIn ,(req,res) =>{
    res.send('This is your abc Profile')
});

router.get("/logout", isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;