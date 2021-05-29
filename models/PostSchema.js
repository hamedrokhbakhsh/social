const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
        content: {type: String, trim: true},
        postBy: { type: Schema.Types.ObjectId, ref: 'User'},
        likes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
        pinned: { type: Boolean, default: false}
    },
    {
        
        
        timestamps: true
    }
)
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
