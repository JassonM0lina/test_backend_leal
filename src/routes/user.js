const express = require('express');
const User = require('../model/User')
const router = express.Router();


router.post('/register',async(req,res)=>{ 
    let user = req.body;

    if (!user.name || !user.lastname || !user.birth_date || 
        !user.email || !user.password) {

        return res.status(500).json({
            message: 'The structure is not valid!'
        });
    }    
    try{
        let newUser = await User.create({
            created_date: user.created_date,
            name: user.name,
            lastname: user.lastname,
            birth_date: user.birth_date,
            email: user.email,
            password: user.password
        });
    
        if(newUser){
            return res.json({
                message: 'User created successfully',
                data: newUser
            });
        }
    } catch(e) {
        const message  = e.parent.code === 'ER_DUP_ENTRY' ? 
        'The user is already register!' : 
        'Something goes wrong!';

        res.status(500).json({
            message:message,
        });
    }

    
});

module.exports = router;