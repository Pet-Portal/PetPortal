const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const mailer = require('../config/mailer.config');

module.exports.create = (req, res, next) => {
    const { location } = req.body;
    req.body.location = {
        type: 'Point',
        coordinates: location
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                next(createError(400, { errors: { email: 'This email already exists' } }))
            } else {
                return User.create(req.body)
                    .then(user => {
                        mailer.sendValidationEmail(user.email, user.verified.token, user.name);
                        res.status(201).json(user)
                    })
            }
        })
        .catch(error => {
            if (error.errors && error.errors['location.coordinates']) {
              error.errors.location = error.errors['location.coordinates'];
              delete error.errors['location.coordinates'];
            }
            next(error);
          })
};

module.exports.list = (req, res, next) => {

    const criteria = {};
  if (req.query.role) {
    criteria.role = req.query.role;
  } else if (req.query.name) {
    criteria.name = req.query.name;
  } else if (req.query.email) {
    criteria.email = req.query.email;
  } else if (req.query.createdAt) {
    criteria.createdAt = req.query.createdAt;
  }

    User.find(criteria)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
};

module.exports.get = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.status(204).end())
        .catch(next)
};

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.status(202).json(user))
        .catch(next)
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
        if (error) {
            next(error);
        } else if (!user) {
            next(createError(400, { errors: validations }))
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.json(user)
            })
        }
    })(req, res, next);
};

module.exports.activate = (req, res, next) => {
    User.findOneAndUpdate(
        { 'verified.token': req.query.token },
        { $set: { verified: { date: new Date(), token: null } } },
        { runValidators: true }
    ).then(user => {
        if (!user) {
            next(createError(404, 'Invalid activation token'));
        } /* else {
            res.redirect('/login');
        } */
    }).catch(next);
};

module.exports.logout = (req, res, next) => {
    req.logout();

    res.status(204).end()
};