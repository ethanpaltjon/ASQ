const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: String,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    versionKey: false
},
{
    toJSON: {
        getters: false,
        virtuals: false,
        transform: (doc, obj, options) => {
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        }
}});

LikeSchema.index({ post: 1, user: 1}, { unique: true});

const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like };
