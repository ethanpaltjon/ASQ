const express = require('express');
const bodyParser = require('body-parser');

const question = require('./question.js');
const likes = require('./likes.js');

const router = express.Router();

router.use(bodyParser.json());

router.get('/questions', question.getAllQuestions);
router.get('/questions/:questionid', question.getSpecificQuestion);
router.post('/questions', question.createQuestion);
router.put('/questions/:questionid', question.updateQuestion);

router.post('/questions/:questionid/answers', question.createAnswer);
router.get('/questions/:questionid/answers', question.getAllAnswersForAQuestion);
router.get('/answers/:answerid', question.getSpecificAnswer);
router.put('/answers/:answerid', question.updateAnswer);

router.get('/likes/:postid', likes.getLikesOfPost);
router.get('/likes/:postid/:username', likes.getLikeByUserOnPost);
router.post('/likes/:postid/:username', likes.addLike);
router.delete('/likes/:postid/:username', likes.deleteLikeOnPostByUser);

module.exports = { router };