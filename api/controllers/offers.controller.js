const createError = require("http-errors");
const Offer = require("../models/offer.model");
const mailer = require("../config/mailer.config");

module.exports.create = (req, res, next) => {
  const { postId } = req.params;
  const offer = req.body;

  if (req.foundPost.offers.find(offer => offer.owner.id === req.user.id)) {
    next(createError(400, { errors: { title: { message: "Your have already sent an Offer to this Post" } } }))
  } else {
    Offer.create({ ...offer, owner: req.user.id, post: postId })
      .then(offer => {
        mailer.sendMessageEmail(
          req.foundPost.owner.email,
          offer.title,
          offer.text,
          offer.price,
          req.foundPost.owner.name,
          req.user.name,
          req.foundPost.title
        );
        return res.status(201).json(offer)
      })
      .catch(next)
  }
};

module.exports.accept = (req, res, next) => {
  /* if (req.foundPost.state === "pending" && req.user.id === req.foundPost.owner.id) {
    req.foundPost.state = "confirmed";
    Offer.findById(req.params.id)
      .then(offer => {
        if (offer.state === "pending") {
          offer.state = "accepted"
          req.foundPost.petsitter = offer.owner;
          return Promise.all([req.foundPost.save(), offer.save()])
          .then(([post, offer]) => res.json(offer))
        } else {
          next(createError(400, "Offer state is already accepted"))
        } 
      })
      .catch(next(createError(400, "Offer not found")))
  } else {
    next(createError(400, "Post state is already confirmed or you are not the owner of this Post"))
  } */


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
        next(createError(400, "Post state is already confirmed or you are not the owner of this post"));
      }
    })
    .catch(createError(404, "Offer not found"));
};


module.exports.offerListFromPost = (req, res, next) => {
  const { postId } = req.params;
  Offer.find({ post: postId })
    .populate("owner post")
    .then(offers => {
      res.status(200).json(offers)
    })
    .catch(next)
}