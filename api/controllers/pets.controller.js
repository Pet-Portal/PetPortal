const Pet = require("../models/pet.model");

module.exports.list = (req, res, next) => {
  const { userId } = req.params
  Pet.find({ owner: userId })
    .populate("owner")
    .then((pets) => res.json(pets))
    .catch(next);
};

module.exports.get = (req, res, next) => res.json(req.foundPet);

module.exports.create = (req, res, next) => {
  const pet = req.body;
  if (req.file) {
    pet.image = req.file.path;
  }
  Pet.create({ ...pet, owner: req.user.id })
    .then((pet) => res.status(201).json(pet))
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
  if (req.file) {
    req.body.image = req.file.path
  }
  
  Object.assign(req.foundPet, req.body);
      req.foundPet
      .save()
      .then((pet) => res.json(pet))
      .catch(next);

};
