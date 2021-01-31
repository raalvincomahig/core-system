const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    // console.log("ERRR",req.body);
    if(error) {
        return res.status(400).send({
            success: false,
            message: error.details[0].message,
            details: error.details
        });
    }
    const { position, phone_number, email, first_name, last_name, password, username, company} = req.body;
    let user = await User.findOne({
        email: email
    });
    if(user) {
        return res.status(400).send({
            success: false,
            message: 'That user already exists!'
        });
    } else {
        user = new User({
            position: position,
            username: username,
            company: company,
            phone_number: phone_number,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });
        
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
        } catch(error) {
            console.log(error)
        }
        
        return res.status(201).send(user);
    }
});
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(201).send(users);

});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOne({ username: username }).exec();
        if(!user) {
            return res.status(400).send({ success: false, message: "The username does not exist" });
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ success: false, message: "The password is invalid" });
        }
        user.password = null;
        req.session.user = user;
        console.log(req.session)
        return res.status(201).send(req.session);
    } catch( error ) {
        return res.status(400).send({
            success: false,
            message: 'Invalid Parameters'
        })
    }
})

router.get('/check-login', async (req, res) => {
    const { user } = req.session;
    console.log(req.session);
    if(user) {
        return res.status(201).send({success: true, user: user, message: 'User is logged in'});
    }
    else {
        return res.status(400).send({success: false, message: 'Unauthorized access'})
    }
    
})

router.get('/logout', async (req, res) => {
    try {
        delete req.session.user;
        return res.status(201).send({success: true, message: 'User logged out successfully'})
    }
    catch (error) {
        return res.status(400).send({success: false, message: 'Unauthorized access'})
    }
})

module.exports = router;