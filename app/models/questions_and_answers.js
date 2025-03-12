const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        match: /^.{10,20}$/,
        required: false
    },
    contents: {
        type: String,
        trim: true,
        match: /^.{1,1000}$/,
        required: true
    },
    author: {
        type: String,
        match: /^[a-zA-Z]{1}[a-zA-Z0-9]3,19}$/,
        required: true
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
    },
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };