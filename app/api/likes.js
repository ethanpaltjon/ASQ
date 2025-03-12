const { Like } = require('../models/likes.js');
const { Question } = require('../models/questions_and_answers.js');

async function addLike(req, res, next) {
    const { postid, username } = req.params;
    const like = new Like({
        user: username,
        post: postid
    });

    const postToBeLiked = await Question.findById(postid);
    if (postToBeLiked) {
        try {
            await like.save();
            await Question.updateOne({ _id: postid }, { $inc: { likeCount: 1 } });
        }
        catch (err) {
            if (err.name === "MongoServerError" && err.code === 11000) {
                console.log("You already liked the post")
            }
            else {
                console.log("Big bad problem, start with likes.js in api folder");
            }
        }
    
        return true;
    }
    else {
        console.log("No such post exists");
        res.status(404);
        return false;
    }


}

async function getLikesOfPost(req, res, next) {
    const { postid } = req.params;

    const likesOfPost = await Like.find({post: postid});

    console.log(likesOfPost);
    res.json(likesOfPost);
}

async function getLikeByUserOnPost(req, res, next) {
    const { postid, username } = req.params;
    const likeByUserOnPost = await Like.find({ post: postid, user: username });
    if (likeByUserOnPost) {
        res.json({"exists": true});
    }
    else {
        res.json({"exists": false});
    }
}

async function deleteLikeOnPostByUser(req, res, next) {
    const {postid, username } = req.params;

    let { deletedCount } = await Like.deleteOne({ post: postid, user: username});
    
    if (deletedCount === 1) {
        await Question.updateOne({ _id: postid}, { $inc: {likeCount: -1}});
    }
    else {
        console.log("didn't delete a like");
    }
}

module.exports = {
    addLike,
    getLikesOfPost,
    getLikeByUserOnPost,
    deleteLikeOnPostByUser
};