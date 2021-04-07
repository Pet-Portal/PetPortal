const createError = require("http-errors");
const Pet = require("../models/pet.model");

module.exports.list = (req, res, next) => {
  Pet.find()
    .populate("owner")
    .then((pets) => res.json(pets))
    .catch(next);
};

module.exports.get = (req, res, next) => res.json(req.foundPet);

module.exports.create = (req, res, next) => {
  Pet.create({ ...req.body, user: req.user })
    .then((pet) => {
      console.log("USER", req.user);
      res.status(201).json(pet);
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  req.foundPet
    .delete()
    .then(() => res.status(204).end())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { location } = req.body;
  if (location) {
    req.body.location = {
      type: "Point",
      coordinates: location,
    };
  }
  Object.assign(req.foundPet, req.body);

  req.foundPet
    .save()
    .then((pet) => res.json(pet))
    .catch(next);
};
