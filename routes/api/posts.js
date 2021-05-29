var express = require('express');
var router = express.Router();
const {body, validationResult, check} = require('express-validator');


const postsController = require('../../controllers/api/post')
const login = require('../../midleware/midleware')

/* GET Post listing. */
router.get('/post', postsController.getPosts );


/* POST Post listing. */

router.post('/post',
    login.loginRequired
    ,body("content")
        .trim()
        .isLength({min: 1})
        .withMessage('First name must be at least 2 chars long')
    ,postsController.createPost);



/* PUT  like  listening */

router.put('/post', postsController.putLike );


module.exports = router;
