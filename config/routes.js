const express = require('express');
const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('homepage'));

//require controller files
const statics = require('../controller/statics');
const registrations = require('../controller/registration');
const sessions = require('../controller/session');

router.route('/')
  .get(statics.index);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);


// RESTful routes for the Pug resource
// All URLS should contain /pugs
// INDEX
router.get('/pugs/index', (req, res) =>  res.render('pugs/index'));
// NEW
router.get('/pugs/new', (req, res) => res.send('pugs/new'));
// // SHOW
// router.get('/pugs/:id', (req, res) => res.send('SHOW'));
// // CREATE
// router.post('/pugs', (req, res) => res.send('CREATE'));
// // EDIT
// router.get('/pugs/:id/edit', (req, res) => res.send('EDIT'));
// // UPDATE
// router.put('/pugs/:id', (req, res) => res.send('UPDATE'));
// // DELETE
// router.delete('/pugs/:id', (req, res) => res.send('DELETE'));



module.exports = router;
