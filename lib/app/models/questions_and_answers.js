const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        match: /^.*$/,
        required: false,
        minlength: 10,
        maxlength: 20,
        required: false
    },
    contents: {
        type: String,
        trim: true,
        match: /^.*$/,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    author: {
        type: String,
        match: /^[a-zA-Z][a-zA-Z\d]*$/,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    reference: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    likeCount: {
        type: Number, 
        default: 0,
        required: true
    },
    created: {
        type: Date, 
        default: Date.now,
        required: true
    },
    edited: { 
        type: Date, 
        default: Date.now,
        required: true
    }
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
    }
});

const Question = mongoose.model('Post', QuestionSchema);

module.exports = { Question };