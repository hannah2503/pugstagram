const express = require('express');
const router  = express.Router();

const statics = require('../controller/statics');
const registration = require('../controller/registrations');
const session = require('../controller/sessions');
const pugs = require('../controller/pugs');
const secureRoute = require('../lib/secureRoute');

// A home route - welcome page
router.route('/')
  .get(statics.home);

// all the pugs
router.route('/pugs')
  .get(pugs.index)
  .post(pugs.create);

// add new pugs
router.route('/pugs/new')
  .get(secureRoute, pugs.new);

//pug delete
router.route('/pugs/:id')
  .get(pugs.show)
  .put(secureRoute, pugs.update)
  .delete(secureRoute,pugs.delete);

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
