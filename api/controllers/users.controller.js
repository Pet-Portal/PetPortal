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
    User.find()
        .then(users => res.json(users))
        .catch(next)
};

module.exports.get = (req, res, next) => {
    if (req.params.id === 'me') {
        return res.json(req.user)
    }
    res.status(200).json(req.foundUser);
}

module.exports.delete = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.foundUser.id) {
        req.foundUser.delete()
            .then(() => res.status(204).end())
            .catch(next)
    } else {
        next(createError(403, 'Forbidden permissions'))
    }

}

module.exports.update = (req, res, next) => {
    if (req.file) {
        req.body.avatar = req.file.path
    }
    Object.assign(req.foundUser, req.body);

    if (req.user.role === 'admin' || req.user.id === req.foundUser.id) {
        req.foundUser.save()
            .then(user => res.json(user))
            .catch(next)
    } else {
        next(createError(403, 'Forbidden permissions'))
    }

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

module.exports.loginWithGoogle = (req, res, next) => {
    const passportController = passport.authenticate('google-auth', (error, user, validations) => {
        if (error) {
            next(error)
        } else {
            req.login(user, error => {
                if (error) next(error)
                else res.redirect(`${process.env.WEB_URL}/authenticate/google/cb`)
            })
        }
    })
    passportController(req, res, next);
}

module.exports.activate = (req, res, next) => {
    User.findOneAndUpdate(
        { 'verified.token': req.query.token },
        { $set: { verified: { date: new Date(), token: null } } },
        { runValidators: true }
    ).then(user => {
        if (!user) {
            next(createError(404, 'Invalid activation token'));
        } else {
            next();
        }
    }).catch(next);
};

module.exports.logout = (req, res, next) => {
    req.logout();

    res.status(204).end()
};