const Pet = require("../models/pet.model");
const createError = require("http-errors");

module.exports.petExists = (req, res, next) => {
  const petId = req.params.petId || req.params.id;
  Pet.findById(petId)
    .populate("owner ratings")
    .then((pet) => {
      if (!pet) next(createError(404, "Pet not found"));
      else {
        req.foundPet = pet;
        next();
      }
    })
    .catch(next);
};

module.exports.ownedByUser = (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.foundPet.owner.id) {
    next();
  } else {
    next(createError(403, "Forbidden permissions"));
  }
};
