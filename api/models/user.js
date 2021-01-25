const Joi = require('joi');
const PhoneJoi = Joi.extend(require('joi-phone-number'));
const mongoose = require('mongoose');
const { position } = require('../variables/position');

const User = mongoose.model('User', new mongoose.Schema({
    position: {
        type: String,
        enum: position,
        required: true
    },
    company: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isNewUser: {
        type: Boolean,
        default: 1
    }

}));

function validateUser(user) {
    
    const schema = Joi.object({
        position: Joi.string().min(2).max(50).required().valid(...position).messages({
            'string.empty': `Please select a Position`,
            'any.required': `Position is a required field`
        }),
        phone_number: PhoneJoi.string().min(2).max(50).phoneNumber().required().messages({
            'string.empty': `Please enter Phone Number`,
            'string.base': `Please enter a valid Phone Number`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
        company: Joi.string().min(2).max(50).required().messages({
            'string.empty': `Please enter Company`,
            'string.min': `Company should have a minimum length of {#limit}`,
            'any.required': `Company is a required field`
        }),
        username: Joi.string().pattern(new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')).min(2).max(50).required().messages({
              'string.empty': `Please enter Username`,
              'string.min': `Username should have a minimum length of {#limit}`,
              'any.required': `Username is a required field`,
              "string.pattern.base": "Invalid Username",
        }),
        first_name: Joi.string().min(2).max(50).required().messages({
            'string.empty': `Please enter First Name`,
            'string.min': `First name should have a minimum length of {#limit}`,
            'any.required': `First name is a required field`
        }),
        last_name: Joi.string().min(2).max(50).required().messages({
            'string.empty': `Please enter Last Name`,
            'string.min': `Last name should have a minimum length of {#limit}`,
            'string.max': `Last name should have a maximum length of {#limit}`,
            'any.required': `Last name is a required field`
        }),
        email: Joi.string().min(2).max(50).required().email().messages({
            'string.base': `Please enter a valid Email`,
            'string.empty': `Please enter Email`,
            'string.min': `Email should have a minimum length of {#limit}`,
            'string.max': `Email should have a maximum length of {#limit}`,
            'any.required': `Email is a required field`
        }),
         // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")).min(5).max(255).required().messages({
            'string.base': `Please enter a valid Password`,
            'string.empty': `Please enter Password`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'string.max': `Password should have a maximum length of {#limit}`,
            "object.regex": "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
            "string.pattern.base": "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
            'any.required': `Password is a required field`
        },
        {variable:"phone_number"}),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().messages({
            "any.valid": "Password did not match"
        })
    });
    const valid = schema.validate(user);
    return valid;
}

exports.User = User;
exports.validate = validateUser;