const Post = require("../models/post.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  Post.create({ ...req.body, user: req.user })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch(next);
};

module.exports.update = (req, res, next) => {
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
