const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();

const passport = require('passport');

router.get('/signin',isNotLoggedIn,(req,res)=>{
    res.send('Welcome to abc, Sign In to continue win points')
});


router.post('/signin', isNotLoggedIn ,passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: false   
    }));


router.get('/profile',isLoggedIn,(req,res) =>{
    res.send('This is your abc Profile')
});

router.get("/logout",isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;