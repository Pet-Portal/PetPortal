const Post = require("../models/post.model");
const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const post = req.body
  if (req.file) {
    post.image = req.file.path;
  }
  post.pets = post.pets.split(",")
  Post.create({
    ...post,
    owner: req.user.id,
  })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const titleCriteria = {};
  const speciesCriteria = {};
  const { postSearch, speciesSearch } = req.query;

  if (titleCriteria) {
    titleCriteria.title = new RegExp(postSearch, 'i');
  }

  if (speciesSearch) {
    speciesCriteria.species = new RegExp(speciesSearch, 'i');
  }

  Post.find(titleCriteria, speciesCriteria)
    .populate('owner pets')
    .sort({ start: 1 })
    .then((posts) => res.status(200).json(posts))
    .catch(next);
};

module.exports.listUserPosts = (req, res, next) => {
  const { userId } = req.params;
  Post.find({ owner: userId })
    .populate("owner petsitter")
    .then((posts) => res.status(200).json(posts))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  let post = req.body
  if (req.file) {
    post.image = req.file.path;
  }
  console.log(post)
  post.pets = post.pets.split(",")
  post.pets = post.pets.map(pet => pet.id)
  post.owner = post.owner.id
  
  console.log(post.pets)
  Object.assign(req.foundPost, req.body);
  req.foundPost
    .save()
    .then((post) => res.json(post))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  req.foundPost
    .delete()
    .then(() => res.status(204).end())
    .catch(next);
};

module.exports.get = (req, res, next) => res.json(req.foundPost);
