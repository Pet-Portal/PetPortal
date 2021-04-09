const Post = require("../models/post.model");
const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  User.findById(req.user.id)
    .populate("pets")
    .then((user) => {
      return Post.create({
        ...req.body,
        owner: req.user,
        pet: user.pets[0].id,
      }).then((post) => {
        res.status(201).json(post);
      });
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch(next);
};

module.exports.listUserPosts = (req, res, next) => {
  const { userId } = req.params;
  Post.find({ owner: userId })
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

module.exports.confirm = (req, res, next) => {
  if (req.foundPost.state === "pending") {
    req.foundPost.state = "confirmed";
  } else {
    next(createError(400, "State is already confirmed"))
  }
};
