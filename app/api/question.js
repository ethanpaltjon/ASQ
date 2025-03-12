const mongoose = require('mongoose');

const { Question } = require('../models/questions_and_answers.js');

async function createQuestion(req, res) {
    const question = new Question({
        title: req.body.title,
        contents: req.body.contents,
        author: req.body.author
    });

    await question.save();

    res.json(question);
}

async function getAllQuestions(req, res) {
    res.json(await Question.find({reference: null}, { contents: 0}));
}

async function getSpecificQuestion(req, res) {
    const { questionid } = req.params;

    res.json(await Question.findOne({ _id: new mongoose.Types.ObjectId(questionid)}));
}

async function updateQuestion(req, res) {
    const { questionid } = req.params;

    await Question.updateOne( { _id: questionid },
        {
            $set: {
                title: req.body.title,
                contents: req.body.contents,
                edited: Date.now()
            }
        }
    )
}

async function getAllAnswersForAQuestion(req, res) {
    const { questionid } = req.params;

    res.json(
        await Question.find( { reference: new mongoose.Types.ObjectId(questionid)} )
    );
}

async function createAnswer(req, res) {
    const { questionid } = req.params;

    const answer = new Question({
        contents: req.body.contents,
        author: req.body.author,
        reference: questionid
    })

    await answer.save();

    res.json(answer);
}

async function getSpecificAnswer(req, res) {
    const { answerid } = req.params;

    res.json(await Question.findOne({ _id: answerid }));
}

async function updateAnswer(req, res) {
    const { answerid } = req.params;

    await Question.updateOne( {_id: answerid },
        {
            $set: {
                contents: req.body.contents,
                edited: Date.now()
            }
        }
    )
}

module.exports = {
    createQuestion,
    getAllQuestions,
    getSpecificQuestion,
    updateQuestion,
    getAllAnswersForAQuestion,
    createAnswer,
    getSpecificAnswer,
    updateAnswer
}