const Post = require("../models/post.model");
const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
    User.findById(req.user.id)
        .populate('pets')
        .then((user) => {
           return Post.create({ ...req.body, user: req.user, pet: user.pets[0].id })
                .then((post) => {
                    res.status(201).json(post);
                })
        })
        .catch(next);
};

module.exports.list = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch(next);
};

module.exports.listUserPosts = (req, res, next) => {
    const { userId } = req.params;
    Post.find({ user: userId })
        .then((posts) => res.status(200).json(posts))
        .catch(next);
};

module.exports.update = (req, res, next) => {
    Object.assign(req.foundPost, req.body);
    if (req.user.role === 'admin' || req.user.id === req.foundPost.user.id) {
        req.foundPost
            .save()
            .then((post) => res.json(post))
            .catch(next);
    } else {
        next(createError(403, 'Forbidden permissions'))
    }
};

module.exports.delete = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.foundPost.user.id) {
        req.foundPost
            .delete()
            .then(() => res.status(204).end())
            .catch(next);
    } else {
        next(createError(403, 'Forbidden permissions'))
    }

};

module.exports.get = (req, res, next) => res.json(req.foundPost);
