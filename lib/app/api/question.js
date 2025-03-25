const mongoose = require('mongoose');

const { Question } = require('../models/questions_and_answers.js');

async function createQuestion(req, res, next) {
    console.log("At least calling the function");

    if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const question = new Question({
            title: req.body.title,
            contents: req.body.contents,
            author: req.body.author,
            id: req.body.id,
            likeCount: req.body.likeCount,
            created: req.body.created
        });

        await question.save();

        res.json(question);
    }
    catch (err) {
        next(err);
    }
}


async function getAllQuestions(req, res, next) {
    
    try {

        res.json(await Question.find({reference: null}, { contents: 0}));

    }
    catch  (err) {
        next(err);
    }
    
    }

async function getSpecificQuestion(req, res, next) {
    

    try {
        const { questionid } = req.params;
        res.json(await Question.findOne({ _id: new mongoose.Types.ObjectId(questionid)}));
    }
    catch (err) {
        next(err);
    }
}

async function updateQuestion(req, res, next) {
    try {
        const { questionid } = req.params;
        updateFields = {
            edited: Date.now()
        };

        if (req.body.contents != null) {
            updateFields.contents = req.body.contents;
        }

        if (req.body.title != null) {
            updateFields.title = req.body.title;
        }

        await Question.updateOne({ _id: questionid },
            {$set: updateFields}
        )

        res.json(updateFields);
    }
    catch (err) {
        next(err);
        res.send(false);
    }
    
    
}

async function getAllAnswersForAQuestion(req, res, next) {

    try {

        const { questionid } = req.params;

        res.json(
            await Question.find( { reference: questionid} )
        );
    }
    catch (err) {
        next(err);
    }

}

async function createAnswer(req, res, next) {
    
    try {

        const { questionid } = req.params;

        const answer = new Question({
            contents: req.body.contents,
            author: req.body.author,
            reference: questionid
        })
    
        await answer.save();
    
        res.json(answer);
    }
    catch (err) {
        next(err);
    }
    
}

async function getSpecificAnswer(req, res, next) {
    try {

        const { answerid } = req.params;

        res.json(await Question.findOne({ _id: answerid }));
    
    }
    catch (err) {
        next(err);
    }
    
}

async function updateAnswer(req, res, next) {
    try {
        const { answerid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(answerid)) {
            return res.status(400).json({ error: "Invalid answer ID" });
        }

        const found = await Question.findById(answerid);
        if (!found) {
            return res.status(404).json({ error: "Answer not found" });
        }

        const result = await Question.updateOne(
            { _id: answerid },
            { 
                $set: {
                    contents: req.body.contents,
                    edited: Date.now()
                } 
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ error: "No changes were made" });
        }

        res.json({ success: true, message: "Answer updated successfully" });

    } catch (err) {
        console.error("Error updating answer:", err);
        next(err);
    }
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