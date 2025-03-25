const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const question = require('./question.js');
const likes = require('./likes.js');
const common = require('./common.js');
const errorHandler = require('./errorHandler.js');
const logger = require('../../logger.js');
const config = require('../../config.js');

const router = express.Router();

router.use(morgan(config.morganFormat, config.projectPath));

router.use(bodyParser.json());

router.route('/questions')
    .get(question.getAllQuestions)
    .post(question.createQuestion)
    .all(common.unsupported);

router.route('/questions/:questionid')
    .get(question.getSpecificQuestion)
    .put(question.updateQuestion)
    .all(common.unsupported);

router.route('/questions/:questionid/answers')
    .post(question.createAnswer)
    .get(question.getAllAnswersForAQuestion)
    .all(common.unsupported);

router.route('/answers/:answerid')
    .get(question.getSpecificAnswer)
    .put(question.updateAnswer)
    .all(common.unsupported);

router.route('/likes/:postid')
    .get(likes.getLikesOfPost)
    .all(common.unsupported);

router.route('/likes/:postid/:username')
    .get(likes.getLikeByUserOnPost)
    .post(likes.addLike)
    .delete(likes.deleteLikeOnPostByUser)
    .all(common.unsupported);

// router.use((err, req, res, next) => {
//     if (err !== null) {
//         return common.invalidJSON(req, res, err);
//     }
//     return next();
// })

router.use(common.notFound);
router.use(common.internalError);

router.use(errorHandler.errorHandler);

module.exports = { router };