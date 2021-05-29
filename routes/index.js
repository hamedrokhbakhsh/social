var express = require('express');
var router = express.Router();
const login = require('../midleware/midleware')

/* GET home page. */
router.get('/',login.loginRequired, function(req, res, next) {


  res.render('index', {
    title: 'Home',
    user: req.session.user
  });
});

module.exports = router;
