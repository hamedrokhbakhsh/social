const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
var colors = require('colors');

var User = require('../models/UserSchema')

let err;

let payLoad;

exports.getLogin = (req, res, next) => {

    err = ""

    payLoad = {
        userName: "",
        password: ""
    }
    res.render("auth/login", {title: 'login', payLoad: payLoad, error: err});
}

exports.postLogin = async (req, res, next) => {
    payLoad = {
        username: req.body.logUsername,
        password: req.body.password
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        err = errors.errors[0].msg
        return res.render("auth/login", {title: 'register', payLoad: payLoad, error: err});
    }
    const user = await User.findOne({
        $or: [
            {username: req.body.logUsername},
            {email: req.body.logUsername}
        ]
    });



    if (user) {
        req.session.user = user
        const title = 'Home'
        return res.render("index" , {user: user, title : title})
    } else {
        err = 'Somethin Went Wrong'
        return res.render("auth/login", {title: 'register', payLoad: payLoad, error: err});
    }


}

exports.getRegister = (req, res, next) => {


    err = ""

    payLoad = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    }


    res.render("auth/register", {title: 'register', payLoad: payLoad, error: err});
}

exports.postRegister = async (req, res, next) => {
    payLoad = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg.blue)
        err = errors.errors[0].msg
        return res.render("auth/register", {title: 'register', payLoad: payLoad, error: err});
    }

    payLoad.password = await bcrypt.hash(payLoad.password, 10)
    User.create(payLoad).then(user => {
        req.session.user = user
        const title = 'Home'
        return res.render("index" , {user: user, title : title})
    }).catch(err => {
        err = "Something went wrong"
        return res.render("auth/register", {title: 'register', payLoad: payLoad, error: err});
    })
}
