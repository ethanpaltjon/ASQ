const { Like } = require('../models/likes.js');
const { Question } = require('../models/questions_and_answers.js');

async function addLike(req, res, next) {
    const { postid, username } = req.params;
    // console.log("got inside");
    const like = new Like({
        user: username,
        post: postid
    });

    const postToBeLiked = await Question.findById(postid);
    console.log(postToBeLiked);
    if (postToBeLiked.length > 0) {
        try {
            await like.save();
            await Question.updateOne({ _id: postid }, { $inc: { likeCount: 1 } });
        }
        catch (err) {
            if (err.name === "MongoServerError" && err.code === 11000) {
                console.log("You already liked the post")
            }
            else if (err.name === "ValidationError") {
                console.log(err.name);
                res.status(400);
                res.json({
                    code : "INVALID_PARAMS",
                    message: err.message
                });
            }
            else {
                next(err);
            }
        }
    
        res.send(true);
    }
    else {
        console.log("No such post exists");
        res.status(404);
        res.send(false);
    }
}

async function getLikesOfPost(req, res, next) {
    try {

        const { postid } = req.params;

        const likesOfPost = await Like.find({post: postid});

        console.log(likesOfPost);

        if (likesOfPost.length > 0) {
            res.send(true);
        } //if something is fixed, its the res.send = true this can be replicated
        else {
            res.send(false);
        }
    }
    catch (err) {
        next(err);
    }
    
}

async function getLikeByUserOnPost(req, res, next) {
    
    try {

        const { postid, username } = req.params;
        const likeByUserOnPost = await Like.find({ post: postid, user: username });
        if (likeByUserOnPost.length > 0) {
            res.send(true);
        }
        else {
            res.send(false);
        }

    }
    catch (err) {
        next(err);
    }
    
}

async function deleteLikeOnPostByUser(req, res, next) {
    
    try {

        const {postid, username } = req.params;

        let { deletedCount } = await Like.deleteOne({ post: postid, user: username});
        
        if (deletedCount > 0) {
            await Question.updateOne({ _id: postid}, { $inc: {likeCount: -1}});
            res.send(true);
        }
        else {
            console.log("didn't delete a like");
            res.send(false);
        }
    }
    catch (err) {
        next(err);
    }
    
}

module.exports = {
    addLike,
    getLikesOfPost,
    getLikeByUserOnPost,
    deleteLikeOnPostByUser
};