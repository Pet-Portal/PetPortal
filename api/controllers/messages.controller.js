const createError = require('http-errors');
const Message = require('../models/message.model');
const mailer = require('../config/mailer.config');
const Post = require('../models/post.model');

module.exports.create = (req, res, next) => {
    const { postId } = req.params;
    Promise.all([Post.findById(postId).populate('user'), Message.create({ ...req.body, user: req.user.id, post: postId })])
        .then(([post, message]) => {
            mailer.sendMessageEmail(post.user.email, message.title, message.text, message.price, post.user.name, req.user.name, post.title)
            return res.status(201).json(message)
        })
        .catch(next)
};

module.exports.delete = (req, res, next) => {
    Message.findByIdAndDelete(req.params.id)
        .then(message => {
            if (message) res.status(204).json({})
            else createError(404, 'Message not found')
        })
        .catch(next)
};

module.exports.list = (req, res, next) => {
    const { postId } = req.params;
    Message.find({ post: postId })
        .then(messages => res.status(200).json(messages))
        .catch(next)
};

module.exports.update = (req, res, next) => {
    Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(message => {
            if (message) res.status(200).json(message)
            else createError(404, 'Message not found')
        })
        .catch(next)
};

module.exports.get = (req, res, next) => {
    Message.findById(req.params.id)
        .then(message => {
            if(message) res.status(200).json(message)
            else createError(404, 'Message not found')
        })
        .catch(next)
};