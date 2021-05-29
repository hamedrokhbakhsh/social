

const {body, validationResult} = require('express-validator');
var User = require('../../models/UserSchema')
var Post = require('../../models/PostSchema')


exports.getPosts = async (req,res,next) => {

    const posts = await Post.find().populate('postBy').sort({"createdAt": -1});
    if (!posts){
        return res.sendStatus(400);
    }
    return res.status(200).send(posts)

}




exports.createPost = async (req, res, next) => {

    const user = req.session.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        err = errors.errors[0].msg;
        return res.sendStatus(400);
    }

    const data = {
        content: req.body.content,
        postBy: user
    }

    const postBy = Post.create(data)
        .then( async post => {
            const postPop = await User.populate(post, {path: 'postBy'})
            return res.status(201).send(postPop);

        })
        .catch(err => {
            return res.sendStatus(500);
        });

}

exports.putLike = async (req, res, next) =>{
    res.status(201).send('change');
}
