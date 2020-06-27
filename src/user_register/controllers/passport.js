const passport = require('passport');
const User = require('../model/User');
const LocalStrategy = require('passport-local').Strategy;
const encrypt = require('../controllers/encrypt');
const Joi = require('joi');
const md5 = require('md5');



passport.use('local.signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, name, password, done) => {

    let user = req.body;

    // Validate if the input data is correct
    const schema = {
        name:Joi.string().min(3).max(50).required().alphanum(),
        lastname:Joi.string().min(3).max(50).required().alphanum(),
        birth_date:Joi.date().required(),
        email:Joi.string().required().email({ minDomainAtoms: 2 }),
        password:Joi.string().min(5).max(255).required().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
        
    const {error} = Joi.validate(user, schema);  
    if (error){
        console.log('the input data is not correct')
        return done(null, false, req.flash('message','The input data is not correct'));
    }
    
    // Validate if the user exist
    let exists_user = await User.findOne({
        where: {
            email: user.email
        }
    })
    if(exists_user){
        console.log('The user with email: ' + user.email +' already exists. Try with another email.');
        return done(null, false, req.flash('The user with email: ' + user.email + ' already exists. Try with another email.'));     
    }
    
    // Create the new user
    let newUser = await User.create({
        user_id: md5(user.email),
        created_date: new Date(),
        name: name,
        lastname: user.lastname,
        birth_date: user.birth_date,
        email: user.email,
        password: await encrypt.encryptPassword(password)
    });
        console.log('The user was created: welcome ' + user.name+ ' ' + user.lastname);
        return done(null, newUser);

}));


passport.serializeUser((user,done)=>{
    done(null,user.user_id);
});

passport.deserializeUser(async(id,done)=>{

    let user = await User.findOne({
        where: {
            user_id: id
        }
    });    
    done(null, user);
});