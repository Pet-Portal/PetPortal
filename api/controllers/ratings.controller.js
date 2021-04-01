const createError = require('http-errors');
const mongoose = require('mongoose');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {

    const { sitterName } = req.params;
    console.log(req.params)
    User.findOne({ name: sitterName })
        .populate({
            path: 'ratings',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .then(user => {
            userRated = user;
            const idChecked = user.ratings.find(rating => rating.user.id === req.user.id)
            if (!user) {
                next(createError(404, 'User not found'));
            } else if (idChecked) {
                createError(401, 'You have already rated this user')
            } else {
                Rating.create(req.body)
                    .then(rating => {
                        res.status(201).json({...rating, user: req.user.id, sitter: userRated.id})
                    })
                    .catch(next)
            }
        })


};

module.exports.list = (req, res, next) => {

}

