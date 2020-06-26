const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require("../controllers/auth");
const router = express.Router();

const passport = require('passport');

router.get('/signin', isNotLoggedIn,(req,res)=>{
    console.log('primer signin')
    res.send('Enter your profile information');
});

router.post("/signin", isNotLoggedIn,(req,res,next) =>{
    passport.authenticate("local.signin",{
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req,res,next);
}); 


router.get('/profile',isLoggedIn ,(req,res) =>{
    console.log('segundo signin');
    res.send('This is your abc Profile')
});

router.get("/logout", isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect("/signin");
});


module.exports = router;