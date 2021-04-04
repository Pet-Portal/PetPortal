const createError = require("http-errors");
const Pet = require("../models/pet.model");

module.exports.list = (req, res, next) => {
  const criteria = {};
  if (req.query.species) {
    criteria.species = req.query.species;
  } else if (req.query.age) {
    criteria.age = req.query.age;
  } else if (req.query.name) {
    criteria.name = req.query.name;
  }else if (req.query.gender) {
    criteria.gender = req.query.gender;
  }else if (req.query.owner) {
    criteria.owner = req.query.owner;
  }

  Pet.find(criteria)
    .then((pet) => res.json(pet))
    .catch(next);
};

module.exports.get = (req, res, next) => {
  Pet.findById(req.params.id)
    .then((pet) => {
      if (pet) res.json(pet);
      else next(createError(404, "Pet not found"));
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  Pet.create({ ...req.body, user: req.user })
    .then((pet) => res.status(201).json(pet))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Pet.findByIdAndDelete(req.params.id)
    .then((pet) => {
      if (pet) res.status(204).json({});
      else next(createError(404, "Pet not found"));
    })
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
  Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((pet) => {
      if (pet) res.json(pet);
      else next(createError(404, "Pet not found"));
    })
    .catch(next);
};
