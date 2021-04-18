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
  const criteria = {};
  const { search } = req.query;

  if (search) {
    criteria.title = new RegExp(search, 'i');
  }
  Post.find(criteria)
    .populate('owner pets')
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
