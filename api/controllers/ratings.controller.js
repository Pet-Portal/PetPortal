const createError = require('http-errors');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {

    const { userName } = req.params;
    console.log(req.params)
    User.findOne({ name: userName })
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
                Rating.create({...req.body, user: req.user.id, userRated: userRated.id})
                    .then(rating => {
                        res.status(201).json(rating)
                    })
                    .catch(next)
            }
        })

            //En React hay que pasarle el userName en los params para poder hacer la valoración.
};

module.exports.delete = (req, res, next) => {
    Rating.findByIdAndDelete(req.params.id)
        .then(rating => res.status(204).json({}))
        .catch(next)
};

module.exports.list = (req, res, next) => {
    Rating.find()
        .then(ratings => res.status(200).json(ratings))
        .catch(next)
};

module.exports.update = (req, res, next) => {
    Rating.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(rating => {
            if (rating) res.json(rating)
            else next(createError(404, 'Rating not found'))
        })
        .catch(next)
};

module.exports.get = (req, res, next) => {
    Rating.findById(req.params.id)
        .then(rating => {
            if (!rating) createError(404, 'Rating not found')
            else res.json(rating)
        })
        .catch(next)
};