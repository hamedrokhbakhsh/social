const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, require: true, trim: true},
    lastName: {type: String, require: true, trim: true},
    username: {type: String, require: true, trim: true, unique: true},
    email: {type: String, require: true, trim: true, unique: true},
    password: {type: String, require: true},
    profilePic: {type: String, default: '/images/profile.png'},
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    },
    { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;
