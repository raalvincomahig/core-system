const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    

    if(!user) {
        return res.status(400).send({
            success: false,
            message: 'Incorrect email or password'
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        return res.status(400).send({
            success: false,
            message: 'Incorrect email or password'
        });
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    return res.header('x-auth-token', token).status(200).send({
        success: true,
        message: 'Login Successful!',
        token: token,
        user: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
    });

});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
 
    return schema.validate(user);
}

module.exports = router;