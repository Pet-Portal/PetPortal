const Post = require('../models/post.model');
const createError = require('http-errors');

module.exports.postExists = (req, res, next) => {
    const postId = req.params.postId || req.params.id;
    Post.findById(postId)
        .then(post => {
            if (!post) next(createError(404, 'Post not found'))
            else {
                req.foundPost = post;
                next()
            }
        })
        .catch(next);
}