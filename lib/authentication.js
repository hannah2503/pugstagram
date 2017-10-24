const User = require('../models/user');

function authentication(req, res, next) {
  if(!req.session.isAuthenticated) return next();

  User
    .findById(req.session.userId)
    // .populate('pug favorites')
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          return res.redirect('/login');
        });
      }

      req.session.userId = user.id;
      req.user = user;
      res.locals.user = user;
      res.locals.isAuthenticated = true;
      // res.locals.currentUser = user;
      // req.currentUser = user;

      next();
    });
}

module.exports = authentication;
