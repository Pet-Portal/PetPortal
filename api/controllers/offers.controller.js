const createError = require('http-errors');
const Offer = require('../models/offer.model');
const mailer = require('../config/mailer.config');
const Post = require('../models/post.model');

module.exports.create = (req, res, next) => {
    const { postId } = req.params;
    Promise.all([Post.findById(postId).populate('owner'), Offer.create({ ...req.body, owner: req.user.id, post: postId })])
        .then(([post, Offer]) => {
            mailer.sendMessageEmail(post.owner.email, offer.title, offer.text, offer.price, post.owner.name, req.user.name, post.title)
            return res.status(201).json(offer)
        })
        .catch(next)
};

