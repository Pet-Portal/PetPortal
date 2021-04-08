const createError = require('http-errors');
const Pet = require('../models/pet.model');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const { petId, userId } = req.body;

    if (!petId && !userId) {
        next(createError(400, 'petId or userId is required'))
    } else if (petId && userId) {
        next(createError(400, 'only petId or userId is allowed'))
    } else {
        const referenceModelName = petId ? Pet.modelName : User.modelName;
        const reference = petId || userId;
/*
        if (req.foundPost.state === "confirmed" && ) {

        }
*/
        Rating.create({
            ...req.body,
            referenceModelName,
            reference,
            owner: req.user.id,
            post: req.params.postId
        })
        .then(rating => res.status(201).json(rating))
        .catch(next)
    }
};