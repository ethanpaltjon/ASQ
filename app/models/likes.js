const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: String,
        match: /^[a-zA-Z]{1}[a-zA-Z0-9]3,19}$/,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

LikeSchema.index({ post: 1, user: 1}, { unique: true});

const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like };
