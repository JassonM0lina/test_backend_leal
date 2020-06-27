const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();

const passport = require('passport');

router.get('/signin',(req,res)=>{
    res.send('Welcome to abc, Sign In to continue win points')
});


router.post('/signin', passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: false   
    }));


router.get('/profile',(req,res) =>{
    res.send('This is your abc Profile')
});

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;