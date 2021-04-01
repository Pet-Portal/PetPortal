const Post = require('../models/post.model');
const createError = require('http-errors');


module.exports.create = (req, res, next) => {
    Post.create({ ...req.body, user: req.user })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(next)
};

module.exports.list = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(next)
};

module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(post => {
            if (post) res.json(post)
            else next(createError(404, 'Post not found'))
        })
        .catch(next)
};

module.exports.delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(post => {
            if (!post) next(createError(404, 'Post not found'))
            else return res.status(204).json({})
        }).catch(next)
};

module.exports.get = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) createError(404, 'Post not found')
            else res.json(post)
        })
        .catch(next)
};