var express = require('express');
var router = express.Router();
const {body, validationResult, check} = require('express-validator');
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt');
var colors = require('colors');



//controller
const authController = require('../controllers/auth')


/* GET home page. */
router.get("/login", authController.getLogin)
router.post('/login'
    , body('logUsername')
        .trim().isLength({min: 2})
        .withMessage('First name must be at least 2 chars long')
        .custom(async (value, {req}) => {
            const user = await User.findOne({
                $or: [
                    {username: value},
                    {email: value}
                ]
            });

            if (!user) {
                throw new Error('Username or E-mail is not Exist ');
            }
            else {
                var result = await bcrypt.compare(req.body.logPassword, user.password);
                if (!result){
                    throw new Error('Password is not Match ');
                }
                req.userData = user;
                return true;
            }
        })
    , body('logPassword')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 chars long')
    , authController.postLogin);


router.get('/register', authController.getRegister);
router.post('/register',
    body('firstName')
        .trim()
        .isLength({min: 2})
        .withMessage('First name must be at least 2 chars long'),
    body('lastName')
        .trim().isLength({min: 2})
        .withMessage('Last name must be at least 2 chars long'),
    body('userName')
        .trim()
        .isLength({min: 5})
        .withMessage('Username must be at least 5 chars long ')
        .custom(async value => {
            const user = await User.findOne(
                {
                    username: value
                }
            );
            if (user) {
                throw new Error('Username is Exist ');
            }
            return true;
        })
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed in the username'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Is not valid E-Mail')
        .custom(async value => {
            const user = await User.findOne(
                {email: value}
            );
            if (user) {
                throw new Error('E-mail is Exist ');
            }
            return true;
        }),
    body('password')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 chars long'),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    authController.postRegister);

module.exports = router;
