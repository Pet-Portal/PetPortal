const Post = require("../models/post.model");
const createError = require("http-errors");

module.exports.postExists = (req, res, next) => {
  const postId = req.params.postId || req.params.id;
  Post.findById(postId)
    .populate({
      path: "owner",
      populate: {
        path: "ratings",
        model: "Rating",
      },
    })
    .populate({
      path: "pets",
      populate: {
        path: "ratings",
        model: "Rating",
      },
    })
    .populate({
      path: "petsitter",
      populate: {
        path: "ratings",
        model: "Rating",
      },
    })
    .then((post) => {
      if (!post) next(createError(404, "Post not found"));
      else {
        req.foundPost = post;
        next();
      }
    })
    .catch(next);
};

module.exports.ownedByUser = (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.foundPost.owner.id) {
    next();
  } else {
    next(createError(403, "Forbidden permissions"));
  }
};
