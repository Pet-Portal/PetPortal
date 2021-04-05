const createError = require('http-errors');
const Message = require('../models/message.model');


module.exports.create = (req, res, next) => {
    const { postId } = req.params;
    Message.create({ ...req.body, user: req.user.id, post: postId })
        .then(message => res.status(201).json(message))
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
            if (message) res.json(message)
            else createError(404, 'Message not found')
        })
        .catch(next)
};