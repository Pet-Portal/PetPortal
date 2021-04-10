const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.userExists = (req, res, next) => {
    const userId = req.params.userId || req.params.id;
    User.findById(userId)
        .populate('ratings')
        .then(user => {
            if (!user) next(createError(404, 'User not found'))
            else {
                req.foundUser = user;
                next()
            }
        })
        .catch(next);
}

module.exports.ownedByUser = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.foundUser.id) {
        next()
      } else {
        next(createError(403, 'Forbidden permissions'))
      }
};