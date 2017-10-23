const express = require('express');
const router  = express.Router();

const statics = require('../controller/statics');
const registration = require('../controller/registrations');
const session = require('../controller/sessions');
const Pug = require('../models/pug');
const pugs = require('../controller/pugs');

//Secure route function
function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

// A home route - welcome page
router.route('/')
  .get(statics.home);

// index of pugs
router.get('/pugs/index', (req, res) => {
  Pug
    .find()
    .exec()
    .then((pugs) => {
      res.render('pugs/index', { pugs });
    });
});

//all the pugs
router.route('/pugs')
  .get(pugs.index)
  .post(secureRoute, pugs.create);

// new pugs
router.route('/pugs/new')
  .get(secureRoute, pugs.new);

//pug delete
router.route('/pugs/:id')
  .get(pugs.show)
  .put(secureRoute, pugs.update)
  .delete(secureRoute, pugs.delete);

//edit pugs
router.route('/pugs/:id/edit')
  .get(secureRoute, pugs.edit);

//registration page
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//login page
router.route('/login')
  .get(session.new)
  .post(session.create);

//logout
router.route('/logout')
  .get(session.delete);


module.exports = router;
