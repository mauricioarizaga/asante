const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');
const {validationResult} = require('../commons');
const { validJWT} = require('../auth');

const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
  
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);
const _passwordRequired = check('password', 'Password required').not().isEmpty();

const postRequestValidations = [
    validJWT,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    validationResult
]


module.exports = {
    postRequestValidations,
}