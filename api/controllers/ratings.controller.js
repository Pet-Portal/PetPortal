const createError = require('http-errors');
const Pet = require('../models/pet.model');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const { petId, userId } = req.body;

    if (!petId && !userId) {
        next(createError(400, 'petId or userId is required'))
    } else if (petId && userId) {
        next(createError(400, 'Only petId or userId is allowed'))
    } else {
        const referenceModelName = petId ? Pet.modelName : User.modelName;
        const reference = petId || userId;
        const userWithRatings = req.foundPost.owner.ratings.find(rating => rating.owner == req.user.id);
        const petWithRatings = req.foundPost.pets.find(pet => pet.ratings.find(rating => rating.owner == req.user.id));
        if (req.foundPost.petsitter) {
            petSitterWithRatings = req.foundPost.petsitter.ratings.find(rating => rating.owner == req.user.id);
        }
        const ownPet = req.foundPost.pets.find(pet => pet.owner == req.user.id);
        if (req.foundPost.state === "pending") {
            next(createError(400, 'Rating not allowed when status is not confirmed'))
        } else if (req.user.id === req.body.userId) {
            next(createError(400, 'You cant vote yourself'))
        } else if (userId && userWithRatings) {
            next(createError(400, 'You have already rated this User'))
        } else if (petId && petWithRatings) {
            next(createError(400, 'You have already rated this Pet'))
        } else if (userId && petSitterWithRatings) {
            next(createError(400, 'You have already rated this Petsitter'))
        } else if (petId && ownPet) {
            next(createError(400, 'You cant vote your own Pet'))
        } else if (req.user.id !== req.foundPost.owner || req.user.id !== req.foundPost.petsitter) { 
            next(createError(400, 'Not allow to rate in this post'))
        } else {
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
    }
};