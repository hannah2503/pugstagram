const express = require('express');
const router  = express.Router();

//require controller files
const statics = require('../controller/statics');
const registrations = require('../controller/registration');
const sessions = require('../controller/session');

//require model files
// const User = require('../models/user');
const Pug = require('../models/pug');

// A home route
router.route('/')
  .get(statics.index);

//registration page
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

//login page
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

// function secureRoute(req, res, next) {
//   if (!req.session.userId) {
//     return req.session.regenerate(() => {
//       res.redirect('/login');
//     });
//   }
// // --> need to use  .post(secureRoute,
//
//   return next();
// }

// // NEW
// router.get('/pugs/new', (req, res) => res.send('pugs/new'));

// INDEX
router.get('/pugs/index', (req, res) => {
  Pug
    .find()
    .exec()
    .then((pugs) => {
      res.render('pugs/index', { pugs });
    });
});





module.exports = router;
