const createError = require("http-errors");
const Pet = require("../models/pet.model");
const Rating = require("../models/rating.model");
const User = require("../models/user.model");
const moment = require("moment");

module.exports.create = (req, res, next) => {
  const { petId, userId } = req.body;

  if (!petId && !userId) {
    next(createError(400, "petId or userId is required"));
  } else if (petId && userId) {
    next(createError(400, "Only petId or userId is allowed"));
  } else {
    const userWithRatings = req.foundPost.owner.ratings.find(
      (rating) => rating.owner == req.user.id
    );
    const petWithRatings = req.foundPost.pets.find((pet) =>
      pet.ratings.find((rating) => rating.owner == req.user.id)
    );
    if (req.foundPost.petsitter) {
      petSitterWithRatings = req.foundPost.petsitter.ratings.find(
        (rating) => rating.owner == req.user.id
      );
    }
    const ownPet = req.foundPost.pets.find(
      (pet) => pet.owner.id === req.user.id
    );
    if (req.foundPost.state === "pending") {
      next(createError(400, {errors: { title: { message: "Rating not allowed when status is not confirmed"}}} ));
    } else if (req.user.id === req.body.userId) {
      next(createError(400, {errors: { title: { message: "You cant vote yourself"}}}));
    } else if (userId && userWithRatings) {
      next(createError(400, {errors: { title: { message: "You have already rated this User"}}}));
    } else if (petId && petWithRatings) {
      next(createError(400, {errors: { title: { message: "You have already rated this Pet"}}}));
    } else if (userId && petSitterWithRatings) {
      next(createError(400, {errors: { title: { message: "You have already rated this Petsitter"}}}));
    } else if (petId && ownPet) {
      next(createError(400, {errors: { title: { message: "You cant vote your own Pet"}}}));
    } else if (moment().isBefore(moment(req.foundPost.end))) {
      next(createError(400, {errors: { title: { message: "You cant rate in this post yet"}}}));
    } else if (
      req.user.id === req.foundPost.owner.id ||
      req.user.id === req.foundPost.petsitter.id
    ) {
      const referenceModelName = petId ? Pet.modelName : User.modelName;
      const reference = petId || userId;
      Rating.create({
        ...req.body,
        referenceModelName,
        reference,
        owner: req.user.id,
        post: req.params.postId,
      })
        .then((rating) => res.status(201).json(rating))
        .catch(next);
    } else {
      next(createError(400, {errors: { title: { message: "Not allow to rate in this post"}}}));
    }
  }
};
