const createError = require("http-errors");
const Offer = require("../models/offer.model");
const mailer = require("../config/mailer.config");
const Post = require("../models/post.model");

module.exports.create = (req, res, next) => {
  const { postId } = req.params;
  Promise.all([
    Post.findById(postId).populate("owner"),
    Offer.create({ ...req.body, owner: req.user.id, post: postId }),
  ])
    .then(([post, offer]) => {
      mailer.sendMessageEmail(
        post.owner.email,
        offer.title,
        offer.text,
        offer.price,
        post.owner.name,
        req.user.name,
        post.title
      );
      return res.status(201).json(offer);
    })
    .catch(next);
};

module.exports.accept = (req, res, next) => {
  Offer.findById(req.params.id)
    .then((offer) => {
      if (req.foundPost.state === "pending") {
        req.foundPost.petsitter = offer.owner;
        req.foundPost.state = "confirmed";
        if (offer.state === "pending") {
          req.foundPost.save().then((post) => {
            offer.state = "accepted";
            return offer.save().then((offer) => res.json([offer, post]));
          });
        } else {
          next(createError(400, "Offer state is already accepted"));
        }
      } else {
        next(createError(400, "Post state is already confirmed"));
      }
    })
    .catch(createError(404, "Offer not found"));
};
