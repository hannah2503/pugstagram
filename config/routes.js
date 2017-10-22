const express = require('express');
const router  = express.Router();
//require controller files
const statics = require('../controller/statics');
const registrations = require('../controller/registration');
const sessions = require('../controller/session');

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

// INDEX
router.get('/pugs/index', (req, res) =>  res.render('pugs/index'));
// NEW
router.get('/pugs/new', (req, res) => res.send('pugs/new'));



module.exports = router;
